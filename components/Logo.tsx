
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#glow)">
        {/* Outer Hexagon */}
        <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" stroke="url(#logoGrad)" strokeWidth="6" fill="none" strokeLinejoin="round" />
        
        {/* Inner Node Graph */}
        <circle cx="50" cy="50" r="8" fill="url(#logoGrad)" />
        <circle cx="50" cy="25" r="5" fill="white" />
        <circle cx="28" cy="62" r="5" fill="white" />
        <circle cx="72" cy="62" r="5" fill="white" />
        
        {/* Connections */}
        <path d="M50 50 L50 25" stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 50 L28 62" stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 50 L72 62" stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round" />
    </g>
  </svg>
);
