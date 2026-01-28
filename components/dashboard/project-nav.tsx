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
    <nav className="flex items-center space-x-6 border-b px-6">
      {tabs.map((tab) => {
        const isActive = tab.exact 
          ? pathname === tab.href 
          : pathname.startsWith(tab.href)

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex items-center border-b-2 py-4 text-sm font-medium transition-colors hover:text-foreground",
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground"
            )}
          >
            {tab.name}
          </Link>
        )
      })}
    </nav>
  )
}
