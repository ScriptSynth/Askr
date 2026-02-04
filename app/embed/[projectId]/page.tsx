"use client"

import { useState, use, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Check, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"

interface WidgetSettings {
  widget_primary_color: string
  widget_bg_color: string
  widget_text_color: string
  widget_border_radius: string
  widget_width: number
  widget_height: number
  widget_title: string
  widget_subtitle: string
  widget_button_text: string
  widget_success_title: string
  widget_success_message: string
  widget_show_branding: boolean
}

const defaultSettings: WidgetSettings = {
  widget_primary_color: "#000000",
  widget_bg_color: "#ffffff",
  widget_text_color: "#000000",
  widget_border_radius: "16",
  widget_width: 380,
  widget_height: 420,
  widget_title: "How was your experience?",
  widget_subtitle: "Help us improve this project.",
  widget_button_text: "Submit Feedback",
  widget_success_title: "Thank you!",
  widget_success_message: "Your feedback helps us grow.",
  widget_show_branding: true
}

export default function WidgetPage({ params }: { params: Promise<{ projectId: string }> }) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [name, setName] = useState("")
  const [step, setStep] = useState<"rating" | "details" | "success">("rating")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [settings, setSettings] = useState<WidgetSettings>(defaultSettings)
  const [loaded, setLoaded] = useState(false)

  const { projectId } = use(params)
  const supabase = createClient()

  // Fetch widget settings
  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("projects")
        .select(`
          id,
          widget_primary_color,
          widget_bg_color,
          widget_text_color,
          widget_border_radius,
          widget_width,
          widget_height,
          widget_title,
          widget_subtitle,
          widget_button_text,
          widget_success_title,
          widget_success_message,
          widget_show_branding
        `)
        .or(`id.eq.${projectId},slug.eq.${projectId}`)
        .single()

      if (data) {
        setSettings({
          widget_primary_color: data.widget_primary_color || defaultSettings.widget_primary_color,
          widget_bg_color: data.widget_bg_color || defaultSettings.widget_bg_color,
          widget_text_color: data.widget_text_color || defaultSettings.widget_text_color,
          widget_border_radius: data.widget_border_radius || defaultSettings.widget_border_radius,
          widget_width: data.widget_width || defaultSettings.widget_width,
          widget_height: data.widget_height || defaultSettings.widget_height,
          widget_title: data.widget_title || defaultSettings.widget_title,
          widget_subtitle: data.widget_subtitle || defaultSettings.widget_subtitle,
          widget_button_text: data.widget_button_text || defaultSettings.widget_button_text,
          widget_success_title: data.widget_success_title || defaultSettings.widget_success_title,
          widget_success_message: data.widget_success_message || defaultSettings.widget_success_message,
          widget_show_branding: data.widget_show_branding !== false
        })
      }

      // Mark widget as connected (ping)
      if (data?.id) {
        await supabase
          .from("projects")
          .update({ 
            widget_connected: true, 
            widget_last_ping: new Date().toISOString() 
          })
          .eq("id", data.id)
      }
      
      setLoaded(true)
    }

    fetchSettings()
  }, [projectId, supabase])

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
        setTimeout(() => {
             window.parent.postMessage({ type: 'facto-widget-close' }, '*');
        }, 3000);
      } else {
          const errorText = await res.text().catch(() => "")
          console.error("Failed to submit", errorText)
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

  if (!loaded) {
    return (
      <div className="flex items-end justify-end min-h-screen p-4 bg-transparent">
        <div className="w-full max-w-[380px] h-[280px] rounded-2xl bg-card/50 animate-pulse" />
      </div>
    )
  }

  const borderRadius = `${settings.widget_border_radius}px`
  const widgetWidth = Number(settings.widget_width) || defaultSettings.widget_width
  const widgetHeight = Number(settings.widget_height) || defaultSettings.widget_height

  return (
    <div className="flex items-end justify-end min-h-screen p-4 bg-transparent">
      <style>{`
        html, body {
          background: transparent !important;
          overflow: hidden;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full overflow-hidden shadow-2xl border-2"
        style={{
          backgroundColor: settings.widget_bg_color,
          color: settings.widget_text_color,
          borderRadius: borderRadius,
          borderColor: `${settings.widget_text_color}15`,
          width: `min(92vw, ${widgetWidth}px)`,
          height: `${widgetHeight}px`
        }}
      >
        <button
            className="absolute right-3 top-3 h-8 w-8 rounded-full flex items-center justify-center hover:bg-black/5 z-10 transition-all hover:scale-110"
            onClick={closeWidget}
            style={{ color: settings.widget_text_color }}
        >
            <X className="h-4 w-4" />
        </button>

        <div className="p-6 pb-4">
          <AnimatePresence mode="wait">
            {step === "rating" && (
              <motion.div
                key="rating"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div 
                  className="rounded-full p-4 shadow-lg"
                  style={{ backgroundColor: `${settings.widget_primary_color}20` }}
                >
                  <MessageSquare 
                    className="h-7 w-7" 
                    style={{ color: settings.widget_primary_color }} 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: settings.widget_text_color }}>
                    {settings.widget_title}
                  </h3>
                  <p className="text-sm mt-1 opacity-70">
                    {settings.widget_subtitle}
                  </p>
                </div>
                <div className="flex gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={cn(
                        "transition-all hover:scale-125 focus:outline-none p-1 rounded-lg",
                        rating >= star
                          ? "text-yellow-500 drop-shadow-[0_0_4px_rgba(234,179,8,0.6)]"
                          : "text-gray-300 hover:text-yellow-500/50"
                      )}
                      onClick={() => {
                        setRating(star)
                        setTimeout(() => setStep("details"), 300)
                      }}
                    >
                      <Star
                        className={cn("h-9 w-9", rating >= star && "fill-current")}
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
                  <Label htmlFor="content" className="text-sm font-medium">
                    Care to share more? (Optional)
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Your feedback helps us improve..."
                    className="min-h-[100px] resize-none transition-colors border-2"
                    style={{
                      borderColor: `${settings.widget_primary_color}30`,
                      backgroundColor: `${settings.widget_text_color}05`
                    }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Your Name (Optional)
                    </Label>
                    <Input 
                        id="name"
                        placeholder="Anonymous"
                        className="transition-colors border-2"
                        style={{
                          borderColor: `${settings.widget_primary_color}30`,
                          backgroundColor: `${settings.widget_text_color}05`
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button 
                    className="w-full py-3 font-medium text-white transition-all hover:opacity-90 shadow-lg hover:shadow-xl"
                    style={{ 
                      backgroundColor: settings.widget_primary_color,
                      borderRadius: `${Math.min(Number(settings.widget_border_radius), 12)}px`
                    }}
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : settings.widget_button_text}
                </button>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center space-y-4 py-8 text-center"
              >
                <div className="rounded-full bg-green-500/20 p-5 text-green-500 shadow-lg">
                  <Check className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{settings.widget_success_title}</h3>
                  <p className="text-sm mt-1 opacity-70">
                    {settings.widget_success_message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {step !== 'success' && settings.widget_show_branding && (
              <div 
                className="p-3 text-center text-[10px] border-t"
                style={{ 
                  borderColor: `${settings.widget_text_color}15`,
                  backgroundColor: `${settings.widget_text_color}05`
                }}
              >
                Powered by
                <span className="ml-1 inline-flex items-center gap-1 font-semibold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
                  Askr
                  <svg className="h-4 w-4" viewBox="0 0 32 32" fill="none">
                    <defs>
                      <linearGradient id="bolt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6"/>
                        <stop offset="50%" stopColor="#d946ef"/>
                        <stop offset="100%" stopColor="#3b82f6"/>
                      </linearGradient>
                    </defs>
                    <path d="M18 2L6 18h8l-2 12 12-16h-8l2-12z" fill="url(#bolt-grad)"/>
                  </svg>
                </span>
              </div>
        )}
      </motion.div>
    </div>
  )
}
