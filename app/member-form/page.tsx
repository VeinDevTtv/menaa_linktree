"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { memberRegistrationSchema, type MemberRegistrationInput } from "@/lib/schemas"
import { toast } from "sonner"
import { SubmitSuccess } from "@/components/submit-success"
import * as Dialog from "@radix-ui/react-dialog"

export default function MemberFormPage() {
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [dupMessage, setDupMessage] = useState<string | null>(null)
  const [cocOpen, setCocOpen] = useState(false)
  const [cocUnlocked, setCocUnlocked] = useState(false)
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<MemberRegistrationInput>({
    resolver: zodResolver(memberRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      attendance: undefined as unknown as MemberRegistrationInput["attendance"],
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
    setValue("codeOfConduct", true, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }

  const onSubmit = async (data: MemberRegistrationInput) => {
    setSubmitting(true)
    setDupMessage(null)
    try {
      const response = await fetch("/api/member-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const text = await response.text()
        if (response.status === 409) {
          setDupMessage(text || "You’ve already submitted this form.")
          throw new Error(text || "Duplicate submission")
        }
        throw new Error(text || "Failed to submit")
      }
      setShowSuccess(true)
      toast.success("Thanks for joining MENAA! See you soon.")
      reset()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong"
      if (!dupMessage) toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-orange-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
          De Anza MENAA Member Form
        </h1>
        <p className="text-white/70 mb-8">Welcome! Join our community by filling out this quick form.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {dupMessage && (
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-amber-300 animate-in fade-in slide-in-from-top-2">
              {dupMessage}
            </div>
          )}
          {/* Honeypot */}
          <div className="hidden">
            <label className="block text-sm mb-1" htmlFor="website">Website</label>
            <input id="website" {...register("website")} className="w-full rounded-md bg-stone-900/60 p-3" autoComplete="off" />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="name">Name (Last, First)</label>
            <input id="name" {...register("name")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="Doe, Jane" />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" {...register("email")} className="w-full rounded-xl bg-stone-900/60 p-4 border border-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" placeholder="you@example.com" />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <p className="block text-sm mb-2">Will you be attending our first meeting?</p>
            <div className="flex flex-col gap-2 rounded-xl bg-stone-900/60 p-4 border border-amber-500/20">
              <label className="inline-flex items-center gap-3">
                <input type="radio" value="yes" {...register("attendance")} className="accent-orange-500 w-5 h-5" />
                <span>YESSSSS DUH!!!</span>
              </label>
              <label className="inline-flex items-center gap-3">
                <input type="radio" value="no" {...register("attendance")} className="accent-orange-500 w-5 h-5" />
                <span>No :(</span>
              </label>
            </div>
            {errors.attendance && <p className="text-red-400 text-sm mt-1">{errors.attendance.message}</p>}
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
              {submitting ? "Submitting..." : "Submit"}
            </button>
            <Link href="/" className="text-white/70 hover:text-white underline">Back to Home</Link>
          </div>
        </form>
      </div>
      <SubmitSuccess open={showSuccess} onClose={() => setShowSuccess(false)} title="Registration received!" subtitle="Welcome to MENAA — we’re excited to have you." />
    </div>
  )
}

