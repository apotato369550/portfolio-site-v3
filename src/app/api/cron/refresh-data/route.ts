import { NextResponse } from 'next/server'
import { fetchGitHubData } from '@/lib/fetchers/github'
import { fetchLeetCodeData } from '@/lib/fetchers/leetcode'
import { logCronExecution } from '@/lib/cron-logger'

export async function GET(request: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization')

    // Vercel Cron sends Authorization header with CRON_SECRET
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Running scheduled data refresh...')

    // Fetch data from external APIs in parallel
    const [githubResult, leetcodeResult] = await Promise.allSettled([
      fetchGitHubData(),
      fetchLeetCodeData(),
    ])

    const response = {
      timestamp: new Date().toISOString(),
      github: {
        status: githubResult.status,
        count:
          githubResult.status === 'fulfilled' ? githubResult.value.count : 0,
        error:
          githubResult.status === 'rejected'
            ? githubResult.reason.message
            : null,
      },
      leetcode: {
        status: leetcodeResult.status,
        count:
          leetcodeResult.status === 'fulfilled'
            ? leetcodeResult.value.count
            : 0,
        error:
          leetcodeResult.status === 'rejected'
            ? leetcodeResult.reason.message
            : null,
      },
    }

    console.log('Data refresh completed:', response)

    // Log to database (optional)
    await logCronExecution('refresh-data', 'success', response)

    return NextResponse.json({
      success: true,
      message: 'Data refresh completed',
      ...response,
    })
  } catch (error) {
    console.error('Error in cron job:', error)

    // Log failure to database (optional)
    await logCronExecution('refresh-data', 'failure', {
      error: String(error),
    })

    return NextResponse.json(
      { error: 'Cron job failed' },
      { status: 500 }
    )
  }
}

// This route should not be cached
export const revalidate = 0
