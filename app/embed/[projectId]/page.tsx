"use client"

import { useState, use, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Check, X, MessageSquare } from "lucide-react"
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

  // Apply styles to override parent layout
  useEffect(() => {
    // Hide everything from parent layout
    document.documentElement.style.background = 'transparent'
    document.body.style.background = 'transparent'
    document.body.style.overflow = 'hidden'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    // Hide any headers, footers, or other elements from root layout
    const style = document.createElement('style')
    style.id = 'embed-override-styles'
    style.textContent = `
      html, body {
        background: transparent !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        min-height: 100vh !important;
      }
      body > *:not(#widget-root) {
        display: none !important;
      }
      #widget-root {
        display: flex !important;
        position: fixed !important;
        inset: 0 !important;
        z-index: 99999 !important;
        background: transparent !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      const existingStyle = document.getElementById('embed-override-styles')
      if (existingStyle) existingStyle.remove()
    }
  }, [])

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
      <div id="widget-root" style={{ 
        position: 'fixed', 
        inset: 0, 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'flex-end',
        background: 'transparent',
        padding: 0
      }}>
        <div style={{ 
          width: '380px', 
          height: '280px', 
          borderRadius: '16px', 
          background: 'rgba(255,255,255,0.5)',
          animation: 'pulse 2s infinite'
        }} />
      </div>
    )
  }

  const borderRadius = `${settings.widget_border_radius}px`
  const widgetWidth = Number(settings.widget_width) || defaultSettings.widget_width
  const widgetHeight = Number(settings.widget_height) || defaultSettings.widget_height

  return (
    <div id="widget-root" style={{ 
      position: 'fixed', 
      inset: 0, 
      display: 'flex', 
      alignItems: 'flex-end', 
      justifyContent: 'flex-end',
      background: 'transparent',
      padding: 0
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: `2px solid ${settings.widget_text_color}15`,
          backgroundColor: settings.widget_bg_color,
          color: settings.widget_text_color,
          borderRadius: borderRadius,
          width: `min(92vw, ${widgetWidth}px)`,
          height: `${widgetHeight}px`
        }}
      >
        <button
            style={{
              position: 'absolute',
              right: '12px',
              top: '12px',
              height: '32px',
              width: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s',
              color: settings.widget_text_color
            }}
            onClick={closeWidget}
        >
            <X style={{ height: '16px', width: '16px' }} />
        </button>

        <div style={{ padding: '24px', paddingBottom: '16px' }}>
          <AnimatePresence mode="wait">
            {step === "rating" && (
              <motion.div
                key="rating"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}
              >
                <div 
                  style={{ 
                    borderRadius: '50%', 
                    padding: '16px', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    backgroundColor: `${settings.widget_primary_color}20` 
                  }}
                >
                  <MessageSquare 
                    style={{ height: '28px', width: '28px', color: settings.widget_primary_color }} 
                  />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '18px', margin: 0, color: settings.widget_text_color }}>
                    {settings.widget_title}
                  </h3>
                  <p style={{ fontSize: '14px', marginTop: '4px', opacity: 0.7 }}>
                    {settings.widget_subtitle}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', padding: '8px 0' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      style={{
                        transition: 'all 0.2s',
                        padding: '4px',
                        borderRadius: '8px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: rating >= star ? '#eab308' : '#d1d5db',
                        filter: rating >= star ? 'drop-shadow(0 0 4px rgba(234,179,8,0.6))' : 'none'
                      }}
                      onClick={() => {
                        setRating(star)
                        setTimeout(() => setStep("details"), 300)
                      }}
                    >
                      <Star
                        style={{ 
                          height: '36px', 
                          width: '36px',
                          fill: rating >= star ? 'currentColor' : 'none'
                        }}
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
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="content" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Care to share more? (Optional)
                  </label>
                  <textarea
                    id="content"
                    placeholder="Your feedback helps us improve..."
                    style={{
                      minHeight: '100px',
                      resize: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      border: `2px solid ${settings.widget_primary_color}30`,
                      backgroundColor: `${settings.widget_text_color}05`,
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="name" style={{ fontSize: '14px', fontWeight: 500 }}>
                      Your Name (Optional)
                    </label>
                    <input 
                        id="name"
                        placeholder="Anonymous"
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          border: `2px solid ${settings.widget_primary_color}30`,
                          backgroundColor: `${settings.widget_text_color}05`,
                          fontSize: '14px',
                          fontFamily: 'inherit',
                          outline: 'none'
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button 
                    style={{ 
                      width: '100%',
                      padding: '12px',
                      fontWeight: 500,
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      backgroundColor: settings.widget_primary_color,
                      borderRadius: `${Math.min(Number(settings.widget_border_radius), 12)}px`,
                      opacity: isSubmitting ? 0.7 : 1
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
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px 0', textAlign: 'center' }}
              >
                <div style={{ borderRadius: '50%', backgroundColor: 'rgba(34,197,94,0.2)', padding: '20px', color: '#22c55e', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                  <Check style={{ height: '40px', width: '40px' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '18px', margin: 0 }}>{settings.widget_success_title}</h3>
                  <p style={{ fontSize: '14px', marginTop: '4px', opacity: 0.7 }}>
                    {settings.widget_success_message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {step !== 'success' && settings.widget_show_branding && (
              <div 
                style={{ 
                  padding: '12px',
                  textAlign: 'center',
                  fontSize: '10px',
                  borderTop: `1px solid ${settings.widget_text_color}15`,
                  backgroundColor: `${settings.widget_text_color}05`
                }}
              >
                Powered by
                <span style={{ marginLeft: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600, background: 'linear-gradient(to right, #8b5cf6, #d946ef, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Askr
                  <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 32 32" fill="none">
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
