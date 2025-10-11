import { memberRegistrationSchema } from "@/lib/schemas"

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  if (!json) return new Response("Invalid JSON", { status: 400 })

  const parsed = memberRegistrationSchema.safeParse(json)
  if (!parsed.success) return new Response("Validation failed", { status: 400 })

  const data = parsed.data
  if (data.website) return new Response("Bad request", { status: 400 })

  const webhook = process.env.DISCORD_WEBHOOK_URL
  if (!webhook) return new Response("Server misconfigured", { status: 500 })

  const content = `New MENAA Member Registration`
  const embeds = [
    {
      title: "Member Registration",
      color: 0xF59E0B, // amber-500
      fields: [
        { name: "Name", value: data.name, inline: false },
        { name: "Email", value: data.email, inline: false },
        { name: "Attending First Meeting?", value: data.attendance === "yes" ? "YESSSSS DUH!!!" : "No :(", inline: false },
      ],
      timestamp: new Date().toISOString(),
    },
  ]

  const payload = { content, embeds }
  const rsp = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!rsp.ok) return new Response("Discord error", { status: 502 })
  return new Response("OK", { status: 200 })
}


