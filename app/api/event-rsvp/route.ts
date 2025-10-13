import { eventRSVPSchema } from "@/lib/schemas"

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  if (!json) return new Response("Invalid JSON", { status: 400 })

  const parsed = eventRSVPSchema.safeParse(json)
  if (!parsed.success) return new Response("Validation failed", { status: 400 })

  const data = parsed.data
  if (data.website) return new Response("Bad request", { status: 400 })

  // Use the dedicated RSVP webhook
  const webhook = "https://discord.com/api/webhooks/1427370612401242232/rut_6p-3W9ns228YE_E2jmRPWVuiTyOcAyj8_Exhom_LBlEaqgFJHxOH_NgrdbC3rdRO"

  if (!webhook) return new Response("Server misconfigured", { status: 500 })

  const content = `New RSVP: MENAA Social Mixer`
  const embeds = [
    {
      title: "MENAA Social Mixer RSVP",
      color: 0xF59E0B,
      fields: [
        { name: "Full Name", value: data.fullName, inline: true },
        { name: "Email", value: data.email, inline: true },
        { name: "Attending", value: data.attending === "yes" ? "Yes" : "No", inline: true },
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


