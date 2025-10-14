import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { AnnouncementToast } from "@/components/announcement-toast"
import { MotionProvider, RouteProgress } from "@/components/motion-provider"

export const metadata: Metadata = {
  title: "DE ANZA MENAA - Middle East & North African Association",
  description: "Building community, celebrating culture, and creating connections at De Anza College",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <RouteProgress />
        <Suspense fallback={null}>
          <MotionProvider>{children}</MotionProvider>
        </Suspense>
        <AnnouncementToast />
        <Analytics />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
