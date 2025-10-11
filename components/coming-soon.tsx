"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { 
  Instagram, Home, Sparkles, Clock, Wrench,
  ExternalLink, Heart
} from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"

// Custom Discord Icon component matching lucide-react style
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

interface ComingSoonProps {
  pageName?: string
}

export default function ComingSoon({ pageName = "This Page" }: ComingSoonProps) {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-amber-900 to-emerald-950"
    >
      {/* Background Effects - Same as homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Morphing gradient blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/30 to-orange-500/30 animate-morph blur-3xl"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/25 to-teal-500/25 animate-morph blur-3xl"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 animate-morph blur-3xl"
          style={{ animationDelay: "6s" }}
        />

        {/* 3D Floating Geometric Elements */}
        <div className="absolute top-24 right-24 w-24 h-24 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 transform rotate-45 animate-float-3d opacity-70 shadow-2xl shadow-amber-500/50" />
        <div className="absolute bottom-24 left-24 w-28 h-28 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-700 transform rotate-12 animate-float-3d-reverse opacity-65 shadow-2xl shadow-emerald-500/50" style={{ animationDelay: "2s" }} />

        {/* Arabesque Patterns */}
        <ArabesquePatterns />

        {/* Cursor glow */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(16, 185, 129, 0.15) 40%, rgba(59, 130, 246, 0.1) 60%, transparent 80%)",
            opacity: mounted ? 1 : 0,
          }}
        />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-screen">
        <div className="w-full">
          {/* Main Content */}
          <div
            className={`text-center transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 animate-gradient-shift" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 rounded-3xl animate-rotate-slow opacity-50" />
                
                <div className="relative w-32 h-32 bg-gradient-to-br from-amber-500 via-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <div className="absolute inset-2 bg-slate-900 rounded-2xl flex items-center justify-center">
                    <div className="relative">
                      <Wrench className="w-16 h-16 text-transparent bg-gradient-to-br from-amber-300 via-emerald-300 to-blue-300 bg-clip-text" style={{ stroke: 'url(#gradient)' }} />
                      <svg width="0" height="0">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fcd34d" />
                            <stop offset="50%" stopColor="#6ee7b7" />
                            <stop offset="100%" stopColor="#93c5fd" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <Clock className="w-8 h-8 absolute -top-2 -right-2 text-amber-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift text-balance leading-tight">
              Coming Soon
            </h1>

            <div className="relative inline-block mb-6">
              <p className="text-xl md:text-2xl text-white/90 font-medium text-balance relative z-10">
                {pageName} is Under Construction
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-blue-500/20 blur-2xl animate-pulse-glow" />
            </div>

            <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto text-pretty leading-relaxed mb-12">
              We're working hard to bring you something amazing! In the meantime, check out our main page or stay connected with us on social media for updates.
            </p>

            {/* Decorative line */}
            <div className="mt-8 mb-12 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link 
                href="/"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 rounded-2xl text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Return to Main Page</span>
              </Link>
            </div>

            {/* Stay Connected Section */}
            <Card className="border-white/20 bg-gradient-to-br from-white/10 to-white/15 backdrop-blur-md p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
                Stay Connected
              </h2>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                Follow us on social media for the latest updates and announcements!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://instagram.com/deanzamenaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>

                <a
                  href="https://discord.gg/UAS7xXRj27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <DiscordIcon className="w-5 h-5" />
                  <span>Discord</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </div>
            </Card>

            {/* Footer */}
            <div
              className={`text-center mt-12 transition-all duration-1000 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <p className="text-sm text-white/40 mb-2">
                Made with <Heart className="inline w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" /> by MENAA
              </p>
              <p className="text-xs text-white/30">© 2025 De Anza MENAA. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

