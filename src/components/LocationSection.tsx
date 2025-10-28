import React from "react";
import "./LocationSection.css";
import treeImage from "../assets/LocationSection/vaporwave trees.png";
import cebuImage from "../assets/LocationSection/cebu_cropped_nobg.png";

const LocationSection = () => {
  return (
    <div
      id="location-section"
      className="m-0 p-0 w-full relative overflow-hidden"
    >
      <div className="location-gradient-container h-full w-full m-0 p-0">
        {/* Floating Crystal Elements */}
        <div className="floating-crystals absolute inset-0 z-1">
          <div className="crystal crystal-1 absolute w-16 h-16 bg-gradient-to-br from-cyan-400/25 to-transparent rounded-lg transform rotate-45 blur-sm"></div>
          <div className="crystal crystal-2 absolute w-12 h-12 bg-gradient-to-br from-purple-400/25 to-transparent rounded-lg transform rotate-12 blur-sm"></div>
          <div className="crystal crystal-3 absolute w-20 h-8 bg-gradient-to-br from-pink-400/25 to-transparent rounded-lg transform -rotate-30 blur-sm"></div>
          <div className="crystal crystal-4 absolute w-14 h-14 bg-gradient-to-br from-blue-400/25 to-transparent rounded-lg transform rotate-60 blur-sm"></div>
        </div>

        {/* Wireframe Geometric Elements */}
        <div className="wireframe-elements absolute inset-0 z-2 pointer-events-none">
          <svg className="wireframe wireframe-1 absolute w-24 h-24" viewBox="0 0 100 100">
            <polygon points="50,15 90,85 10,85" className="wireframe" />
          </svg>
          <svg className="wireframe wireframe-2 absolute w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" className="wireframe" />
          </svg>
          <svg className="wireframe wireframe-3 absolute w-16 h-16" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" className="wireframe" />
          </svg>
        </div>

        {/* Glowing Orbs */}
        <div className="location-orb location-orb-1 w-4 h-4 bg-cyan-400 rounded-full blur-sm"></div>
        <div className="location-orb location-orb-2 w-3 h-3 bg-purple-400 rounded-full blur-sm"></div>
        <div className="location-orb location-orb-3 w-5 h-5 bg-pink-400 rounded-full blur-sm"></div>

        <div className="location-container relative z-10">
          {/* Tree Background */}
          <div className="tree-background">
            <img
              className="tree"
              src={treeImage.src}
              alt="Vaporwave palm trees"
            />
          </div>

          {/* Left Side - Cebu Image Only */}
          <div className="images-section relative">
            {/* Enhanced Ellipse Effects */}
            <div className="location-ellipse location-ellipse-1 absolute rounded-full transform rotate-30"></div>
            <div className="location-ellipse location-ellipse-2 absolute rounded-full transform -rotate-15"></div>
            <div className="location-ellipse location-ellipse-3 absolute rounded-full transform rotate-45"></div>

            <div className="cebu-container">
              <div className="cebu-image flex justify-center">
                <img
                  className="cebu w-65 sm:w-75 lg:w-85 xl:w-[23rem] h-auto relative z-20"
                  src={cebuImage.src}
                  alt="Cebu cityscape"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Grid Layout */}
          <div className="content-section">
            {/* Question Row */}
            <div className="questions-row grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div className="location-title px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-2xl">
                <h2 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  <span className="question-emphasis font-extralight italic">Where</span> am I located?
                </h2>
              </div>
              <div className="location-title px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-2xl">
                <h2 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  <span className="question-emphasis font-extralight italic">Where</span> am I studying?
                </h2>
              </div>
            </div>

            {/* Answer Row */}
            <div className="answers-row grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mt-4">
              <div className="compact-answer">
                <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed">
                  Currently coding life away in sunny <em className="text-cyan-200 font-medium">Cebu</em>,
                  at the center of <em className="text-cyan-200 font-medium">Visayas, Philippines</em>
                </p>
              </div>
              <div className="compact-answer">
                <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed">
                  Currently studying Computer Science at{" "}
                  <em className="text-purple-200 font-medium">The University of San Carlos</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;