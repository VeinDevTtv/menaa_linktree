"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Trophy, Target, Medal, Zap, Star } from "lucide-react"

interface SoccerParticlesProps {
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  className?: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  icon: "trophy" | "target" | "medal" | "zap" | "star" | "ball"
  color: string
}

export function SoccerParticles({ 
  density = "medium", 
  speed = "medium",
  className = "" 
}: SoccerParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const densityConfig = {
    low: 8,
    medium: 15,
    high: 25
  }

  const speedConfig = {
    slow: { duration: 8, delay: 0.5 },
    medium: { duration: 6, delay: 0.3 },
    fast: { duration: 4, delay: 0.1 }
  }

  const icons = ["trophy", "target", "medal", "zap", "star", "ball"] as const
  const colors = [
    "#FFD700", // Gold
    "#FF6B35", // Orange
    "#00B140", // Soccer green
    "#FF1744", // Red
    "#2196F3", // Blue
    "#9C27B0"  // Purple
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const particleCount = densityConfig[density]
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
        delay: Math.random() * 2,
        duration: speedConfig[speed].duration + Math.random() * 2,
        icon: icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    setParticles(newParticles)
  }, [isVisible, density, speed])

  const renderIcon = (icon: Particle["icon"], color: string, size: number) => {
    const iconSize = size * 12
    const iconProps = { size: iconSize, color }

    switch (icon) {
      case "trophy":
        return <Trophy {...iconProps} />
      case "target":
        return <Target {...iconProps} />
      case "medal":
        return <Medal {...iconProps} />
      case "zap":
        return <Zap {...iconProps} />
      case "star":
        return <Star {...iconProps} />
      case "ball":
        return (
          <div 
            className="rounded-full bg-white border-2 border-gray-300 flex items-center justify-center"
            style={{ width: iconSize, height: iconSize }}
          >
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        )
      default:
        return <Star {...iconProps} />
    }
  }

  if (!isVisible) {
    return <div ref={containerRef} className={className} />
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            y: 0,
            rotate: 0
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, particle.size, particle.size, 0],
            y: [-20, -60, -100, -140],
            rotate: [0, 180, 360, 540]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 1
          }}
        >
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 4px rgba(255,255,255,0.3))",
                "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
                "drop-shadow(0 0 4px rgba(255,255,255,0.3))"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {renderIcon(particle.icon, particle.color, particle.size)}
          </motion.div>
        </motion.div>
      ))}
      
      {/* Additional sparkle effects */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      ))}
    </div>
  )
}
