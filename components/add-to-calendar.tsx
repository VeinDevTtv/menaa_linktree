"use client"

import { useMemo, useState, useCallback } from "react"
import { MotionButton } from "@/components/ui/button"
import { CalendarPlus, ChevronDown, Download, ExternalLink } from "lucide-react"

type AddToCalendarProps = {
  title: string
  description?: string
  location?: string
  start: Date
  end: Date
  timezone?: string // e.g. "America/Los_Angeles"
}

function toGoogleCalendarUrl(
  title: string,
  description: string,
  location: string,
  start: Date,
  end: Date,
  timezone?: string,
) {
  // Google accepts UTC Z times with optional ctz specifying display TZ
  const startUtc = toICSDateTime(start, true)
  const endUtc = toICSDateTime(end, true)
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location,
    dates: `${startUtc}/${endUtc}`,
  })
  if (timezone) params.set("ctz", timezone)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function toOutlookLiveUrl(
  title: string,
  description: string,
  location: string,
  start: Date,
  end: Date,
) {
  // Outlook live expects ISO strings in UTC
  const startIso = start.toISOString()
  const endIso = end.toISOString()
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: startIso,
    enddt: endIso,
    subject: title,
    body: description,
    location,
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

function toOffice365Url(
  title: string,
  description: string,
  location: string,
  start: Date,
  end: Date,
) {
  const startIso = start.toISOString()
  const endIso = end.toISOString()
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: startIso,
    enddt: endIso,
    subject: title,
    body: description,
    location,
  })
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`
}

function toYahooUrl(
  title: string,
  description: string,
  location: string,
  start: Date,
  end: Date,
) {
  // Yahoo prefers UTC in basic format
  const startUtc = toICSDateTime(start, true)
  const endUtc = toICSDateTime(end, true)
  const params = new URLSearchParams({
    v: "60",
    view: "d",
    type: "20",
    title,
    st: startUtc,
    et: endUtc,
    desc: description,
    in_loc: location,
  })
  return `https://calendar.yahoo.com/?${params.toString()}`
}

function pad(num: number): string {
  return String(num).padStart(2, "0")
}

function toICSDateTime(date: Date, zulu = false): string {
  // Format: YYYYMMDDTHHMMSSZ (if zulu) or local without Z
  const year = date.getUTCFullYear()
  const month = pad(date.getUTCMonth() + 1)
  const day = pad(date.getUTCDate())
  const hours = pad(date.getUTCHours())
  const minutes = pad(date.getUTCMinutes())
  const seconds = pad(date.getUTCSeconds())
  const base = `${year}${month}${day}T${hours}${minutes}${seconds}`
  return zulu ? `${base}Z` : base
}

function escapeICSText(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
}

function buildICS(
  title: string,
  description: string,
  location: string,
  start: Date,
  end: Date,
  timezone?: string,
): string {
  const dtStamp = toICSDateTime(new Date(), true)
  const dtStart = toICSDateTime(start, true)
  const dtEnd = toICSDateTime(end, true)
  const uid = `${dtStart}-${Math.random().toString(36).slice(2)}@menaa`
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MENAA//AddToCalendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeICSText(title)}`,
    `DESCRIPTION:${escapeICSText(description)}`,
    location ? `LOCATION:${escapeICSText(location)}` : "",
    timezone ? `X-TIMEZONE:${timezone}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean)
  return lines.join("\r\n")
}

export function AddToCalendar({ title, description = "", location = "", start, end, timezone }: AddToCalendarProps) {
  const [open, setOpen] = useState(false)

  const urls = useMemo(() => {
    return {
      google: toGoogleCalendarUrl(title, description, location, start, end, timezone),
      outlook: toOutlookLiveUrl(title, description, location, start, end),
      office365: toOffice365Url(title, description, location, start, end),
      yahoo: toYahooUrl(title, description, location, start, end),
    }
  }, [title, description, location, start, end, timezone])

  const downloadICS = useCallback(() => {
    const ics = buildICS(title, description, location, start, end, timezone)
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.replace(/\s+/g, "_")}.ics`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, [title, description, location, start, end, timezone])

  return (
    <div className="relative inline-block">
      <MotionButton
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((v) => !v)}
        className="gap-2 rounded-2xl"
      >
        <CalendarPlus className="h-5 w-5" />
        Add to calendar
        <ChevronDown className="h-4 w-4 opacity-90" />
      </MotionButton>
      {open && (
        <div className="absolute z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-stone-950/95 p-2 shadow-xl">
          <MenuLink href={urls.google} label="Google Calendar" />
          <MenuLink href={urls.outlook} label="Outlook.com" />
          <MenuLink href={urls.office365} label="Office 365" />
          <MenuLink href={urls.yahoo} label="Yahoo Calendar" />
          <MenuButton onClick={downloadICS} label="Apple Calendar (.ics)" />
        </div>
      )}
      {open && (
        <div className="fixed inset-0" onClick={() => setOpen(false)} />
      )}
    </div>
  )
}

function MenuLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 hover:bg-white/5"
    >
      <span>{label}</span>
      <ExternalLink className="h-4 w-4 opacity-70" />
    </a>
  )
}

function MenuButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-white/90 hover:bg-white/5"
    >
      <span>{label}</span>
      <Download className="h-4 w-4 opacity-70" />
    </button>
  )
}

export default AddToCalendar


