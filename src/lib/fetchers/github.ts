import { supabaseAdmin } from '@/lib/supabase'
import { logInfo, logError } from '@/lib/logger'

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

const MAX_REPOSITORIES = 10

export async function fetchGitHubData() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME

  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    throw new Error('GitHub credentials not configured')
  }

  try {
    const headers: HeadersInit = {
      Authorization: `token ${GITHUB_TOKEN}`,
      'User-Agent': 'GitHub-Portfolio-Fetcher',
      Accept: 'application/vnd.github.v3+json',
    }

    // Fetch repositories sorted by last push date (most recent first)
    logInfo('GitHub', `Fetching repositories for ${GITHUB_USERNAME}...`)

    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=${MAX_REPOSITORIES}`,
      { headers }
    )

    if (!reposResponse.ok) {
      if (reposResponse.status === 403) {
        const resetTime = reposResponse.headers.get('x-ratelimit-reset')
        const resetDate = new Date(parseInt(resetTime || '0') * 1000)
        throw new Error(
          `GitHub API rate limit exceeded. Rate limit resets at: ${resetDate.toLocaleString()}`
        )
      }
      throw new Error(
        `GitHub API error: ${reposResponse.status} - ${reposResponse.statusText}`
      )
    }

    const repos: GitHubRepo[] = await reposResponse.json()

    if (!Array.isArray(repos)) {
      throw new Error('GitHub API did not return an array of repositories')
    }

    if (repos.length === 0) {
      logInfo('GitHub', 'No repositories found')
      return { count: 0, data: [] }
    }

    logInfo('GitHub', `Fetched ${repos.length} repositories`)

    // Fetch commits for each repo
    const commitsData = await Promise.all(
      repos.map(async (repo) => {
        try {
          logInfo('GitHub', `Fetching commits for ${repo.name}...`)

          const commitsResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
            { headers }
          )

          if (!commitsResponse.ok) {
            logError('GitHub', `Failed to fetch commits for ${repo.name}`)
            // Return repo info with fallback commit message
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
        } catch (error) {
          logError('GitHub', `Error fetching commits for ${repo.name}`)
          return null
        }
      })
    )

    // Filter out null values
    const validCommits = commitsData.filter((commit) => commit !== null)

    // Delete old data and insert new
    const { error: deleteError } = await supabaseAdmin
      .from('github_commits')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    if (deleteError) {
      logError('GitHub', `Error deleting old commits: ${deleteError.message}`)
    }

    const { error: insertError } = await supabaseAdmin
      .from('github_commits')
      .insert(validCommits)

    if (insertError) {
      logError('GitHub', `Error inserting commits: ${insertError.message}`)
      throw insertError
    }

    logInfo('GitHub', `Successfully stored ${validCommits.length} GitHub commits`)
    return { count: validCommits.length, data: validCommits }
  } catch (error) {
    logError('GitHub', error)
    throw error
  }
}
