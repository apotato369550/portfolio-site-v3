'use client'

import './TechStackSection.css'

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="tech-stack-section">
      <div className="container">
        <h2 className="section-title">Tech Stack</h2>
        <div className="tech-stack-content">
          <div className="tech-category">
            <h3>Frontend</h3>
            <p>React, Next.js, TypeScript, Tailwind CSS</p>
          </div>
          <div className="tech-category">
            <h3>Backend</h3>
            <p>Node.js, Express, PostgreSQL, Supabase</p>
          </div>
          <div className="tech-category">
            <h3>Tools</h3>
            <p>Git, Docker, Vercel, VS Code</p>
          </div>
        </div>
      </div>
    </section>
  )
}
