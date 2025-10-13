"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { useRouter, usePathname } from "next/navigation"
import { PartyPopper } from "lucide-react"

export function AnnouncementToast() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const STORAGE_KEY = "menaa_announcement_mixer_2025_10_15"
    if (typeof window === "undefined") return
    if (localStorage.getItem(STORAGE_KEY) === "dismissed") return
    if (pathname && pathname.startsWith("/events/mixer-rsvp")) return

    const id = toast("New Event: MENAA Social Mixer", {
      description: "Wed, Oct 15 · 3:00–5:00 PM · Tap RSVP",
      duration: 10000,
      icon: <PartyPopper className="h-5 w-5 text-yellow-300" />,
      action: {
        label: "RSVP",
        onClick: () => {
          localStorage.setItem(STORAGE_KEY, "dismissed")
          router.push("/events/mixer-rsvp")
          toast.dismiss(id)
        },
      },
    })
  }, [router, pathname])

  return null
}


