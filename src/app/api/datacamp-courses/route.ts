import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

export async function GET() {
  try {
    // Return static data from JSON file
    const dataPath = path.join(process.cwd(), 'public/assets/data/datacamp-courses.json')
    const fileContent = fs.readFileSync(dataPath, 'utf-8')
    const datacampCourses = JSON.parse(fileContent)
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
