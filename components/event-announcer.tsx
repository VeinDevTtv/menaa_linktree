"use client"

import { useEffect } from "react"

type Phase = "pre" | "start" | "end"

export function EventAnnouncer() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // TODO: Update these dates when setting up announcements for a new event
    // Configured for America/Los_Angeles timezone (PT)
    const preTime = new Date("YYYY-MM-DDTHH:MM:SS-07:00").getTime() // Update: 1 hour before event
    const startTime = new Date("YYYY-MM-DDTHH:MM:SS-07:00").getTime() // Update: Event start time
    const endTime = new Date("YYYY-MM-DDTHH:MM:SS-07:00").getTime() // Update: Event end time
    const graceMs = 10 * 60 * 1000 // 10 minutes
    
    // Return early if no event is currently configured
    if (isNaN(preTime) || isNaN(startTime) || isNaN(endTime)) return

    const timeouts: number[] = []

    const schedule = (targetEpochMs: number, phase: Phase, eventKey: string) => {
      const storageKey = `menaa_ann_${phase}_${eventKey}`
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

    const trySendNowIfInGrace = async (phase: Phase, windowStart: number, eventKey: string) => {
      const storageKey = `menaa_ann_${phase}_${eventKey}`
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

    const eventKey = "YYYY-MM-DD" // TODO: Update with event date
    
    const now = Date.now()
    if (now < preTime) schedule(preTime, "pre", eventKey)
    else void trySendNowIfInGrace("pre", preTime, eventKey)

    if (now < startTime) schedule(startTime, "start", eventKey)
    else void trySendNowIfInGrace("start", startTime, eventKey)

    if (now < endTime) schedule(endTime, "end", eventKey)
    else void trySendNowIfInGrace("end", endTime, eventKey)

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  return null
}


