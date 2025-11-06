import { NextResponse } from 'next/server'
import { fetchGitHubData } from '@/lib/fetchers/github'

export async function GET(request: Request) {
  try {
    // Optional: Add authentication check
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REFRESH_TOKEN

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await fetchGitHubData()

    return NextResponse.json({
      success: true,
      message: `Fetched ${result.count} GitHub commits`,
      count: result.count,
    })
  } catch (error) {
    console.error('Error refreshing GitHub data:', error)
    return NextResponse.json(
      { error: 'Failed to refresh GitHub data' },
      { status: 500 }
    )
  }
}

// Disable caching for this route
export const revalidate = 0
