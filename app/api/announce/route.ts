import { postToDiscord } from "@/lib/discord"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const phase = url.searchParams.get("phase")

  const content =
    phase === "pre"
      ? "Only 1 hour left!"
      : phase === "start"
      ? "It's 3PM — event is starting now!"
      : phase === "end"
      ? "That's a wrap! It was fun having everyone — see you next time!"
      : null

  if (!content) return new Response("Bad request", { status: 400 })

  const rsp = await postToDiscord({ content })
  if (!rsp.ok) return new Response("Discord error", { status: 502 })
  return new Response("OK", { status: 200 })
}


