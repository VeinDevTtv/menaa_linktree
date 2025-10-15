import { postToDiscord } from "@/lib/discord"
import { scheduleGet } from "@/lib/qstash"

export async function GET(req: Request) {
  // Triggered daily at 21:00 UTC (2PM PT during PDT)
  // 1) Send the 2PM message immediately
  // 2) Queue the 3PM message for +1 hour
  // 3) Queue the 5PM wrap-up for +3 hours

  const origin = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin

  const send2pm = await postToDiscord({ content: "Only 1 hour left!" })
  if (!send2pm.ok) return new Response("Discord error", { status: 502 })

  const url3pm = `${origin}/api/announce?phase=start`
  const url5pm = `${origin}/api/announce?phase=end`

  const schedule3pm = await scheduleGet(url3pm, "1h")
  if (!schedule3pm.ok) return new Response("Schedule 3PM failed", { status: 502 })

  const schedule5pm = await scheduleGet(url5pm, "3h")
  if (!schedule5pm.ok) return new Response("Schedule 5PM failed", { status: 502 })

  return new Response("OK", { status: 200 })
}


