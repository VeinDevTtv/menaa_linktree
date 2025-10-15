"use client"

import { useSearchParams } from "next/navigation"
import { MixerRSVPView } from "@/components/mixer-rsvp-view"

export default function MixerRSVPPreviewPage() {
  const params = useSearchParams()
  const simulateNow = params.get("now")
  const simulatePhase = (params.get("phase") as any) || null
  return <MixerRSVPView simulateNow={simulateNow} simulatePhase={simulatePhase} />
}


