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
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MENA-inspired geometric patterns */}
        
        {/* Central arabesque pattern */}
        <g className="animate-rotate-slow opacity-30">
          <path
            d="M600 400 C 650 350, 700 350, 750 400 C 700 450, 650 450, 600 400 Z"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M600 400 C 550 350, 500 350, 450 400 C 500 450, 550 450, 600 400 Z"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M600 400 C 650 450, 700 450, 750 400 C 700 350, 650 350, 600 400 Z"
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M600 400 C 550 450, 500 450, 450 400 C 500 350, 550 350, 600 400 Z"
            stroke="url(#gradient4)"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Corner arabesque patterns */}
        <g className="animate-float-3d opacity-20">
          <path
            d="M100 100 C 150 100, 200 150, 200 200 C 150 200, 100 150, 100 100 Z"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M1100 100 C 1050 100, 1000 150, 1000 200 C 1050 200, 1100 150, 1100 100 Z"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M100 700 C 150 700, 200 650, 200 600 C 150 600, 100 650, 100 700 Z"
            stroke="url(#gradient3)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M1100 700 C 1050 700, 1000 650, 1000 600 C 1050 600, 1100 650, 1100 700 Z"
            stroke="url(#gradient4)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>

        {/* Islamic geometric stars */}
        <g className="animate-pulse-3d opacity-25">
          <polygon
            points="300,200 310,220 330,220 315,235 320,255 300,245 280,255 285,235 270,220 290,220"
            stroke="url(#gradient1)"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="900,200 910,220 930,220 915,235 920,255 900,245 880,255 885,235 870,220 890,220"
            stroke="url(#gradient2)"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="300,600 310,620 330,620 315,635 320,655 300,645 280,655 285,635 270,620 290,620"
            stroke="url(#gradient3)"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="900,600 910,620 930,620 915,635 920,655 900,645 880,655 885,635 870,620 890,620"
            stroke="url(#gradient4)"
            strokeWidth="1"
            fill="none"
          />
        </g>

        {/* Decorative borders */}
        <g className="animate-gradient-shift opacity-15">
          <rect
            x="50"
            y="50"
            width="1100"
            height="700"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            rx="20"
          />
          <rect
            x="70"
            y="70"
            width="1060"
            height="660"
            stroke="url(#gradient2)"
            strokeWidth="1"
            fill="none"
            rx="15"
          />
        </g>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
