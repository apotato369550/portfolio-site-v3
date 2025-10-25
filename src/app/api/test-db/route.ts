import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('github_commits')
      .select('*')
      .limit(1)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      sampleData: data
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: String(error)
    }, { status: 500 })
  }
}
