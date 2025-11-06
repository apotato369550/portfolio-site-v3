import { NextResponse } from 'next/server'
import { fetchGitHubData } from '@/lib/fetchers/github'
import { fetchLeetCodeData } from '@/lib/fetchers/leetcode'

export async function GET(request: Request) {
  try {
    // Authentication check
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REFRESH_TOKEN

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all data in parallel
    const [githubResult, leetcodeResult] = await Promise.all([
      fetchGitHubData().catch((err) => {
        console.error('GitHub fetch failed:', err)
        return { count: 0, error: err.message }
      }),
      fetchLeetCodeData().catch((err) => {
        console.error('LeetCode fetch failed:', err)
        return { count: 0, error: err.message }
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Data refresh completed',
      github: {
        count: githubResult.count,
        error: 'error' in githubResult ? githubResult.error : null,
      },
      leetcode: {
        count: leetcodeResult.count,
        error: 'error' in leetcodeResult ? leetcodeResult.error : null,
      },
    })
  } catch (error) {
    console.error('Error in refresh-all:', error)
    return NextResponse.json(
      { error: 'Failed to refresh data' },
      { status: 500 }
    )
  }
}

export const revalidate = 0
