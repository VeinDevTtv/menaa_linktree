import { postToDiscord } from "@/lib/discord"

export async function GET() {
  const content = "Only 1 hour left!"
  const rsp = await postToDiscord({ content })
  if (!rsp.ok) return new Response("Discord error", { status: 502 })
  return new Response("OK", { status: 200 })
}


