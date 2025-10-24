"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Trophy, Target, Medal, Zap, Star } from "lucide-react"

interface GoalCelebrationProps {
  isVisible: boolean
  onComplete?: () => void
}

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  shape: "circle" | "square" | "triangle"
  delay: number
}

export function GoalCelebration({ isVisible, onComplete }: GoalCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [showGoalText, setShowGoalText] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    // Generate confetti pieces
    const confettiPieces: ConfettiPiece[] = []
    for (let i = 0; i < 50; i++) {
      confettiPieces.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        color: ["#FFD700", "#FF6B35", "#00B140", "#FF1744", "#2196F3", "#9C27B0"][Math.floor(Math.random() * 6)],
        shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
        delay: Math.random() * 0.5
      })
    }
    setConfetti(confettiPieces)

    // Show goal text after a short delay
    setTimeout(() => setShowGoalText(true), 300)

    // Complete animation after duration
    setTimeout(() => {
      setShowGoalText(false)
      setConfetti([])
      onComplete?.()
    }, 3000)
  }, [isVisible, onComplete])

  const renderConfettiShape = (shape: ConfettiPiece["shape"], color: string) => {
    switch (shape) {
      case "circle":
        return <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      case "square":
        return <div className="w-2 h-2" style={{ backgroundColor: color }} />
      case "triangle":
        return (
          <div 
            className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent"
            style={{ borderBottomColor: color }}
          />
        )
      default:
        return <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti */}
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ 
                opacity: 0,
                scale: 0,
                y: 0,
                rotate: piece.rotation
              }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [0, -100, -200, -300],
                rotate: [piece.rotation, piece.rotation + 360, piece.rotation + 720]
              }}
              transition={{
                duration: 2.5,
                delay: piece.delay,
                ease: "easeOut"
              }}
            >
              {renderConfettiShape(piece.shape, piece.color)}
            </motion.div>
          ))}

          {/* Soccer ball confetti */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`ball-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ 
                opacity: 0,
                scale: 0,
                y: 0,
                rotate: 0
              }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 0.8, 0.8, 0],
                y: [0, -80, -160, -240],
                rotate: [0, 180, 360, 540]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="w-3 h-3 rounded-full bg-white border border-gray-300 flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
              </div>
            </motion.div>
          ))}

          {/* Trophy icons */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`trophy-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ 
                opacity: 0,
                scale: 0,
                y: 0,
                rotate: 0
              }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1.2, 0],
                y: [0, -60, -120, -180],
                rotate: [0, 90, 180, 270]
              }}
              transition={{
                duration: 2.2,
                delay: i * 0.15,
                ease: "easeOut"
              }}
            >
              <Trophy size={20} color="#FFD700" />
            </motion.div>
          ))}

          {/* GOAL! Text */}
          <AnimatePresence>
            {showGoalText && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="text-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 3,
                    ease: "easeInOut"
                  }}
                >
                  <motion.h1
                    className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                    style={{
                      textShadow: "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 107, 53, 0.6)"
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    GOAL!
                  </motion.h1>
                  
                  <motion.p
                    className="text-2xl md:text-3xl font-bold text-white mt-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Registration Successful! ⚽
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stadium crowd effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`crowd-${i}`}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -20, -40]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            ))}
          </div>

          {/* Flash effect */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
