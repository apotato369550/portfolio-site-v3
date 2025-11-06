import { NextResponse } from 'next/server'
import { fetchLeetCodeData } from '@/lib/fetchers/leetcode'

export async function GET(request: Request) {
  try {
    // Optional: Add authentication check
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REFRESH_TOKEN

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await fetchLeetCodeData()

    return NextResponse.json({
      success: true,
      message: `Fetched ${result.count} LeetCode submissions`,
      count: result.count,
    })
  } catch (error) {
    console.error('Error refreshing LeetCode data:', error)
    return NextResponse.json(
      { error: 'Failed to refresh LeetCode data' },
      { status: 500 }
    )
  }
}

// Disable caching for this route
export const revalidate = 0
