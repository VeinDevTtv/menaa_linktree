"use client"

import { useEffect, useRef } from "react"

export function ArabesquePatterns() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Geometric Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>

      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 animate-rotate-slow"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="4 2" />
        <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="#fbbf24" strokeWidth="0.2" />
        <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="#10b981" strokeWidth="0.2" transform="rotate(45 50 50)" />
      </svg>

      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] opacity-15 animate-rotate-reverse-slow"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="30" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="1 3" />
        <rect x="25" y="25" width="50" height="50" stroke="#be185d" strokeWidth="0.2" transform="rotate(22.5 50 50)" />
        <rect x="25" y="25" width="50" height="50" stroke="#be185d" strokeWidth="0.2" transform="rotate(67.5 50 50)" />
      </svg>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse-glow delay-500"></div>
    </div>
  )
}
