"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { 
  Calendar, Heart, ArrowLeft, Sparkles, Users, 
  Film, Gamepad2, PartyPopper, Clock, MapPin,
  Star, Zap, Music, Coffee, ImageIcon, CheckCircle2,
  Pause, Play
} from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"

export default function EventsPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [imageScale, setImageScale] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [storyProgress, setStoryProgress] = useState(0)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0, time: 0 })
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next')

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

  // Story progress animation
  useEffect(() => {
    if (selectedImage !== null && !isPaused) {
      const interval = setInterval(() => {
        setStoryProgress(prev => {
          if (prev >= 100) {
            handleNextImage()
            return 0
          }
          return prev + 0.5
        })
      }, 30) // 6 seconds per image (100 / 0.5 * 30ms)
      
      return () => clearInterval(interval)
    }
  }, [selectedImage, isPaused])

  // Reset image transformations when image changes
  useEffect(() => {
    if (selectedImage !== null) {
      setImageScale(1)
      setImagePosition({ x: 0, y: 0 })
    }
  }, [selectedImage])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      
      if (e.key === 'Escape') {
        closeImageViewer()
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage()
      } else if (e.key === 'ArrowRight') {
        handleNextImage()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused(prev => !prev)
      } else if (e.key === '+' || e.key === '=') {
        setImageScale(prev => Math.min(prev + 0.2, 3))
      } else if (e.key === '-') {
        setImageScale(prev => Math.max(prev - 0.2, 0.5))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const openImageViewer = (index: number) => {
    setSelectedImage(index)
    setIsPaused(false)
    setStoryProgress(0)
    document.body.style.overflow = 'hidden'
  }

  const closeImageViewer = () => {
    setSelectedImage(null)
    setStoryProgress(0)
    setIsPaused(false)
    document.body.style.overflow = 'unset'
  }

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSlideDirection('next')
      setStoryProgress(0)
      if (selectedImage < 4) {
        setSelectedImage(selectedImage + 1)
      } else {
        closeImageViewer()
      }
    }
  }

  const handlePrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSlideDirection('prev')
      setStoryProgress(0)
      setSelectedImage(selectedImage - 1)
    }
  }

  const handleZoom = (delta: number) => {
    setImageScale(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (imageScale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imageScale > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    handleZoom(delta)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({ 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY,
        time: Date.now()
      })
      
      if (imageScale > 1) {
        setIsDragging(true)
        setDragStart({ 
          x: e.touches[0].clientX - imagePosition.x, 
          y: e.touches[0].clientY - imagePosition.y 
        })
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if (isDragging && imageScale > 1) {
        setImagePosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y
        })
      } else if (imageScale === 1) {
        // Show swipe indicator
        const deltaX = e.touches[0].clientX - touchStart.x
        if (Math.abs(deltaX) > 50) {
          setSwipeDirection(deltaX > 0 ? 'right' : 'left')
        }
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (imageScale === 1 && e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStart.x
      const deltaY = e.changedTouches[0].clientY - touchStart.y
      const deltaTime = Date.now() - touchStart.time
      
      // Swipe detection (horizontal swipe should be larger than vertical)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 500) {
        if (deltaX > 0 && selectedImage !== null && selectedImage > 0) {
          handlePrevImage()
        } else if (deltaX < 0 && selectedImage !== null && selectedImage < 4) {
          handleNextImage()
        }
      }
    }
    
    setIsDragging(false)
    setSwipeDirection(null)
  }

  const events = [
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
      decorativeIcons: [Gamepad2, Star, Music, Sparkles],
      registrationOpen: true,
      registrationUrl: "/events/fifa-night-rsvp"
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
            <Link href="/" aria-label="Go to home" className="relative group rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
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
            </Link>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent animate-border-flow text-balance leading-tight">
            Upcoming Events
          </h1>

          <div className="relative inline-block mb-6">
            <p className="text-xl md:text-2xl text-white/90 font-medium text-balance relative z-10">
              This Quarter&rsquo;s Exciting Activities
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                onMouseEnter={() => setHoveredEvent(index)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <InteractiveCard className="group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-xl transition-all duration-700 hover:scale-[1.02] hover:border-orange-400/30 hover:shadow-2xl">
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
                                <p className="text-lg font-bold text-white">{event.date === "TBA" ? "More info coming soon" : event.date}</p>
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
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            {event.registrationOpen ? (
                              <Link
                                href={event.registrationUrl || "#"}
                                className={`w-full mt-4 px-6 py-4 rounded-2xl bg-gradient-to-r ${event.gradient} text-white font-bold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:brightness-110 flex items-center justify-center gap-2`}
                              >
                                <Gamepad2 className="w-5 h-5" />
                                Register Now ⚽
                              </Link>
                            ) : (
                              <a
                                href="https://instagram.com/deanzamenaa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full mt-4 px-6 py-4 rounded-2xl bg-gradient-to-r ${event.gradient} text-white font-bold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:brightness-110 flex items-center justify-center gap-2`}
                              >
                                <Zap className="w-5 h-5" />
                                Follow for updates
                              </a>
                            )}
                          </motion.div>
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
                </InteractiveCard>
              </motion.div>
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
                Don&rsquo;t Miss Out!
              </h2>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Stay connected with us on Instagram and Discord for exact dates, times, and special announcements. 
                These events fill up fast, so make sure you&rsquo;re following us to get the latest updates!
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

        {/* Past Events Section */}
        <div className="mt-20">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            Past Events
          </h2>

          {/* Social Mixer Event Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-12"
          >
            <InteractiveCard className="group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md transition-all duration-500 hover:border-orange-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 opacity-0 group-hover:opacity-10 transition-all duration-500 animate-border-flow" />

              <div className="relative p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Users className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                      MENAA Social Mixer
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-orange-300 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Wednesday, October 15, 2025</span>
                    </div>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                      Our first social mixer of the quarter! Students connected, vibed, and made new friends across the MENAA community. Features included MENA Bingo, henna & glitter tattoos, games, snacks, and amazing vibes.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium border border-orange-500/30">
                        🎯 MENA Bingo
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30">
                        🎨 Henna Art
                      </span>
                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-medium border border-yellow-500/30">
                        ✨ Community
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Photos Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                  {[1, 2, 3, 4, 5].map((num, index) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        zIndex: 10,
                        transition: { duration: 0.3 }
                      }}
                      onClick={() => openImageViewer(index)}
                      className="group/img relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                    >
                      {/* Main Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={`/events/menaaevent1_${num}${num === 3 ? 'jpg' : ''}.jpg`}
                          alt={`MENAA Social Mixer Event Photo ${num}`}
                          fill
                          className="object-cover transition-all duration-700 group-hover/img:scale-110 group-hover/img:brightness-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                        
                        {/* Shimmer Effect on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/img:translate-x-[200%] transition-transform duration-1000" />
                        </div>

                        {/* Border Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover/img:border-orange-400/50 group-hover/img:shadow-xl group-hover/img:shadow-orange-500/30 transition-all duration-500" />

                        {/* Watermark Logo - Bottom Right Corner */}
                        <motion.div 
                          className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 opacity-60 group-hover/img:opacity-90 transition-all duration-500"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 0.6, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        >
                          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/20 backdrop-blur-sm bg-black/20">
                            <Image
                              src="/MENAA_LOGO.jpg"
                              alt="MENAA Logo"
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                            {/* Logo glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-yellow-500/20 to-amber-500/20 mix-blend-overlay" />
                          </div>
                        </motion.div>

                        {/* Sparkle Effects on Hover */}
                        <div className="absolute top-2 left-2 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500">
                          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                        </div>
                      </div>

                      {/* Floating particle effect */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-700">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-yellow-400"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: [0, 1, 0],
                              y: [20, -20],
                              x: [0, (i - 1) * 10]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                            style={{
                              left: `${30 + i * 20}%`,
                              bottom: '10%'
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            </InteractiveCard>
          </motion.div>

          {/* Coming Soon Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
          >
            <InteractiveCard className="group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md transition-all duration-500 hover:scale-[1.01] hover:border-orange-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5" />

              <div className="relative flex flex-col items-center justify-center p-8 md:p-12 min-h-[300px]">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 via-yellow-500/20 to-amber-600/20 mb-6 animate-pulse">
                  <ImageIcon className="w-10 h-10 text-orange-400/60" />
                </div>
                
                <h3 className="text-2xl font-bold text-white/80 mb-3 text-center">
                  More Events Coming Soon!
                </h3>
                
                <p className="text-white/60 text-center max-w-xs leading-relaxed">
                  Check back here after our next events to see photos and highlights from our community gatherings.
                </p>
              </div>
            </InteractiveCard>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm">
              Want to see your photos here? Tag us on Instagram{" "}
              <a 
                href="https://instagram.com/deanzamenaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors font-semibold"
              >
                @deanzamenaa
              </a>
            </p>
          </div>
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

      {/* Stories-Style Image Viewer Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeImageViewer()
          }}
        >
          {/* Story Progress Bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-2 z-50">
            {[0, 1, 2, 3, 4].map((index) => (
              <div 
                key={index} 
                className={`flex-1 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                  isPaused && index === selectedImage ? 'ring-1 ring-white/30' : ''
                }`}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 rounded-full ${
                    isPaused && index === selectedImage ? 'opacity-80' : ''
                  }`}
                  style={{
                    width: index < selectedImage ? '100%' : index === selectedImage ? `${storyProgress}%` : '0%'
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>

          {/* Header with Logo and Close Button */}
          <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-50 mt-6">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-orange-400/50 shadow-xl"
              >
                <Image
                  src="/MENAA_LOGO.jpg"
                  alt="MENAA Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </motion.div>
              <div>
                <h3 className="text-white font-bold text-sm">MENAA Social Mixer</h3>
                <p className="text-white/60 text-xs">October 15, 2025</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Pause/Play Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPaused(!isPaused)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group"
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? (
                  <Play className="w-5 h-5 text-white fill-white" />
                ) : (
                  <Pause className="w-5 h-5 text-white fill-white" />
                )}
              </motion.button>

              {/* Close Button */}
              <button
                onClick={closeImageViewer}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group"
                aria-label="Close viewer"
              >
                <div className="text-white text-2xl group-hover:rotate-90 transition-transform duration-300">×</div>
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-4 pt-24 pb-32"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Paused Indicator */}
            {isPaused && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute top-24 left-1/2 -translate-x-1/2 z-50 mt-16"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-lg rounded-full border border-white/20 shadow-2xl">
                  <Pause className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">Paused</span>
                </div>
              </motion.div>
            )}

            {/* Swipe Direction Indicator */}
            {swipeDirection && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className={`absolute ${swipeDirection === 'left' ? 'right-20' : 'left-20'} top-1/2 -translate-y-1/2 z-40`}
              >
                <div className="w-16 h-16 rounded-full bg-orange-500/80 backdrop-blur-md flex items-center justify-center">
                  <ArrowLeft className={`w-8 h-8 text-white ${swipeDirection === 'left' ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            )}

            <motion.div
              key={selectedImage}
              initial={{ 
                x: slideDirection === 'next' ? '100%' : '-100%',
                opacity: 0,
                scale: 0.9
              }}
              animate={{ 
                x: 0,
                opacity: 1,
                scale: 1
              }}
              exit={{ 
                x: slideDirection === 'next' ? '-30%' : '30%',
                opacity: 0,
                scale: 0.95
              }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                opacity: { duration: 0.3 }
              }}
              className="relative max-w-5xl max-h-full w-full h-full"
              style={{
                cursor: imageScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
            >
              {/* Click zones for navigation (like Instagram stories) */}
              {imageScale === 1 && (
                <>
                  {selectedImage > 0 && (
                    <div
                      onClick={handlePrevImage}
                      className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize z-10"
                      aria-label="Previous image zone"
                    />
                  )}
                  {selectedImage < 4 && (
                    <div
                      onClick={handleNextImage}
                      className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize z-10"
                      aria-label="Next image zone"
                    />
                  )}
                </>
              )}

              <div 
                className="relative w-full h-full"
                style={{
                  transform: `scale(${imageScale}) translate(${imagePosition.x / imageScale}px, ${imagePosition.y / imageScale}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                <Image
                  src={`/events/menaaevent1_${selectedImage + 1}${selectedImage === 2 ? 'jpg' : ''}.jpg`}
                  alt={`MENAA Event Photo ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {selectedImage > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group z-50"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </motion.button>
          )}

          {selectedImage < 4 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group z-50 rotate-180"
              aria-label="Next image"
            >
              <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </motion.button>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
              <button
                onClick={() => handleZoom(-0.2)}
                className="w-8 h-8 rounded-full hover:bg-white/20 transition-all flex items-center justify-center text-white font-bold"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="text-white text-sm font-medium min-w-[3rem] text-center">
                {Math.round(imageScale * 100)}%
              </span>
              <button
                onClick={() => handleZoom(0.2)}
                className="w-8 h-8 rounded-full hover:bg-white/20 transition-all flex items-center justify-center text-white font-bold"
                aria-label="Zoom in"
              >
                +
              </button>
            </div>

            {/* Reset Zoom Button */}
            {imageScale !== 1 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => {
                  setImageScale(1)
                  setImagePosition({ x: 0, y: 0 })
                }}
                className="px-4 py-2 rounded-full bg-orange-500/80 backdrop-blur-md hover:bg-orange-500 transition-all text-white text-sm font-medium"
              >
                Reset
              </motion.button>
            )}

            {/* Image Counter */}
            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">
                {selectedImage + 1} / 5
              </span>
            </div>
          </div>

          {/* Swipe Indicator for Mobile */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-xs text-center"
            >
              <p>Swipe or tap sides to navigate</p>
              <p className="mt-1">Pinch to zoom</p>
            </motion.div>
          </div>

          {/* Keyboard Shortcuts Hint for Desktop */}
          <div className="absolute bottom-4 left-4 hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/40 text-xs space-y-1 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2"
            >
              <p>← → Arrow keys to navigate</p>
              <p>SPACE to pause • +/− to zoom</p>
              <p>ESC to close</p>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  x: [0, (i - 2) * 30],
                  y: [0, -50]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
                style={{
                  left: '50%',
                  top: '50%'
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

