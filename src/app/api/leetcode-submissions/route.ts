import { NextResponse } from 'next/server'

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
    console.error('Error formatting timestamp:', error)
    return new Date().toISOString()
  }
}

export async function GET() {
  const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME
  const LEETCODE_SESSION = process.env.LEETCODE_SESSION_COOKIE

  if (!LEETCODE_USERNAME) {
    // Return empty array instead of error so site still works
    console.warn('LeetCode username not configured - returning empty submissions')
    return NextResponse.json([])
  }

  try {
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
      limit: 10,
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

    // Transform data
    const submissionsData = submissions.map((sub) => ({
      problem_name: sub.title || 'Unknown Problem',
      submission_date: formatTimestamp(sub.timestamp),
      submission_status: sub.statusDisplay || 'Unknown',
    }))

    return NextResponse.json(submissionsData)
  } catch (error) {
    console.error('Error fetching LeetCode submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

// Cache for 1 hour
export const revalidate = 3600
