"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AddToCalendar } from "@/components/add-to-calendar"
import { SubmitSuccess } from "@/components/submit-success"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { PartyPopper, Frown, Users, Clock, MapPin, Sparkles, ArrowLeft } from "lucide-react"
import { ArabesquePatterns } from "@/components/arabesque-patterns"

type Props = {
  simulateNow?: string | null
  simulatePhase?: "form" | "countdown" | "live" | "ended" | null
}

type Phase = "form" | "countdown" | "live" | "ended"

export function MixerRSVPView({ simulateNow = null, simulatePhase = null }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [dupMessage, setDupMessage] = useState<string | null>(null)

  // Event metadata
  const eventTitle = "MENAA Social Mixer"
  const eventDescription = "MENAA Social Mixer — connect with the community!"
  const eventLocation = "Fireside, De Anza College"
  const eventStart = useMemo(() => new Date("2025-10-15T15:00:00-07:00"), [])
  const eventEnd = useMemo(() => new Date("2025-10-15T17:00:00-07:00"), [])
  const eventTimezone = "America/Los_Angeles"

  const nowDate = useCallback((): Date => {
    if (simulatePhase) return new Date("2025-10-15T13:30:00-07:00") // ignored if simulatePhase provided
    if (simulateNow) {
      const d = new Date(simulateNow)
      if (!isNaN(d.getTime())) return d
    }
    return new Date()
  }, [simulateNow, simulatePhase])

  const [now, setNow] = useState<Date>(() => nowDate())
  const [phase, setPhase] = useState<Phase>(() => determinePhase(nowDate(), eventStart, eventEnd))

  useEffect(() => {
    // If simulatePhase explicitly set, honor it
    if (simulatePhase) {
      setPhase(simulatePhase)
      return
    }
    setPhase(determinePhase(nowDate(), eventStart, eventEnd))
  }, [simulatePhase, nowDate, eventStart, eventEnd])

  useEffect(() => {
    if (simulatePhase) return
    const id = window.setInterval(() => {
      const current = nowDate()
      setNow(current)
      setPhase(determinePhase(current, eventStart, eventEnd))
    }, 1000)
    return () => window.clearInterval(id)
  }, [nowDate, eventStart, eventEnd, simulatePhase])

  async function onSubmit(formData: FormData) {
    setSubmitting(true)
    setSuccess(null)
    setError(null)
    setDupMessage(null)
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      attending: String(formData.get("attending") || ""),
      website: String(formData.get("website") || ""),
    }
    if (payload.website) {
      setSubmitting(false)
      return
    }
    try {
      const rsp = await fetch("/api/event-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!rsp.ok) {
        const text = await rsp.text()
        if (rsp.status === 409) {
          setDupMessage(text || "You’ve already RSVP’d.")
          // Do not throw; we handled the duplicate gracefully.
          return
        }
        throw new Error(text || "Failed to submit RSVP")
      }
      setShowSuccess(true)
      setSuccess("Thanks! Your RSVP has been recorded.")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const { hours, minutes, seconds } = useMemo(() => getCountdownParts(now, eventStart), [now, eventStart])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950 text-white">
      {/* Subtle aesthetic background */}
      <div className="absolute inset-0 pointer-events-none">
        <ArabesquePatterns />
        {/* Ambient gradient blobs */}
        <motion.div
          aria-hidden
          className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-600/20 blur-3xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-[-5rem] left-[-3rem] w-[22rem] h-[22rem] rounded-full bg-gradient-to-br from-yellow-500/15 to-orange-600/15 blur-3xl"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Phase aura tied to current phase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`aura-${phase}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background:
              phase === "form"
                ? "radial-gradient(60rem 60rem at 20% 20%, rgba(249,115,22,0.25), transparent 70%)"
                : phase === "countdown"
                ? "radial-gradient(60rem 60rem at 50% 0%, rgba(234,179,8,0.28), transparent 70%)"
                : phase === "live"
                ? "radial-gradient(60rem 60rem at 80% 80%, rgba(245,158,11,0.3), transparent 70%)"
                : "radial-gradient(60rem 60rem at 50% 80%, rgba(120,113,108,0.28), transparent 70%)",
          }}
        />
      </AnimatePresence>

      <div className="relative z-10 container max-w-3xl mx-auto px-4 py-10 md:py-16">
        <Link href="/events" className="inline-block mb-6 text-amber-300 hover:text-amber-200">
          ← Back to Events
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
            {eventTitle}
          </h1>
          <p className="text-white/80">
            Join us for our first social mixer of the quarter—connect, vibe, and make new friends across the MENAA community. Light refreshments provided.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <InfoPill icon={<Clock className="h-4 w-4" />}>3:00–5:00 PM PT</InfoPill>
            <InfoPill icon={<MapPin className="h-4 w-4" />}>Fireside Room</InfoPill>
            <div className="ml-auto">
              <AddToCalendar
                title={eventTitle}
                description={eventDescription}
                location={eventLocation}
                start={eventStart}
                end={eventEnd}
                timezone={eventTimezone}
              />
            </div>
          </div>
        </div>

        <LayoutGroup>
          <AnimatePresence mode="wait">
            {phase === "form" && (
              <motion.div
                key="phase-form"
                initial={{ opacity: 0, y: 24, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.99 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                layout
              >
                <Card className="relative overflow-hidden border-orange-500/20 bg-white/5 backdrop-blur-lg p-6 md:p-8" data-phase="form" >
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 animate-border-flow" />
                <form
                  action={async (formData) => {
                    await onSubmit(formData)
                  }}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="fullName">Name (Last, First)</Label>
                    <Input id="fullName" name="fullName" type="text" required placeholder="Doe, John" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div>
                    <Label>Will you be attending?</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="group relative cursor-pointer">
                        <input type="radio" name="attending" value="yes" required className="peer sr-only" />
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 px-4 py-4 text-amber-100 transition-all duration-300 shadow-sm hover:shadow-md group-hover:scale-[1.01] peer-checked:scale-[1.02] peer-checked:border-transparent peer-checked:text-white peer-checked:shadow-xl peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:via-amber-500 peer-checked:to-yellow-500">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <PartyPopper className="h-6 w-6 opacity-90 transition-all group-hover:rotate-6" />
                              <span className="absolute -top-2 -right-2 h-2 w-2 rounded-full bg-yellow-300 opacity-0 peer-checked:opacity-100 animate-ping" />
                              <span className="absolute -bottom-2 -left-1 h-1.5 w-1.5 rounded-full bg-orange-300 opacity-0 peer-checked:opacity-100 animate-ping [animation-delay:150ms]" />
                              <span className="absolute -top-1 left-3 h-1.5 w-1.5 rounded-full bg-amber-300 opacity-0 peer-checked:opacity-100 animate-ping [animation-delay:300ms]" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold tracking-wide">YES!!!!!!!!!</div>
                              <div className="text-xs opacity-80">We can’t wait to see you there!</div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <label className="group relative cursor-pointer">
                        <input type="radio" name="attending" value="no" className="peer sr-only" />
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 px-4 py-4 text-stone-200 transition-all duration-300 shadow-sm hover:shadow-md group-hover:scale-[1.01] peer-checked:scale-[1.02] peer-checked:border-transparent peer-checked:text-white peer-checked:shadow-xl peer-checked:bg-gradient-to-r peer-checked:from-stone-500 peer-checked:to-amber-500">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Frown className="h-6 w-6 opacity-90 transition-all group-hover:-rotate-6" />
                              <span className="absolute -top-2 -right-2 h-2 w-2 rounded-full bg-stone-300 opacity-0 peer-checked:opacity-100 animate-ping" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold tracking-wide">No :(</div>
                              <div className="text-xs opacity-80">We’ll miss you — hope to see you next time.</div>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                  <AnimatePresence>
                    {dupMessage && (
                      <FeedbackBanner key="dup" variant="duplicate" message={dupMessage} />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {success && <FeedbackBanner key="ok" variant="success" message={success} />}
                  </AnimatePresence>
                  <AnimatePresence>
                    {error && <FeedbackBanner key="err" variant="error" message={error} />}
                  </AnimatePresence>
                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? "Submitting..." : "Submit RSVP"}
                  </Button>
                </form>
                  <SubmitSuccess open={showSuccess} onClose={() => setShowSuccess(false)} title="RSVP received!" subtitle="See you at the mixer." />
                </Card>
              </motion.div>
            )}

            {phase === "countdown" && (
              <motion.div
                key="phase-countdown"
                initial={{ opacity: 0, y: 20, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.99 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                layout
              >
                <Card className="relative overflow-hidden border-amber-400/30 bg-gradient-to-br from-orange-950/60 to-amber-900/40 backdrop-blur-xl p-8 text-center" data-phase="countdown">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-amber-500/10 animate-border-flow" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 mb-6 animate-pulse-3d">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                    Starting soon!
                  </h2>
                  <p className="text-white/80 mb-6">The mixer begins at 3:00 PM PT. See you there.</p>
                  <div className="mx-auto max-w-md">
                    <div className="grid grid-cols-3 gap-3">
                      <TimeBox label="Hours" value={hours} />
                      <TimeBox label="Minutes" value={minutes} />
                      <TimeBox label="Seconds" value={seconds} />
                    </div>
                  </div>
                </div>
                </Card>
              </motion.div>
            )}

            {phase === "live" && (
              <motion.div
                key="phase-live"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                layout
              >
                <Card className="relative overflow-hidden border-green-400/20 bg-gradient-to-br from-orange-900/60 to-amber-900/40 backdrop-blur-xl p-10 text-center" data-phase="live">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/15 via-yellow-500/15 to-amber-500/15 animate-border-flow" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 mb-6 animate-pulse-3d">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                    It’s happening now!
                  </h2>
                  <p className="text-white/85 mb-6">Join us at Fireside Room. We’re here 3:00–5:00 PM PT.</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href="https://maps.apple.com/?q=Hinson+Campus+Center+De+Anza+College"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 font-semibold hover:brightness-110 hover:scale-[1.02] transition-all shadow-lg"
                    >
                      <MapPin className="w-5 h-5" /> Open in Maps
                    </a>
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/10 font-semibold hover:bg-white/15 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back to Events
                    </Link>
                  </div>
                </div>
                <DecorativeGlow />
                </Card>
              </motion.div>
            )}

            {phase === "ended" && (
              <motion.div
                key="phase-ended"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                layout
              >
                <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-stone-900/60 to-amber-900/30 backdrop-blur-xl p-10 text-center" data-phase="ended">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-500/10 via-amber-500/10 to-yellow-500/10 animate-border-flow" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-500 mb-6 animate-pulse-3d">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                    That’s a wrap — thank you!
                  </h2>
                  <p className="text-white/80 mb-6">We loved having everyone. See you at the next MENAA event!</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/10 font-semibold hover:bg-white/15 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back to Events
                    </Link>
                  </div>
                </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        {phase === "form" && (
          <div className="mt-10 text-center text-white/70 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Smooth transitions kick in 1 hour before the event
          </div>
        )}
      </div>
    </div>
  )
}

function determinePhase(now: Date, start: Date, end: Date): Phase {
  const untilStartMs = start.getTime() - now.getTime()
  const untilEndMs = end.getTime() - now.getTime()
  if (untilEndMs <= 0) return "ended"
  if (untilStartMs <= 0) return "live"
  if (untilStartMs <= 60 * 60 * 1000) return "countdown"
  return "form"
}

function getCountdownParts(now: Date, start: Date) {
  let diff = Math.max(0, start.getTime() - now.getTime())
  const hours = Math.floor(diff / (1000 * 60 * 60))
  diff -= hours * (1000 * 60 * 60)
  const minutes = Math.floor(diff / (1000 * 60))
  diff -= minutes * (1000 * 60)
  const seconds = Math.floor(diff / 1000)
  return { hours, minutes, seconds }
}

function TimeBox({ label, value }: { label: string; value: number }) {
  const v = value.toString().padStart(2, "0")
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-4xl md:text-5xl font-bold tracking-widest bg-gradient-to-r from-orange-200 via-yellow-200 to-amber-200 bg-clip-text text-transparent">
        {v}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/60">{label}</div>
    </div>
  )
}

function InfoPill({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
      {icon}
      <span>{children}</span>
    </span>
  )
}

function DecorativeGlow() {
  return (
    <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 blur-2xl" />
  )
}

function FeedbackBanner({
  variant,
  message,
}: {
  variant: "success" | "duplicate" | "error"
  message: string
}) {
  const isSuccess = variant === "success"
  const isDup = variant === "duplicate"

  const baseClasses =
    "relative overflow-hidden rounded-xl px-4 py-3 border shadow-sm"
  const palette = isSuccess
    ? {
        border: "border-green-400/30",
        bg: "bg-gradient-to-br from-green-500/15 to-emerald-500/10",
        text: "text-green-200",
      }
    : isDup
    ? {
        border: "border-amber-400/30",
        bg: "bg-gradient-to-br from-amber-500/15 to-yellow-500/10",
        text: "text-amber-200",
      }
    : {
        border: "border-red-400/30",
        bg: "bg-gradient-to-br from-red-500/15 to-rose-500/10",
        text: "text-rose-200",
      }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={[baseClasses, palette.border, palette.bg, palette.text].join(" ")}
      layout
    >
      {isSuccess && <ConfettiBurst />}
      {isDup && <GlowRings />}
      <div className="relative z-10 flex items-center gap-3">
        {isSuccess ? (
          <PartyPopper className="h-5 w-5" />
        ) : isDup ? (
          <Sparkles className="h-5 w-5" />
        ) : (
          <Frown className="h-5 w-5" />
        )}
        <div className="font-medium tracking-wide">{message}</div>
      </div>
    </motion.div>
  )
}

function ConfettiBurst() {
  // Deterministic layout (no Math.random) to avoid hydration mismatches
  const colors = [
    "#F59E0B",
    "#EAB308",
    "#84CC16",
    "#22C55E",
    "#06B6D4",
    "#A78BFA",
    "#F472B6",
  ]
  const pieces = new Array(14).fill(null).map((_, i) => i)
  return (
    <div className="pointer-events-none absolute inset-0">
      {pieces.map((i) => {
        const left = `${(i * 67) % 100}%`
        const delay = 0.02 * (i % 7)
        const color = colors[i % colors.length]
        const rotate = (i % 2 === 0 ? 1 : -1) * (30 + (i % 6) * 8)
        return (
          <motion.span
            key={`confetti-${i}`}
            aria-hidden
            className="absolute top-1/2 block h-2 w-2 rounded-sm"
            style={{ left, backgroundColor: color, filter: "saturate(1.1)" }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{ y: -42 - i, opacity: [0, 1, 0.8, 0], rotate }}
            transition={{ duration: 0.9 + (i % 5) * 0.08, delay, ease: "easeOut" }}
          />
        )
      })}
    </div>
  )
}

function GlowRings() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-xl"
        style={{ boxShadow: "0 0 0 2px rgba(251,191,36,0.25), 0 0 40px rgba(251,191,36,0.12) inset" }}
        initial={{ opacity: 0.0, scale: 0.98 }}
        animate={{ opacity: [0.0, 0.7, 0.35, 0.6, 0.0], scale: [0.98, 1.02, 1.0] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -inset-1 rounded-[1.1rem]"
        style={{
          background:
            "radial-gradient(240px 90px at 20% 50%, rgba(251,191,36,0.20), transparent 60%), radial-gradient(240px 90px at 80% 50%, rgba(253,186,116,0.16), transparent 60%)",
          filter: "blur(12px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.25, 0.55, 0] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  )
}

export default MixerRSVPView


