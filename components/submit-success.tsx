"use client"

import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { useEffect } from "react"

type Props = {
  open: boolean
  title?: string
  subtitle?: string
  onClose?: () => void
}

export function SubmitSuccess({ open, title = "Thanks!", subtitle = "We received your submission.", onClose }: Props) {
  useEffect(() => {
    if (!open) return
    let timeout: number | undefined
    // Auto-close after a short delay
    timeout = window.setTimeout(() => {
      onClose?.()
    }, 2600)
    return () => {
      if (timeout) window.clearTimeout(timeout)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950/90 via-amber-900/70 to-orange-900/70 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-stone-950/90 p-8 text-white shadow-2xl"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 shadow-lg">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-orange-200 via-yellow-200 to-amber-200 bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="mt-2 text-white/80">{subtitle}</p>
            </div>
            <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 blur-2xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


