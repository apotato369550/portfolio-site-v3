import { NextResponse } from 'next/server'

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  pushed_at: string
}

interface GitHubCommit {
  commit: {
    message: string
    author: {
      date: string
    }
  }
}

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME

  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    // Return empty array instead of error so site still works
    console.warn('GitHub credentials not configured - returning empty commits')
    return NextResponse.json([])
  }

  try {
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      'User-Agent': 'GitHub-Portfolio-Fetcher',
      Accept: 'application/vnd.github.v3+json',
    }

    // Fetch recent repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=10`,
      { headers }
    )

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.statusText}`)
    }

    const repos: GitHubRepo[] = await reposResponse.json()

    // Fetch latest commit for each repo
    const commitsData = await Promise.all(
      repos.map(async (repo) => {
        try {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
            { headers }
          )

          if (!commitsResponse.ok) {
            return {
              name: repo.name,
              description: repo.description || 'No description',
              last_commit_message: 'Could not fetch latest commit',
              date: repo.pushed_at,
              url: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language || 'Unknown',
            }
          }

          const commits: GitHubCommit[] = await commitsResponse.json()
          const lastCommit = commits[0]

          return {
            name: repo.name,
            description: repo.description || 'No description',
            last_commit_message: lastCommit?.commit?.message || 'No commits',
            date: lastCommit?.commit?.author?.date || repo.pushed_at,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'Unknown',
          }
        } catch {
          return null
        }
      })
    )

    // Filter out failed fetches
    const validCommits = commitsData.filter((commit) => commit !== null)

    return NextResponse.json(validCommits)
  } catch (error) {
    console.error('Error fetching GitHub commits:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error
    })
    // Return empty array instead of error so site still works
    console.warn('GitHub API failed - returning empty commits (check your GITHUB_TOKEN)')
    return NextResponse.json([])
  }
}

// Cache for 1 hour (GitHub data changes frequently)
export const revalidate = 3600
