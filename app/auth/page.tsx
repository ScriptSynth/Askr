"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Layers, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push("/dashboard")
        toast.success("Welcome back!")
      } else {
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
        router.push("/dashboard")
        toast.success("Account created successfully!")
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 h-full w-full bg-background bg-grid-pattern opacity-40 pointer-events-none" />
      
      <div className="z-10 w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="mb-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background shadow-sm">
                <Layers className="h-6 w-6" />
             </div>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin
              ? "Enter your email to sign in to your account"
              : "Enter your email below to create your account"}
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleAuth}>
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid gap-2 overflow-hidden"
                    >
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                        id="fullName"
                        placeholder="John Doe"
                        type="text"
                        autoCapitalize="words"
                        autoComplete="name"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        />
                    </motion.div>
                )}
              </AnimatePresence>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                     {isLogin && (
                        <Link
                        href="#"
                        className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                        onClick={(e) => {
                             e.preventDefault();
                             toast.info("Password reset not implemented in demo.");
                        }}
                        >
                        Forgot password?
                        </Link>
                    )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button disabled={isLoading} className="mt-2 h-10 rounded-full font-medium" size="lg">
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </form>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="underline underline-offset-4 hover:text-primary font-medium"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  )
}
