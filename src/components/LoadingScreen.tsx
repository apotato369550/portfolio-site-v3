'use client';

import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a brief delay
    const textTimer = setTimeout(() => setShowText(true), 500);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Wait a bit after reaching 100% before completing
          setTimeout(() => onLoadingComplete(), 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearTimeout(textTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      {/* Background Grid */}
      <div className="loading-grid">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="grid-line" style={{
            left: `${(i * 5) + Math.random() * 3}%`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1">
          <svg viewBox="0 0 100 100" className="triangle">
            <polygon points="50,10 90,90 10,90" />
          </svg>
        </div>
        <div className="shape shape-2">
          <svg viewBox="0 0 100 100" className="circle">
            <circle cx="50" cy="50" r="35" />
          </svg>
        </div>
        <div className="shape shape-3">
          <svg viewBox="0 0 100 100" className="square">
            <rect x="15" y="15" width="70" height="70" />
          </svg>
        </div>
        <div className="shape shape-4">
          <svg viewBox="0 0 100 100" className="hexagon">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="loading-content">
        {/* Logo/Brand */}
        <div className="loading-logo">
          <h1 className="logo-text">
            <span className="logo-j">J</span>
            <span className="logo-a">A</span>
            <span className="logo-y">Y</span>
            <span className="logo-dot">.</span>
          </h1>
        </div>

        {/* Loading Text */}
        <div className={`loading-text ${showText ? 'show' : ''}`}>
          <div className="text-line">
            <span className="text-word">Brewing coffee...</span>
          </div>
          <div className="text-line">
            <span className="text-word">Booting up...</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Animated Dots */}
        <div className="loading-dots">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </div>

      {/* Glitch Effect Overlay */}
      <div className="glitch-overlay">
        <div className="glitch-line glitch-1"></div>
        <div className="glitch-line glitch-2"></div>
        <div className="glitch-line glitch-3"></div>
      </div>

      {/* Scan Lines */}
      <div className="scan-lines">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="scan-line" style={{
            top: `${i * 10}%`,
            animationDelay: `${i * 0.1}s`
          }} />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;