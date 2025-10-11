"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { 
  Calendar, Heart, ArrowLeft, Sparkles, Users, 
  Film, Gamepad2, Trophy, PartyPopper, Clock, MapPin,
  Star, Zap, Music, Gift, Coffee
} from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"

export default function EventsPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

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

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const events = [
    {
      title: "MENAA Bingo",
      tagline: "Win Prizes, Make Memories!",
      description: "Join us for an exciting evening of MENAA-themed bingo! Get ready for laughter, prizes, and unforgettable moments with your friends. Traditional snacks and refreshments will be served.",
      date: "TBA",
      time: "Evening",
      location: "De Anza College",
      icon: Trophy,
      gradient: "from-orange-500 via-orange-600 to-orange-700",
      accentColor: "orange",
      highlights: [
        "Amazing prizes to be won",
        "Traditional MENAA snacks",
        "Fun games & activities",
        "Meet new friends"
      ],
      decorativeIcons: [Gift, Star, Sparkles, PartyPopper]
    },
    {
      title: "FIFA/Henna Night",
      tagline: "Game & Glamour Combined!",
      description: "Experience the perfect blend of competitive FIFA gaming and beautiful henna art. Show off your gaming skills or get stunning henna designs - or both! An evening celebrating MENAA culture and modern fun.",
      date: "TBA",
      time: "Evening",
      location: "De Anza College",
      icon: Gamepad2,
      gradient: "from-amber-600 via-yellow-600 to-amber-700",
      accentColor: "amber",
      highlights: [
        "FIFA tournament with prizes",
        "Professional henna artists",
        "Refreshments & music",
        "Chill vibes & gaming"
      ],
      decorativeIcons: [Gamepad2, Star, Music, Sparkles]
    },
    {
      title: "Movie Night",
      tagline: "Cinema Under the Stars!",
      description: "Grab your friends and join us for a cozy movie night featuring a beloved MENAA film. Complete with popcorn, snacks, and great company. A perfect way to relax and connect with your community.",
      date: "TBA",
      time: "Evening",
      location: "De Anza College",
      icon: Film,
      gradient: "from-yellow-600 via-amber-600 to-orange-600",
      accentColor: "yellow",
      highlights: [
        "Carefully selected MENAA film",
        "Popcorn & refreshments",
        "Cozy atmosphere",
        "Post-movie discussions"
      ],
      decorativeIcons: [Film, Star, Coffee, Heart]
    }
  ]

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950"
    >
      {/* Enhanced Background Effects with Parallax - MENAA Orange/Brown/Yellow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Parallax morphing gradient blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-yellow-500/30 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "0s",
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-600/25 to-orange-600/25 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "3s",
            transform: `translateY(${scrollY * -0.2}px)`
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-600/20 to-amber-700/20 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "6s",
            transform: `translateY(${scrollY * 0.15}px)`
          }}
        />
        <div
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-orange-500/20 to-amber-500/20 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "4s",
            transform: `translateY(${scrollY * 0.25}px)`
          }}
        />

        {/* Floating 3D geometric shapes with parallax */}
        <div 
          className="absolute top-24 right-24 w-20 h-20 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700 transform rotate-45 animate-float-3d opacity-70 shadow-2xl shadow-orange-500/50"
          style={{ transform: `translateY(${scrollY * 0.4}px) rotate(45deg)` }}
        />
        <div 
          className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-b from-yellow-400 via-yellow-500 to-amber-700 transform rotate-12 animate-float-3d-reverse opacity-65 shadow-2xl shadow-yellow-500/50"
          style={{ 
            animationDelay: "2s",
            transform: `translateY(${scrollY * -0.3}px) rotate(12deg)`
          }}
        />
        <div 
          className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-700 transform rotate-45 animate-rotate-3d opacity-55 shadow-xl shadow-amber-500/30"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />

        {/* Floating stars */}
        <div 
          className="absolute top-40 left-20 w-12 h-12"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 opacity-70 shadow-xl shadow-yellow-500/50 animate-pulse-3d" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
        </div>
        <div 
          className="absolute bottom-40 right-20 w-14 h-14 animate-float-3d" 
          style={{ 
            animationDelay: "3s",
            transform: `translateY(${scrollY * -0.4}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-600 opacity-70 shadow-xl shadow-orange-500/50" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
        </div>

        {/* Enhanced sparkle effects */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full animate-sparkle ${
              i % 3 === 0 ? 'bg-orange-400 shadow-lg shadow-orange-400/50' : 
              i % 3 === 1 ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 
              'bg-amber-400 shadow-lg shadow-amber-400/50'
            } hidden md:block`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px)`,
            }}
          />
        ))}

        {/* Arabesque Patterns */}
        <ArabesquePatterns />

        {/* Enhanced cursor glow */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(234, 179, 8, 0.2) 40%, rgba(180, 83, 9, 0.15) 60%, transparent 80%)",
            opacity: mounted ? 1 : 0,
          }}
        />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Back Button with enhanced styling */}
        <Link 
          href="/"
          className={`inline-flex items-center gap-2 mb-8 px-6 py-3 bg-orange-950/40 hover:bg-orange-950/60 backdrop-blur-md border border-orange-500/20 hover:border-orange-400/40 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>

        {/* Header Section with enhanced animations */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {/* Animated Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-600 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 animate-border-flow" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-600 rounded-3xl animate-rotate-slow opacity-50" />
              
              <div className="relative w-32 h-32 bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-2 bg-stone-950 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/MENAA_LOGO.jpg"
                    alt="MENAA Logo"
                    width={112}
                    height={112}
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent animate-border-flow text-balance leading-tight">
            Upcoming Events
          </h1>

          <div className="relative inline-block mb-6">
            <p className="text-xl md:text-2xl text-white/90 font-medium text-balance relative z-10">
              This Quarter's Exciting Activities
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-amber-500/20 blur-2xl animate-pulse-glow" />
          </div>

          <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto text-pretty leading-relaxed">
            Join us for an amazing quarter filled with culture, fun, and community. Mark your calendars for these unforgettable events!
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
            <PartyPopper className="w-5 h-5 text-yellow-400 animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          </div>
        </div>

        {/* Events Grid with Enhanced Cards */}
        <div className="space-y-12">
          {events.map((event, index) => {
            const Icon = event.icon
            const isHovered = hoveredEvent === index
            
            return (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                onMouseEnter={() => setHoveredEvent(index)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <Card className="group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-xl transition-all duration-700 hover:scale-[1.02] hover:border-orange-400/30 hover:shadow-2xl card-spotlight">
                  {/* Animated gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-30 transition-all duration-700 animate-border-flow`}
                  />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>

                  {/* Floating decorative icons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    {event.decorativeIcons.map((DecorIcon, i) => (
                      <div
                        key={i}
                        className="animate-float"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        <DecorIcon className={`w-5 h-5 text-${event.accentColor}-400/60`} />
                      </div>
                    ))}
                  </div>

                  {/* Main Content */}
                  <div className="relative p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left: Icon & Title */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-6 mb-6">
                          {/* Enhanced Icon */}
                          <div className="relative flex-shrink-0">
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${event.gradient} rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150`}
                            />
                            <div
                              className={`relative w-24 h-24 rounded-3xl bg-gradient-to-br ${event.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl`}
                            >
                              <Icon className="w-12 h-12 text-white drop-shadow-2xl" />
                            </div>
                          </div>

                          {/* Title & Tagline */}
                          <div className="flex-1 min-w-0">
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-700" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, backgroundClip: isHovered ? 'text' : 'unset' }}>
                              {event.title}
                            </h2>
                            <p className={`text-lg md:text-xl font-semibold text-${event.accentColor}-300 mb-4`}>
                              {event.tagline}
                            </p>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                          {event.highlights.map((highlight, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 text-white/80 transition-all duration-500 group-hover:translate-x-2"
                              style={{ transitionDelay: `${i * 50}ms` }}
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${event.gradient} shadow-lg`} />
                              <span className="text-sm md:text-base">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Event Details */}
                      <div className="lg:col-span-1">
                        <div className="space-y-4">
                          {/* Date Card */}
                          <div className={`p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-${event.accentColor}-400/30 transition-all duration-500`}>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                                <Calendar className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider">Date</p>
                                <p className="text-lg font-bold text-white">{event.date}</p>
                              </div>
                            </div>
                          </div>

                          {/* Time Card */}
                          <div className={`p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-${event.accentColor}-400/30 transition-all duration-500`}>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                                <Clock className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider">Time</p>
                                <p className="text-lg font-bold text-white">{event.time}</p>
                              </div>
                            </div>
                          </div>

                          {/* Location Card */}
                          <div className={`p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-${event.accentColor}-400/30 transition-all duration-500`}>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                                <MapPin className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider">Location</p>
                                <p className="text-lg font-bold text-white">{event.location}</p>
                              </div>
                            </div>
                          </div>

                          {/* RSVP Button */}
                          <button
                            className={`w-full mt-4 px-6 py-4 rounded-2xl bg-gradient-to-r ${event.gradient} text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 hover:brightness-110 flex items-center justify-center gap-2`}
                          >
                            <Zap className="w-5 h-5" />
                            Stay Tuned!
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${event.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  {/* Corner decorations */}
                  <div className="absolute top-4 left-4 w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    <div className={`w-full h-full border-t-2 border-l-2 border-${event.accentColor}-400 rounded-tl-2xl`} />
                  </div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    <div className={`w-full h-full border-b-2 border-r-2 border-${event.accentColor}-400 rounded-br-2xl`} />
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Call to Action Section */}
        <div 
          className={`mt-20 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-950/40 to-amber-950/50 backdrop-blur-xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-amber-500/10 animate-border-flow" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 mb-6 animate-pulse-3d">
                <Users className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Don't Miss Out!
              </h2>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Stay connected with us on Instagram and Discord for exact dates, times, and special announcements. 
                These events fill up fast, so make sure you're following us to get the latest updates!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://instagram.com/deanzamenaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  <Star className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Follow on Instagram</span>
                </a>

                <a
                  href="https://discord.gg/UAS7xXRj27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Join Discord</span>
                </a>
              </div>
            </div>

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 opacity-40 animate-float"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </Card>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-12 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <p className="text-sm text-white/40 mb-2">
            Made with <Heart className="inline w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" /> by MENAA
          </p>
          <p className="text-xs text-white/30">© 2025 De Anza MENAA. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

