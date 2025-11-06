'use client';

import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="w-full">
      <nav id="navbar" className="hidden lg:block w-full">
        <ul className="flex justify-between items-center mx-8 sm:mx-12 md:mx-16 lg:mx-20 xl:mx-24 2xl:mx-32 mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-20 list-none p-0">
          <li className="navbar-item">
            <a
              href="#hero"
              onClick={(e) => handleSmoothScroll(e, 'hero')}
              className="text-white no-underline text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#identity-section"
              onClick={(e) => handleSmoothScroll(e, 'identity-section')}
              className="text-white no-underline text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              About Me
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#tech-stack-section"
              onClick={(e) => handleSmoothScroll(e, 'tech-stack-section')}
              className="text-white no-underline text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              What I Work With
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#projects-section"
              onClick={(e) => handleSmoothScroll(e, 'projects-section')}
              className="text-white no-underline text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              What I'm Working On
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#contact-section"
              onClick={(e) => handleSmoothScroll(e, 'contact-section')}
              className="text-white no-underline text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light hover:text-cyan-300 transition-colors duration-300 relative group"
            >
              Reach Out To Me
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;