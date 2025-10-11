"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { officerApplicationSchema, type OfficerApplicationInput } from "@/lib/schemas"
import { toast } from "sonner"
import * as Dialog from "@radix-ui/react-dialog"

export default function ApplyOfficerPage() {
  const [submitting, setSubmitting] = useState(false)
  const [cocOpen, setCocOpen] = useState(false)
  const [cocUnlocked, setCocUnlocked] = useState(false)
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
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

  useEffect(() => {
    if (!cocOpen) {
      document.body.style.overflow = ""
      setScrolledToBottom(false)
    } else {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [cocOpen])

  const handleScrollCheck = () => {
    const el = scrollRef.current
    if (!el) return
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
    if (atBottom) setScrolledToBottom(true)
  }

  const handleAgreeCoc = () => {
    setCocUnlocked(true)
    setCocOpen(false)
    // Mark checkbox as agreed
    setValue("codeOfConduct", true, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }

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

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                disabled={!cocUnlocked}
                {...register("codeOfConduct")}
                className="accent-orange-500 w-5 h-5 disabled:opacity-60"
              />
              <button
                type="button"
                className="text-white/80 hover:text-white underline decoration-dotted underline-offset-4"
                onClick={() => setCocOpen(true)}
              >
                I agree to the MENAA Code of Conduct (read to unlock)
              </button>
            </div>
            {errors.codeOfConduct && <p className="text-red-400 text-sm">{errors.codeOfConduct.message}</p>}
          </div>

          <Dialog.Root open={cocOpen} onOpenChange={setCocOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-2xl rounded-2xl border border-white/10 bg-stone-950 shadow-2xl">
                <div className="p-6">
                  <Dialog.Title className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                    MENAA Code of Conduct
                  </Dialog.Title>
                  <Dialog.Description className="text-white/60 mb-4">
                    Please read the following rules and community guidelines. You must scroll to the bottom to enable Agree.
                  </Dialog.Description>
                  <div
                    ref={scrollRef}
                    onScroll={handleScrollCheck}
                    className="max-h-72 overflow-y-auto pr-2 rounded-xl bg-stone-900/60 border border-white/10 p-4 space-y-3 text-white/80"
                  >
                    <p>
                      1. Respect everyone. We welcome members of all backgrounds. Harassment, discrimination, and hate speech are strictly prohibited.
                    </p>
                    <p>
                      2. Keep discussions constructive. Debate ideas, not people. Avoid personal attacks and inflammatory language.
                    </p>
                    <p>
                      3. Follow De Anza College policies and applicable laws during club events and online spaces.
                    </p>
                    <p>
                      4. No spam or self-promotion without explicit permission from officers.
                    </p>
                    <p>
                      5. Protect privacy. Do not share personal information of members without consent.
                    </p>
                    <p>
                      6. Use designated channels appropriately in Discord. Read pinned messages and event details.
                    </p>
                    <p>
                      7. Be reliable. If you commit to a role or task, communicate proactively if plans change.
                    </p>
                    <p>
                      8. Safety first at events. Follow instructions from officers and venue staff.
                    </p>
                    <p>
                      9. Report issues to officers or advisors promptly. We take concerns seriously and will address them confidentially when possible.
                    </p>
                    <p>
                      10. Violations may result in warnings or removal from activities at the officers’ discretion.
                    </p>
                    <p>
                      By agreeing, you confirm you have read and will uphold this Code of Conduct.
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-end gap-3">
                    <Dialog.Close asChild>
                      <button type="button" className="px-4 py-2 rounded-lg bg-stone-800 text-white/90 hover:bg-stone-700">
                        Close
                      </button>
                    </Dialog.Close>
                    <button
                      type="button"
                      onClick={handleAgreeCoc}
                      disabled={!scrolledToBottom}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 text-white font-semibold disabled:opacity-60"
                    >
                      Agree
                    </button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

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


