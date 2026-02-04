"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"

interface WidgetLoaderProps {
  projectId: string
}

export function WidgetLoader({ projectId }: WidgetLoaderProps) {
  const pathname = usePathname()
  
  // Don't load widget on embed pages to prevent recursion
  if (pathname?.startsWith('/embed')) {
    return null
  }
  
  return (
    <Script
      src="/widget.js"
      data-project-id={projectId}
      strategy="afterInteractive"
    />
  )
}
