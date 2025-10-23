export interface GitHubCommit {
  id: string
  name: string
  description: string
  last_commit_message: string
  date: string
  url: string
  stars: number
  forks: number
  language?: string
}

export interface GitHubProject {
  id: string
  name: string
  description: string
  image: string
  github_url: string
  tech_stack: TechStack[]
}

export interface TechStack {
  name: string
  icon: string
}

export interface LeetCodeSubmission {
  id: string
  problem_name: string
  submission_date: string
  submission_status: string
}

export interface DataCampCourse {
  id: string
  course_title: string
  course_description: string
  date_completed: string
  certificate_url: string
  image_url: string
}

export interface DataCampProject {
  id: string
  project_title: string
  project_description: string
  project_image?: string
  project_url?: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
