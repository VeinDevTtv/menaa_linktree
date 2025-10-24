"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface SoccerBall3DProps {
  size?: "sm" | "md" | "lg"
  position?: { x: number; y: number }
  interactive?: boolean
  className?: string
}

export function SoccerBall3D({ 
  size = "md", 
  position = { x: 0, y: 0 }, 
  interactive = true,
  className = ""
}: SoccerBall3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16", 
    lg: "w-24 h-24"
  }

  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [interactive])

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        willChange: "transform",
        transformStyle: "preserve-3d"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        rotateY: interactive ? mousePosition.x * 360 : 0,
        rotateX: interactive ? mousePosition.y * 180 : 0,
        scale: isHovered ? 1.2 : 1,
        y: [0, -20, 0],
      }}
      transition={{
        rotateY: { duration: 0.1 },
        rotateX: { duration: 0.1 },
        scale: { duration: 0.3 },
        y: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: Math.random() * 2
        }
      }}
    >
      {/* Soccer Ball */}
      <div className="relative w-full h-full">
        {/* Main ball body */}
        <div className="w-full h-full rounded-full bg-white shadow-lg border-2 border-gray-200 relative overflow-hidden">
          {/* Black pentagons pattern */}
          <div className="absolute inset-0">
            {/* Center pentagon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-sm rotate-45"></div>
            
            {/* Surrounding pentagons */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black rounded-sm rotate-12"></div>
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-black rounded-sm -rotate-12"></div>
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-black rounded-sm -rotate-12"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-black rounded-sm rotate-12"></div>
            
            {/* Additional pattern elements */}
            <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute top-1/6 left-1/2 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute bottom-1/6 left-1/2 w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
          
          {/* Highlight */}
          <div className="absolute top-2 left-3 w-4 h-6 bg-white/30 rounded-full blur-sm"></div>
        </div>
        
        {/* Shadow */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black/20 rounded-full blur-sm"></div>
      </div>
    </motion.div>
  )
}
