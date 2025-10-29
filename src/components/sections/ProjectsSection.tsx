'use client'

import { useEffect, useState } from 'react'
import './ProjectsSection.css'

export default function ProjectsSection() {
  const [commits, setCommits] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commitsRes, projectsRes] = await Promise.all([
          fetch('/api/recent-commits'),
          fetch('/api/recent-projects'),
        ])

        const commitsData = await commitsRes.json()
        const projectsData = await projectsRes.json()

        setCommits(commitsData)
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div className="projects-content">
            <div className="commits-grid">
              {commits.map((commit: any) => (
                <div key={commit.id} className="card">
                  <h3>{commit.name}</h3>
                  <p>{commit.description}</p>
                  <p className="commit-message">{commit.last_commit_message}</p>
                  <a href={commit.url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
