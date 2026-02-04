'use client';

import React, { useState, useEffect } from 'react';
import './ProjectsSection.css';
import GitHubCalendar from 'react-github-calendar';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [commits, setCommits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vaporwave theme for GitHub calendar
  const vaporwaveTheme = {
    light: ['rgba(255,0,128,0.1)', 'rgba(57,217,253,0.3)', 'rgba(255,0,128,0.6)', '#ff00ff', '#4c1d95']
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsRes, commitsRes] = await Promise.all([
          fetch('/api/recent-projects'),
          fetch('/api/recent-commits')
        ]);

        if (!projectsRes.ok || !commitsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const projectsData = await projectsRes.json();
        const commitsData = await commitsRes.json();

        setProjects(projectsData);
        setCommits(commitsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div id="projects-section" className="min-h-screen">
        <div className="projects-gradient-container h-full w-full m-0 p-0 relative">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-white text-xl">Loading projects and activity data</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="projects-section" className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div id="projects-section" className="m-0 p-0 w-full relative overflow-hidden min-h-screen">
      <div className="projects-gradient-container h-full w-full m-0 p-0 relative">

        {/* Floating Elements */}
        <div className="projects-floating-elements absolute inset-0 z-1">
          <div className="projects-ellipse projects-ellipse-1 absolute rounded-full transform rotate-30"></div>
          <div className="projects-ellipse projects-ellipse-2 absolute rounded-full transform -rotate-15"></div>
          <div className="projects-ellipse projects-ellipse-3 absolute rounded-full transform rotate-45"></div>

          <div className="projects-star projects-star-1 absolute w-4 h-4 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>
          <div className="projects-star projects-star-2 absolute w-3 h-3 bg-purple-400 rounded-full blur-sm animate-pulse"></div>
          <div className="projects-star projects-star-3 absolute w-5 h-5 bg-pink-400 rounded-full blur-sm animate-pulse"></div>

          <svg className="projects-wireframe projects-wireframe-1 absolute w-24 h-24" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" className="projects-wireframe-shape" />
          </svg>
          <svg className="projects-wireframe projects-wireframe-2 absolute w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" className="projects-wireframe-shape" />
          </svg>
        </div>

        <div className="projects-container relative z-10">

          {/* Title */}
          <div className="projects-title mb-8 sm:mb-10 md:mb-12">
            <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
              <span className="question-emphasis font-extralight italic">What</span> have I been working on?
            </h1>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-6 sm:mb-8 font-light">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <div key={index} className="project-card glass-morphism p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                  <img
                    src={`/api/projects/images/${project.image.split('/').pop()}`}
                    alt={project.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl text-white mb-2">{project.name}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.map((tech: any, techIndex: number) => (
                      <span key={techIndex} className="tech-tag bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    View on GitHub &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Commits Section */}
          <div className="commits-section mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-6 sm:mb-8 font-light">Recent Commits</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Commit Calendar Placeholder */}
              <div className="commit-calendar glass-morphism p-6 rounded-xl">
                <h3 className="text-xl text-white mb-4">Commit Activity</h3>
                <div className="github-calendar-vaporwave">
                  <GitHubCalendar username="apotato369550" theme={vaporwaveTheme} maxLevel={4} />
                </div>
              </div>

              {/* Recent Commits List */}
              <div className="recent-commits glass-morphism p-6 rounded-xl">
                <h3 className="text-xl text-white mb-4">Latest Commits</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {commits.slice(0, 10).map((commit, index) => (
                    <div key={index} className="commit-item border-b border-gray-600 pb-3 last:border-b-0">
                      <div className="text-white font-medium">{commit.name}</div>
                      <div className="commit-message text-gray-300 text-sm">{commit.last_commit_message}</div>
                      <div className="text-gray-400 text-xs">{commit.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
