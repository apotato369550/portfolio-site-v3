import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('github_commits')
      .select('*')
      .order('date', { ascending: false })
      .limit(10)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching GitHub commits:', error)
    return NextResponse.json(
      { error: 'Failed to fetch commits' },
      { status: 500 }
    )
  }
}

// Revalidate every hour
export const revalidate = 3600
