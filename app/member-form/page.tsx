"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { memberRegistrationSchema, type MemberRegistrationInput } from "@/lib/schemas"
import { toast } from "sonner"

export default function MemberFormPage() {
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MemberRegistrationInput>({
    resolver: zodResolver(memberRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      attendance: undefined as unknown as MemberRegistrationInput["attendance"],
      website: "",
    },
  })

  const onSubmit = async (data: MemberRegistrationInput) => {
    setSubmitting(true)
    try {
      const response = await fetch("/api/member-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(await response.text())
      toast.success("Thanks for joining MENAA! See you soon.")
      reset()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong"
      toast.error(message)
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
    </div>
  )
}

