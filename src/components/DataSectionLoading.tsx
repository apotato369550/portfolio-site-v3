'use client';

import React, { useState, useEffect } from 'react';
import './DataSectionLoading.css';

const DataSectionLoading = ({ message = "Loading data..." }: { message?: string }) => {
  const [dots, setDots] = useState('');
  const [currentShape, setCurrentShape] = useState(0);

  useEffect(() => {
    // Animated dots effect
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Shape rotation effect
    const shapeInterval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % 4);
    }, 2000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(shapeInterval);
    };
  }, []);

  const shapes = [
    <polygon points="50,10 90,90 10,90" />, // triangle
    <circle cx="50" cy="50" r="35" />, // circle
    <rect x="15" y="15" width="70" height="70" />, // square
    <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" /> // hexagon
  ];

  return (
    <div className="data-section-loading">
      {/* Animated background elements */}
      <div className="loading-bg-elements">
        <div className="bg-ellipse bg-ellipse-1"></div>
        <div className="bg-ellipse bg-ellipse-2"></div>
        <div className="bg-star bg-star-1"></div>
        <div className="bg-star bg-star-2"></div>
        <div className="bg-wireframe bg-wireframe-1">
          <svg viewBox="0 0 100 100">
            {shapes[currentShape]}
          </svg>
        </div>
      </div>

      {/* Main loading content */}
      <div className="loading-content-center">
        {/* Animated geometric shape */}
        <div className="loading-shape-container">
          <svg viewBox="0 0 100 100" className="loading-main-shape">
            {shapes[currentShape]}
          </svg>
        </div>

        {/* Loading text with vaporwave styling */}
        <div className="loading-text-container">
          <h3 className="loading-message">
            {message}
            <span className="loading-dots">{dots}</span>
          </h3>
          <div className="loading-sublabel">
            Establishing connection to server...
          </div>
        </div>

        {/* Progress indicators */}
        <div className="loading-indicators">
          <div className="progress-bar-mini">
            <div className="progress-fill-mini"></div>
          </div>
          <div className="pulse-dots">
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
          </div>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="scan-line-effect"></div>
    </div>
  );
};

export default DataSectionLoading;