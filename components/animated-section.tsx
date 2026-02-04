"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
}

const getInitial = (direction: Direction) => {
  switch (direction) {
    case "down":
      return { opacity: 0, y: -32 }
    case "left":
      return { opacity: 0, x: 32 }
    case "right":
      return { opacity: 0, x: -32 }
    case "up":
    default:
      return { opacity: 0, y: 32 }
  }
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={getInitial(direction)}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
