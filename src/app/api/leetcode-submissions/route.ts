import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leetcode_submissions')
      .select('*')
      .order('submission_date', { ascending: false })
      .limit(10)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching LeetCode submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export const revalidate = 3600
