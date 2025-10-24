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
        transformStyle: "preserve-3d",
        perspective: "1000px"
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
      {/* Modern 3D Soccer Ball */}
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Main ball body with modern gradient and texture */}
        <div 
          className="w-full h-full rounded-full relative overflow-hidden shadow-2xl"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 20%, rgba(241,245,249,0.9) 40%, rgba(226,232,240,0.85) 60%, rgba(203,213,225,0.8) 80%, rgba(148,163,184,0.75) 100%),
              linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(241,245,249,0.9) 50%, rgba(226,232,240,0.8) 100%)
            `,
            border: "2px solid rgba(255,255,255,0.3)",
            boxShadow: `
              inset 0 2px 4px rgba(255,255,255,0.3),
              inset 0 -2px 4px rgba(0,0,0,0.1),
              0 8px 16px rgba(0,0,0,0.2),
              0 4px 8px rgba(0,0,0,0.1)
            `
          }}
        >
          {/* Modern pentagon pattern with realistic proportions */}
          <div className="absolute inset-0">
            {/* Center pentagon - larger and more realistic */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "12px",
                height: "12px",
                background: "linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)",
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            
            {/* Surrounding pentagons with realistic positioning */}
            <div 
              className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "8px",
                height: "8px",
                background: "linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)",
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            <div 
              className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2"
              style={{
                width: "8px",
                height: "8px",
                background: "linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)",
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            <div 
              className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2"
              style={{
                width: "8px",
                height: "8px",
                background: "linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)",
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2"
              style={{
                width: "8px",
                height: "8px",
                background: "linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)",
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            
            {/* Additional realistic pattern elements */}
            <div 
              className="absolute top-1/2 left-1/6 w-2 h-2 rounded-full"
              style={{
                background: "radial-gradient(circle, #000000 0%, #1a1a1a 70%, #000000 100%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            <div 
              className="absolute top-1/2 right-1/6 w-2 h-2 rounded-full"
              style={{
                background: "radial-gradient(circle, #000000 0%, #1a1a1a 70%, #000000 100%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            <div 
              className="absolute top-1/6 left-1/2 w-2 h-2 rounded-full"
              style={{
                background: "radial-gradient(circle, #000000 0%, #1a1a1a 70%, #000000 100%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            <div 
              className="absolute bottom-1/6 left-1/2 w-2 h-2 rounded-full"
              style={{
                background: "radial-gradient(circle, #000000 0%, #1a1a1a 70%, #000000 100%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)"
              }}
            />
          </div>
          
          {/* Modern highlight with realistic lighting */}
          <div 
            className="absolute top-2 left-3 w-6 h-8 rounded-full blur-sm opacity-60"
            style={{
              background: "radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)"
            }}
          />
          
          {/* Secondary highlight for more depth */}
          <div 
            className="absolute top-1 left-2 w-3 h-4 rounded-full blur-sm opacity-40"
            style={{
              background: "radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, transparent 100%)"
            }}
          />
        </div>
        
        {/* Enhanced shadow with realistic falloff */}
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-3 rounded-full blur-md opacity-30"
          style={{
            background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
          }}
        />
        
        {/* Additional depth shadow */}
        <div 
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2 rounded-full blur-sm opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 100%)"
          }}
        />
      </div>
    </motion.div>
  )
}
