"use client"

import { useEffect } from "react"

type Phase = "pre" | "start" | "end"

export function EventAnnouncer() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Hard-coded for the mixer date in San Francisco time (PDT, UTC-7)
    const preTime = new Date("2025-10-15T14:00:00-07:00").getTime() // 2PM PT
    const startTime = new Date("2025-10-15T15:00:00-07:00").getTime() // 3PM PT
    const endTime = new Date("2025-10-15T17:00:00-07:00").getTime() // 5PM PT

    const timeouts: number[] = []

    const schedule = (targetEpochMs: number, phase: Phase) => {
      const storageKey = `menaa_ann_${phase}_2025-10-15`
      if (localStorage.getItem(storageKey) === "sent") return

      const delayMs = Math.max(0, targetEpochMs - Date.now())
      if (delayMs === 0) return

      const id = window.setTimeout(async () => {
        try {
          const rsp = await fetch(`/api/announce?phase=${phase}`, { method: "GET" })
          if (rsp.ok) {
            localStorage.setItem(storageKey, "sent")
          }
        } catch {
          // best-effort; ignore
        }
      }, delayMs)
      timeouts.push(id)
    }

    const now = Date.now()
    if (now < preTime) schedule(preTime, "pre")
    if (now < startTime) schedule(startTime, "start")
    if (now < endTime) schedule(endTime, "end")

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  return null
}


