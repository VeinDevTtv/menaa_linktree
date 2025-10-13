"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PartyPopper, Frown } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-stone-900">
      <div className="container max-w-3xl mx-auto px-4 py-10 md:py-16">
        <Link href="/events" className="inline-block mb-6 text-amber-700 hover:text-amber-600">
          ← Back to Events
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            MENAA Social Mixer
          </h1>
          <p className="text-stone-700">
            Join us for our first social mixer of the quarter—connect, vibe, and make new friends across the MENAA community. Light refreshments provided.
          </p>
        </div>

        <Card className="relative overflow-hidden border-amber-200 bg-white p-6 md:p-8 shadow-xl">
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-yellow-500/5 animate-border-flow" />
          <form
            action={async (formData) => {
              await onSubmit(formData)
            }}
            className="space-y-5"
          >
            <div>
              <Label htmlFor="fullName">Name (Last, First)</Label>
              <Input id="fullName" name="fullName" type="text" required placeholder="Doe, John" className="bg-white border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-500" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" className="bg-white border-amber-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-500" />
            </div>

            <div>
              <Label>Will you be attending?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="group relative cursor-pointer">
                  <input type="radio" name="attending" value="yes" required className="peer sr-only" />
                  <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-100 to-yellow-100 px-4 py-3 text-amber-800 transition-all duration-300 shadow-sm hover:shadow-md group-hover:scale-[1.01] peer-checked:scale-[1.02] peer-checked:border-transparent peer-checked:text-white peer-checked:shadow-lg peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:via-amber-500 peer-checked:to-yellow-500">
                    <div className="flex items-center gap-2">
                      <PartyPopper className="h-5 w-5 opacity-80 transition-all group-hover:rotate-6" />
                      <span className="font-semibold tracking-wide">YES!!!!!!!!!</span>
                    </div>
                  </div>
                </label>
                <label className="group relative cursor-pointer">
                  <input type="radio" name="attending" value="no" className="peer sr-only" />
                  <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-100 to-yellow-100 px-4 py-3 text-stone-700 transition-all duration-300 shadow-sm hover:shadow-md group-hover:scale-[1.01] peer-checked:scale-[1.02] peer-checked:border-transparent peer-checked:text-white peer-checked:shadow-lg peer-checked:bg-gradient-to-r peer-checked:from-stone-400 peer-checked:to-amber-400">
                    <div className="flex items-center gap-2">
                      <Frown className="h-5 w-5 opacity-80 transition-all group-hover:-rotate-6" />
                      <span className="font-semibold tracking-wide">No :(</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            

            {/* Honeypot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            {success && (
              <div className="rounded-lg border border-green-500/30 bg-green-100 text-green-800 px-4 py-3">
                {success}
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-100 text-red-800 px-4 py-3">
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


