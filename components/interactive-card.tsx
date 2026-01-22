"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface InteractiveCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function InteractiveCard({ children, className, glowColor = "rgba(251, 191, 36, 0.3)", ...props }: InteractiveCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative rounded-2xl overflow-hidden glass-panel transition-all duration-300 group",
        className
      )}
      {...props}
    >
      {/* Inner Glow Gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`
        }}
      />

      {/* Border Gradient */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/50 transition-colors duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}
