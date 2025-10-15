import { postToDiscord } from "@/lib/discord"

export async function GET() {
  const content = "That's a wrap! It was fun having everyone — see you next time!"
  const rsp = await postToDiscord({ content })
  if (!rsp.ok) return new Response("Discord error", { status: 502 })
  return new Response("OK", { status: 200 })
}


