import React from "react";
import "./Hero.css";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <div
      id="hero"
      className="h-screen w-screen m-0 p-0 relative overflow-hidden"
    >
      <div className="hero-image-container h-full w-full m-0 p-0">
        {/* Floating Decorative Elements */}
        <div className="floating-ellipse ellipse-1"></div>
        <div className="floating-ellipse ellipse-2"></div>
        <div className="floating-ellipse ellipse-3"></div>
        <div className="floating-ellipse ellipse-4"></div>
        <div className="floating-star star-1"></div>
        <div className="floating-star star-2"></div>
        <div className="floating-star star-3"></div>
        <div className="floating-star star-4"></div>
        <div className="floating-wireframe wireframe-1"></div>
        <div className="floating-wireframe wireframe-2"></div>
        <div className="floating-wireframe wireframe-3"></div>
        <div className="floating-wireframe wireframe-4"></div>
        <div className="shimmer-effect shimmer-1"></div>
        <div className="shimmer-effect shimmer-2"></div>
        <div className="shimmer-effect shimmer-3"></div>
        <div className="shimmer-effect shimmer-4"></div>
        <div className="floating-cube cube-1"></div>
        <div className="floating-cube cube-2"></div>

        <div className="hero-container h-full w-full m-0 p-0 flex flex-col">
          <Navbar />
          <div className="name-and-titles-container w-full flex-1 flex items-center justify-center">
            <div className="name-and-titles text-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <p className="greeting rainbow-glow text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl m-0 mb-6 font-light">
                Hi! I'm
              </p>
              <div className="jay-container relative inline-block mb-12">
                <div className="jay-glow absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 opacity-80 blur-xl transform scale-110"></div>
                <h1 className="jay text-9xl sm:text-10xl md:text-11xl lg:text-12xl xl:text-13xl 2xl:text-14xl m-0 p-0 leading-none relative z-10 text-white font-bold">
                  JAY.
                </h1>
              </div>
              <div className="name-and-roles space-y-4">
                <span className="name text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl m-0 text-white font-bold block">
                  <strong className="text-white">J</strong>ohn{" "}
                  <strong className="text-white">A</strong>ndre{" "}
                  <strong className="text-white">Y</strong>ap
                </span>
                <p className="roles text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl m-0 text-white font-normal">
                  Fullstack Developer - Data Scientist
                </p>
                <p className="roles text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl m-0 text-white font-normal">
                  Student - Scholar - Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;