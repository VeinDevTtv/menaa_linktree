"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { useRouter, usePathname } from "next/navigation"
import { PartyPopper } from "lucide-react"

export function AnnouncementToast() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // No active announcements at this time
    // Uncomment and update the code below when there's a new event to announce
    
    // const STORAGE_KEY = "menaa_announcement_event_YYYY_MM_DD"
    // if (typeof window === "undefined") return
    // if (localStorage.getItem(STORAGE_KEY) === "dismissed") return
    // if (pathname && pathname.startsWith("/events/your-event-page")) return

    // const id = toast("New Event: Event Title", {
    //   description: "Event details",
    //   duration: 10000,
    //   icon: <PartyPopper className="h-5 w-5 text-yellow-300" />,
    //   action: {
    //     label: "RSVP",
    //     onClick: () => {
    //       localStorage.setItem(STORAGE_KEY, "dismissed")
    //       router.push("/events/your-event-page")
    //       toast.dismiss(id)
    //     },
    //   },
    // })
  }, [router, pathname])

  return null
}


