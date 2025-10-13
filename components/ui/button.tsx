import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all",
          "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500",
          "hover:brightness-110 hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-60 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"


