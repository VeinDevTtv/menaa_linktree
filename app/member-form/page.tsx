"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { 
  ArrowLeft, UserPlus, Mail, Users, Sparkles, 
  Zap, Star, Check, Heart, Send, Rocket
} from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"

export default function MemberFormPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    attending: ""
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        lastName: "",
        firstName: "",
        email: "",
        attending: ""
      })
    }, 3000)
  }

  const isFormValid = formData.lastName && formData.firstName && formData.email && formData.attending

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-pink-950"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Morphing gradient blobs with vibrant tech colors */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 animate-morph blur-3xl"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/25 to-blue-500/25 animate-morph blur-3xl"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/20 to-violet-600/20 animate-morph blur-3xl"
          style={{ animationDelay: "6s" }}
        />
        <div
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 animate-morph blur-3xl"
          style={{ animationDelay: "4s" }}
        />

        {/* 3D Floating Tech Elements */}
        <div className="absolute top-24 right-24 w-24 h-24 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-700 transform rotate-45 animate-float-3d opacity-70 shadow-2xl shadow-purple-500/50" />
        <div className="absolute bottom-24 left-24 w-28 h-28 bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-700 transform rotate-12 animate-float-3d-reverse opacity-65 shadow-2xl shadow-cyan-500/50" style={{ animationDelay: "2s" }} />
        
        {/* Holographic Rings */}
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-purple-400/20 rounded-full animate-rotate-slow shadow-lg shadow-purple-400/10" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 border-2 border-cyan-400/20 rounded-full animate-rotate-slow shadow-lg shadow-cyan-400/10"
          style={{ animationDirection: "reverse" }}
        />

        {/* Tech Sparkles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full animate-sparkle ${
              i % 6 === 0 ? 'bg-purple-400 shadow-lg shadow-purple-400/50' : 
              i % 6 === 1 ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : 
              i % 6 === 2 ? 'bg-pink-400 shadow-lg shadow-pink-400/50' : 
              i % 6 === 3 ? 'bg-blue-400 shadow-lg shadow-blue-400/50' :
              i % 6 === 4 ? 'bg-fuchsia-400 shadow-lg shadow-fuchsia-400/50' :
              'bg-violet-400 shadow-lg shadow-violet-400/50'
            } hidden md:block`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Arabesque Patterns */}
        <ArabesquePatterns />

        {/* Enhanced cursor glow with tech colors */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.2) 40%, rgba(59, 130, 246, 0.15) 60%, transparent 80%)",
            opacity: mounted ? 1 : 0,
          }}
        />
      </div>

      <div className="relative z-10 container max-w-3xl mx-auto px-4 py-12 md:py-20">
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
          className={`text-center mb-12 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {/* Animated Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 animate-gradient-shift" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl animate-rotate-slow opacity-50" />
              
              <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <div className="absolute inset-2 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <UserPlus className="w-16 h-16 text-transparent bg-gradient-to-br from-purple-300 via-pink-300 to-cyan-300 bg-clip-text" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift text-balance leading-tight">
            Join MENAA Today!
          </h1>

          <div className="relative inline-block mb-6">
            <p className="text-xl md:text-2xl text-white/90 font-medium text-balance relative z-10">
              Become Part of Our Amazing Community
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-2xl animate-pulse-glow" />
          </div>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto text-pretty leading-relaxed">
            Fill out this quick form to join De Anza MENAA and be part of something special!
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
            <Rocket className="w-5 h-5 text-pink-400 animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          </div>
        </div>

        {/* Form Card */}
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <Card className="relative overflow-hidden border-white/20 bg-gradient-to-br from-white/10 to-white/15 backdrop-blur-xl shadow-2xl">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 animate-gradient-shift" />
            
            {/* Form Content */}
            <div className="relative p-8 md:p-12">
              {submitted ? (
                // Success Message
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 animate-pulse-3d">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                    Welcome to MENAA! 🎉
                  </h2>
                  <p className="text-lg text-white/80">
                    We'll be in touch soon!
                  </p>
                </div>
              ) : (
                // Form
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Last Name */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-white font-semibold text-lg">
                        <Users className="w-5 h-5 text-purple-400" />
                        Last Name
                        <span className="text-pink-400">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          onFocus={() => setFocusedField("lastName")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-white/40 focus:border-purple-400 focus:bg-white/10 transition-all duration-300 outline-none text-lg backdrop-blur-sm"
                          placeholder="Enter last name"
                        />
                        {focusedField === "lastName" && (
                          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl animate-pulse-glow" />
                        )}
                      </div>
                    </div>

                    {/* First Name */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-white font-semibold text-lg">
                        <Users className="w-5 h-5 text-pink-400" />
                        First Name
                        <span className="text-pink-400">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          onFocus={() => setFocusedField("firstName")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-white/40 focus:border-pink-400 focus:bg-white/10 transition-all duration-300 outline-none text-lg backdrop-blur-sm"
                          placeholder="Enter first name"
                        />
                        {focusedField === "firstName" && (
                          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-2xl blur-xl animate-pulse-glow" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white font-semibold text-lg">
                      <Mail className="w-5 h-5 text-cyan-400" />
                      Email
                      <span className="text-pink-400">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-white/40 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none text-lg backdrop-blur-sm"
                        placeholder="your.email@example.com"
                      />
                      {focusedField === "email" && (
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl animate-pulse-glow" />
                      )}
                    </div>
                  </div>

                  {/* Attendance Question */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-white font-semibold text-lg">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Will you be attending our first meeting?
                      <span className="text-pink-400">*</span>
                    </label>
                    
                    <div className="space-y-3">
                      {/* Yes Option */}
                      <label className="relative flex items-center gap-4 p-5 bg-white/5 border-2 border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-green-400/50 group">
                        <input
                          type="radio"
                          name="attending"
                          value="yes"
                          checked={formData.attending === "yes"}
                          onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                          className="w-6 h-6 accent-green-500"
                        />
                        <div className="flex-1">
                          <span className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                            YESSSSS DUH!!!
                          </span>
                          <div className="flex gap-2 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                            ))}
                          </div>
                        </div>
                        {formData.attending === "yes" && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl animate-pulse-glow" />
                        )}
                      </label>

                      {/* No Option */}
                      <label className="relative flex items-center gap-4 p-5 bg-white/5 border-2 border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-blue-400/50 group">
                        <input
                          type="radio"
                          name="attending"
                          value="no"
                          checked={formData.attending === "no"}
                          onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                          className="w-6 h-6 accent-blue-500"
                        />
                        <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          No :(
                        </span>
                        {formData.attending === "no" && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl animate-pulse-glow" />
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full px-8 py-5 rounded-2xl font-bold text-xl text-white shadow-2xl transform transition-all duration-500 flex items-center justify-center gap-3 ${
                      isFormValid
                        ? "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:scale-105 hover:shadow-purple-500/50 cursor-pointer"
                        : "bg-white/10 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Send className={`w-6 h-6 ${isFormValid ? "animate-pulse" : ""}`} />
                    <span>Join the Community!</span>
                    <Zap className={`w-6 h-6 ${isFormValid ? "animate-pulse" : ""}`} />
                  </button>

                  {/* Helper Text */}
                  <p className="text-center text-white/50 text-sm">
                    By submitting this form, you agree to join our amazing community 💜
                  </p>
                </form>
              )}
            </div>

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 opacity-30">
              <div className="w-full h-full border-t-2 border-l-2 border-purple-400 rounded-tl-2xl" />
            </div>
            <div className="absolute bottom-4 right-4 w-12 h-12 opacity-30">
              <div className="w-full h-full border-b-2 border-r-2 border-cyan-400 rounded-br-2xl" />
            </div>
          </Card>
        </div>

        {/* Info Section */}
        <div
          className={`mt-12 text-center transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
              <h3 className="text-lg font-bold text-white">What Happens Next?</h3>
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
            </div>
            <p className="text-white/70 leading-relaxed">
              After you join, you'll get updates about our upcoming events, meetings, and activities! 
              Make sure to follow us on Instagram and join our Discord to stay connected with the community.
            </p>
          </Card>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-8 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-sm text-white/40 mb-2">
            Made with <Heart className="inline w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" /> by MENAA
          </p>
          <p className="text-xs text-white/30">© 2025 De Anza MENAA. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

