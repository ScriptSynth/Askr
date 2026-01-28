"use client"

import { useState, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Check, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function WidgetPage({ params }: { params: Promise<{ projectId: string }> }) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [name, setName] = useState("")
  const [step, setStep] = useState<"rating" | "details" | "success">("rating")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { projectId } = use(params)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/v1/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          rating,
          content,
          customer_name: name,
        }),
      })

      if (res.ok) {
        setStep("success")
        // Notify parent window to maybe close after a delay
        setTimeout(() => {
             window.parent.postMessage({ type: 'facto-widget-close' }, '*');
        }, 3000);
      } else {
          // Handle error
          console.error("Failed to submit")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeWidget = () => {
    window.parent.postMessage({ type: 'facto-widget-close' }, '*');
  }

  return (
    <div className="flex items-end justify-end min-h-screen p-4 bg-transparent">
      <style>{`
        html, body {
            background: transparent !important;
        }
      `}</style>
        {/* We use a transparent background for the page so the iframe can be seamless. 
            The actual card is the visible part. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-[350px] overflow-hidden rounded-xl border bg-background shadow-2xl"
      >
        <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-foreground z-10"
            onClick={closeWidget}
        >
            <X className="h-4 w-4" />
        </Button>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === "rating" && (
              <motion.div
                key="rating"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">How was your experience?</h3>
                  <p className="text-xs text-muted-foreground">
                    Help us improve this project.
                  </p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={cn(
                        "transition-all hover:scale-125 focus:outline-none",
                        rating >= star
                          ? "text-yellow-500 drop-shadow-[0_0_3px_rgba(234,179,8,0.6)]"
                          : "text-muted-foreground/30 hover:text-yellow-500/50"
                      )}
                      onClick={() => {
                        setRating(star)
                        setTimeout(() => setStep("details"), 300)
                      }}
                    >
                      <Star
                        className={cn("h-8 w-8", rating >= star && "fill-current")}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="content">Care to share more? (Optional)</Label>
                  <Textarea
                    id="content"
                    placeholder="Your feedback helps us improve..."
                    className="min-h-[80px] resize-none focus-visible:ring-yellow-500 transition-colors hover:border-yellow-400"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">Your Name (Optional)</Label>
                    <Input 
                        id="name"
                        placeholder="Anonymous"
                        className="focus-visible:ring-yellow-500 transition-colors hover:border-yellow-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <Button 
                    className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]" 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Feedback"}
                </Button>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center space-y-4 py-8 text-center"
              >
                <div className="rounded-full bg-green-500/10 p-4 text-green-500">
                  <Check className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold">Thank you!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your feedback helps us grow.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {step !== 'success' && (
            <div className="bg-muted/30 p-2 text-center text-[10px] text-muted-foreground border-t">
            Powered by <span className="font-semibold">Facto</span>
            </div>
        )}
      </motion.div>
    </div>
  )
}
