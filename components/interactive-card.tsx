"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type InteractiveCardProps = React.HTMLAttributes<HTMLDivElement>

export function InteractiveCard({ className, onMouseMove, children, ...props }: InteractiveCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 2 - 1
    const py = (y / rect.height) * 2 - 1

    const rotateX = (-py * 6).toFixed(2)
    const rotateY = (px * 6).toFixed(2)

    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    el.style.setProperty("--mouse-x", `${x}px`)
    el.style.setProperty("--mouse-y", `${y}px`)
    onMouseMove?.(e)
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "transition-transform duration-300 will-change-transform card-spotlight",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}


