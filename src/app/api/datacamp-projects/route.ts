import { NextResponse } from 'next/server'
import datacampProjects from '@/data/datacamp-projects.json'

export async function GET() {
  try {
    // Return static data from JSON file
    return NextResponse.json(datacampProjects)
  } catch (error) {
    console.error('Error fetching DataCamp projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// Cache for 1 hour since data is static
export const revalidate = 3600
