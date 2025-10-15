import { postToDiscord } from "@/lib/discord"

export async function GET() {
  const content = "It's 3PM — event is starting now!"
  const rsp = await postToDiscord({ content })
  if (!rsp.ok) return new Response("Discord error", { status: 502 })
  return new Response("OK", { status: 200 })
}


