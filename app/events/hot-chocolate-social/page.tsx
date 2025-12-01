"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, MapPin, Send, Users, Sparkles, Coffee } from "lucide-react"

export default function HotChocolateSocialPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/rsvp/hot-chocolate-social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setName("")
        setEmail("")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#3D2B1F] text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: "100vh", opacity: [0, 0.5, 0] }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 24 + 12}px`,
            }}
          >
            🍫
          </motion.div>
        ))}
      </div>
      <div className="absolute left-6 top-6 z-20">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:border-amber-300/40 hover:bg-amber-500/15"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back to Events
        </Link>
      </div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <motion.h1 
                className="mb-4 text-5xl font-bold text-amber-200"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Hot Chocolate Social & Game Night
            </motion.h1>
            <motion.p 
                className="text-lg text-amber-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Join us for a cozy evening of warm drinks, fun games, and great company!
            </motion.p>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div 
                className="rounded-lg bg-black/20 p-8"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2 className="mb-4 text-2xl font-bold text-amber-200">Event Details</h2>
                <div className="flex items-center gap-4">
                    <Calendar className="h-6 w-6 text-amber-200" />
                    <p>Date: December 3rd</p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <Clock className="h-6 w-6 text-amber-200" />
                    <p>Time: 3:00 PM - 5:00 PM</p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-amber-200" />
                    <p>Location: Fireside Room</p>
                </div>
            </motion.div>
            <motion.div 
                className="rounded-lg bg-black/20 p-8"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2 className="mb-4 text-2xl font-bold text-amber-200">RSVP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-amber-100">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded bg-black/30 p-2 text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-amber-100">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded bg-black/30 p-2 text-white"
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded bg-amber-500 p-2 font-bold text-black"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isSubmitting ? "Submitting..." : "RSVP"}
                    </motion.button>
                    {submitStatus === "success" && (
                        <p className="mt-4 text-green-400">
                            Thanks for RSVPing! We'll see you there.
                        </p>
                    )}
                    {submitStatus === "error" && (
                        <p className="mt-4 text-red-400">
                            Something went wrong. Please try again.
                        </p>
                    )}
                </form>
            </motion.div>
        </div>
      </div>
    </div>
  )
}
