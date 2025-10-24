"use client"

import { motion } from "framer-motion"

interface SoccerFieldBgProps {
  className?: string
  opacity?: number
}

export function SoccerFieldBg({ className = "", opacity = 0.1 }: SoccerFieldBgProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Grass background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, #1B5E20 25%, transparent 25%),
            linear-gradient(-45deg, #1B5E20 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #2E7D32 75%),
            linear-gradient(-45deg, transparent 75%, #2E7D32 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          opacity
        }}
      />
      
      {/* Field lines */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 60" 
        style={{ opacity }}
        preserveAspectRatio="none"
      >
        {/* Center line */}
        <motion.line
          x1="50"
          y1="0"
          x2="50"
          y2="60"
          stroke="white"
          strokeWidth="0.3"
          strokeDasharray="1,1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Center circle */}
        <motion.circle
          cx="50"
          cy="30"
          r="8"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        
        {/* Center dot */}
        <motion.circle
          cx="50"
          cy="30"
          r="0.5"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        
        {/* Penalty areas */}
        <motion.rect
          x="0"
          y="20"
          width="15"
          height="20"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        <motion.rect
          x="85"
          y="20"
          width="15"
          height="20"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        
        {/* Goal areas */}
        <motion.rect
          x="0"
          y="25"
          width="5"
          height="10"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        <motion.rect
          x="95"
          y="25"
          width="5"
          height="10"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        
        {/* Corner arcs */}
        <motion.path
          d="M 0 0 A 2 2 0 0 1 2 2"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        />
        <motion.path
          d="M 100 0 A 2 2 0 0 0 98 2"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        />
        <motion.path
          d="M 0 60 A 2 2 0 0 0 2 58"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        />
        <motion.path
          d="M 100 60 A 2 2 0 0 1 98 58"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        />
      </svg>
      
      {/* Goal posts */}
      <div className="absolute inset-0">
        {/* Left goal */}
        <motion.div
          className="absolute left-0 top-1/2 transform -translate-y-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: opacity * 2, x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="w-1 h-8 bg-white/60 relative">
            {/* Crossbar */}
            <div className="absolute top-0 left-0 w-6 h-0.5 bg-white/60"></div>
            {/* Left post */}
            <div className="absolute top-0 -left-0.5 w-0.5 h-8 bg-white/60"></div>
            {/* Right post */}
            <div className="absolute top-0 left-5.5 w-0.5 h-8 bg-white/60"></div>
          </div>
        </motion.div>
        
        {/* Right goal */}
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: opacity * 2, x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="w-1 h-8 bg-white/60 relative">
            {/* Crossbar */}
            <div className="absolute top-0 -left-5 w-6 h-0.5 bg-white/60"></div>
            {/* Left post */}
            <div className="absolute top-0 -left-0.5 w-0.5 h-8 bg-white/60"></div>
            {/* Right post */}
            <div className="absolute top-0 left-5.5 w-0.5 h-8 bg-white/60"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Corner flags */}
      <div className="absolute inset-0">
        {/* Top left flag */}
        <motion.div
          className="absolute top-2 left-2"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: opacity * 3, rotate: [0, 10, -10, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 3 },
            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-2 h-4 bg-red-500 relative">
            <div className="absolute -left-1 top-0 w-0.5 h-4 bg-white/60"></div>
          </div>
        </motion.div>
        
        {/* Top right flag */}
        <motion.div
          className="absolute top-2 right-2"
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: opacity * 3, rotate: [0, -10, 10, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 3 },
            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        >
          <div className="w-2 h-4 bg-red-500 relative">
            <div className="absolute -right-1 top-0 w-0.5 h-4 bg-white/60"></div>
          </div>
        </motion.div>
        
        {/* Bottom left flag */}
        <motion.div
          className="absolute bottom-2 left-2"
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: opacity * 3, rotate: [0, -10, 10, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 3 },
            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        >
          <div className="w-2 h-4 bg-red-500 relative">
            <div className="absolute -left-1 top-0 w-0.5 h-4 bg-white/60"></div>
          </div>
        </motion.div>
        
        {/* Bottom right flag */}
        <motion.div
          className="absolute bottom-2 right-2"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: opacity * 3, rotate: [0, 10, -10, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 3 },
            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        >
          <div className="w-2 h-4 bg-red-500 relative">
            <div className="absolute -right-1 top-0 w-0.5 h-4 bg-white/60"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
