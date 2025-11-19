 "use client"
 
 import Link from "next/link"
 import {
   type FormEvent,
   type MouseEvent as ReactMouseEvent,
   useRef,
   useState,
 } from "react"
import { motion } from "framer-motion"
import {
   ArrowLeft,
  CalendarDays,
  Clock,
  Flame,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react"

import { ArabesquePatterns } from "@/components/arabesque-patterns"

const API_ENDPOINT = "/api/friendsgiving-rsvp"

type FormStatus = "idle" | "loading" | "success" | "error"

const floatingAccents = [
  { Icon: Sparkles, top: "12%", left: "10%", delay: 0 },
  { Icon: Users, top: "22%", right: "12%", delay: 1.2 },
  { Icon: Flame, bottom: "18%", left: "16%", delay: 0.6 },
  { Icon: CalendarDays, bottom: "20%", right: "8%", delay: 1.8 },
]

export default function EventsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    attending: "" as "yes" | "no" | "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const isSubmitting = status === "loading"
  const isSuccess = status === "success"

  const handleTilt = (event: ReactMouseEvent<HTMLDivElement>) => {
    const element = cardRef.current
    if (!element) return

    const bounds = element.getBoundingClientRect()
    const relativeX = event.clientX - bounds.left
    const relativeY = event.clientY - bounds.top

    const rotateY = ((relativeX / bounds.width) - 0.5) * 14
    const rotateX = -((relativeY / bounds.height) - 0.5) * 12

    setTilt({ x: rotateX, y: rotateY })
  }

  const resetTilt = () => setTilt({ x: 0, y: 0 })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const fullName = formData.fullName.trim()
    const email = formData.email.trim()
    const attending = formData.attending

    if (!fullName) {
      setErrorMessage("Please enter your full name.")
      setStatus("error")
      return
    }

    if (!email) {
      setErrorMessage("Please enter your email address.")
      setStatus("error")
      return
    }

    if (!attending) {
      setErrorMessage("Please select whether you're attending.")
      setStatus("error")
      return
    }

    setErrorMessage(null)
    setStatus("loading")

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          attending,
        }),
      })

      if (response.status === 409) {
        setErrorMessage("You've already RSVP'd for Friendsgiving!")
        setStatus("error")
        return
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Server responded with ${response.status}`)
      }

      setStatus("success")
      setFormData({ fullName: "", email: "", attending: "" })
    } catch (error) {
      console.error("Failed to submit RSVP", error)
      setStatus("error")
      setErrorMessage(
        "We couldn't send your RSVP. Please try again or reach out directly.",
      )
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.28),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(31,112,81,0.3),_transparent_55%)]" />

      <div className="absolute left-6 top-6 z-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur transition hover:border-emerald-300/40 hover:bg-emerald-500/15"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1 group-hover:text-emerald-200" />
          Back to home
        </Link>
      </div>

      <ArabesquePatterns />

      {floatingAccents.map(({ Icon, delay, ...position }, index) => (
        <motion.span
          key={index}
          className={`pointer-events-none absolute text-amber-200/70 drop-shadow-[0_0_12px_rgba(234,179,8,0.4)]`}
          style={position}
          animate={{
            y: ["0%", "-12%", "0%"],
            rotateZ: [0, 6, -4, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <Icon className="h-10 w-10" />
        </motion.span>
      ))}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-16 px-6 py-24 sm:px-10 lg:flex-row">
        <div className="max-w-xl space-y-10 text-center lg:text-left">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.28em] text-amber-300/90 shadow-[0_0_0_1px_rgba(244,114,35,0.35)]"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-amber-200" />
            MENAA Friendsgiving
          </motion.div>

          <motion.h1
            className="text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            RSVP for{" "}
            <span className="bg-gradient-to-r from-amber-300 via-rose-200 to-emerald-200 bg-clip-text text-transparent">
              MENAA Friendsgiving
            </span>
            .
          </motion.h1>

          <motion.p
            className="text-lg text-slate-300"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            We&apos;re weaving warm spices, cultural rhythms, and community gratitude
            into one table. Join us for an evening of food, fellowship, and
            celebration.
          </motion.p>

          <motion.div
            className="grid gap-4 text-left sm:grid-cols-2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-4 backdrop-blur">
              <MapPin className="h-10 w-10 text-emerald-200" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Location
                </p>
                <p className="text-base text-slate-100">
                  Houge Park Twilight Drive & white oaks avenue, san jose, ca, 95124
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-4 backdrop-blur">
              <Clock className="h-10 w-10 text-amber-200" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Date & Time
                </p>
                <p className="text-base text-slate-100">
                  Saturday, November 23 · 4:00 PM – 8:00 PM
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={cardRef}
          className="relative w-full max-w-xl rounded-[32px] border border-white/10 bg-white/10 p-[1px] shadow-[0_20px_80px_rgba(15,118,110,0.25)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 160, damping: 18, mass: 0.9 }}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-900/80 via-slate-900/55 to-emerald-950/40 p-8 backdrop-blur-xl">
            <motion.div
              className="pointer-events-none absolute -left-24 top-12 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            <motion.div
              className="pointer-events-none absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-amber-500/25 blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.35 }}
            />

              <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-emerald-200/70">
                    RSVP Form
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-50">
                    Friendsgiving RSVP
                  </h2>
                </div>
                <motion.span
                  className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Seats filling fast
                </motion.span>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-slate-200"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-emerald-300/70 focus:bg-emerald-400/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-200"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-emerald-300/70 focus:bg-emerald-400/10"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-200">
                    Will you be attending?
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Yes, I'll be there! 🍂", value: "yes" },
                      { label: "No, I can't make it", value: "no" },
                    ].map(({ label, value }) => {
                      const isActive = formData.attending === value
                      return (
                        <motion.button
                          key={value}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              attending: value as "yes" | "no",
                            }))
                          }
                          aria-pressed={isActive}
                          whileTap={{ scale: 0.97 }}
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                            isActive
                              ? "border-emerald-300/70 bg-emerald-500/20 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                              : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-300/40 hover:bg-emerald-500/10 hover:text-emerald-100"
                          }`}
                        >
                          {label}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-2xl border border-rose-400/50 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                    {errorMessage}
                  </div>
                )}

                {isSuccess && (
                  <motion.div
                    className="rounded-2xl border border-emerald-300/60 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Thank you! We&apos;ve received your RSVP. We look forward to
                    celebrating Friendsgiving with you!
                  </motion.div>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Flame className="h-4 w-4 text-amber-300" />
                    Taste of home, stories, and gratitude—together.
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-900 shadow-[0_10px_40px_rgba(16,185,129,0.45)] transition hover:from-emerald-300 hover:via-emerald-200 hover:to-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Submit RSVP"}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

