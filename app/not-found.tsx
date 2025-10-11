"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Home, RefreshCcw, Trophy, Gamepad2 } from "lucide-react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [playing, setPlaying] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const spawnTimer = useRef<number | null>(null)
  const TARGET_LIFETIME_MS = 2600

  useEffect(() => setMounted(true), [])

  // Load/save high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("menaa-404-highscore")
      if (saved) setHighScore(Number(saved) || 0)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("menaa-404-highscore", String(highScore))
    } catch {}
  }, [highScore])

  // Mini-game: Click the zellij stars (targets) to gain points within the timer
  useEffect(() => {
    if (!playing) return

    // countdown timer
    const interval = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(interval)
          stopGame()
          return 0
        }
        return t - 1
      })
    }, 1000)

    // spawn targets periodically
    spawnTimer.current = window.setInterval(() => {
      const id = Date.now() + Math.floor(Math.random() * 1000)
      const x = Math.random() * 80 + 10 // keep inside bounds (10% - 90%)
      const y = Math.random() * 60 + 20 // keep inside bounds (20% - 80%)

      setTargets((prev) => {
        const next = [...prev, { id, x, y }]
        return next.slice(-8)
      })

      // auto-expire this target after a short lifetime
      window.setTimeout(() => {
        setTargets((prev) => prev.filter((t) => t.id !== id))
      }, TARGET_LIFETIME_MS)
    }, 900) as unknown as number

    return () => {
      window.clearInterval(interval)
      if (spawnTimer.current) window.clearInterval(spawnTimer.current)
    }
  }, [playing])

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setTargets([])
    setPlaying(true)
  }

  const stopGame = () => {
    setPlaying(false)
    if (spawnTimer.current) window.clearInterval(spawnTimer.current)
    setHighScore((h) => (score > h ? score : h))
  }

  const handleHit = (id: number) => {
    if (!playing) return
    setScore((s) => s + 1)
    setTargets((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Morphing gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-yellow-500/30 animate-gooey-morph blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-600/25 to-orange-600/25 animate-gooey-morph blur-3xl" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-600/20 to-amber-700/20 animate-gooey-morph blur-3xl" style={{ animationDelay: "6s" }} />

        {/* Floating elements and patterns */}
        <div className="absolute top-24 right-24 w-24 h-24 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700 transform rotate-45 animate-float-3d opacity-70 shadow-2xl shadow-orange-500/50" />
        <div className="absolute bottom-24 left-24 w-28 h-28 bg-gradient-to-b from-yellow-400 via-yellow-500 to-amber-700 transform rotate-12 animate-float-3d-reverse opacity-65 shadow-2xl shadow-yellow-500/50" style={{ animationDelay: "2s" }} />
        <ArabesquePatterns />
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <div className="mb-6 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-border-flow" />
              <div className="relative w-28 h-28 bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                <div className="absolute inset-2 bg-stone-950 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image src="/MENAA_LOGO.jpg" alt="MENAA Logo" width={96} height={96} className="object-cover rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent leading-tight">
            404 — Lost in the Souk
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-balance">
            This page has wandered off into the bazaar. While we fetch it back, try this tiny zellij-tapping game inspired by MENAA patterns.
          </p>
        </div>

        {/* Mini Game */}
        <Card className="relative border-orange-500/20 bg-gradient-to-br from-orange-950/40 to-amber-950/50 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-orange-400" />
                <span className="text-white/80 font-semibold">Zellij Tapper</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-orange-300">Score: <span className="font-bold text-white">{score}</span></span>
                <span className="text-amber-300">Time: <span className="font-bold text-white">{timeLeft}s</span></span>
                <span className="text-yellow-300 hidden md:inline-flex">High: <span className="font-bold text-white">{highScore}</span></span>
              </div>
              <div className="flex items-center gap-2">
                {!playing ? (
                  <button onClick={startGame} className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 text-white font-semibold shadow-lg hover:shadow-orange-500/40 hover:scale-105 transition-all">
                    Start
                  </button>
                ) : (
                  <button onClick={stopGame} className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-700 via-yellow-700 to-orange-700 text-white font-semibold shadow-lg hover:shadow-amber-500/40 hover:scale-105 transition-all">
                    Stop
                  </button>
                )}
                <button onClick={() => { setScore(0); setTimeLeft(30); setTargets([]); }} className="px-3 py-2 rounded-xl bg-stone-800/60 text-white/80 hover:text-white hover:bg-stone-700/60 transition-colors inline-flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-orange-500/10 bg-gradient-to-br from-stone-950/60 to-stone-900/60">
              {/* Playfield subtle grid */}
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,theme(colors.orange.500)_0%,transparent_60%)]" />

              {/* Targets */}
              {targets.map((t) => (
                <button
                  key={t.id}
                  aria-label="target"
                  onClick={() => handleHit(t.id)}
                  className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:scale-110 transition-transform"
                  style={{ left: `${t.x}%`, top: `${t.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  {/* Star-shaped target using SVG with MENAA gradients */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id={`g1-${t.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="50%" stopColor="#EAB308" />
                        <stop offset="100%" stopColor="#B45309" />
                      </linearGradient>
                    </defs>
                    <polygon points="50,10 60,35 88,35 65,52 74,80 50,64 26,80 35,52 12,35 40,35" fill={`url(#g1-${t.id})`} stroke="#FACC15" strokeWidth="2" />
                  </svg>
                </button>
              ))}

              {/* Game over ribbon */}
              {!playing && (timeLeft === 0 || score > 0) && (
                <div className="absolute inset-x-0 top-6 mx-auto w-max px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 text-white text-sm font-semibold shadow-lg">
                  Round over! You scored {score}.
                </div>
              )}
            </div>

            {/* Tips */}
            <p className="mt-4 text-xs text-white/50 text-center">
              Tip: Targets fade if you wait too long—keep tapping the stars!
            </p>
          </CardContent>
        </Card>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 rounded-2xl text-white font-semibold shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all">
            <Home className="w-5 h-5 group-hover:rotate-6 transition-transform" />
            <span>Back to Home</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/events" className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 rounded-2xl text-white font-semibold shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all">
            <Trophy className="w-5 h-5" />
            <span>See Events</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
