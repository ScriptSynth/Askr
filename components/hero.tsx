"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Check, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-24 lg:pt-32 pb-20 md:pb-24 lg:pb-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-50/50 via-background to-blue-50/30" />
      <div className="absolute inset-0 z-0 h-full w-full bg-background bg-grid-pattern opacity-40" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-200/10 to-blue-200/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-violet-700 mb-8 shadow-sm"
        >
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </span>
          <span className="text-muted-foreground">Trusted by 500+ SaaS founders</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-5xl leading-[1.05]"
        >
          <span className="block text-foreground/90">The</span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              #1 Testimonial Widget
            </span>
            <motion.svg 
              className="absolute -bottom-1 md:-bottom-2 left-0 w-full" 
              viewBox="0 0 300 12" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <path d="M2 10C50 4 100 4 150 6C200 8 250 4 298 10" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6"/>
                  <stop offset="50%" stopColor="#d946ef"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
          <br />
          <span className="text-foreground/80">for SaaS Companies</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-[family-name:var(--font-inter)] max-w-[750px] mt-8 text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed font-medium"
        >
          Collect and display <strong className="text-foreground font-semibold bg-gradient-to-r from-violet-600/10 to-blue-600/10 px-1 rounded">customer testimonials</strong> in 60 seconds. 
          One script tag, beautiful social proof widget, 
          <strong className="text-foreground font-semibold bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-1 rounded"> instant trust.</strong>
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-muted-foreground"
        >
          {[
            "No coding required",
            "5kb lightweight",
            "Free forever plan"
          ].map((feature, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-500" />
              {feature}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/auth">
            <Button size="lg" className="h-14 px-10 text-lg font-semibold bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:scale-105">
              Start Collecting Reviews
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold border-2 hover:bg-violet-50 transition-all group">
              See How It Works
              <Sparkles className="ml-2 h-5 w-5 group-hover:text-violet-600 transition-colors" />
            </Button>
          </Link>
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12 text-center"
        >
          {[
            { value: "10k+", label: "Reviews Collected" },
            { value: "500+", label: "Happy Customers" },
            { value: "4.9/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-bold font-heading bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Hero Image - Widget Preview */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 w-full max-w-6xl rounded-3xl border bg-white/80 backdrop-blur-xl shadow-2xl shadow-violet-500/10 overflow-hidden"
        >
             <div className="flex flex-col space-y-1.5 p-4 sm:p-6 border-b bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"/>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"/>
                      <div className="h-3 w-3 rounded-full bg-green-400"/>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-green-500" />
                    Live Preview
                  </div>
                </div>
            </div>
            <div className="p-6 sm:p-8 md:p-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg-gradient-to-br from-slate-50/50 to-white">
                {/* Realistic Testimonial Cards */}
                {[
                  { 
                    name: "Sarah Chen", 
                    role: "Founder, DevTools Inc",
                    content: "Askr increased our landing page conversions by 34%. The setup took literally 2 minutes.",
                    rating: 5
                  },
                  { 
                    name: "Marcus Johnson", 
                    role: "CEO, SaaSify",
                    content: "Finally, a testimonial tool that doesn't slow down our site. Blazing fast and beautiful.",
                    rating: 5
                  },
                  { 
                    name: "Emily Davis", 
                    role: "Growth Lead, StartupXYZ",
                    content: "We tried 5 different social proof tools. Askr is the only one that just works.",
                    rating: 5
                  }
                ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                      className="rounded-2xl border bg-white p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                              {item.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm">{item.name}</div>
                                <div className="text-xs text-muted-foreground">{item.role}</div>
                            </div>
                        </div>
                        <div className="flex gap-0.5 mb-3">
                          {[...Array(item.rating)].map((_, j) => (
                            <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          "{item.content}"
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  )
}
