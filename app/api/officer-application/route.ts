import { officerApplicationSchema } from "@/lib/schemas"

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  if (!json) {
    return new Response("Invalid JSON", { status: 400 })
  }

  const parsed = officerApplicationSchema.safeParse(json)
  if (!parsed.success) {
    return new Response("Validation failed", { status: 400 })
  }

  const data = parsed.data

  if (data.website) {
    return new Response("Bad request", { status: 400 })
  }

  const webhook = "https://discord.com/api/webhooks/1427375477227786362/9-YRyThb3EdyDuV1tG3igosdQfTg2YoVOKd7L0Z2WTE_aTrIVKb-TaGsIiJL66casgu7"
  if (!webhook) {
    return new Response("Server misconfigured", { status: 500 })
  }

  const content = `New Officer Application` 
  const embeds = [
    {
      title: "Officer Application",
      color: 0xF97316, // orange-500
      fields: [
        { name: "Full Name", value: data.fullName, inline: true },
        { name: "Discord Name", value: data.discordName, inline: true },
        { name: "Email", value: data.email, inline: false },
        { name: "Year/Major", value: data.yearMajor, inline: false },
        { name: "Roles Interested", value: data.rolesInterested, inline: false },
        { name: "Availability", value: data.availability, inline: false },
        { name: "Why Join", value: data.whyJoin, inline: false },
        { name: "Experience", value: data.experience || "N/A", inline: false },
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

  if (!rsp.ok) {
    return new Response("Discord error", { status: 502 })
  }

  return new Response("OK", { status: 200 })
}


