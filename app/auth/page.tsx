"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, ArrowLeft, Sparkles, Star, Zap, Heart, PartyPopper, Rocket, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type AuthMode = "login" | "signup" | "forgot"

const funFacts = [
  { icon: Rocket, text: "Join 500+ founders already using Askr!", color: "text-violet-500" },
  { icon: Star, text: "Average 34% conversion boost with social proof", color: "text-yellow-500" },
  { icon: Zap, text: "Setup in under 60 seconds, no coding needed", color: "text-blue-500" },
  { icon: Heart, text: "Loved by indie hackers worldwide", color: "text-pink-500" },
  { icon: PartyPopper, text: "Free forever plan - no credit card required", color: "text-green-500" },
]

const floatingEmojis = [
  { emoji: "⭐", x: 50, y: 100 },
  { emoji: "🚀", x: 300, y: 200 },
  { emoji: "💜", x: 150, y: 400 },
  { emoji: "✨", x: 400, y: 150 },
  { emoji: "🎉", x: 80, y: 500 },
  { emoji: "💫", x: 350, y: 450 },
  { emoji: "🔥", x: 200, y: 300 },
  { emoji: "💪", x: 420, y: 350 },
]

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [resetSent, setResetSent] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Rotate fun facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        toast.success("Welcome back! 🎉", {
          description: "Let's collect some testimonials!"
        })
        router.push("/dashboard")
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })
        if (error) throw error
        toast.success("Account created! 🚀", {
          description: "Welcome to the Askr family!"
        })
        router.push("/dashboard")
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        })
        if (error) throw error
        setResetSent(true)
        toast.success("Reset link sent! 📧", {
          description: "Check your inbox for the magic link"
        })
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        description: "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const currentFact = funFacts[currentFactIndex]

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Floating emojis */}
        {floatingEmojis.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl select-none pointer-events-none"
            style={{ left: item.x, top: item.y }}
            animate={{ 
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              rotate: [0, i % 2 === 0 ? 15 : -15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ 
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <Link href="/" className="mb-12">
            <Image 
              src="/logo.png" 
              alt="Askr" 
              width={180} 
              height={60} 
              className="h-14 w-auto drop-shadow-lg" 
              priority
            />
          </Link>

          <motion.h1 
            className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Turn happy customers into{" "}
            <span className="relative">
              your best marketers
              <motion.span 
                className="absolute -right-8 -top-4"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl text-white/80 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Collect testimonials, build trust, and watch your conversions soar.
          </motion.p>

          {/* Rotating fun facts */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFactIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
            >
              <div className={`p-3 rounded-xl bg-white/20 ${currentFact.color}`}>
                <currentFact.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-white font-medium text-lg">{currentFact.text}</span>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial preview */}
          <motion.div 
            className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div>
                <p className="font-semibold text-white">Sarah Chen</p>
                <p className="text-white/60 text-sm">Founder, DevTools Inc</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-white/90 italic">
              "Askr increased our landing page conversions by 34%. The setup took literally 2 minutes. It's magic! 🪄"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10" />

        {/* Back to home - mobile only */}
        <Link 
          href="/" 
          className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Mobile logo */}
        <div className="lg:hidden flex justify-center mb-8 mt-8">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Askr" 
              width={120} 
              height={40} 
              className="h-10 w-auto" 
              priority
            />
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {mode === "forgot" && resetSent ? (
              // Reset Email Sent Success State
              <motion.div
                key="reset-sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">Check your inbox! 📬</h1>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>
                <div className="pt-4 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setMode("login")
                      setResetSent(false)
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to login
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Didn't receive it?{" "}
                    <button 
                      className="text-violet-600 hover:underline font-medium"
                      onClick={() => setResetSent(false)}
                    >
                      Try again
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "forgot" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "forgot" ? -20 : 20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  {mode === "forgot" ? (
                    <>
                      <motion.div 
                        className="mx-auto w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mb-4"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring" }}
                      >
                        <Mail className="h-8 w-8 text-violet-600" />
                      </motion.div>
                      <h1 className="text-2xl font-bold tracking-tight mb-2">Forgot password?</h1>
                      <p className="text-muted-foreground">No worries! We'll send you a magic link ✨</p>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        className="inline-block mb-4"
                      >
                        <span className="text-4xl">{mode === "login" ? "👋" : "🎉"}</span>
                      </motion.div>
                      <h1 className="text-2xl font-bold tracking-tight mb-2">
                        {mode === "login" ? "Welcome back!" : "Create your account"}
                      </h1>
                      <p className="text-muted-foreground">
                        {mode === "login" 
                          ? "Ready to collect more testimonials?" 
                          : "Join thousands of happy founders"}
                      </p>
                    </>
                  )}
                </div>

                {/* Form */}
                <form onSubmit={handleAuth} className="space-y-5">
                  <AnimatePresence mode="popLayout">
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            type="text"
                            autoCapitalize="words"
                            autoComplete="name"
                            disabled={isLoading}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="pl-10 h-12 rounded-xl border-2 bg-white focus:border-violet-500 transition-colors"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="you@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        disabled={isLoading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-12 rounded-xl border-2 bg-white focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>

                  {mode !== "forgot" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() => setMode("forgot")}
                            className="text-sm text-violet-600 hover:text-violet-700 font-medium hover:underline"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          autoComplete={mode === "login" ? "current-password" : "new-password"}
                          disabled={isLoading}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          className="pl-10 h-12 rounded-xl border-2 bg-white focus:border-violet-500 transition-colors"
                        />
                      </div>
                      {mode === "signup" && (
                        <p className="text-xs text-muted-foreground">
                          Must be at least 6 characters
                        </p>
                      )}
                    </div>
                  )}

                  <Button 
                    disabled={isLoading} 
                    className="w-full h-12 rounded-xl font-semibold text-base bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all" 
                    size="lg"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        {mode === "login" && "Sign In"}
                        {mode === "signup" && "Create Account"}
                        {mode === "forgot" && "Send Reset Link"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gradient-to-r from-slate-50 to-white px-3 text-muted-foreground">
                      {mode === "forgot" ? "Remember your password?" : mode === "login" ? "New here?" : "Already have an account?"}
                    </span>
                  </div>
                </div>

                {/* Switch mode */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (mode === "forgot") {
                      setMode("login")
                    } else {
                      setMode(mode === "login" ? "signup" : "login")
                    }
                  }}
                  className="w-full h-12 rounded-xl font-semibold border-2 hover:bg-violet-50 hover:border-violet-200 transition-all"
                >
                  {mode === "forgot" && "Back to login"}
                  {mode === "login" && (
                    <>
                      Create an account <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )}
                  {mode === "signup" && "Sign in instead"}
                </Button>

                {/* Terms */}
                <p className="mt-8 text-center text-xs text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <Link href="#" className="text-violet-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-violet-600 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
