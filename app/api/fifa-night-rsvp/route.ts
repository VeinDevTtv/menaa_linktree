import { fifaNightRSVPSchema } from "@/lib/schemas"
import { hasEmail, addEmail } from "@/lib/submissions"

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  if (!json) return new Response("Invalid JSON", { status: 400 })

  const parsed = fifaNightRSVPSchema.safeParse(json)
  if (!parsed.success) return new Response("Validation failed", { status: 400 })

  const data = parsed.data
  if (data.website) return new Response("Bad request", { status: 400 })

  // FIFA Night Discord webhook
  const webhook = "https://discord.com/api/webhooks/1427370612401242232/rut_6p-3W9ns228YE_E2jmRPWVuiTyOcAyj8_Exhom_LBlEaqgFJHxOH_NgrdbC3rdRO"
  const eventName = "FIFA NIGHT"

  if (!webhook) return new Response("Server misconfigured", { status: 500 })

  const content = `⚽ New FIFA NIGHT RSVP: ${eventName} ⚽`
  const embeds = [
    {
      title: `${eventName} Registration`,
      color: 0x00B140, // Soccer green color
      fields: [
        { name: "Full Name", value: data.fullName, inline: true },
        { name: "Email", value: data.email, inline: true },
        { name: "Attending", value: data.attending === "yes" ? "Yes ⚽" : "No", inline: true },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "FIFA NIGHT Registration",
        icon_url: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
      }
    },
  ]

  const email = data.email.trim().toLowerCase()
  if (await hasEmail("rsvp", email)) {
    return new Response("You've already registered for FIFA NIGHT!", { status: 409 })
  }
  await addEmail("rsvp", email)

  const payload = { content, embeds }
  const rsp = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!rsp.ok) return new Response("Discord error", { status: 502 })
  return new Response("OK", { status: 200 })
}
