"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-32 pb-16 md:pb-20 lg:pb-32">
      {/* Background with Grid and Mask */}
      <div className="absolute inset-0 z-0 h-full w-full bg-background bg-grid-pattern opacity-40" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mb-4 bg-muted/50"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          New: Embed Widgets 2.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
        >
          Capture User Feedback. <br className="hidden sm:inline" />
          Generate Social Proof.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Facto turns user feedback into a beautiful hosted "Wall of Love" in
          seconds. Collect testimonials, showcase them, and grow your SaaS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/auth">
            <Button size="lg" className="h-12 px-8 text-base">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base">
            View Demo
          </Button>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 w-full max-w-5xl rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden"
        >
             <div className="flex flex-col space-y-1.5 p-6 border-b bg-muted/20">
                <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"/>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"/>
                    <div className="h-3 w-3 rounded-full bg-green-500"/>
                </div>
            </div>
            <div className="p-6 md:p-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Mock Testimonials for the Hero Image */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg border bg-background p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                            <div className="flex-1">
                                <div className="h-3 w-20 bg-muted rounded animate-pulse mb-1" />
                                <div className="h-2 w-12 bg-muted rounded animate-pulse" />
                            </div>
                        </div>
                         <div className="space-y-2">
                             <div className="h-3 w-full bg-muted rounded animate-pulse" />
                             <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
                         </div>
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  )
}
