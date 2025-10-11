"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Instagram, Mail, Calendar, Globe, Heart, MapPin, ExternalLink, UserPlus } from "lucide-react"
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

const links = [
  {
    title: "Become a Member!",
    description: "Join our community today",
    url: "/member-form",
    icon: UserPlus,
    gradient: "from-orange-600 via-yellow-600 to-amber-600",
    featured: true,
  },
  {
    title: "Instagram",
    description: "Follow our journey & events",
    url: "https://instagram.com/deanzamenaa",
    icon: Instagram,
    gradient: "from-orange-500 via-orange-600 to-orange-700",
  },
  {
    title: "Join Our Discord",
    description: "Connect with the community",
    url: "https://discord.gg/UAS7xXRj27",
    icon: DiscordIcon,
    gradient: "from-amber-600 via-yellow-600 to-amber-700",
  },
  {
    title: "Upcoming Events",
    description: "See what we have planned",
    url: "/events",
    icon: Calendar,
    gradient: "from-yellow-600 via-amber-600 to-orange-600",
  },
  {
    title: "About Us",
    description: "Learn more about MENAA",
    url: "/about",
    icon: Globe,
    gradient: "from-amber-700 via-orange-700 to-yellow-700",
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team",
    url: "mailto:menasc.da@gmail.com",
    icon: Mail,
    gradient: "from-orange-700 via-amber-700 to-yellow-700",
  },
]

export function MENAALinks() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* MENAA Orange/Brown/Yellow morphing gradient blobs */}
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
        <div
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-orange-500/20 to-amber-500/20 animate-gooey-morph blur-3xl"
          style={{ animationDelay: "4s" }}
        />
        
        {/* Additional warm color blobs for rich MENAA palette */}
        <div
          className="absolute top-3/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-yellow-600/15 to-orange-600/15 animate-gooey-morph blur-3xl"
          style={{ animationDelay: "7s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/2 w-[350px] h-[350px] bg-gradient-to-br from-amber-600/20 to-yellow-500/20 animate-gooey-morph blur-3xl"
          style={{ animationDelay: "5s" }}
        />

        {/* Enhanced 3D Floating Geometric Elements - MENAA Orange/Brown/Yellow */}
        
        {/* Large floating pyramids with shadows */}
        <div className="absolute top-24 right-24 w-24 h-24 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700 transform rotate-45 animate-float-3d opacity-70 shadow-2xl shadow-orange-500/50" />
        <div className="absolute bottom-24 left-24 w-28 h-28 bg-gradient-to-b from-yellow-400 via-yellow-500 to-amber-700 transform rotate-12 animate-float-3d-reverse opacity-65 shadow-2xl shadow-yellow-500/50" style={{ animationDelay: "2s" }} />
        
        {/* Medium pyramids */}
        <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 transform -rotate-12 animate-float-3d opacity-60 shadow-xl shadow-amber-500/40" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-22 h-22 bg-gradient-to-b from-orange-400 via-orange-500 to-brown-700 transform rotate-45 animate-float-3d-reverse opacity-65 shadow-xl shadow-orange-500/40" style={{ animationDelay: "6s" }} />
        
        {/* Rotating 3D cubes */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-700 transform rotate-45 animate-rotate-3d opacity-55 shadow-xl shadow-yellow-500/30" />
        <div className="absolute bottom-1/3 right-1/3 w-18 h-18 bg-gradient-to-br from-orange-500 to-amber-700 transform rotate-12 animate-rotate-3d-reverse opacity-60 shadow-xl shadow-orange-500/30" style={{ animationDelay: "3s" }} />
        
        {/* Additional floating geometric shapes */}
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-700 transform -rotate-45 animate-rotate-3d opacity-50 shadow-lg shadow-yellow-500/30" style={{ animationDelay: "5s" }} />
        <div className="absolute top-3/4 left-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-700 transform rotate-30 animate-float-3d opacity-55 shadow-lg shadow-orange-500/30" style={{ animationDelay: "7s" }} />
        
        {/* Arabesque-inspired floating circles with enhanced glow */}
        <div className="absolute top-20 left-1/2 w-12 h-12 border-3 border-orange-400/50 rounded-full animate-pulse-3d opacity-60 shadow-lg shadow-orange-400/40" />
        <div className="absolute bottom-20 right-1/2 w-14 h-14 border-3 border-yellow-400/50 rounded-full animate-pulse-3d opacity-60 shadow-lg shadow-yellow-400/40" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/6 w-10 h-10 border-3 border-amber-400/50 rounded-full animate-pulse-3d opacity-55 shadow-lg shadow-amber-400/40" style={{ animationDelay: "2.5s" }} />
        <div className="absolute bottom-1/2 right-1/6 w-11 h-11 border-3 border-orange-400/50 rounded-full animate-pulse-3d opacity-55 shadow-lg shadow-orange-400/40" style={{ animationDelay: "4.5s" }} />
        
        {/* Floating stars - Islamic geometric motifs */}
        <div className="absolute top-40 left-20 w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 opacity-70 shadow-xl shadow-yellow-500/50" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
        </div>
        <div className="absolute bottom-40 right-20 w-18 h-18 animate-float-3d" style={{ animationDelay: "3s" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-600 opacity-70 shadow-xl shadow-orange-500/50" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
        </div>

        {/* Enhanced rotating geometric patterns - MENAA Orange/Brown/Yellow */}
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-orange-400/20 rounded-full animate-rotate-slow shadow-lg shadow-orange-400/10" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 border-2 border-yellow-400/20 rounded-full animate-rotate-slow shadow-lg shadow-yellow-400/10"
          style={{ animationDirection: "reverse" }}
        />
        
        {/* Additional enhanced geometric rings */}
        <div className="absolute top-1/2 left-10 w-48 h-48 border-2 border-amber-400/20 rounded-full animate-rotate-slow shadow-lg shadow-amber-400/10" style={{ animationDelay: "5s" }} />
        <div className="absolute bottom-1/2 right-10 w-56 h-56 border-2 border-orange-400/20 rounded-full animate-rotate-slow shadow-lg shadow-orange-400/10" style={{ animationDelay: "7s", animationDirection: "reverse" }} />
        
        {/* Nested ornamental rings */}
        <div className="absolute top-32 right-32 w-48 h-48 border border-yellow-400/15 rounded-full animate-rotate-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-32 w-64 h-64 border border-orange-400/15 rounded-full animate-rotate-slow" style={{ animationDelay: "4s", animationDirection: "reverse" }} />

        {/* Enhanced sparkle effects with MENAA Orange/Brown/Yellow - optimized for performance */}
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full animate-sparkle ${
              i % 4 === 0 ? 'bg-orange-400 shadow-lg shadow-orange-400/50' : 
              i % 4 === 1 ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 
              i % 4 === 2 ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 
              'bg-orange-300 shadow-lg shadow-orange-300/50'
            } hidden md:block`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
        
        {/* Reduced sparkles for mobile devices */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`mobile-${i}`}
            className={`absolute w-1.5 h-1.5 rounded-full animate-sparkle ${
              i % 3 === 0 ? 'bg-orange-400' : 
              i % 3 === 1 ? 'bg-yellow-400' : 
              'bg-amber-400'
            } block md:hidden`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              willChange: 'transform, opacity',
            }}
          />
        ))}

        {/* MENA Arabesque Patterns */}
        <ArabesquePatterns />

        {/* Enhanced cursor glow with MENAA Orange/Brown/Yellow */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(234, 179, 8, 0.2) 40%, rgba(180, 83, 9, 0.15) 60%, transparent 80%)",
            opacity: mounted ? 1 : 0,
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full pointer-events-none transition-all duration-500 ease-out blur-xl"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(234, 179, 8, 0.25) 50%, transparent 70%)",
            opacity: mounted ? 0.8 : 0,
          }}
        />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {/* Logo with MENAA-inspired animated border */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              {/* Rotating border effect with MENAA Orange/Brown/Yellow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-border-flow" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-600 rounded-3xl animate-rotate-slow opacity-50" />
              
              {/* Additional MENAA-inspired rings */}
              <div className="absolute inset-[-8px] bg-gradient-to-r from-orange-600 via-yellow-500 to-amber-500 rounded-3xl animate-rotate-slow opacity-30" />
              <div className="absolute inset-[-16px] bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 rounded-3xl animate-rotate-slow opacity-20" style={{ animationDirection: "reverse" }} />

              {/* Main logo with MENAA Logo Image */}
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

          {/* Title with MENAA gradient animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent animate-border-flow text-balance leading-tight">
            DE ANZA MENAA
          </h1>

          {/* Subtitle with MENAA-inspired glow effect */}
          <div className="relative inline-block mb-6">
            <p className="text-xl md:text-2xl text-white/90 font-medium text-balance relative z-10">
              Middle East & North African Association
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-amber-500/20 blur-2xl animate-pulse-glow" />
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto text-pretty leading-relaxed">
            Building community, celebrating culture, and creating connections at De Anza College
          </p>

          {/* Decorative line with MENAA styling */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
            <Heart className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          </div>
        </div>

        <div className="space-y-6 mb-12">
          {/* Featured Member Form Section */}
          <div 
            className={`transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            {(() => {
              const link = links[0]
              const Icon = link.icon
              return (
                <Link href={link.url} className="block">
                  <Card className="group relative overflow-hidden border-orange-500/20 bg-gradient-to-br from-orange-950/40 to-amber-950/50 backdrop-blur-md transition-all duration-500 hover:scale-[1.01] hover:border-orange-400/40 shadow-2xl hover:shadow-orange-500/30 card-spotlight">
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-20 group-hover:opacity-30 transition-all duration-500 animate-border-flow`} />
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                    </div>

                    <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow`} />
                        <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br ${link.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                          <Icon className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-2xl" />
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent animate-text-shimmer">
                          {link.title}
                        </h3>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                          {link.description}
                        </p>
                      </div>

                      <div className="flex-shrink-0 transform group-hover:translate-x-3 group-hover:scale-125 transition-all duration-500">
                        <ExternalLink className="w-8 h-8 text-white/60 group-hover:text-white transition-colors duration-500 drop-shadow-lg" />
                      </div>
                    </div>

                    <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${link.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                  </Card>
                </Link>
              )
            })()}
          </div>

          {/* Other Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.slice(1).map((link, index) => {
              const actualIndex = index + 1
              const Icon = link.icon
              const isInternal = link.url.startsWith("/")
              const LinkWrapper = isInternal ? Link : "a"
              const linkProps = isInternal 
                ? { href: link.url } 
                : { href: link.url, target: "_blank", rel: "noopener noreferrer" }

              return (
                <div
                  key={actualIndex}
                  className={`transition-all duration-700 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${actualIndex * 100}ms` }}
                  onMouseEnter={() => setHoveredIndex(actualIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <LinkWrapper {...linkProps} className="block h-full">
                    <Card className={`group relative overflow-hidden border-orange-500/10 bg-gradient-to-br from-orange-950/20 to-amber-950/30 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-orange-400/30 h-full card-spotlight ${
                      hoveredIndex === actualIndex ? "shadow-2xl shadow-orange-500/25" : "shadow-lg shadow-stone-900/20"
                    }`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500 animate-border-flow`} />

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                      </div>

                      <div className="absolute top-2 right-2 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                        <div className="w-full h-full border-t-2 border-r-2 border-orange-400 rounded-tr-lg" />
                      </div>
                      <div className="absolute bottom-2 left-2 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                        <div className="w-full h-full border-b-2 border-l-2 border-yellow-400 rounded-bl-lg" />
                      </div>

                      <div className="relative p-6 flex items-center gap-6">
                        <div className="relative flex-shrink-0">
                          <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                            <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500 text-balance tracking-tight">
                            {link.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-500 text-pretty">
                            {link.description}
                          </p>
                        </div>

                        <div className="flex-shrink-0 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-500">
                          <div className="relative">
                            <ExternalLink className="w-6 h-6 text-white/40 group-hover:text-white transition-colors duration-500 drop-shadow-sm" />
                            <div className="absolute inset-0 w-6 h-6 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </div>
                      </div>

                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </Card>
                  </LinkWrapper>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`text-center transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          {/* Social icons with MENAA-inspired hover effects */}
          <div className="flex justify-center gap-4 mb-6">
            {[
              { icon: Instagram, href: "https://instagram.com/deanzamenaa", color: "from-orange-500 to-orange-600" },
              { icon: Mail, href: "mailto:menasc.da@gmail.com", color: "from-amber-600 to-yellow-600" },
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

          {/* Footer text with MENAA styling */}
          <p className="text-sm text-white/40 mb-2">
            Made with <Heart className="inline w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" /> by MENAA
          </p>
          <p className="text-xs text-white/30">© 2025 De Anza MENAA. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
