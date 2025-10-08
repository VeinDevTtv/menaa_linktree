"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { 
  Instagram, Twitter, Mail, Calendar, Globe, Heart, MessageCircle, 
  MapPin, ExternalLink, Users, Target, Sparkles, Award, BookOpen, 
  PartyPopper, ArrowLeft, Clock, MapPinned
} from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"

export default function AboutPage() {
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
      gradient: "from-amber-500 via-yellow-500 to-orange-600",
    },
    {
      icon: Sparkles,
      title: "Cultural Celebration",
      description: "Showcasing the rich diversity of Middle Eastern and North African cultures through events, food, music, and traditions.",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    },
    {
      icon: Target,
      title: "Advocacy & Awareness",
      description: "Raising awareness about MENAA issues, promoting cultural understanding, and advocating for our community's needs.",
      gradient: "from-blue-800 via-indigo-700 to-purple-700",
    },
    {
      icon: BookOpen,
      title: "Education & Growth",
      description: "Providing resources, workshops, and discussions to educate about MENAA history, current events, and cultural heritage.",
      gradient: "from-red-600 via-rose-600 to-pink-600",
    },
  ]

  const upcomingEvents = [
    {
      title: "Cultural Night 2025",
      date: "Coming Soon",
      description: "Join us for an evening of traditional performances, delicious food, and vibrant cultural displays.",
      icon: PartyPopper,
    },
    {
      title: "Weekly Meetups",
      date: "Every Thursday",
      description: "Casual gatherings to connect with fellow students, share stories, and enjoy great company.",
      icon: Users,
    },
    {
      title: "Guest Speaker Series",
      date: "Monthly",
      description: "Hear from inspiring MENAA professionals, activists, and community leaders.",
      icon: Award,
    },
  ]

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

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-12 md:py-20">
        {/* Back Button */}
        <Link 
          href="/"
          className={`inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-2xl text-white transition-all duration-300 hover:scale-105 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Links</span>
        </Link>

        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-gradient-shift" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 rounded-3xl animate-rotate-slow opacity-50" />
              
              <div className="relative w-32 h-32 bg-gradient-to-br from-amber-500 via-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <div className="absolute inset-2 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-br from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
                    M
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift text-balance leading-tight">
            About DE ANZA MENAA
          </h1>

          <div className="relative inline-block mb-6">
            <p className="text-xl md:text-2xl text-white/90 font-medium text-balance relative z-10">
              Middle East & North African Association
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-blue-500/20 blur-2xl animate-pulse-glow" />
          </div>

          <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto text-pretty leading-relaxed">
            We are a vibrant student organization dedicated to celebrating, preserving, and sharing the rich cultural heritage 
            of the Middle East and North Africa at De Anza College.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Our Mission & Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionValues.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-white/30 h-full">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}
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
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* What We Do Section */}
        <div 
          className={`mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
            What We Do
          </h2>

          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <PartyPopper className="w-6 h-6 text-amber-400" />
                  Events & Activities
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Cultural nights featuring traditional music, dance, and food</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Weekly social gatherings and study sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Holiday celebrations and cultural festivals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Movie nights and cultural film screenings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Community service and volunteer opportunities</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  Learning & Discussion
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Guest speaker series with MENAA professionals and activists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Workshops on language, art, and cultural traditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Panel discussions on current events and social issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Cultural exchange programs with other student organizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
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
            className={`text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${(index + 7) * 100}ms` }}
                >
                  <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-white/30 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    <div className="relative p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{event.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-amber-300">
                            <Clock className="w-3 h-3" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white/70 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Join Us Section */}
        <div 
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <Card className="border-white/20 bg-gradient-to-br from-white/10 to-white/15 backdrop-blur-md p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
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
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Follow Us on Instagram</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>

                <a
                  href="#"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
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
          style={{ transitionDelay: "1100ms" }}
        >
          <div className="flex justify-center gap-4 mb-6">
            {[
              { icon: Instagram, href: "https://instagram.com/deanzamenaa", color: "from-amber-500 to-orange-600" },
              { icon: Twitter, href: "https://twitter.com/deanzamenaa", color: "from-emerald-500 to-teal-600" },
              { icon: Mail, href: "mailto:menasc.da@gmail.com", color: "from-blue-600 to-indigo-700" },
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
            Made with <Heart className="inline w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" /> by MENAA
          </p>
          <p className="text-xs text-white/30">© 2025 De Anza MENAA. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

