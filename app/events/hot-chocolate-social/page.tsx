"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Send,
  Users,
  Sparkles,
  Coffee,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react"

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
    setSubmitStatus(null)

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

  const floatingVariants: Variants = {
    animate: {
      y: ["0%", "-10%", "0%"],
      rotate: [0, 5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#2a1c12] via-[#3d2b1f] to-[#5a3f2a] p-4 text-white">
      {/* Background Illustrations */}
      <motion.div
        className="pointer-events-none absolute -left-16 -top-16 text-white/5"
        variants={floatingVariants}
        animate="animate"
      >
        <Coffee size={256} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 text-white/5"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "-4s" }}
      >
        <Sparkles size={320} />
      </motion.div>

      <div className="absolute left-6 top-6 z-20">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur transition hover:border-amber-300/40 hover:bg-amber-500/15"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back to Events
        </Link>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/10 bg-black/20 shadow-2xl shadow-black/40 backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="grid md:grid-cols-2">
          {/* Left Pane - Event Info */}
          <div className="flex flex-col justify-between rounded-t-2xl bg-gradient-to-br from-amber-800/20 via-transparent to-transparent p-8 md:rounded-l-2xl md:rounded-tr-none">
            <div>
              <motion.h1
                className="mb-3 font-sans text-4xl font-bold tracking-tight text-amber-100 sm:text-5xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hot Chocolate Social & Game Night
              </motion.h1>
              <motion.p
                className="text-lg text-amber-200/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join us for a cozy evening of warm drinks, fun games, and great
                company!
              </motion.p>
            </div>
            <motion.div
              className="mt-8 space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.5 },
                },
              }}
            >
              {[
                {
                  icon: Calendar,
                  text: "December 3rd",
                  color: "text-amber-300",
                },
                {
                  icon: Clock,
                  text: "3:00 PM - 5:00 PM",
                  color: "text-emerald-300",
                },
                {
                  icon: MapPin,
                  text: "Fireside Room",
                  color: "text-rose-300",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span className="text-lg">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Pane - RSVP Form */}
          <div className="p-8">
            <h2 className="mb-6 text-center font-sans text-3xl font-bold text-amber-100">
              RSVP Now
            </h2>
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center space-y-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <CheckCircle className="h-16 w-16 text-green-400" />
                  <h3 className="text-2xl font-semibold">Thank You!</h3>
                  <p className="text-slate-300">
                    Your spot is reserved. We can't wait to see you there!
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="mt-4 rounded-full bg-amber-500/20 px-6 py-2 font-semibold text-amber-200 transition hover:bg-amber-500/30"
                  >
                    RSVP for someone else
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-amber-200/80"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-lg border-white/10 bg-white/5 p-3 text-white transition focus:border-amber-400 focus:ring focus:ring-amber-400/50"
                      required
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-amber-200/80"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-lg border-white/10 bg-white/5 p-3 text-white transition focus:border-amber-400 focus:ring focus:ring-amber-400/50"
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="relative">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/40"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Reserve My Spot</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                  {submitStatus === "error" && (
                    <motion.p
                      className="flex items-center justify-center gap-2 text-red-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <XCircle className="h-5 w-5" />
                      Oops! Something went wrong. Please try again.
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
