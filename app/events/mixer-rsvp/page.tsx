"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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
              <Label htmlFor="fullName">Name (Last, First)</Label>
              <Input id="fullName" name="fullName" type="text" required placeholder="Doe, John" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" />
            </div>

            <div>
              <Label>Will you be attending?</Label>
              <div className="flex flex-wrap gap-3">
                <label className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 hover:border-amber-400/40">
                  <input type="radio" name="attending" value="yes" required className="accent-amber-500" />
                  <span className="font-medium">YES!!!!!!!!!</span>
                </label>
                <label className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 hover:border-amber-400/40">
                  <input type="radio" name="attending" value="no" className="accent-amber-500" />
                  <span className="font-medium">No :(</span>
                </label>
              </div>
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

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit RSVP"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}


