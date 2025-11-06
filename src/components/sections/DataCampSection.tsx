'use client';

import React, { useState, useEffect } from 'react';
import './DataCampSection.css';

const DataCampSection = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get image filename from project title
  const getImageName = (title: string) => {
    const imageMap: { [key: string]: string } = {
      'Assessing Customer Churn Using Machine Learning': 'customer_churn.jpg',
      'Predicting Credit Card Approvals': 'credit_card_approvals.webp',
      'Hypothesis Testing in Healthcare': 'hypothesis_healthcare.jpg',
      'Predicting Movie Rental Durations': 'movie_rental_durations.jpg',
      'Clustering Antarctic Penguin Species': 'antarctic_penguin_species.jpg'
    };
    return imageMap[title] || 'default.jpg';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch projects
        const projectsResponse = await fetch('/api/datacamp-projects');
        if (!projectsResponse.ok) {
          throw new Error('Failed to fetch DataCamp projects');
        }
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

        // Fetch courses and certificates
        const coursesResponse = await fetch('/api/datacamp-courses');
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch DataCamp courses');
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

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
      <div id="datacamp-section" className="min-h-screen">
        <div className="datacamp-gradient-container h-full w-full m-0 p-0 relative">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-white text-xl">Loading DataCamp projects and courses</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="datacamp-section" className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div id="datacamp-section" className="m-0 p-0 w-full relative overflow-hidden min-h-screen">
      <div className="datacamp-gradient-container h-full w-full m-0 p-0 relative">

        {/* Floating vaporwave elements */}
        <div className="datacamp-floating-elements absolute inset-0 z-1">
          <div className="datacamp-ellipse datacamp-ellipse-1 absolute rounded-full transform rotate-30"></div>
          <div className="datacamp-ellipse datacamp-ellipse-2 absolute rounded-full transform -rotate-15"></div>
          <div className="datacamp-ellipse datacamp-ellipse-3 absolute rounded-full transform rotate-45"></div>

          <div className="datacamp-star datacamp-star-1 absolute w-4 h-4 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>
          <div className="datacamp-star datacamp-star-2 absolute w-3 h-3 bg-purple-400 rounded-full blur-sm animate-pulse"></div>
          <div className="datacamp-star datacamp-star-3 absolute w-5 h-5 bg-pink-400 rounded-full blur-sm animate-pulse"></div>

          <svg className="datacamp-wireframe datacamp-wireframe-1 absolute w-24 h-24" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" className="datacamp-wireframe-shape" />
          </svg>
          <svg className="datacamp-wireframe datacamp-wireframe-2 absolute w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" className="datacamp-wireframe-shape" />
          </svg>
        </div>

        <div className="datacamp-container relative z-10">

          {/* Title with vaporwave flair */}
          <div className="datacamp-title mb-8 sm:mb-10 md:mb-12">
            <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
              <span className="datacamp-emphasis font-extralight italic">DataCamp</span> Projects
            </h1>
          </div>

          {/* Projects Grid */}
          <div className="datacamp-grid mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-6 sm:mb-8 font-light">My Data Science Adventures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <div key={index} className="datacamp-card glass-morphism p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                  <img
                    src={`/datacamp-images/${getImageName(project.project_title)}`}
                    alt={project.project_title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    onError={(e: any) => {
                      e.target.src = '/datacamp-images/default.jpg';
                    }}
                  />
                  <h3 className="text-xl text-white mb-2">{project.project_title}</h3>
                  <p className="text-gray-300 mb-4">{project.project_description}</p>
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View Project &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Courses and Certificates Grid */}
          <div className="datacamp-grid mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-6 sm:mb-8 font-light">Courses & Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {courses.map((course, index) => (
                <div key={index} className="datacamp-card glass-morphism p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl text-white mb-2">{course.course_title}</h3>
                  <p className="text-gray-300 mb-4">{course.course_description}</p>
                  <p className="text-gray-400 mb-4">Completed: {course.date_completed}</p>
                  <div className="flex space-x-4">
                    <a
                      href={course.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Certificate &rarr;
                    </a>
                    {course.image_url && (
                      <a
                        href={course.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Download PDF &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DataCampSection;
