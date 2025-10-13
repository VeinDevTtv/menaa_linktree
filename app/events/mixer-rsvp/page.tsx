"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function MixerRSVPPage() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(formData: FormData) {
    setSubmitting(true)
    setSuccess(null)
    setError(null)
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      attending: String(formData.get("attending") || ""),
      guests: String(formData.get("guests") || ""),
      notes: String(formData.get("notes") || ""),
      subscribe: Boolean(formData.get("subscribe")),
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
      if (!rsp.ok) throw new Error("Failed to submit RSVP")
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

        <Card className="border-orange-500/20 bg-white/5 backdrop-blur-lg p-6 md:p-8">
          <form
            action={async (formData) => {
              await onSubmit(formData)
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm text-white/80 mb-2" htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="w-full rounded-lg bg-white/10 border border-white/10 focus:border-amber-400 focus:outline-none px-4 py-3"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg bg-white/10 border border-white/10 focus:border-amber-400 focus:outline-none px-4 py-3"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Are you attending?</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="attending" value="yes" required className="accent-amber-500" />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="attending" value="no" className="accent-amber-500" />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-2" htmlFor="guests">Number of guests (optional)</label>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min={0}
                  className="w-full rounded-lg bg-white/10 border border-white/10 focus:border-amber-400 focus:outline-none px-4 py-3"
                  placeholder="0"
                />
              </div>
              <div className="flex items-end">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="subscribe" className="accent-amber-500" />
                  <span>Subscribe to event updates</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2" htmlFor="notes">Anything we should know? (dietary, accessibility, etc.)</label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full rounded-lg bg-white/10 border border-white/10 focus:border-amber-400 focus:outline-none px-4 py-3"
                placeholder="Share any notes for the organizers"
              />
            </div>

            {/* Honeypot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

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

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-6 py-3 font-semibold text-white shadow-lg hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit RSVP"}
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}


