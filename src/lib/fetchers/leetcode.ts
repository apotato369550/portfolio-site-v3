import { supabaseAdmin } from '@/lib/supabase'
import { logInfo, logError } from '@/lib/logger'

interface LeetCodeSubmission {
  title: string
  timestamp: string | number
  statusDisplay: string
}

interface LeetCodeResponse {
  data: {
    recentSubmissionList: LeetCodeSubmission[]
  }
}

const MAX_SUBMISSIONS = 10

function formatTimestamp(timestamp: string | number): string {
  try {
    if (!timestamp) {
      return new Date().toISOString()
    }

    let date: Date

    if (typeof timestamp === 'string') {
      date = new Date(timestamp)
    } else if (typeof timestamp === 'number') {
      // Check if it's in seconds (Unix timestamp) or milliseconds
      if (timestamp < 10000000000) {
        date = new Date(timestamp * 1000)
      } else {
        date = new Date(timestamp)
      }
    } else {
      return new Date().toISOString()
    }

    // Validate the date
    if (isNaN(date.getTime())) {
      return new Date().toISOString()
    }

    return date.toISOString()
  } catch (error) {
    logError('LeetCode', `Error formatting timestamp: ${error}`)
    return new Date().toISOString()
  }
}

export async function fetchLeetCodeData() {
  const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME
  const LEETCODE_SESSION = process.env.LEETCODE_SESSION_COOKIE

  if (!LEETCODE_USERNAME) {
    throw new Error('LeetCode username not configured')
  }

  try {
    logInfo('LeetCode', `Fetching data for ${LEETCODE_USERNAME}...`)

    // GraphQL query for LeetCode submissions
    const query = `
      query recentSubmissions($username: String!, $limit: Int!) {
        recentSubmissionList(username: $username, limit: $limit) {
          title
          timestamp
          statusDisplay
        }
      }
    `

    const variables = {
      username: LEETCODE_USERNAME,
      limit: MAX_SUBMISSIONS,
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
    }

    // Add session cookie if available (for private profiles)
    if (LEETCODE_SESSION) {
      headers['Cookie'] = `LEETCODE_SESSION=${LEETCODE_SESSION}`
    }

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.statusText}`)
    }

    const result: LeetCodeResponse = await response.json()
    const submissions = result.data?.recentSubmissionList || []

    if (!Array.isArray(submissions)) {
      throw new Error('LeetCode API did not return submissions array')
    }

    if (submissions.length === 0) {
      logInfo('LeetCode', 'No submissions found')
      return { count: 0, data: [] }
    }

    logInfo('LeetCode', `Fetched ${submissions.length} submissions`)

    // Transform data
    const submissionsData = submissions.map((sub) => ({
      problem_name: sub.title || 'Unknown Problem',
      submission_date: formatTimestamp(sub.timestamp),
      submission_status: sub.statusDisplay || 'Unknown',
    }))

    // Delete old data and insert new
    const { error: deleteError } = await supabaseAdmin
      .from('leetcode_submissions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    if (deleteError) {
      logError('LeetCode', `Error deleting old submissions: ${deleteError.message}`)
    }

    const { error: insertError } = await supabaseAdmin
      .from('leetcode_submissions')
      .insert(submissionsData)

    if (insertError) {
      logError('LeetCode', `Error inserting submissions: ${insertError.message}`)
      throw insertError
    }

    logInfo('LeetCode', `Successfully stored ${submissionsData.length} submissions`)
    return { count: submissionsData.length, data: submissionsData }
  } catch (error) {
    logError('LeetCode', error)
    throw error
  }
}
