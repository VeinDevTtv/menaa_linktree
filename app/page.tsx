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
import { motion } from "framer-motion"
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

export default function Home() {
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

  const missionValues = [
    {
      icon: Users,
      title: "Community Building",
      description: "Creating a welcoming space for all MENAA students and allies to connect, share experiences, and build lasting friendships.",
      gradient: "from-orange-500 via-orange-600 to-orange-700",
    },
    {
      icon: Sparkles,
      title: "Cultural Celebration",
      description: "Showcasing the rich diversity of Middle Eastern and North African cultures through events, food, music, and traditions.",
      gradient: "from-amber-600 via-yellow-600 to-amber-700",
    },
    {
      icon: Target,
      title: "Advocacy & Awareness",
      description: "Raising awareness about MENAA issues, promoting cultural understanding, and advocating for our community's needs.",
      gradient: "from-yellow-600 via-amber-600 to-orange-600",
    },
    {
      icon: BookOpen,
      title: "Education & Growth",
      description: "Providing resources, workshops, and discussions to educate about MENAA history, current events, and cultural heritage.",
      gradient: "from-orange-700 via-amber-700 to-yellow-700",
    },
  ]

  const upcomingEvents = [
    {
      title: "FIFA/Henna Night",
      date: "TBA",
      description: "Experience the perfect blend of competitive FIFA gaming and beautiful henna art. Show off your gaming skills or get stunning henna designs!",
      icon: Gamepad2,
      gradient: "from-amber-600 via-yellow-600 to-amber-700",
    },
    {
      title: "Movie Night",
      date: "TBA",
      description: "Grab your friends and join us for a cozy movie night featuring a beloved MENAA film. Complete with popcorn, snacks, and great company.",
      icon: Film,
      gradient: "from-yellow-600 via-amber-600 to-orange-600",
    },
  ]

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950"
    >
      {/* Background Effects - MENAA Orange/Brown/Yellow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Morphing gradient blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-yellow-500/30 animate-gooey-morph blur-3xl"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-600/25 to-orange-600/25 animate-gooey-morph blur-3xl"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-600/20 to-amber-700/20 animate-gooey-morph blur-3xl"
          style={{ animationDelay: "6s" }}
        />

        {/* 3D Floating Geometric Elements */}
        <div className="absolute top-24 right-24 w-24 h-24 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700 transform rotate-45 animate-float-3d opacity-70 shadow-2xl shadow-orange-500/50" />
        <div className="absolute bottom-24 left-24 w-28 h-28 bg-gradient-to-b from-yellow-400 via-yellow-500 to-amber-700 transform rotate-12 animate-float-3d-reverse opacity-65 shadow-2xl shadow-yellow-500/50" style={{ animationDelay: "2s" }} />

        {/* Arabesque Patterns */}
        <ArabesquePatterns />

        {/* Cursor glow */}
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

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-12 md:py-20">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/" aria-label="Go to home" className="relative group rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-border-flow" />
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
            About DE ANZA MENAA
          </h1>

          <div className="relative inline-block mb-6">
            <p className="text-xl md:text-2xl text-white/90 font-medium text-balance relative z-10">
              Middle East & North African Association
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-amber-500/20 blur-2xl animate-pulse-glow" />
          </div>

          <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto text-pretty leading-relaxed">
            We are a vibrant student organization dedicated to celebrating, preserving, and sharing the rich cultural heritage 
            of the Middle East and North Africa at De Anza College.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
            <Heart className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          </div>

          {/* Prominent CTAs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link 
                href="/events"
                className={`group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 hover:from-orange-500 hover:via-yellow-500 hover:to-amber-500 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-orange-500/50 transform transition-all duration-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <Calendar className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                <span>View Upcoming Events</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link 
                href="/apply-officer"
                className={`group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-yellow-500/50 transform transition-all duration-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <UserPlus className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                <span>Apply for Officer</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link 
                href="/member-form"
                className={`group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 hover:from-yellow-500 hover:via-amber-500 hover:to-orange-500 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-amber-500/50 transform transition-all duration-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <Users className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                <span>Member Form</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Our Mission & Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionValues.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
                >
                  <InteractiveCard className="group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-orange-400/30 h-full">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500 animate-border-flow`}
                    />

                    <div className="relative p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative flex-shrink-0">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                          />
                          <div
                            className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                          >
                            <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-white/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </InteractiveCard>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* What We Do Section */}
        <div 
          className={`mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
            What We Do
          </h2>

          <Card className="border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <PartyPopper className="w-6 h-6 text-orange-400" />
                  Events & Activities
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Cultural nights featuring traditional music, dance, and food</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Weekly social gatherings and study sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Holiday celebrations and cultural festivals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Movie nights and cultural film screenings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Community service and volunteer opportunities</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-yellow-400" />
                  Learning & Discussion
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Guest speaker series with MENAA professionals and activists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Workshops on language, art, and cultural traditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Panel discussions on current events and social issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Cultural exchange programs with other student organizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>History and heritage educational sessions</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
                >
                  <InteractiveCard className="group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-orange-400/30 h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                    <div className="relative p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{event.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-orange-300">
                            <Clock className="w-3 h-3" />
                            <span>{event.date === "TBA" ? "More info coming soon" : event.date}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white/70 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </InteractiveCard>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Join Us Section */}
        <div 
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-950/40 to-amber-950/50 backdrop-blur-md p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Join Our Community
              </h2>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Whether you're from the MENA region or simply interested in learning more about our cultures, 
                everyone is welcome! Join us to make new friends, celebrate diversity, and create unforgettable memories.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://instagram.com/deanzamenaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Follow Us on Instagram</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>

                <a
                  href="https://discord.gg/UAS7xXRj27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  <DiscordIcon className="w-5 h-5" />
                  <span>Join Our Discord</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-white/60 mb-3">
                  <MapPinned className="w-5 h-5" />
                  <span className="font-medium">Find Us at De Anza College</span>
                </div>
                <p className="text-white/50 text-sm">
                  Check our Instagram for meeting times and locations
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-12 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1400ms" }}
        >
          <div className="flex justify-center gap-4 mb-6">
            {[
              { icon: Instagram, href: "https://instagram.com/deanzamenaa", color: "from-orange-500 to-orange-600" },
              { icon: DiscordIcon, href: "https://discord.gg/UAS7xXRj27", color: "from-amber-600 to-yellow-600" },
              { icon: Mail, href: "mailto:menasc.da@gmail.com", color: "from-yellow-600 to-amber-600" },
            ].map((social, i) => {
              const SocialIcon = social.icon
              return (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300`}
                  />
                  <div
                    className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}
                  >
                    <SocialIcon className="w-6 h-6 text-white" />
                  </div>
                </a>
              )
            })}
          </div>

          <p className="text-sm text-white/40 mb-2">
            Made with <Heart className="inline w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" /> by MENAA
          </p>
          <p className="text-xs text-white/30">© 2025 De Anza MENAA. All rights reserved.</p>
          <p className="text-xs text-white/30 mt-1 hover:text-white/50 transition-colors">
            Developed with <Heart className="inline w-3 h-3 text-orange-400 fill-orange-400 -mt-0.5" /> by Abdelkarim Ait Bourich
          </p>
        </div>
      </div>
    </div>
  )
}
