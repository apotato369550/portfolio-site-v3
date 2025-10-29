'use client'

import { useEffect, useState } from 'react'
import './DataCampSection.css'

export default function DataCampSection() {
  const [courses, setCourses] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, projectsRes] = await Promise.all([
          fetch('/api/datacamp-courses'),
          fetch('/api/datacamp-projects'),
        ])

        const coursesData = await coursesRes.json()
        const projectsData = await projectsRes.json()

        setCourses(coursesData)
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching DataCamp data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section id="datacamp" className="datacamp-section">
      <div className="container">
        <h2 className="section-title">DataCamp</h2>
        {loading ? (
          <p>Loading DataCamp data...</p>
        ) : (
          <div className="datacamp-content">
            <div className="courses-grid">
              {courses.map((course: any) => (
                <div key={course.id} className="card">
                  <h3>{course.course_title}</h3>
                  <p>{course.course_description}</p>
                  <p className="date">Completed: {course.date_completed}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
