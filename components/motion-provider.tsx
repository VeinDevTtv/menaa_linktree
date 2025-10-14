"use client"

import type React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function RouteProgress() {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ width: 0, opacity: 0.8 }}
        animate={{ width: "100%", opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          zIndex: 60,
          background:
            "linear-gradient(90deg, rgba(234,88,12,1) 0%, rgba(234,179,8,1) 50%, rgba(245,158,11,1) 100%)",
          boxShadow: "0 0 12px rgba(234,88,12,0.45)",
        }}
      />
    </AnimatePresence>
  )
}


