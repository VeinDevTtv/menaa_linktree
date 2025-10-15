import { postToDiscord } from "@/lib/discord"

function resolveMessageByUtcHour(hourUtc: number): string | null {
  // SF (America/Los_Angeles) during PDT maps to:
  // 21 UTC -> 2PM PT (Only 1 hour left!)
  // 22 UTC -> 3PM PT (It's starting now)
  // 00 UTC -> 5PM PT (Wrap-up) — note: midnight UTC is next day
  if (hourUtc === 21) return "Only 1 hour left!"
  if (hourUtc === 22) return "It's 3PM — event is starting now!"
  if (hourUtc === 0) return "That's a wrap! It was fun having everyone — see you next time!"
  return null
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const phase = url.searchParams.get("phase")

  let content: string | null = null
  if (phase === "pre") content = "Only 1 hour left!"
  else if (phase === "start") content = "It's 3PM — event is starting now!"
  else if (phase === "end") content = "That's a wrap! It was fun having everyone — see you next time!"
  else content = resolveMessageByUtcHour(new Date().getUTCHours())

  if (!content) return new Response("No announcement at this time", { status: 204 })

  const rsp = await postToDiscord({ content })
  if (!rsp.ok) return new Response("Discord error", { status: 502 })
  return new Response("OK", { status: 200 })
}


