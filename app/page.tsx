"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { 
  Instagram, Mail, Heart, 
  MapPin, ExternalLink, Users, Target, Sparkles, Award, BookOpen, 
  PartyPopper, Clock, MapPinned, Gamepad2, Film, Trophy, Calendar, ArrowRight, UserPlus
} from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"

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

// Magnetic button component
const MagneticButton = ({ children, className, ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    ref.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
  }
  
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }
  
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

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

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const missionValues = [
    {
      icon: Users,
      title: "Community Building",
      description: "Creating a welcoming space for all MENAA students and allies to connect, share experiences, and build lasting friendships.",
      gradient: "from-orange-500 via-orange-600 to-orange-700",
      number: "01",
    },
    {
      icon: Sparkles,
      title: "Cultural Celebration",
      description: "Showcasing the rich diversity of Middle Eastern and North African cultures through events, food, music, and traditions.",
      gradient: "from-amber-600 via-yellow-600 to-amber-700",
      number: "02",
    },
    {
      icon: Target,
      title: "Advocacy & Awareness",
      description: "Raising awareness about MENAA issues, promoting cultural understanding, and advocating for our community's needs.",
      gradient: "from-yellow-600 via-amber-600 to-orange-600",
      number: "03",
    },
    {
      icon: BookOpen,
      title: "Education & Growth",
      description: "Providing resources, workshops, and discussions to educate about MENAA history, current events, and cultural heritage.",
      gradient: "from-orange-700 via-amber-700 to-yellow-700",
      number: "04",
    },
  ]

  const upcomingEvents = [
    {
      title: "Movie Night",
      date: "TBA",
      description: "Grab your friends and join us for a cozy movie night featuring a beloved MENAA film. Complete with popcorn, snacks, and great company.",
      icon: Film,
      gradient: "from-yellow-600 via-amber-600 to-orange-600",
    },
  ]

  // Section refs for scroll animations
  const missionRef = useRef(null)
  const whatWeDoRef = useRef(null)
  const eventsRef = useRef(null)
  const communityRef = useRef(null)
  const footerRef = useRef(null)

  const missionInView = useInView(missionRef, { once: true, margin: "-100px" })
  const whatWeDoInView = useInView(whatWeDoRef, { once: true, margin: "-100px" })
  const eventsInView = useInView(eventsRef, { once: true, margin: "-100px" })
  const communityInView = useInView(communityRef, { once: true, margin: "-100px" })
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" })

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.15),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(234,179,8,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_50%)]" />
        </div>

        {/* Morphing gradient blobs with parallax */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-yellow-500/30 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "0s",
            y: useTransform(scrollYProgress, [0, 1], [0, 50])
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-600/25 to-orange-600/25 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "3s",
            y: useTransform(scrollYProgress, [0, 1], [0, -50])
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-600/20 to-amber-700/20 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "6s",
            y: useTransform(scrollYProgress, [0, 1], [0, 30])
          }}
        />

        {/* 3D Floating Geometric Elements with parallax */}
        <motion.div 
          className="absolute top-24 right-24 w-24 h-24 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700 transform rotate-45 animate-float-3d opacity-70 shadow-2xl shadow-orange-500/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        />
        <motion.div 
          className="absolute bottom-24 left-24 w-28 h-28 bg-gradient-to-b from-yellow-400 via-yellow-500 to-amber-700 transform rotate-12 animate-float-3d-reverse opacity-65 shadow-2xl shadow-yellow-500/50"
          style={{ 
            animationDelay: "2s",
            y: useTransform(scrollYProgress, [0, 1], [0, -100])
          }}
        />

        {/* Arabesque Patterns */}
        <ArabesquePatterns />

        {/* Enhanced multi-layer cursor glow */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(234, 179, 8, 0.2) 40%, rgba(180, 83, 9, 0.15) 60%, transparent 80%)",
            opacity: mounted ? 1 : 0,
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none transition-all duration-500 ease-out blur-xl"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(234, 179, 8, 0.25) 50%, transparent 70%)",
            opacity: mounted ? 0.8 : 0,
          }}
        />
      </div>

      {/* Hero Section - Full Viewport */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Animated Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={mounted ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center lg:justify-start"
            >
              <Link href="/" aria-label="Go to home" className="relative group">
                {/* Multiple rotating borders */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-600 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 animate-border-flow" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-600 rounded-3xl animate-rotate-slow opacity-50" />
                <div className="absolute inset-[-8px] bg-gradient-to-r from-orange-600 via-yellow-500 to-amber-500 rounded-3xl animate-rotate-slow opacity-30" style={{ animationDirection: "reverse" }} />
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  className="relative w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-2 bg-stone-950 rounded-2xl flex items-center justify-center overflow-hidden">
                    <Image 
                      src="/MENAA_LOGO.jpg"
                      alt="MENAA Logo"
                      width={180}
                      height={180}
                      className="object-cover rounded-xl"
                      priority
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Right: Headline and Subtitle */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent animate-border-flow text-balance leading-tight"
              >
                About DE ANZA MENAA
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative inline-block mb-6"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium text-balance relative z-10">
                  Middle East & North African Association
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-amber-500/20 blur-2xl animate-pulse-glow" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base md:text-lg text-white/70 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                We are a vibrant student organization dedicated to celebrating, preserving, and sharing the rich cultural heritage 
                of the Middle East and North Africa at De Anza College.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-4 mb-12"
              >
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
                <Heart className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              </motion.div>
            </motion.div>
          </div>

          {/* Center-bottom: Three Prominent CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <MagneticButton>
              <Link 
                href="/events"
                className="group relative block"
              >
                <InteractiveCard className="relative overflow-hidden border-orange-500/20 bg-gradient-to-br from-orange-950/40 to-amber-950/50 backdrop-blur-md p-6 md:p-8 h-full transition-all duration-500 hover:border-orange-400/40 hover:shadow-2xl hover:shadow-orange-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600 via-yellow-600 to-amber-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Calendar className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">View Events</h3>
                        <p className="text-sm text-white/70">Upcoming activities</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </InteractiveCard>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link 
                href="/apply-officer"
                className="group relative block"
              >
                <InteractiveCard className="relative overflow-hidden border-amber-500/20 bg-gradient-to-br from-amber-950/40 to-yellow-950/50 backdrop-blur-md p-6 md:p-8 h-full transition-all duration-500 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <UserPlus className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Apply Now</h3>
                        <p className="text-sm text-white/70">Become an officer</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </InteractiveCard>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link 
                href="/member-form"
                className="group relative block"
              >
                <InteractiveCard className="relative overflow-hidden border-yellow-500/20 bg-gradient-to-br from-yellow-950/40 to-orange-950/50 backdrop-blur-md p-6 md:p-8 h-full transition-all duration-500 hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-600 via-amber-600 to-orange-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Join Us</h3>
                        <p className="text-sm text-white/70">Become a member</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </InteractiveCard>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Values Section */}
      <section ref={missionRef} className="relative z-10 py-20 md:py-32 px-4">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent"
          >
            Our Mission & Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {missionValues.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={missionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <InteractiveCard className="group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-orange-400/30 h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500 animate-border-flow`} />
                    
                    <div className="relative p-8 md:p-10">
                      {/* Numbered Badge */}
                      <div className="absolute top-6 right-6">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {item.number}
                        </div>
                      </div>

                      <div className="flex items-start gap-6 mb-6">
                        <div className="relative flex-shrink-0">
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 6 }}
                            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center transform transition-all duration-500 shadow-xl`}
                          >
                            <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                          </motion.div>
                        </div>

                        <div className="flex-1 pt-2">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-white/80 leading-relaxed text-lg">
                        {item.description}
                      </p>

                      <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </div>
                  </InteractiveCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What We Do Section - Split Screen Design */}
      <section ref={whatWeDoRef} className="relative z-10 py-20 md:py-32 px-4">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={whatWeDoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent"
          >
            What We Do
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whatWeDoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left: Visual Element */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={whatWeDoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-yellow-500/20 to-amber-500/20 rounded-3xl blur-2xl" />
                    <div className="relative bg-gradient-to-br from-orange-950/40 to-amber-950/50 backdrop-blur-md rounded-3xl p-12 border border-orange-500/20">
                      <div className="flex flex-col items-center gap-6">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl"
                        >
                          <PartyPopper className="w-12 h-12 text-white" />
                        </motion.div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-2">Events & Learning</h3>
                          <p className="text-white/70">Building community through shared experiences</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Two-Column Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={whatWeDoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-10"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <PartyPopper className="w-7 h-7 text-orange-400" />
                      Events & Activities
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Cultural nights featuring traditional music, dance, and food",
                        "Weekly social gatherings and study sessions",
                        "Holiday celebrations and cultural festivals",
                        "Movie nights and cultural film screenings",
                        "Community service and volunteer opportunities",
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={whatWeDoInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                          className="flex items-start gap-3 group cursor-default"
                        >
                          <span className="text-orange-400 mt-1 text-xl group-hover:scale-125 transition-transform duration-300">•</span>
                          <span className="text-white/80 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <BookOpen className="w-7 h-7 text-yellow-400" />
                      Learning & Discussion
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Guest speaker series with MENAA professionals and activists",
                        "Workshops on language, art, and cultural traditions",
                        "Panel discussions on current events and social issues",
                        "Cultural exchange programs with other student organizations",
                        "History and heritage educational sessions",
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={whatWeDoInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                          className="flex items-start gap-3 group cursor-default"
                        >
                          <span className="text-yellow-400 mt-1 text-xl group-hover:scale-125 transition-transform duration-300">•</span>
                          <span className="text-white/80 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section - Timeline Style */}
      <section ref={eventsRef} className="relative z-10 py-20 md:py-32 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent"
          >
            Upcoming Events
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/30 via-yellow-500/30 to-amber-500/30 hidden md:block" />

            <div className="space-y-8">
              {upcomingEvents.map((event, index) => {
                const Icon = event.icon
                const isEven = index % 2 === 0
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={eventsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 border-4 border-stone-950 z-10 hidden md:block" />

                    {/* Event Card */}
                    <div className={`flex-1 ${isEven ? "md:pr-1/2 md:pr-8" : "md:pl-1/2 md:pl-8"} w-full md:w-auto`}>
                      <InteractiveCard className="group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-orange-400/30 h-full">
                        <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                        <div className="relative p-6 md:p-8">
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${event.gradient} flex items-center justify-center shadow-lg`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${event.gradient} text-white text-sm font-semibold`}>
                                  {event.date === "TBA" ? "Coming Soon" : event.date}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-orange-300">
                                <Clock className="w-4 h-4" />
                                <span>{event.date === "TBA" ? "More info coming soon" : event.date}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-white/80 leading-relaxed text-lg">
                            {event.description}
                          </p>
                        </div>
                      </InteractiveCard>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* View All Events Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <MagneticButton>
                <Link
                  href="/events"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 hover:from-orange-500 hover:via-yellow-500 hover:to-amber-500 rounded-2xl text-white font-semibold text-lg shadow-2xl hover:shadow-orange-500/50 transform transition-all duration-300"
                >
                  <span>View All Events</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Our Community Section - Centered CTA Design */}
      <section ref={communityRef} className="relative z-10 py-20 md:py-32 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={communityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-orange-500/20 bg-gradient-to-br from-orange-950/40 to-amber-950/50 backdrop-blur-md p-10 md:p-16 text-center relative overflow-hidden">
              {/* Animated Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-amber-500/10 animate-border-flow opacity-50" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={communityInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent"
                >
                  Join Our Community
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={communityInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed"
                >
                  Whether you're from the MENA region or simply interested in learning more about our cultures, 
                  everyone is welcome! Join us to make new friends, celebrate diversity, and create unforgettable memories.
                </motion.p>

                {/* Modern Button Group */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={communityInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-4 mb-10"
                >
                  <MagneticButton>
                    <a
                      href="https://instagram.com/deanzamenaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 transform transition-all duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Follow on Instagram</span>
                      <ExternalLink className="w-4 h-4 opacity-70" />
                    </a>
                  </MagneticButton>

                  <MagneticButton>
                    <a
                      href="https://discord.gg/UAS7xXRj27"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-yellow-500/50 transform transition-all duration-300"
                    >
                      <DiscordIcon className="w-5 h-5" />
                      <span>Join Discord</span>
                      <ExternalLink className="w-4 h-4 opacity-70" />
                    </a>
                  </MagneticButton>
                </motion.div>

                {/* Location Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={communityInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="pt-8 border-t border-white/10"
                >
                  <div className="flex items-center justify-center gap-3 text-white/80 mb-2">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MapPinned className="w-6 h-6 text-orange-400" />
                    </motion.div>
                    <span className="font-semibold text-lg">Find Us at De Anza College</span>
                  </div>
                  <p className="text-white/60 text-sm">
                    Check our Instagram for meeting times and locations
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimalist Design */}
      <footer ref={footerRef} className="relative z-10 py-12 md:py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Social Icons */}
            <div className="flex justify-center gap-6 mb-8">
              {[
                { icon: Instagram, href: "https://instagram.com/deanzamenaa", color: "from-orange-500 to-orange-600" },
                { icon: DiscordIcon, href: "https://discord.gg/UAS7xXRj27", color: "from-amber-600 to-yellow-600" },
                { icon: Mail, href: "mailto:menasc.da@gmail.com", color: "from-yellow-600 to-amber-600" },
              ].map((social, i) => {
                const SocialIcon = social.icon
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300`} />
                    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      <SocialIcon className="w-7 h-7 text-white" />
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Footer Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={footerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              <p className="text-sm text-white/50 mb-2">
                Made with <Heart className="inline w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" /> by MENAA
              </p>
              <p className="text-xs text-white/40">© 2025 De Anza MENAA. All rights reserved.</p>
              <p className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Developed with <Heart className="inline w-3 h-3 text-orange-400 fill-orange-400 -mt-0.5" /> by Abdelkarim Ait Bourich
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
