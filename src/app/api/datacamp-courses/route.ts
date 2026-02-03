import { NextResponse } from 'next/server'
import datacampCourses from '@/data/datacamp-courses.json'

export async function GET() {
  try {
    // Return static data from JSON file
    return NextResponse.json(datacampCourses)
  } catch (error) {
    console.error('Error fetching DataCamp courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// Cache for 1 hour since data is static
export const revalidate = 3600
