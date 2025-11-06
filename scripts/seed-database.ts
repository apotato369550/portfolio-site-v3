import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedDatabase() {
  try {
    // Read JSON files from original project's server/data directory
    const dataDir = path.join(__dirname, '../../portfolio-site-v2/server/data')

    // Seed GitHub commits
    const githubCommitsPath = path.join(dataDir, 'github_commits.json')
    if (fs.existsSync(githubCommitsPath)) {
      const githubCommits = JSON.parse(fs.readFileSync(githubCommitsPath, 'utf-8'))
      const { error: commitsError } = await supabase
        .from('github_commits')
        .insert(githubCommits)
      if (commitsError) {
        console.error('Error seeding commits:', commitsError)
      } else {
        console.log('✓ GitHub commits seeded')
      }
    }

    // Seed GitHub projects
    const projectsPath = path.join(dataDir, 'projects.json')
    if (fs.existsSync(projectsPath)) {
      const githubProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'))
      const { error: projectsError } = await supabase
        .from('github_projects')
        .insert(githubProjects)
      if (projectsError) {
        console.error('Error seeding projects:', projectsError)
      } else {
        console.log('✓ GitHub projects seeded')
      }
    }

    // Seed LeetCode submissions
    const leetcodePath = path.join(dataDir, 'leetcode_submission.json')
    if (fs.existsSync(leetcodePath)) {
      const leetcodeSubmissions = JSON.parse(fs.readFileSync(leetcodePath, 'utf-8'))
      const { error: leetcodeError } = await supabase
        .from('leetcode_submissions')
        .insert(leetcodeSubmissions)
      if (leetcodeError) {
        console.error('Error seeding leetcode:', leetcodeError)
      } else {
        console.log('✓ LeetCode submissions seeded')
      }
    }

    // Seed DataCamp courses
    const coursesPath = path.join(dataDir, 'courses_and_certs.json')
    if (fs.existsSync(coursesPath)) {
      const datacampCourses = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'))
      const { error: coursesError } = await supabase
        .from('datacamp_courses')
        .insert(datacampCourses)
      if (coursesError) {
        console.error('Error seeding courses:', coursesError)
      } else {
        console.log('✓ DataCamp courses seeded')
      }
    }

    // Seed DataCamp projects
    const datacampProjectsPath = path.join(dataDir, 'datacamp_projects.json')
    if (fs.existsSync(datacampProjectsPath)) {
      const datacampProjects = JSON.parse(fs.readFileSync(datacampProjectsPath, 'utf-8'))
      const { error: datacampProjectsError } = await supabase
        .from('datacamp_projects')
        .insert(datacampProjects)
      if (datacampProjectsError) {
        console.error('Error seeding datacamp projects:', datacampProjectsError)
      } else {
        console.log('✓ DataCamp projects seeded')
      }
    }

    console.log('\n✓ Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
