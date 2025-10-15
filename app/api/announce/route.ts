import { postToDiscord } from "@/lib/discord"
import { markAnnouncementOnce } from "@/lib/submissions"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const phaseParam = url.searchParams.get("phase")
  const eventUrl = "https://deanzamenaa.vercel.app/events/mixer-rsvp"

  const content =
    phaseParam === "pre"
      ? `Countdown has started — check the website [here](${eventUrl}) to see it! Only 1 hour left!`
      : phaseParam === "start"
      ? "It's 3PM — event is starting now!"
      : phaseParam === "end"
      ? "That's a wrap! It was fun having everyone — see you next time!"
      : null

  if (!content) return new Response("Bad request", { status: 400 })

  // Idempotency: ensure each phase is sent once per event key (date)
  // Event key matches the mixer date; adjust for future events if needed
  const eventKey = "2025-10-15"
  const claimed = await markAnnouncementOnce(eventKey, phaseParam!)
  if (!claimed) return new Response("Already sent", { status: 409 })

  const rsp = await postToDiscord({ content })
  if (!rsp.ok) return new Response("Discord error", { status: 502 })
  return new Response("OK", { status: 200 })
}


