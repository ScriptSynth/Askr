import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

const sizeMap = {
  sm: { container: "h-9 w-9", icon: "h-5 w-5" },
  md: { container: "h-10 w-10", icon: "h-6 w-6" },
  lg: { container: "h-12 w-12", icon: "h-7 w-7" },
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="bolt-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#f0f0ff"/>
        </linearGradient>
      </defs>
      <path d="M18 2L6 18h8l-2 12 12-16h-8l2-12z" fill="url(#bolt-logo-gradient)"/>
    </svg>
  )
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const { container, icon } = sizeMap[size]
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        container,
        "flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-blue-600 shadow-lg"
      )}>
        <BoltIcon className={icon} />
      </div>
      {showText && (
        <span className={cn(
          "font-heading font-bold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent",
          size === "sm" && "text-lg",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}>
          Askr
        </span>
      )}
    </div>
  )
}
