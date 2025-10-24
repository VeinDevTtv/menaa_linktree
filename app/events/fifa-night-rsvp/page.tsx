"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { fifaNightRSVPSchema, type FifaNightRSVPInput } from "@/lib/schemas"
import { toast } from "sonner"
import { SubmitSuccess } from "@/components/submit-success"
import { GoalCelebration } from "@/components/goal-celebration"
import { SoccerBall3D } from "@/components/soccer-ball-3d"
import { SoccerFieldBg } from "@/components/soccer-field-bg"
import { SoccerParticles } from "@/components/soccer-particles"
import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "framer-motion"
import { ArrowLeft, Trophy, Target, Medal, Zap, Star } from "lucide-react"

export default function FifaNightRSVPPage() {
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [dupMessage, setDupMessage] = useState<string | null>(null)
  const [cocOpen, setCocOpen] = useState(false)
  const [cocUnlocked, setCocUnlocked] = useState(false)
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FifaNightRSVPInput>({
    resolver: zodResolver(fifaNightRSVPSchema),
    defaultValues: {
      fullName: "",
      email: "",
      attending: undefined as unknown as FifaNightRSVPInput["attending"],
      website: "",
    },
  })

  useEffect(() => {
    if (!cocOpen) {
      document.body.style.overflow = ""
      setScrolledToBottom(false)
    } else {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [cocOpen])

  const handleScrollCheck = () => {
    const el = scrollRef.current
    if (!el) return
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
    if (atBottom) setScrolledToBottom(true)
  }

  const handleAgreeCoc = () => {
    setCocUnlocked(true)
    setCocOpen(false)
    setValue("attending", "yes" as const, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }

  const onSubmit = async (data: FifaNightRSVPInput) => {
    setSubmitting(true)
    setDupMessage(null)

    try {
      const response = await fetch("/api/fifa-night-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.status === 409) {
        setDupMessage("You've already registered for FIFA NIGHT! ⚽")
        return
      }

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      setShowCelebration(true)
      setTimeout(() => {
        setShowCelebration(false)
        setShowSuccess(true)
      }, 3000)
      
      reset()
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <SoccerFieldBg opacity={0.15} />
      <SoccerParticles density="medium" speed="medium" />
      
      {/* Floating Soccer Balls */}
      <SoccerBall3D size="lg" position={{ x: 15, y: 20 }} />
      <SoccerBall3D size="md" position={{ x: 85, y: 30 }} />
      <SoccerBall3D size="sm" position={{ x: 25, y: 70 }} />
      <SoccerBall3D size="md" position={{ x: 75, y: 80 }} />

      {/* Stadium Lighting Effect */}
      <div className="absolute inset-0 stadium-lights pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>
          
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Trophy className="w-12 h-12 text-yellow-400 animate-trophy-shine" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
              FIFA NIGHT
            </h1>
            <Trophy className="w-12 h-12 text-yellow-400 animate-trophy-shine" />
          </motion.div>
          
          <p className="text-white/80 text-lg">
            ⚽ Join us for an epic FIFA tournament! ⚽
          </p>
          <p className="text-white/60 text-sm mt-2">
            Register below to secure your spot in the competition
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-soccer rounded-2xl p-8 backdrop-blur-xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {dupMessage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-yellow-400/30 bg-yellow-500/10 px-4 py-3 text-yellow-300 animate-goal-bounce"
              >
                {dupMessage}
              </motion.div>
            )}

            {/* Honeypot */}
            <div className="hidden">
              <label className="block text-sm mb-1" htmlFor="website">Website</label>
              <input id="website" {...register("website")} className="w-full rounded-md bg-stone-900/60 p-3" autoComplete="off" />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm mb-2 font-medium" htmlFor="fullName">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input 
                id="fullName" 
                {...register("fullName")} 
                className="w-full rounded-xl bg-stone-900/60 p-4 border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300" 
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2 font-medium" htmlFor="email">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input 
                id="email" 
                type="email" 
                {...register("email")} 
                className="w-full rounded-xl bg-stone-900/60 p-4 border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300" 
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Attending */}
            <div>
              <label className="block text-sm mb-3 font-medium">
                Will you be attending FIFA NIGHT? <span className="text-red-400">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    value="yes" 
                    {...register("attending")}
                    className="w-5 h-5 text-green-500 bg-stone-900 border-green-500/30 focus:ring-green-500/50"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚽</span>
                    <span className="text-white group-hover:text-green-400 transition-colors">Yes, I'm ready to play!</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    value="no" 
                    {...register("attending")}
                    className="w-5 h-5 text-green-500 bg-stone-900 border-green-500/30 focus:ring-green-500/50"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-lg">😔</span>
                    <span className="text-white group-hover:text-red-400 transition-colors">No, I can't make it</span>
                  </div>
                </label>
              </div>
              {errors.attending && <p className="text-red-400 text-sm mt-1">{errors.attending.message}</p>}
            </div>

            {/* Code of Conduct */}
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                checked={cocUnlocked}
                onChange={() => setCocOpen(true)}
                className="w-5 h-5 text-green-500 bg-stone-900 border-green-500/30 focus:ring-green-500/50 rounded"
              />
              <div className="text-sm">
                <span className="text-white">I agree to the </span>
                <button 
                  type="button"
                  onClick={() => setCocOpen(true)}
                  className="text-green-400 hover:text-green-300 underline"
                >
                  Code of Conduct
                </button>
                <span className="text-red-400 ml-1">*</span>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting || !cocUnlocked}
              className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              style={{
                background: submitting 
                  ? "linear-gradient(135deg, #6B7280, #4B5563)" 
                  : "linear-gradient(135deg, #00B140, #00D166)"
              }}
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Registering...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Trophy className="w-6 h-6" />
                  <span>Register for FIFA NIGHT</span>
                  <Trophy className="w-6 h-6" />
                </div>
              )}
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          </form>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 glass-soccer-light rounded-xl p-6 backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-yellow-400" />
            Event Details
          </h3>
          <div className="space-y-2 text-white/80">
            <p><strong>Date:</strong> TBA</p>
            <p><strong>Time:</strong> Evening</p>
            <p><strong>Location:</strong> De Anza College</p>
            <p><strong>Format:</strong> FIFA tournament with prizes</p>
            <p><strong>What to expect:</strong> Competitive gaming, refreshments, and epic matches!</p>
          </div>
        </motion.div>
      </div>

      {/* Code of Conduct Dialog */}
      <Dialog.Root open={cocOpen} onOpenChange={setCocOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-950 border border-green-500/20 rounded-xl p-6 max-w-md w-full mx-4 z-50 max-h-[80vh] overflow-hidden">
            <Dialog.Title className="text-xl font-bold mb-4 text-white">Code of Conduct</Dialog.Title>
            <div 
              ref={scrollRef}
              onScroll={handleScrollCheck}
              className="overflow-y-auto max-h-60 pr-2 text-white/80 text-sm space-y-3"
            >
              <p>By participating in FIFA NIGHT, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Respect all participants and staff</li>
                <li>Follow fair play principles</li>
                <li>Maintain a positive and inclusive environment</li>
                <li>Not engage in any form of harassment or discrimination</li>
                <li>Follow all event rules and regulations</li>
                <li>Respect the venue and equipment</li>
                <li>Have fun and enjoy the competition!</li>
              </ul>
              <p className="text-green-400 font-medium">Thank you for helping us create an amazing event!</p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close className="px-4 py-2 text-white/70 hover:text-white transition-colors">
                Cancel
              </Dialog.Close>
              <button
                onClick={handleAgreeCoc}
                disabled={!scrolledToBottom}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                I Agree
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Success Modal */}
      <SubmitSuccess 
        open={showSuccess} 
        title="Registration Complete!" 
        subtitle="You're all set for FIFA NIGHT! ⚽" 
        onClose={() => setShowSuccess(false)} 
      />

      {/* Goal Celebration */}
      <GoalCelebration 
        isVisible={showCelebration} 
        onComplete={() => setShowCelebration(false)} 
      />
    </div>
  )
}
