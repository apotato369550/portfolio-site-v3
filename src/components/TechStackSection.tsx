import React from "react";
import "./TechStackSection.css";

// languages and frameworks
import htmlImage from "../assets/TechStackSection/html_5_photo.png";
import cssImage from "../assets/TechStackSection/css_photo.png";
import jsImage from "../assets/TechStackSection/js_photo.png";

import mongodbImage from "../assets/TechStackSection/mongodb.png";
import expressJsImage from "../assets/TechStackSection/express.js.png";
import reactImage from "../assets/TechStackSection/circle_react.png";
import nodeJsImage from "../assets/TechStackSection/node.js.png";
import pythonImage from "../assets/TechStackSection/python.png";

// tools and platforms
import githubImage from "../assets/TechStackSection/github-logo.png";
import firebaseImage from "../assets/TechStackSection/firebase logo.png";
import jupyterImage from "../assets/TechStackSection/Jupyter_logo.svg.png";
import figmaImage from "../assets/TechStackSection/figma.png";
import gitImage from "../assets/TechStackSection/git logo.png";

// things i'm exploring
import cImage from "../assets/TechStackSection/c_logo.png";
import scikitlearnImage from "../assets/TechStackSection/scikitlearn logo.png";

const TechStackSection = () => {
  return (
    <div
      id="tech-stack-section"
      className="m-0 p-0 w-full relative overflow-hidden"
    >
      <div className="tech-stack-gradient-container h-full w-full m-0 p-0">
        {/* Floating Crystal Elements */}
        <div className="tech-floating-crystals absolute inset-0 z-1">
          <div className="tech-crystal tech-crystal-1 absolute w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-xl transform rotate-45 blur-sm"></div>
          <div className="tech-crystal tech-crystal-2 absolute w-16 h-16 bg-gradient-to-br from-purple-400/30 to-transparent rounded-xl transform rotate-12 blur-sm"></div>
          <div className="tech-crystal tech-crystal-3 absolute w-24 h-10 bg-gradient-to-br from-pink-400/30 to-transparent rounded-xl transform -rotate-30 blur-sm"></div>
          <div className="tech-crystal tech-crystal-4 absolute w-18 h-18 bg-gradient-to-br from-blue-400/30 to-transparent rounded-xl transform rotate-60 blur-sm"></div>
          <div className="tech-crystal tech-crystal-5 absolute w-14 h-14 bg-gradient-to-br from-cyan-300/25 to-transparent rounded-xl transform -rotate-45 blur-sm"></div>
        </div>

        {/* Wireframe Geometric Elements */}
        <div className="tech-wireframe-elements absolute inset-0 z-2 pointer-events-none">
          <svg className="tech-wireframe tech-wireframe-1 absolute w-28 h-28" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" className="tech-wireframe" />
          </svg>
          <svg className="tech-wireframe tech-wireframe-2 absolute w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" className="tech-wireframe" />
          </svg>
          <svg className="tech-wireframe tech-wireframe-3 absolute w-20 h-20" viewBox="0 0 100 100">
            <rect x="15" y="15" width="70" height="70" className="tech-wireframe" />
          </svg>
          <svg className="tech-wireframe tech-wireframe-4 absolute w-22 h-22" viewBox="0 0 100 100">
            <polygon points="50,20 80,40 80,80 20,80 20,40" className="tech-wireframe" />
          </svg>
        </div>

        {/* Enhanced Ellipse Effects */}
        <div className="tech-ellipse tech-ellipse-1 absolute rounded-full transform rotate-30"></div>
        <div className="tech-ellipse tech-ellipse-2 absolute rounded-full transform -rotate-15"></div>
        <div className="tech-ellipse tech-ellipse-3 absolute rounded-full transform rotate-45"></div>

        {/* Glowing Orbs */}
        <div className="tech-orb tech-orb-1 w-5 h-5 bg-cyan-400 rounded-full blur-sm"></div>
        <div className="tech-orb tech-orb-2 w-4 h-4 bg-purple-400 rounded-full blur-sm"></div>
        <div className="tech-orb tech-orb-3 w-6 h-6 bg-pink-400 rounded-full blur-sm"></div>
        <div className="tech-orb tech-orb-4 w-3 h-3 bg-blue-400 rounded-full blur-sm"></div>

        <div className="tech-stack-container">
          {/* Title Section */}
          <div className="tech-stack-title px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 lg:px-12 lg:py-8">
            <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
              <span className="question-emphasis font-extralight italic">What</span> do I work with?
            </h1>
          </div>

          {/* Tech Categories Grid */}
          <div className="tech-categories-grid">
            {/* Languages and Frameworks */}
            <div className="tech-category-card languages-frameworks">
              <h2 className="tech-category-title text-xl sm:text-2xl lg:text-3xl">
                Languages and Frameworks
              </h2>
              <div className="tech-icons-container">
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={htmlImage.src}
                    alt="HTML5"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={cssImage.src}
                    alt="CSS3"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={jsImage.src}
                    alt="JavaScript"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={mongodbImage.src}
                    alt="MongoDB"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={expressJsImage.src}
                    alt="Express.js"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={reactImage.src}
                    alt="React"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={nodeJsImage.src}
                    alt="Node.js"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={pythonImage.src}
                    alt="Python"
                  />
                </div>
              </div>
            </div>

            {/* Tools and Platforms */}
            <div className="tech-category-card tools-platforms">
              <h2 className="tech-category-title text-xl sm:text-2xl lg:text-3xl">
                Tools and Platforms
              </h2>
              <div className="tech-icons-container">
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={githubImage.src}
                    alt="GitHub"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={firebaseImage.src}
                    alt="Firebase"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={jupyterImage.src}
                    alt="Jupyter"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={figmaImage.src}
                    alt="Figma"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={gitImage.src}
                    alt="Git"
                  />
                </div>
              </div>
            </div>

            {/* Currently Exploring */}
            <div className="tech-category-card exploring">
              <h2 className="tech-category-title text-xl sm:text-2xl lg:text-3xl">
                Currently Exploring
              </h2>
              <div className="tech-icons-container">
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={cImage.src}
                    alt="C Programming"
                  />
                </div>
                <div className="tech-icon-container">
                  <img
                    className="tech-stack-icon"
                    src={scikitlearnImage.src}
                    alt="Scikit-learn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackSection;