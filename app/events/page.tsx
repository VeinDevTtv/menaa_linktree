"use client"

import {
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  useRef,
  useState,
} from "react"
import { motion } from "framer-motion"
import {
  CalendarDays,
  Clock,
  Flame,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react"

import { ArabesquePatterns } from "@/components/arabesque-patterns"

const RSVP_DATES = [
  { label: "Tuesday · Nov 19 · 4 – 8 PM", value: "November 19 (4-8 PM)" },
  { label: "Wednesday · Nov 20 · 4 – 8 PM", value: "November 20 (4-8 PM)" },
  { label: "Friday · Nov 22 · 4 – 8 PM", value: "November 22 (4-8 PM)" },
  { label: "Saturday · Nov 23 · 4 – 8 PM", value: "November 23 (4-8 PM)" },
  { label: "Tuesday · Nov 26 · 4 – 8 PM", value: "November 26 (4-8 PM)" },
]

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1427370612401242232/rut_6p-3W9ns228YE_E2jmRPWVuiTyOcAyj8_Exhom_LBlEaqgFJHxOH_NgrdbC3rdRO"

type FormStatus = "idle" | "loading" | "success" | "error"

const floatingAccents = [
  { Icon: Sparkles, top: "12%", left: "10%", delay: 0 },
  { Icon: Users, top: "22%", right: "12%", delay: 1.2 },
  { Icon: Flame, bottom: "18%", left: "16%", delay: 0.6 },
  { Icon: CalendarDays, bottom: "20%", right: "8%", delay: 1.8 },
]

export default function EventsPage() {
  const [formData, setFormData] = useState({
    clubName: "",
    attendees: "",
    notes: "",
  })
  const [selectedDates, setSelectedDates] = useState<string[]>([])
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

  const toggleDate = (value: string) => {
    setSelectedDates((prev) =>
      prev.includes(value)
        ? prev.filter((entry) => entry !== value)
        : [...prev, value],
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const clubName = formData.clubName.trim()
    const attendees = Number.parseInt(formData.attendees, 10)
    const hasDates = selectedDates.length > 0

    if (!clubName) {
      setErrorMessage("Share the club or organization you're representing.")
      setStatus("error")
      return
    }

    if (!Number.isFinite(attendees) || attendees <= 0) {
      setErrorMessage("Let us know roughly how many members are joining.")
      setStatus("error")
      return
    }

    if (!hasDates) {
      setErrorMessage("Pick at least one date that works best for your club.")
      setStatus("error")
      return
    }

    setErrorMessage(null)
    setStatus("loading")

    const preferredDates = selectedDates.join("\n• ")
    const notes = formData.notes.trim() || "No additional notes."

    const embedFields = [
      { name: "Club / Organization", value: clubName },
      { name: "Expected Guests", value: `${attendees}` },
      { name: "Preferred Dates", value: `• ${preferredDates}` },
      { name: "Notes & Cultural Touches", value: notes },
    ]

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "MENAA Friendsgiving RSVP",
          content: "**New Friendsgiving RSVP received!**",
          embeds: [
            {
              title: "🍂 Friendsgiving Club RSVP",
              description:
                "Celebrating community, gratitude, and MENA flavors.",
              color: 0xf97316,
              fields: embedFields,
              footer: { text: "MENAA Friendsgiving RSVP Portal" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`)
      }

      setStatus("success")
      setFormData({ clubName: "", attendees: "", notes: "" })
      setSelectedDates([])
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
            RSVP your club for a{" "}
            <span className="bg-gradient-to-r from-amber-300 via-rose-200 to-emerald-200 bg-clip-text text-transparent">
              MENA-inspired Friendsgiving
            </span>
            .
          </motion.h1>

          <motion.p
            className="text-lg text-slate-300"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            We’re weaving warm spices, cultural rhythms, and community gratitude
            into one table. Share your club’s details so we can set the scene
            and reserve your seats.
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
                  Gathering Place
                </p>
                <p className="text-base text-slate-100">
                  MENAA Commons · Warm + welcoming
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-4 backdrop-blur">
              <Clock className="h-10 w-10 text-amber-200" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Event Window
                </p>
                <p className="text-base text-slate-100">4:00 PM – 8:00 PM</p>
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
                    Reservation Form
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-50">
                    Friendsgiving Club RSVP
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
                    htmlFor="clubName"
                    className="text-sm font-medium text-slate-200"
                  >
                    Club or organization name
                  </label>
                  <input
                    id="clubName"
                    name="clubName"
                    type="text"
                    required
                    placeholder="MENAA Cultural Society"
                    value={formData.clubName}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        clubName: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-emerald-300/70 focus:bg-emerald-400/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="attendees"
                    className="text-sm font-medium text-slate-200"
                  >
                    Expected number of members attending
                  </label>
                  <input
                    id="attendees"
                    name="attendees"
                    type="number"
                    min={1}
                    required
                    placeholder="e.g. 15"
                    value={formData.attendees}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        attendees: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-emerald-300/70 focus:bg-emerald-400/10"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-200">
                    Which date(s) work best for your club?
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {RSVP_DATES.map(({ label, value }) => {
                      const isActive = selectedDates.includes(value)
                      return (
                        <motion.button
                          key={value}
                          type="button"
                          onClick={() => toggleDate(value)}
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

                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="text-sm font-medium text-slate-200"
                  >
                    Cultural offerings or special notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Share a dish, performance idea, or accessibility need."
                    value={formData.notes}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-emerald-300/70 focus:bg-emerald-400/10"
                  />
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
                    Thank you! We’ve received your RSVP and will follow up with
                    hosting details soon.
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

