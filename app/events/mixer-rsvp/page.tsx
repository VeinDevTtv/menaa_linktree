"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PartyPopper, Frown } from "lucide-react"
import { SubmitSuccess } from "@/components/submit-success"

export default function MixerRSVPPage() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [dupMessage, setDupMessage] = useState<string | null>(null)

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
          throw new Error(text || "Duplicate submission")
        }
        throw new Error(text || "Failed to submit RSVP")
      }
      setShowSuccess(true)
      setSuccess("Thanks! Your RSVP has been recorded.")
    } catch (e) {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950 text-white">
      <div className="container max-w-3xl mx-auto px-4 py-10 md:py-16">
        <Link href="/events" className="inline-block mb-6 text-amber-300 hover:text-amber-200">
          ← Back to Events
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
            MENAA Social Mixer
          </h1>
          <p className="text-white/80">
            Join us for our first social mixer of the quarter—connect, vibe, and make new friends across the MENAA community. Light refreshments provided.
          </p>
        </div>

        <Card className="relative overflow-hidden border-orange-500/20 bg-white/5 backdrop-blur-lg p-6 md:p-8">
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
                {/* YES card */}
                <label className="group relative cursor-pointer">
                  <input type="radio" name="attending" value="yes" required className="peer sr-only" />
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 px-4 py-4 text-amber-100 transition-all duration-300 shadow-sm hover:shadow-md group-hover:scale-[1.01] peer-checked:scale-[1.02] peer-checked:border-transparent peer-checked:text-white peer-checked:shadow-xl peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:via-amber-500 peer-checked:to-yellow-500">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <PartyPopper className="h-6 w-6 opacity-90 transition-all group-hover:rotate-6" />
                        {/* confetti pings */}
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
                {/* NO card */}
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

            

            {/* Honeypot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          {dupMessage && (
            <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-amber-300 animate-in fade-in slide-in-from-top-2">
              {dupMessage}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-green-400/30 bg-green-500/10 px-4 py-3 text-green-300">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-300">
              {error}
            </div>
          )}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit RSVP"}
            </Button>
          </form>
        </Card>
      <SubmitSuccess open={showSuccess} onClose={() => setShowSuccess(false)} title="RSVP received!" subtitle="See you at the mixer." />
      </div>
    </div>
  )
}


