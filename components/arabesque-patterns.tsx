"use client"

import { useEffect, useRef } from "react"

export function ArabesquePatterns() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current) {
      // Add any interactive logic for the patterns if needed
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MENA-inspired zellij geometric patterns */}
        
        {/* Central intricate zellij mandala */}
        <g className="animate-rotate-slow opacity-40">
          {/* Outer star pattern */}
          <polygon
            points="600,300 620,360 680,360 630,395 650,455 600,420 550,455 570,395 520,360 580,360"
            stroke="url(#gradient1)"
            strokeWidth="3"
            fill="url(#gradient1-fill)"
            fillOpacity="0.1"
          />
          
          {/* Inner geometric star */}
          <polygon
            points="600,340 612,380 652,380 620,405 632,445 600,420 568,445 580,405 548,380 588,380"
            stroke="url(#gradient2)"
            strokeWidth="2.5"
            fill="url(#gradient2-fill)"
            fillOpacity="0.15"
          />
          
          {/* Center star */}
          <polygon
            points="600,370 606,390 626,390 610,402 616,422 600,410 584,422 590,402 574,390 594,390"
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="url(#gradient3-fill)"
            fillOpacity="0.2"
          />

          {/* Decorative circles */}
          <circle cx="600" cy="400" r="80" stroke="url(#gradient4)" strokeWidth="2" fill="none" />
          <circle cx="600" cy="400" r="100" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" strokeDasharray="5,5" />
          <circle cx="600" cy="400" r="120" stroke="url(#gradient2)" strokeWidth="1" fill="none" strokeDasharray="8,4" />
        </g>

        {/* Intricate zellij corner patterns */}
        <g className="animate-float-3d opacity-35">
          {/* Top left corner */}
          <path
            d="M50 50 L150 50 L150 70 L100 70 L100 120 L80 120 L80 70 L50 70 Z"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="url(#gradient1-fill)"
            fillOpacity="0.1"
          />
          <polygon
            points="100,100 110,120 130,120 115,135 120,155 100,145 80,155 85,135 70,120 90,120"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="url(#gradient2-fill)"
            fillOpacity="0.15"
          />
          
          {/* Top right corner */}
          <path
            d="M1150 50 L1050 50 L1050 70 L1100 70 L1100 120 L1120 120 L1120 70 L1150 70 Z"
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="url(#gradient3-fill)"
            fillOpacity="0.1"
          />
          <polygon
            points="1100,100 1110,120 1130,120 1115,135 1120,155 1100,145 1080,155 1085,135 1070,120 1090,120"
            stroke="url(#gradient4)"
            strokeWidth="2"
            fill="url(#gradient4-fill)"
            fillOpacity="0.15"
          />
          
          {/* Bottom left corner */}
          <path
            d="M50 750 L150 750 L150 730 L100 730 L100 680 L80 680 L80 730 L50 730 Z"
            stroke="url(#gradient4)"
            strokeWidth="2"
            fill="url(#gradient4-fill)"
            fillOpacity="0.1"
          />
          <polygon
            points="100,700 110,680 130,680 115,665 120,645 100,655 80,645 85,665 70,680 90,680"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="url(#gradient1-fill)"
            fillOpacity="0.15"
          />
          
          {/* Bottom right corner */}
          <path
            d="M1150 750 L1050 750 L1050 730 L1100 730 L1100 680 L1120 680 L1120 730 L1150 730 Z"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="url(#gradient2-fill)"
            fillOpacity="0.1"
          />
          <polygon
            points="1100,700 1110,680 1130,680 1115,665 1120,645 1100,655 1080,645 1085,665 1070,680 1090,680"
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="url(#gradient3-fill)"
            fillOpacity="0.15"
          />
        </g>

        {/* Islamic geometric stars - larger and more prominent */}
        <g className="animate-pulse-3d opacity-40">
          {/* Top stars */}
          <polygon
            points="250,150 265,185 305,185 275,210 290,245 250,220 210,245 225,210 195,185 235,185"
            stroke="url(#gradient1)"
            strokeWidth="2.5"
            fill="url(#gradient1-fill)"
            fillOpacity="0.15"
          />
          <polygon
            points="950,150 965,185 1005,185 975,210 990,245 950,220 910,245 925,210 895,185 935,185"
            stroke="url(#gradient2)"
            strokeWidth="2.5"
            fill="url(#gradient2-fill)"
            fillOpacity="0.15"
          />
          
          {/* Bottom stars */}
          <polygon
            points="250,650 265,615 305,615 275,590 290,555 250,580 210,555 225,590 195,615 235,615"
            stroke="url(#gradient3)"
            strokeWidth="2.5"
            fill="url(#gradient3-fill)"
            fillOpacity="0.15"
          />
          <polygon
            points="950,650 965,615 1005,615 975,590 990,555 950,580 910,555 925,590 895,615 935,615"
            stroke="url(#gradient4)"
            strokeWidth="2.5"
            fill="url(#gradient4-fill)"
            fillOpacity="0.15"
          />
        </g>

        {/* Zellij tile patterns - repeating geometric mosaic */}
        <g className="opacity-25">
          {/* Left side tiles */}
          <rect x="150" y="250" width="60" height="60" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" transform="rotate(45 180 280)" />
          <rect x="150" y="350" width="60" height="60" stroke="url(#gradient2)" strokeWidth="1.5" fill="none" transform="rotate(45 180 380)" />
          <rect x="150" y="450" width="60" height="60" stroke="url(#gradient3)" strokeWidth="1.5" fill="none" transform="rotate(45 180 480)" />
          
          {/* Right side tiles */}
          <rect x="990" y="250" width="60" height="60" stroke="url(#gradient4)" strokeWidth="1.5" fill="none" transform="rotate(45 1020 280)" />
          <rect x="990" y="350" width="60" height="60" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" transform="rotate(45 1020 380)" />
          <rect x="990" y="450" width="60" height="60" stroke="url(#gradient2)" strokeWidth="1.5" fill="none" transform="rotate(45 1020 480)" />
        </g>

        {/* Decorative arabesque borders - more intricate */}
        <g className="animate-gradient-shift opacity-25">
          {/* Outer frame */}
          <rect
            x="30"
            y="30"
            width="1140"
            height="740"
            stroke="url(#gradient1)"
            strokeWidth="3"
            fill="none"
            rx="30"
          />
          
          {/* Middle frame with corners */}
          <rect
            x="60"
            y="60"
            width="1080"
            height="680"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            rx="20"
            strokeDasharray="20,5"
          />
          
          {/* Inner frame */}
          <rect
            x="90"
            y="90"
            width="1020"
            height="620"
            stroke="url(#gradient3)"
            strokeWidth="1.5"
            fill="none"
            rx="15"
            strokeDasharray="10,5"
          />
        </g>

        {/* Additional interlocking circles - Islamic art motif */}
        <g className="opacity-20">
          <circle cx="300" cy="400" r="50" stroke="url(#gradient1)" strokeWidth="2" fill="none" />
          <circle cx="340" cy="400" r="50" stroke="url(#gradient2)" strokeWidth="2" fill="none" />
          <circle cx="900" cy="400" r="50" stroke="url(#gradient3)" strokeWidth="2" fill="none" />
          <circle cx="860" cy="400" r="50" stroke="url(#gradient4)" strokeWidth="2" fill="none" />
        </g>

        {/* Gradient definitions with MENAA Orange/Brown/Yellow colors */}
        <defs>
          {/* Orange gradients */}
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
          <radialGradient id="gradient1-fill">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </radialGradient>
          
          {/* Brown/Amber gradients */}
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <radialGradient id="gradient2-fill">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#92400E" />
          </radialGradient>
          
          {/* Yellow/Gold gradients */}
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <radialGradient id="gradient3-fill">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" />
          </radialGradient>
          
          {/* Mixed warm gradients */}
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <radialGradient id="gradient4-fill">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EAB308" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
