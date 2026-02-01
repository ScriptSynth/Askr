"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Lock, ArrowRight, CheckCircle2, KeyRound, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  // Check password strength
  useEffect(() => {
    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }, [password])

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500"
    if (passwordStrength <= 2) return "bg-orange-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak"
    if (passwordStrength <= 2) return "Fair"
    if (passwordStrength <= 3) return "Good"
    return "Strong 💪"
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords don't match! 😅", {
        description: "Please make sure both passwords are the same"
      })
      return
    }

    if (password.length < 6) {
      toast.error("Password too short! 📏", {
        description: "Please use at least 6 characters"
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      setIsSuccess(true)
      toast.success("Password updated! 🎉", {
        description: "Your password has been reset successfully"
      })

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        description: "Please try again or request a new reset link"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-blue-50 relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -z-10" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-20 text-4xl"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🔐
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-20 text-4xl"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ✨
      </motion.div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Askr" 
              width={160} 
              height={56} 
              className="h-14 w-auto" 
              priority
            />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border p-8"
        >
          {isSuccess ? (
            // Success State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </motion.div>
              <h1 className="text-2xl font-bold mb-2">Password Reset! 🎉</h1>
              <p className="text-muted-foreground mb-6">
                Your password has been updated successfully.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting you to dashboard...
              </p>
              <motion.div
                className="mt-4 flex justify-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Loader2 className="h-5 w-5 animate-spin text-violet-600" />
              </motion.div>
            </motion.div>
          ) : (
            // Reset Form
            <>
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring" }}
                  className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mb-4"
                >
                  <KeyRound className="h-8 w-8 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold tracking-tight mb-2">Create new password</h1>
                <p className="text-muted-foreground">
                  Make it strong & memorable! 💪
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      disabled={isLoading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 h-12 rounded-xl border-2 bg-white focus:border-violet-500 transition-colors"
                    />
                  </div>
                  
                  {/* Password strength indicator */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              i < passwordStrength ? getStrengthColor() : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength: <span className="font-medium">{getStrengthText()}</span>
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      disabled={isLoading}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className={`pl-10 h-12 rounded-xl border-2 bg-white transition-colors ${
                        confirmPassword && confirmPassword !== password
                          ? "border-red-300 focus:border-red-500"
                          : confirmPassword && confirmPassword === password
                          ? "border-green-300 focus:border-green-500"
                          : "focus:border-violet-500"
                      }`}
                    />
                  </div>
                  {confirmPassword && confirmPassword !== password && (
                    <p className="text-xs text-red-500">Passwords don't match</p>
                  )}
                  {confirmPassword && confirmPassword === password && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Passwords match!
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                  className="w-full h-12 rounded-xl font-semibold text-base bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  size="lg"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <Link 
                  href="/auth" 
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium hover:underline inline-flex items-center gap-1"
                >
                  <Sparkles className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </motion.div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Need help?{" "}
          <Link href="#" className="text-violet-600 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
