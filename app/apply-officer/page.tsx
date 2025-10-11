"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { officerApplicationSchema, type OfficerApplicationInput } from "@/lib/schemas"
import { toast } from "sonner"

export default function ApplyOfficerPage() {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OfficerApplicationInput>({
    resolver: zodResolver(officerApplicationSchema),
    defaultValues: {
      fullName: "",
      discordName: "",
      email: "",
      yearMajor: "",
      rolesInterested: "",
      availability: "",
      whyJoin: "",
      experience: "",
      codeOfConduct: false,
      website: "",
    },
  })

  const onSubmit = async (data: OfficerApplicationInput) => {
    setSubmitting(true)
    try {
      const response = await fetch("/api/officer-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const text = await response.text().catch(() => "")
        throw new Error(text || "Failed to submit application")
      }
      toast.success("Application submitted! We'll be in touch soon.")
      reset()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
          Apply for Officer
        </h1>
        <p className="text-white/70 mb-8">
          Fill out this form to apply for an officer position with MENAA. You must be a member of our Discord.
          Join here: <a className="text-yellow-400 underline" href="https://discord.gg/UAS7xXRj27" target="_blank" rel="noopener noreferrer">discord invite</a>.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot */}
          <div className="hidden">
            <label className="block text-sm mb-1" htmlFor="website">Website</label>
            <input id="website" {...register("website")} className="w-full rounded-md bg-stone-900/60 p-3" autoComplete="off" />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="fullName">Full Name</label>
            <input id="fullName" {...register("fullName")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="Jane Doe" />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="discordName">Discord Name</label>
            <input id="discordName" {...register("discordName")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="username#1234" />
            <p className="text-white/60 text-sm mt-1">You must be in our Discord. <a className="text-yellow-400 underline" href="https://discord.gg/UAS7xXRj27" target="_blank" rel="noopener noreferrer">Join here</a>.</p>
            {errors.discordName && <p className="text-red-400 text-sm mt-1">{errors.discordName.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" {...register("email")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" placeholder="you@example.com" />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="yearMajor">Year/Major</label>
            <input id="yearMajor" {...register("yearMajor")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="2nd year / Computer Science" />
            {errors.yearMajor && <p className="text-red-400 text-sm mt-1">{errors.yearMajor.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="rolesInterested">Roles Interested In</label>
            <input id="rolesInterested" {...register("rolesInterested")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="e.g., Events, Marketing, Outreach" />
            {errors.rolesInterested && <p className="text-red-400 text-sm mt-1">{errors.rolesInterested.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="availability">Availability</label>
            <input id="availability" {...register("availability")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" placeholder="e.g., Mon/Wed afternoons" />
            {errors.availability && <p className="text-red-400 text-sm mt-1">{errors.availability.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="whyJoin">Why do you want to join?</label>
            <textarea id="whyJoin" {...register("whyJoin")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 min-h-28" placeholder="Tell us why you're interested" />
            {errors.whyJoin && <p className="text-red-400 text-sm mt-1">{errors.whyJoin.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="experience">Experience (optional)</label>
            <textarea id="experience" {...register("experience")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 min-h-24" placeholder="Share any relevant experience" />
          </div>

          <label className="flex items-center gap-3">
            <input type="checkbox" {...register("codeOfConduct")} className="accent-orange-500 w-5 h-5" />
            <span className="text-white/80">I agree to the MENAA Code of Conduct</span>
          </label>
          {errors.codeOfConduct && <p className="text-red-400 text-sm">{errors.codeOfConduct.message}</p>}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 rounded-2xl text-white font-semibold shadow-lg disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <Link href="/" className="text-white/70 hover:text-white underline">Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  )
}


