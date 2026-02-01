"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function ProjectNav({ projectId }: { projectId: string }) {
  const pathname = usePathname()
  
  const tabs = [
    {
      name: "Overview",
      href: `/dashboard/${projectId}`,
      exact: true
    },
    {
      name: "Installation",
      href: `/dashboard/${projectId}/installation`,
    },
    {
      name: "Settings",
      href: `/dashboard/${projectId}/settings`,
    },
  ]

  return (
    <nav className="border-b border-violet-100/70 bg-white/70 backdrop-blur-xl px-6">
      <div className="flex items-center gap-2 py-3">
        {tabs.map((tab) => {
          const isActive = tab.exact
            ? pathname === tab.href
            : pathname.startsWith(tab.href)

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-violet-50"
              )}
            >
              {tab.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
