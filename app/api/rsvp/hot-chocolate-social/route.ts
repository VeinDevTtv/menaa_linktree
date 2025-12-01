import { NextResponse } from "next/server"

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1427370612401242232/rut_6p-3W9ns228YE_E2jmRPWVuiTyOcAyj8_Exhom_LBlEaqgFJHxOH_NgrdbC3rdRO"

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 })
    }

    const embed = {
      title: "New RSVP for Hot Chocolate Social",
      color: 0xc07a53,
      fields: [
        { name: "Name", value: name, inline: true },
        { name: "Email", value: email, inline: true },
      ],
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    })

    if (response.ok) {
      return NextResponse.json({ message: "RSVP successful" })
    } else {
      const errorBody = await response.text()
      console.error("Discord webhook error:", errorBody)
      return NextResponse.json(
        { error: "Failed to send RSVP to Discord" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing RSVP:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
