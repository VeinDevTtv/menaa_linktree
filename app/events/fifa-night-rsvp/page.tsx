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
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Trophy, Target, Star, Clock, CheckCircle2, Sparkles } from "lucide-react"

// Event time states
type EventState = "active" | "countdown" | "happening" | "ended"

const getEventState = (): { state: EventState; timeRemaining: number | null } => {
  const now = new Date()
  
  // Get PST time components
  const pstFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  
  const pstParts = pstFormatter.formatToParts(now)
  const pstDate = {
    year: parseInt(pstParts.find(p => p.type === "year")?.value || "0"),
    month: parseInt(pstParts.find(p => p.type === "month")?.value || "0") - 1,
    day: parseInt(pstParts.find(p => p.type === "day")?.value || "0"),
    hour: parseInt(pstParts.find(p => p.type === "hour")?.value || "0"),
    minute: parseInt(pstParts.find(p => p.type === "minute")?.value || "0"),
    second: parseInt(pstParts.find(p => p.type === "second")?.value || "0"),
  }
  
  // Get current time in milliseconds since midnight PST
  const currentTimeMs = pstDate.hour * 3600000 + pstDate.minute * 60000 + pstDate.second * 1000
  
  // Event is TODAY - check time
  const deactivateTimeMs = 15 * 3600000 // 3PM PST = 15:00:00
  const startTimeMs = 16 * 3600000 // 4PM PST = 16:00:00
  const endTimeMs = 18 * 3600000 // 6PM PST = 18:00:00
  
  if (currentTimeMs < deactivateTimeMs) {
    return { state: "active", timeRemaining: null }
  } else if (currentTimeMs >= deactivateTimeMs && currentTimeMs < startTimeMs) {
    const remaining = startTimeMs - currentTimeMs
    return { state: "countdown", timeRemaining: remaining }
  } else if (currentTimeMs >= startTimeMs && currentTimeMs < endTimeMs) {
    return { state: "happening", timeRemaining: null }
  } else {
    return { state: "ended", timeRemaining: null }
  }
}

const formatCountdown = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const getTodayDateString = (): string => {
  const now = new Date()
  const pstFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return pstFormatter.format(now)
}

export default function FifaNightRSVPPage() {
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [dupMessage, setDupMessage] = useState<string | null>(null)
  const [cocOpen, setCocOpen] = useState(false)
  const [cocUnlocked, setCocUnlocked] = useState(false)
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [eventState, setEventState] = useState<EventState>("active")
  const [countdown, setCountdown] = useState<number | null>(null)
  
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

  // Update event state and countdown
  useEffect(() => {
    const updateState = () => {
      try {
        const { state, timeRemaining } = getEventState()
        setEventState(state)
        setCountdown(timeRemaining)
      } catch (error) {
        console.error("Error updating event state:", error)
        // Default to active state if there's an error
        setEventState("active")
        setCountdown(null)
      }
    }

    updateState()
    const interval = setInterval(updateState, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

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
    } catch {
      toast.error("Registration failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Render countdown view
  const renderCountdown = () => (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
      {/* Animated soccer balls during transition */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl"
            initial={{
              x: "50%",
              y: "-10%",
              rotate: 0,
              scale: 0,
            }}
            animate={{
              x: `${20 + i * 30}%`,
              y: "100%",
              rotate: 360 * (i + 1),
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            ⚽
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="text-center"
      >
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 12
          }}
          className="glass-soccer rounded-2xl p-12 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(45deg, transparent, rgba(255, 193, 7, 0.3), transparent)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
            >
              <Clock className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Registration Closed
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white/80 text-lg mb-8"
            >
              The event is starting soon! Join us when it begins.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-8 border border-yellow-400/30 relative overflow-hidden"
            >
              {/* Pulsing background effect */}
              <motion.div
                className="absolute inset-0 bg-yellow-400/10 rounded-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative z-10">
                <p className="text-white/70 mb-4">Event starts in:</p>
                <motion.div
                  key={countdown}
                  initial={{ scale: 1.3, rotate: 5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"
                >
                  {countdown !== null ? formatCountdown(countdown) : "00:00:00"}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )

  // Render "event is happening now" view
  const renderHappeningNow = () => (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
      {/* Explosive soccer ball celebration animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[...Array(15)].map((_, i) => {
          const angle = (i * 360) / 15
          const radius = 200
          return (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: "50%",
                top: "50%",
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * radius,
                y: Math.sin((angle * Math.PI) / 180) * radius,
                scale: [0, 1.2, 1],
                rotate: 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 0.1,
                ease: "easeOut",
              }}
            >
              ⚽
            </motion.div>
          )
        })}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 150,
          damping: 12
        }}
        className="text-center"
      >
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>
        
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.3
          }}
          className="glass-soccer rounded-2xl p-12 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Animated background particles and glow */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Rotating gradient orb */}
            <motion.div
              className="absolute w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: 360,
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Floating particles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * 100 + "%"],
                  x: [null, Math.random() * 100 + "%"],
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1.5, 1.2, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <motion.span
                className="bg-gradient-to-r from-yellow-400 via-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% auto",
                }}
                animate={{
                  backgroundPosition: ["0% center", "200% center", "0% center"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                EVENT IS HAPPENING NOW!
              </motion.span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white/90 text-xl mb-6"
            >
              ⚽ Join us at L73, Social and Humanities Village! ⚽
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="flex items-center justify-center gap-4 text-white/80"
            >
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span>Come play FIFA and compete for prizes!</span>
              <Trophy className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )

  // Render "event has ended" view
  const renderEventEnded = () => (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
      {/* Gentle floating soccer balls */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl opacity-20"
            initial={{
              x: `${20 + i * 15}%`,
              y: "110%",
              rotate: 0,
            }}
            animate={{
              y: ["110%", "-10%"],
              rotate: 360,
              x: [`${20 + i * 15}%`, `${25 + i * 15}%`, `${20 + i * 15}%`],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          >
            ⚽
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 12
        }}
        className="text-center"
      >
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="glass-soccer rounded-2xl p-12 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Subtle pulsing glow */}
          <motion.div
            className="absolute inset-0 bg-green-400/10 rounded-2xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3
              }}
            >
              <CheckCircle2 className="w-24 h-24 text-green-400 mx-auto mb-6 drop-shadow-lg" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 150
              }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Event Has Ended
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white/80 text-lg mb-6"
            >
              We had fun meeting everyone! ⚽
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.9,
                type: "spring"
              }}
              className="flex items-center justify-center gap-2 text-white/70"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-yellow-400" />
              </motion.div>
              <span>Thank you for joining us for FIFA NIGHT!</span>
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )

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

      {/* Transition overlay with soccer balls */}
      <AnimatePresence>
        {(eventState === "countdown" || eventState === "happening" || eventState === "ended") && (
          <motion.div
            key="transition-overlay"
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Soccer ball trail effect */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl opacity-30"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: `${20 + i * 10}%`,
                  y: `${30 + i * 5}%`,
                  scale: [0, 1, 0.8],
                  rotate: 360 * (i + 1),
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              >
                ⚽
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {eventState === "active" && (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: -20,
              transition: { duration: 0.5 }
            }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="relative z-10 max-w-2xl mx-auto px-4 py-12"
          >
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
                    <span className="text-white group-hover:text-green-400 transition-colors">Yes, I&apos;m ready to play!</span>
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
                    <span className="text-white group-hover:text-red-400 transition-colors">No, I can&apos;t make it</span>
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
            <p><strong>Date:</strong> {getTodayDateString()}</p>
            <p><strong>Time:</strong> 4:00 PM - 6:00 PM PST</p>
            <p><strong>Location:</strong> L73, Social and Humanities Village</p>
            <p><strong>Format:</strong> FIFA tournament with prizes</p>
            <p><strong>What to expect:</strong> Competitive gaming, refreshments, and epic matches!</p>
          </div>
        </motion.div>
        </motion.div>
        )}
        {eventState === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              rotateX: 15,
              transition: { duration: 0.5 }
            }}
            transition={{ 
              duration: 0.7,
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
          >
            {renderCountdown()}
          </motion.div>
        )}
        {eventState === "happening" && (
          <motion.div
            key="happening"
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              rotateY: -90,
              transition: { duration: 0.6 }
            }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            {renderHappeningNow()}
          </motion.div>
        )}
        {eventState === "ended" && (
          <motion.div
            key="ended"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.95,
              y: -20,
              transition: { duration: 0.5 }
            }}
            transition={{ 
              duration: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            {renderEventEnded()}
          </motion.div>
        )}
      </AnimatePresence>

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
