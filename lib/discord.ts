export type DiscordEmbed = {
  title?: string
  description?: string
  url?: string
  color?: number
  fields?: Array<{ name: string; value: string; inline?: boolean }>
  timestamp?: string
}

type DiscordPayload = {
  content?: string
  embeds?: DiscordEmbed[]
}

export async function postToDiscord(payload: DiscordPayload): Promise<Response> {
  const webhookUrl = process.env.DISCORD_EVENT_WEBHOOK_URL
  if (!webhookUrl) {
    return new Response("Server misconfigured: missing DISCORD_EVENT_WEBHOOK_URL", { status: 500 })
  }

  return fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}


