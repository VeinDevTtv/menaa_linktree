import * as React from "react"
import { cn } from "@/lib/utils"

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white",
          "placeholder:text-white/50 focus:border-amber-400 outline-none",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"


