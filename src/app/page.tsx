'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import Hero from '@/components/sections/Hero'
import IdentitySection from '@/components/sections/IdentitySection'
import LocationSection from '@/components/sections/LocationSection'
import TechStackSection from '@/components/sections/TechStackSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import DataCampSection from '@/components/sections/DataCampSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Minimum loading time of 3 seconds
    const minLoadingTime = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
        setShowContent(true)
      }
    }, 3000)

    return () => clearTimeout(minLoadingTime)
  }, [isLoading])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setShowContent(true)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className={`app-container ${showContent ? 'fade-in' : ''}`}>
      <Hero />
      <IdentitySection />
      <LocationSection />
      <TechStackSection />
      <ProjectsSection />
      <DataCampSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
