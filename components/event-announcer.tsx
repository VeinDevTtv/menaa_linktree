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
    const graceMs = 10 * 60 * 1000 // 10 minutes

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

    const trySendNowIfInGrace = async (phase: Phase, windowStart: number) => {
      const storageKey = `menaa_ann_${phase}_2025-10-15`
      if (localStorage.getItem(storageKey) === "sent") return
      const now = Date.now()
      if (now >= windowStart && now < windowStart + graceMs) {
        try {
          const rsp = await fetch(`/api/announce?phase=${phase}`, { method: "GET" })
          if (rsp.ok) {
            localStorage.setItem(storageKey, "sent")
          }
        } catch {
          // best-effort; ignore
        }
      }
    }

    const now = Date.now()
    if (now < preTime) schedule(preTime, "pre")
    else void trySendNowIfInGrace("pre", preTime)

    if (now < startTime) schedule(startTime, "start")
    else void trySendNowIfInGrace("start", startTime)

    if (now < endTime) schedule(endTime, "end")
    else void trySendNowIfInGrace("end", endTime)

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  return null
}


