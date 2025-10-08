"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Instagram, Mail, Calendar, Globe, Heart, MessageCircle, MapPin, ExternalLink } from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"

const links = [
  {
    title: "Instagram",
    description: "Follow our journey & events",
    url: "https://instagram.com/deanzamenaa",
    icon: Instagram,
    gradient: "from-amber-500 via-yellow-500 to-orange-600", // Desert gold
  },
  {
    title: "Join Our Discord",
    description: "Connect with the community",
    url: "#",
    icon: MessageCircle,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600", // MENA green
  },
  {
    title: "Upcoming Events",
    description: "See what we have planned",
    url: "#",
    icon: Calendar,
    gradient: "from-red-600 via-rose-600 to-pink-600", // MENA red
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team",
    url: "mailto:menasc.da@gmail.com",
    icon: Mail,
    gradient: "from-blue-800 via-indigo-700 to-purple-700", // Deep MENA blue
  },
  {
    title: "About Us",
    description: "Learn more about MENAA",
    url: "/about",
    icon: Globe,
    gradient: "from-slate-700 via-gray-600 to-zinc-600", // Sophisticated gray
  },
  // {
  //   title: "Find Us",
  //   description: "Visit us at De Anza College",
  //   url: "#",
  //   icon: MapPin,
  //   gradient: "from-amber-600 via-orange-600 to-red-600", // Warm earth tones
  // },
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
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-amber-900 to-emerald-950"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced MENA-inspired morphing gradient blobs with richer colors */}
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
        <div
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-red-500/20 to-rose-500/20 animate-morph blur-3xl"
          style={{ animationDelay: "4s" }}
        />
        
        {/* Additional vibrant color blobs for richer MENA palette */}
        <div
          className="absolute top-3/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-purple-600/15 to-pink-600/15 animate-morph blur-3xl"
          style={{ animationDelay: "7s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/2 w-[350px] h-[350px] bg-gradient-to-br from-cyan-600/20 to-blue-500/20 animate-morph blur-3xl"
          style={{ animationDelay: "5s" }}
        />

        {/* Enhanced 3D Floating Geometric Elements - MENA Inspired */}
        
        {/* Large floating pyramids with shadows */}
        <div className="absolute top-24 right-24 w-24 h-24 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 transform rotate-45 animate-float-3d opacity-70 shadow-2xl shadow-amber-500/50" />
        <div className="absolute bottom-24 left-24 w-28 h-28 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-700 transform rotate-12 animate-float-3d-reverse opacity-65 shadow-2xl shadow-emerald-500/50" style={{ animationDelay: "2s" }} />
        
        {/* Medium pyramids */}
        <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 transform -rotate-12 animate-float-3d opacity-60 shadow-xl shadow-blue-500/40" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-22 h-22 bg-gradient-to-b from-red-400 via-red-500 to-red-700 transform rotate-45 animate-float-3d-reverse opacity-65 shadow-xl shadow-red-500/40" style={{ animationDelay: "6s" }} />
        
        {/* Rotating 3D cubes */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-700 transform rotate-45 animate-rotate-3d opacity-55 shadow-xl shadow-purple-500/30" />
        <div className="absolute bottom-1/3 right-1/3 w-18 h-18 bg-gradient-to-br from-pink-500 to-rose-700 transform rotate-12 animate-rotate-3d-reverse opacity-60 shadow-xl shadow-pink-500/30" style={{ animationDelay: "3s" }} />
        
        {/* Additional floating geometric shapes */}
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-700 transform -rotate-45 animate-rotate-3d opacity-50 shadow-lg shadow-cyan-500/30" style={{ animationDelay: "5s" }} />
        <div className="absolute top-3/4 left-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-700 transform rotate-30 animate-float-3d opacity-55 shadow-lg shadow-orange-500/30" style={{ animationDelay: "7s" }} />
        
        {/* Arabesque-inspired floating circles with enhanced glow */}
        <div className="absolute top-20 left-1/2 w-12 h-12 border-3 border-amber-400/50 rounded-full animate-pulse-3d opacity-60 shadow-lg shadow-amber-400/40" />
        <div className="absolute bottom-20 right-1/2 w-14 h-14 border-3 border-emerald-400/50 rounded-full animate-pulse-3d opacity-60 shadow-lg shadow-emerald-400/40" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/6 w-10 h-10 border-3 border-blue-400/50 rounded-full animate-pulse-3d opacity-55 shadow-lg shadow-blue-400/40" style={{ animationDelay: "2.5s" }} />
        <div className="absolute bottom-1/2 right-1/6 w-11 h-11 border-3 border-red-400/50 rounded-full animate-pulse-3d opacity-55 shadow-lg shadow-red-400/40" style={{ animationDelay: "4.5s" }} />
        
        {/* Floating stars - Islamic geometric motifs */}
        <div className="absolute top-40 left-20 w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 opacity-70 shadow-xl shadow-yellow-500/50" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
        </div>
        <div className="absolute bottom-40 right-20 w-18 h-18 animate-float-3d" style={{ animationDelay: "3s" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-600 opacity-70 shadow-xl shadow-teal-500/50" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
        </div>

        {/* Enhanced rotating geometric patterns - MENA style with richer colors */}
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-amber-400/20 rounded-full animate-rotate-slow shadow-lg shadow-amber-400/10" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 border-2 border-emerald-400/20 rounded-full animate-rotate-slow shadow-lg shadow-emerald-400/10"
          style={{ animationDirection: "reverse" }}
        />
        
        {/* Additional enhanced geometric rings */}
        <div className="absolute top-1/2 left-10 w-48 h-48 border-2 border-blue-400/20 rounded-full animate-rotate-slow shadow-lg shadow-blue-400/10" style={{ animationDelay: "5s" }} />
        <div className="absolute bottom-1/2 right-10 w-56 h-56 border-2 border-red-400/20 rounded-full animate-rotate-slow shadow-lg shadow-red-400/10" style={{ animationDelay: "7s", animationDirection: "reverse" }} />
        
        {/* Nested ornamental rings */}
        <div className="absolute top-32 right-32 w-48 h-48 border border-purple-400/15 rounded-full animate-rotate-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-32 w-64 h-64 border border-pink-400/15 rounded-full animate-rotate-slow" style={{ animationDelay: "4s", animationDirection: "reverse" }} />

        {/* Enhanced sparkle effects with vibrant MENA colors - optimized for performance */}
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full animate-sparkle ${
              i % 8 === 0 ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 
              i % 8 === 1 ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 
              i % 8 === 2 ? 'bg-blue-400 shadow-lg shadow-blue-400/50' : 
              i % 8 === 3 ? 'bg-red-400 shadow-lg shadow-red-400/50' :
              i % 8 === 4 ? 'bg-purple-400 shadow-lg shadow-purple-400/50' :
              i % 8 === 5 ? 'bg-pink-400 shadow-lg shadow-pink-400/50' :
              i % 8 === 6 ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' :
              'bg-orange-400 shadow-lg shadow-orange-400/50'
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
              i % 6 === 0 ? 'bg-amber-400' : 
              i % 6 === 1 ? 'bg-emerald-400' : 
              i % 6 === 2 ? 'bg-blue-400' : 
              i % 6 === 3 ? 'bg-red-400' :
              i % 6 === 4 ? 'bg-purple-400' :
              'bg-cyan-400'
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

        {/* Enhanced cursor glow with MENA colors */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(16, 185, 129, 0.15) 40%, rgba(59, 130, 246, 0.1) 60%, transparent 80%)",
            opacity: mounted ? 1 : 0,
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full pointer-events-none transition-all duration-500 ease-out blur-xl"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 70%)",
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
          {/* Logo with MENA-inspired animated border */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              {/* Rotating border effect with MENA colors */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-gradient-shift" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 rounded-3xl animate-rotate-slow opacity-50" />
              
              {/* Additional MENA-inspired rings */}
              <div className="absolute inset-[-8px] bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 rounded-3xl animate-rotate-slow opacity-30" />
              <div className="absolute inset-[-16px] bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 rounded-3xl animate-rotate-slow opacity-20" style={{ animationDirection: "reverse" }} />

              {/* Main logo with enhanced MENA styling */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-amber-500 via-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <div className="absolute inset-2 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-br from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
                    M
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Title with MENA gradient animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift text-balance leading-tight">
            DE ANZA MENAA
          </h1>

          {/* Subtitle with MENA-inspired glow effect */}
          <div className="relative inline-block mb-6">
            <p className="text-xl md:text-2xl text-white/90 font-medium text-balance relative z-10">
              Middle East & North African Association
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-blue-500/20 blur-2xl animate-pulse-glow" />
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto text-pretty leading-relaxed">
            Building community, celebrating culture, and creating connections at De Anza College
          </p>

          {/* Decorative line with MENA styling */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {links.map((link, index) => {
            const Icon = link.icon
            const isLarge = index === 0 || index === 3
            const isInternal = link.url.startsWith("/")
            const LinkWrapper = isInternal ? Link : "a"
            const linkProps = isInternal 
              ? { href: link.url } 
              : { href: link.url, target: "_blank", rel: "noopener noreferrer" }

            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isLarge ? "md:col-span-2" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <LinkWrapper {...linkProps} className="block h-full">
                  <Card
                    className={`group relative overflow-hidden border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-white/30 h-full ${
                      hoveredIndex === index ? "shadow-2xl shadow-amber-500/25" : "shadow-lg shadow-slate-900/20"
                    }`}
                  >
                    {/* Animated gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500 animate-gradient-shift`}
                    />

                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    </div>

                    {/* MENA-inspired decorative corner patterns */}
                    <div className="absolute top-2 right-2 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <div className="w-full h-full border-t-2 border-r-2 border-amber-400 rounded-tr-lg" />
                    </div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <div className="w-full h-full border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                    </div>

                    {/* Content */}
                    <div className={`relative ${isLarge ? "p-8" : "p-6"} flex items-center gap-6`}>
                      {/* Icon with enhanced gradient border */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${link.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                        <div
                          className={`relative ${isLarge ? "w-20 h-20" : "w-16 h-16"} rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}
                        >
                          <Icon className={`${isLarge ? "w-10 h-10" : "w-8 h-8"} text-white drop-shadow-lg`} />
                        </div>
                      </div>

                      {/* Text content with enhanced typography */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`${isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${link.gradient} group-hover:bg-clip-text transition-all duration-500 text-balance tracking-tight`}
                        >
                          {link.title}
                        </h3>
                        <p
                          className={`${isLarge ? "text-base leading-relaxed" : "text-sm leading-relaxed"} text-white/60 group-hover:text-white/80 transition-colors duration-500 text-pretty`}
                        >
                          {link.description}
                        </p>
                      </div>

                      {/* Enhanced arrow with MENA styling */}
                      <div className="flex-shrink-0 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-500">
                        <div className="relative">
                          <ExternalLink className="w-6 h-6 text-white/40 group-hover:text-white transition-colors duration-500 drop-shadow-sm" />
                          <div className="absolute inset-0 w-6 h-6 bg-gradient-to-br from-amber-400/20 to-emerald-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom glow effect */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </Card>
                </LinkWrapper>
              </div>
            )
          })}
        </div>

        <div
          className={`text-center transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          {/* Social icons with MENA-inspired hover effects */}
          <div className="flex justify-center gap-4 mb-6">
            {[
              { icon: Instagram, href: "https://instagram.com/deanzamenaa", color: "from-amber-500 to-orange-600" },
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

          {/* Footer text with MENA styling */}
          <p className="text-sm text-white/40 mb-2">
            Made with <Heart className="inline w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" /> by MENAA
          </p>
          <p className="text-xs text-white/30">© 2025 De Anza MENAA. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
