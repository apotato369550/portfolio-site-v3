'use client'

import './IdentitySection.css'

export default function IdentitySection() {
  return (
    <div
      id="identity-section"
      className="m-0 p-0 h-screen w-full relative overflow-hidden"
    >
      <div className="identity-gradient-container h-full w-full m-0 p-0">
        {/* Side-by-side house pillars */}
        <img src="/assets/IdentitySection/new_pillar.png" alt="pillar left" className="side-pillar side-pillar-left" />
        <img src="/assets/IdentitySection/new_pillar.png" alt="pillar right" className="side-pillar side-pillar-right" />

        {/* Night Sky Stars Background */}
        <div className="stars-container absolute inset-0 z-1">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`star star-${i % 4} absolute bg-white rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="floating-shapes absolute inset-0 z-1">
          <div className="shape shape-1 absolute w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-sm"></div>
          <div className="shape shape-2 absolute w-24 h-24 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-sm"></div>
          <div className="shape shape-3 absolute w-40 h-20 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-full blur-sm"></div>
          <div className="shape shape-4 absolute w-16 h-32 bg-gradient-to-br from-blue-400/20 to-pink-400/20 rounded-full blur-sm"></div>
        </div>

        <div className="identity-container h-full w-full m-0 p-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="max-w-screen-2xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Statue with Enhanced Background Elements */}
            <div className="statue-container w-full flex justify-center items-center relative z-10">
              <div className="statue-wrapper relative w-[95%] sm:w-[90%] lg:w-[85%] max-w-3xl">
                {/* Enhanced Ellipse Effects - More Prominent */}
                <div className="statue-ellipse statue-ellipse-1 absolute rounded-full z-10 transform rotate-30"></div>
                <div className="statue-ellipse statue-ellipse-2 absolute rounded-full z-10 transform rotate-160"></div>
                <div className="statue-ellipse statue-ellipse-3 absolute rounded-full z-10 transform rotate-90"></div>
                <div className="statue-ellipse statue-ellipse-4 absolute rounded-full z-10 transform -rotate-12"></div>
                <div className="statue-ellipse statue-ellipse-5 absolute rounded-full z-10 transform rotate-6"></div>

                {/* Enhanced Glowing Orbs */}
                <div className="glow-orb orb-1 absolute w-3 h-3 bg-cyan-400 rounded-full blur-sm"></div>
                <div className="glow-orb orb-2 absolute w-2.5 h-2.5 bg-purple-400 rounded-full blur-sm"></div>
                <div className="glow-orb orb-3 absolute w-2 h-2 bg-pink-400 rounded-full blur-sm"></div>

                <img
                  className="statue w-full mx-auto relative z-20 drop-shadow-2xl filter brightness-110"
                  src="/assets/IdentitySection/vaporwave statue.png"
                  alt="vaporwave statue image"
                />
              </div>
            </div>

            {/* Right Side - Larger Content with Prominent Side Pillars */}
            <div className="pillars-container w-full relative z-10">
              {/* Main Title with separate accent (outside boxes) */}
              <div className="title-section flex items-center justify-center lg:justify-start space-x-6 mb-6">
                <div className="identity-title px-10 py-8 rounded-3xl text-center lg:text-left">
                  <h1 className="font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight">
                    <span className="question-emphasis font-extralight italic">Who</span> am I, really?
                  </h1>
                </div>
              </div>

              {/* Larger Content Grid */}
              <div className="content-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                {/* First Content Card */}
                <div className="content-card identity-information-1 px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-8 lg:px-12 lg:py-10 rounded-3xl text-center transform hover:scale-105 transition-all duration-300 min-h-[200px] sm:min-h-[220px] lg:min-h-[260px]">
                  <h3 className="text-cyan-100 font-medium text-xl sm:text-2xl lg:text-3xl mb-4 tracking-wide">Curiosity</h3>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed">
                    I wouldn&apos;t be me if I weren&apos;t curious about everything. I&apos;m  fueled by a blend of curiosity, caffiene, and creativity. (Heavy on the caffiene part, tho). I love exploration.
                  </p>
                </div>

                {/* Second Content Card */}
                <div className="content-card identity-information-2 px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-8 lg:px-12 lg:py-10 rounded-3xl text-center transform hover:scale-105 transition-all duration-300 min-h-[200px] sm:min-h-[220px] lg:min-h-[260px]">
                  <h3 className="text-purple-100 font-medium text-xl sm:text-2xl lg:text-3xl mb-4 tracking-wide">Scholarly</h3>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed">
                    I combine my natural hunger for learning with precision and diligence. Whatever I endeavor to do, and in all that I learn, I do it thoroughly and I do it well.
                  </p>
                </div>

                {/* Third Content Card - Full Width */}
                <div className="content-card identity-information-3 md:col-span-2 px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-8 lg:px-12 lg:py-10 rounded-3xl text-center transform hover:scale-105 transition-all duration-300 min-h-[200px] sm:min-h-[220px] lg:min-h-[260px]">
                  <h3 className="text-pink-100 font-medium text-xl sm:text-2xl lg:text-3xl mb-4 tracking-wide">Passion</h3>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed">
                    Some would say I&apos;m a masochist at how I love putting myself through tough challenges. I see it as exercise (and I love exercise). Problem solving, critical thinking, building, analysis, architecture, anything that&apos;ll make my brain melt, I&apos;m here for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
