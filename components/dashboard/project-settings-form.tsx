"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2, Palette, Type, Settings2, Sparkles, Star, MessageSquare, Check, X, RotateCcw, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  name: string
  slug: string
  widget_primary_color?: string
  widget_bg_color?: string
  widget_text_color?: string
  widget_border_radius?: string
  widget_width?: number
  widget_height?: number
  widget_open_animation?: string
  widget_close_animation?: string
  widget_show_once_session?: boolean
  widget_device_target?: string
  widget_position?: string
  widget_theme?: string
  widget_title?: string
  widget_subtitle?: string
  widget_button_text?: string
  widget_success_title?: string
  widget_success_message?: string
  widget_show_branding?: boolean
  widget_trigger_delay?: number
  widget_trigger_scroll?: number
}

export function ProjectSettingsForm({ project }: { project: Project }) {
  const defaultWidgetSettings = {
    widget_primary_color: "#000000",
    widget_bg_color: "#ffffff",
    widget_text_color: "#000000",
    widget_border_radius: "16",
    widget_width: 380,
    widget_height: 420,
    widget_open_animation: "fade",
    widget_close_animation: "fade",
    widget_show_once_session: false,
    widget_device_target: "all",
    widget_position: "bottom-right",
    widget_theme: "light",
    widget_title: "How was your experience?",
    widget_subtitle: "Help us improve this project.",
    widget_button_text: "Submit Feedback",
    widget_success_title: "Thank you!",
    widget_success_message: "Your feedback helps us grow.",
    widget_show_branding: true,
    widget_trigger_delay: 5,
    widget_trigger_scroll: 50,
  }

  // General settings
  const [name, setName] = useState(project.name)
  const [slug, setSlug] = useState(project.slug)
  
  // Widget appearance
  const [widgetColor, setWidgetColor] = useState(project.widget_primary_color || "#000000")
  const [widgetBgColor, setWidgetBgColor] = useState(project.widget_bg_color || "#ffffff")
  const [widgetTextColor, setWidgetTextColor] = useState(project.widget_text_color || "#000000")
  const [widgetRadius, setWidgetRadius] = useState(project.widget_border_radius || "16")
  const [widgetWidth, setWidgetWidth] = useState(project.widget_width || 380)
  const [widgetHeight, setWidgetHeight] = useState(project.widget_height || 420)
  const [widgetOpenAnimation, setWidgetOpenAnimation] = useState(project.widget_open_animation || "fade")
  const [widgetCloseAnimation, setWidgetCloseAnimation] = useState(project.widget_close_animation || "fade")
  const [showOnceSession, setShowOnceSession] = useState(project.widget_show_once_session === true)
  const [deviceTarget, setDeviceTarget] = useState(project.widget_device_target || "all")
  const [widgetPosition, setWidgetPosition] = useState(project.widget_position || "bottom-right")
  const [widgetTheme, setWidgetTheme] = useState(project.widget_theme || "light")
  
  // Widget content
  const [widgetTitle, setWidgetTitle] = useState(project.widget_title || "How was your experience?")
  const [widgetSubtitle, setWidgetSubtitle] = useState(project.widget_subtitle || "Help us improve this project.")
  const [widgetButtonText, setWidgetButtonText] = useState(project.widget_button_text || "Submit Feedback")
  const [widgetSuccessTitle, setWidgetSuccessTitle] = useState(project.widget_success_title || "Thank you!")
  const [widgetSuccessMessage, setWidgetSuccessMessage] = useState(project.widget_success_message || "Your feedback helps us grow.")
  
  // Widget behavior
  const [showBranding, setShowBranding] = useState(project.widget_show_branding !== false)
  const [triggerDelay, setTriggerDelay] = useState(project.widget_trigger_delay || 5)
  const [triggerScroll, setTriggerScroll] = useState(project.widget_trigger_scroll || 50)
  
  // Preview state
  const [previewStep, setPreviewStep] = useState<"rating" | "details" | "success">("rating")
  const [previewRating, setPreviewRating] = useState(0)
  const [activeTab, setActiveTab] = useState<"general" | "appearance" | "content" | "behavior">("general")
  
  const [loading, setLoading] = useState(false)
  const [resetting, setResetting] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("projects")
        .update({ 
          name, 
          slug,
          widget_primary_color: widgetColor,
          widget_bg_color: widgetBgColor,
          widget_text_color: widgetTextColor,
          widget_border_radius: widgetRadius,
          widget_width: widgetWidth,
          widget_height: widgetHeight,
          widget_open_animation: widgetOpenAnimation,
          widget_close_animation: widgetCloseAnimation,
          widget_show_once_session: showOnceSession,
          widget_device_target: deviceTarget,
          widget_position: widgetPosition,
          widget_theme: widgetTheme,
          widget_title: widgetTitle,
          widget_subtitle: widgetSubtitle,
          widget_button_text: widgetButtonText,
          widget_success_title: widgetSuccessTitle,
          widget_success_message: widgetSuccessMessage,
          widget_show_branding: showBranding,
          widget_trigger_delay: triggerDelay,
          widget_trigger_scroll: triggerScroll
        })
        .eq("id", project.id)

      if (error) throw error

      toast.success("Settings saved successfully!")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  const resetPreview = () => {
    setPreviewStep("rating")
    setPreviewRating(0)
  }

  const applyDefaults = () => {
    setWidgetColor(defaultWidgetSettings.widget_primary_color)
    setWidgetBgColor(defaultWidgetSettings.widget_bg_color)
    setWidgetTextColor(defaultWidgetSettings.widget_text_color)
    setWidgetRadius(defaultWidgetSettings.widget_border_radius)
    setWidgetWidth(defaultWidgetSettings.widget_width)
    setWidgetHeight(defaultWidgetSettings.widget_height)
    setWidgetOpenAnimation(defaultWidgetSettings.widget_open_animation)
    setWidgetCloseAnimation(defaultWidgetSettings.widget_close_animation)
    setShowOnceSession(defaultWidgetSettings.widget_show_once_session)
    setDeviceTarget(defaultWidgetSettings.widget_device_target)
    setWidgetPosition(defaultWidgetSettings.widget_position)
    setWidgetTheme(defaultWidgetSettings.widget_theme)
    setWidgetTitle(defaultWidgetSettings.widget_title)
    setWidgetSubtitle(defaultWidgetSettings.widget_subtitle)
    setWidgetButtonText(defaultWidgetSettings.widget_button_text)
    setWidgetSuccessTitle(defaultWidgetSettings.widget_success_title)
    setWidgetSuccessMessage(defaultWidgetSettings.widget_success_message)
    setShowBranding(defaultWidgetSettings.widget_show_branding)
    setTriggerDelay(defaultWidgetSettings.widget_trigger_delay)
    setTriggerScroll(defaultWidgetSettings.widget_trigger_scroll)
    resetPreview()
  }

  const handleReset = async () => {
    setResetting(true)
    try {
      const { error } = await supabase
        .from("projects")
        .update({
          widget_primary_color: defaultWidgetSettings.widget_primary_color,
          widget_bg_color: defaultWidgetSettings.widget_bg_color,
          widget_text_color: defaultWidgetSettings.widget_text_color,
          widget_border_radius: defaultWidgetSettings.widget_border_radius,
          widget_width: defaultWidgetSettings.widget_width,
          widget_height: defaultWidgetSettings.widget_height,
          widget_open_animation: defaultWidgetSettings.widget_open_animation,
          widget_close_animation: defaultWidgetSettings.widget_close_animation,
          widget_show_once_session: defaultWidgetSettings.widget_show_once_session,
          widget_device_target: defaultWidgetSettings.widget_device_target,
          widget_position: defaultWidgetSettings.widget_position,
          widget_theme: defaultWidgetSettings.widget_theme,
          widget_title: defaultWidgetSettings.widget_title,
          widget_subtitle: defaultWidgetSettings.widget_subtitle,
          widget_button_text: defaultWidgetSettings.widget_button_text,
          widget_success_title: defaultWidgetSettings.widget_success_title,
          widget_success_message: defaultWidgetSettings.widget_success_message,
          widget_show_branding: defaultWidgetSettings.widget_show_branding,
          widget_trigger_delay: defaultWidgetSettings.widget_trigger_delay,
          widget_trigger_scroll: defaultWidgetSettings.widget_trigger_scroll,
        })
        .eq("id", project.id)

      if (error) throw error
      applyDefaults()
      toast.success("Defaults restored")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to reset settings")
    } finally {
      setResetting(false)
    }
  }

  const tabs = [
    { id: "general", label: "General", icon: Settings2 },
    { id: "appearance", label: "Style", icon: Palette },
    { id: "content", label: "Content", icon: Type },
    { id: "behavior", label: "Behavior", icon: Sparkles },
  ] as const

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Custom Tabs */}
          <div className="flex gap-1 p-1 bg-white/70 rounded-xl border border-violet-100/70 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-violet-50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* General Tab */}
          {activeTab === "general" && (
            <Card className="bg-white/75 backdrop-blur-xl border border-violet-100/70 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">General Settings</CardTitle>
                <CardDescription>
                  Basic project information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/70 border border-violet-100/70"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Project Slug (ID)</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    className="bg-white/70 border border-violet-100/70 font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    ⚠️ Changing this will break existing widget embeds
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <Card className="bg-white/75 backdrop-blur-xl border border-violet-100/70 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Appearance</CardTitle>
                <CardDescription>
                  Customize widget colors and style
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="h-10 w-14 cursor-pointer border border-violet-100/70 p-1"
                      />
                      <Input
                        type="text"
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="bg-white/70 border border-violet-100/70 font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Background</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={widgetBgColor}
                        onChange={(e) => setWidgetBgColor(e.target.value)}
                        className="h-10 w-14 cursor-pointer border border-violet-100/70 p-1"
                      />
                      <Input
                        type="text"
                        value={widgetBgColor}
                        onChange={(e) => setWidgetBgColor(e.target.value)}
                        className="bg-white/70 border border-violet-100/70 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={widgetTextColor}
                      onChange={(e) => setWidgetTextColor(e.target.value)}
                      className="h-10 w-14 cursor-pointer border border-violet-100/70 p-1"
                    />
                    <Input
                      type="text"
                      value={widgetTextColor}
                      onChange={(e) => setWidgetTextColor(e.target.value)}
                      className="bg-white/70 border border-violet-100/70 font-mono text-xs flex-1"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      min="0"
                      max="32"
                      value={widgetRadius}
                      onChange={(e) => setWidgetRadius(e.target.value)}
                      className="flex-1 h-2 bg-violet-100/70 rounded-full appearance-none cursor-pointer accent-violet-600"
                    />
                    <span className="text-sm font-mono w-12 text-right">{widgetRadius}px</span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Widget Width (px)</Label>
                    <Input
                      type="number"
                      min={280}
                      max={520}
                      value={widgetWidth}
                      onChange={(e) => setWidgetWidth(Number(e.target.value))}
                      className="bg-white/70 border border-violet-100/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Widget Height (px)</Label>
                    <Input
                      type="number"
                      min={280}
                      max={640}
                      value={widgetHeight}
                      onChange={(e) => setWidgetHeight(Number(e.target.value))}
                      className="bg-white/70 border border-violet-100/70"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Position</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["bottom-right", "bottom-left", "top-right", "top-left"].map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setWidgetPosition(pos)}
                        className={cn(
                          "p-3 rounded-lg border border-violet-100/70 text-sm font-medium transition-all",
                          widgetPosition === pos
                            ? "border-violet-300/80 bg-violet-50 text-violet-700"
                            : "border-violet-100/70 hover:border-violet-300/70"
                        )}
                      >
                        {pos.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["light", "dark", "auto"].map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => setWidgetTheme(theme)}
                        className={cn(
                          "p-3 rounded-lg border border-violet-100/70 text-sm font-medium transition-all capitalize",
                          widgetTheme === theme
                            ? "border-violet-300/80 bg-violet-50 text-violet-700"
                            : "border-violet-100/70 hover:border-violet-300/70"
                        )}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <Card className="bg-white/75 backdrop-blur-xl border border-violet-100/70 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Widget Content</CardTitle>
                <CardDescription>
                  Customize text and messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={widgetTitle}
                    onChange={(e) => setWidgetTitle(e.target.value)}
                    className="bg-white/70 border border-violet-100/70"
                    placeholder="How was your experience?"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input
                    value={widgetSubtitle}
                    onChange={(e) => setWidgetSubtitle(e.target.value)}
                    className="bg-white/70 border border-violet-100/70"
                    placeholder="Help us improve this project."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={widgetButtonText}
                    onChange={(e) => setWidgetButtonText(e.target.value)}
                    className="bg-white/70 border border-violet-100/70"
                    placeholder="Submit Feedback"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Success Title</Label>
                  <Input
                    value={widgetSuccessTitle}
                    onChange={(e) => setWidgetSuccessTitle(e.target.value)}
                    className="bg-white/70 border border-violet-100/70"
                    placeholder="Thank you!"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Success Message</Label>
                  <Input
                    value={widgetSuccessMessage}
                    onChange={(e) => setWidgetSuccessMessage(e.target.value)}
                    className="bg-white/70 border border-violet-100/70"
                    placeholder="Your feedback helps us grow."
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Behavior Tab */}
          {activeTab === "behavior" && (
            <Card className="bg-white/75 backdrop-blur-xl border border-violet-100/70 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Widget Behavior</CardTitle>
                <CardDescription>
                  Control when and how the widget appears
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Open Animation</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["fade", "slide-up", "slide-left", "zoom"].map((animation) => (
                      <button
                        key={animation}
                        type="button"
                        onClick={() => setWidgetOpenAnimation(animation)}
                        className={cn(
                          "p-3 rounded-lg border border-violet-100/70 text-xs font-medium transition-all capitalize",
                          widgetOpenAnimation === animation
                            ? "border-violet-300/80 bg-violet-50 text-violet-700"
                            : "border-violet-100/70 hover:border-violet-300/70"
                        )}
                      >
                        {animation.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Close Animation</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["fade", "slide-down", "slide-right", "zoom"].map((animation) => (
                      <button
                        key={animation}
                        type="button"
                        onClick={() => setWidgetCloseAnimation(animation)}
                        className={cn(
                          "p-3 rounded-lg border border-violet-100/70 text-xs font-medium transition-all capitalize",
                          widgetCloseAnimation === animation
                            ? "border-violet-300/80 bg-violet-50 text-violet-700"
                            : "border-violet-100/70 hover:border-violet-300/70"
                        )}
                      >
                        {animation.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 rounded-lg border border-violet-100/70 bg-white/70">
                  <div className="space-y-0.5">
                    <Label>Show Askr Branding</Label>
                    <p className="text-xs text-muted-foreground">
                      Display "Powered by Askr" in widget
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowBranding(!showBranding)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      showBranding ? "bg-violet-600" : "bg-violet-200"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                        showBranding ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-violet-100/70 bg-white/70">
                  <div className="space-y-0.5">
                    <Label>Show Once Per Session</Label>
                    <p className="text-xs text-muted-foreground">
                      Don’t show the widget again after it’s opened in this session
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowOnceSession(!showOnceSession)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      showOnceSession ? "bg-violet-600" : "bg-violet-200"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                        showOnceSession ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                <div className="space-y-2">
                  <Label>Device Targeting</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["all", "desktop", "mobile"].map((device) => (
                      <button
                        key={device}
                        type="button"
                        onClick={() => setDeviceTarget(device)}
                        className={cn(
                          "p-3 rounded-lg border border-violet-100/70 text-sm font-medium transition-all capitalize",
                          deviceTarget === device
                            ? "border-violet-300/80 bg-violet-50 text-violet-700"
                            : "border-violet-100/70 hover:border-violet-300/70"
                        )}
                      >
                        {device}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Trigger Delay (seconds)</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={triggerDelay}
                      onChange={(e) => setTriggerDelay(Number(e.target.value))}
                      className="flex-1 h-2 bg-violet-100/70 rounded-full appearance-none cursor-pointer accent-violet-600"
                    />
                    <span className="text-sm font-mono w-12 text-right">{triggerDelay}s</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Time before widget appears after page load
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Scroll Trigger (%)</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={triggerScroll}
                      onChange={(e) => setTriggerScroll(Number(e.target.value))}
                      className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <span className="text-sm font-mono w-12 text-right">{triggerScroll}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Show widget when user scrolls this far
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Live Preview Panel */}
        <div className="xl:sticky xl:top-24 space-y-4 h-fit">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Live Preview</h3>
            <Button type="button" variant="outline" size="sm" onClick={resetPreview} className="border-violet-200/70 hover:bg-violet-50">
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Reset
            </Button>
          </div>
          
          <Card className="border border-violet-100/70 bg-white/75 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-violet-50/70 to-blue-50/60 p-6 min-h-[520px] relative">
              {/* Fake website background */}
              <div className="absolute inset-0 opacity-30">
                <div className="h-12 bg-slate-300 dark:bg-slate-700" />
                <div className="p-4 space-y-3">
                  <div className="h-8 w-48 bg-slate-300 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-3/4 bg-slate-300 dark:bg-slate-700 rounded" />
                  <div className="h-32 w-full bg-slate-300 dark:bg-slate-700 rounded mt-4" />
                </div>
              </div>

              {/* Widget Preview */}
              <div 
                className={cn(
                  "absolute z-10 shadow-2xl overflow-hidden transition-all",
                  widgetPosition === "bottom-right" && "bottom-4 right-4",
                  widgetPosition === "bottom-left" && "bottom-4 left-4",
                  widgetPosition === "top-right" && "top-4 right-4",
                  widgetPosition === "top-left" && "top-4 left-4"
                )}
                style={{
                  width: `${widgetWidth}px`,
                  height: `${widgetHeight}px`,
                  backgroundColor: widgetBgColor,
                  color: widgetTextColor,
                  borderRadius: `${widgetRadius}px`,
                  border: "2px solid rgba(0,0,0,0.1)"
                }}
              >
                {/* Close button */}
                <button 
                  type="button"
                  className="absolute right-3 top-3 h-7 w-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  onClick={resetPreview}
                >
                  <X className="h-4 w-4" style={{ color: widgetTextColor }} />
                </button>

                <div className="p-5 h-full overflow-auto">
                  {previewStep === "rating" && (
                    <div className="flex flex-col items-center space-y-4 text-center">
                      <div 
                        className="rounded-full p-3.5"
                        style={{ backgroundColor: `${widgetColor}20` }}
                      >
                        <MessageSquare className="h-6 w-6" style={{ color: widgetColor }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base" style={{ color: widgetTextColor }}>
                          {widgetTitle}
                        </h3>
                        <p className="text-sm mt-1 opacity-70">
                          {widgetSubtitle}
                        </p>
                      </div>
                      <div className="flex gap-1.5 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="transition-all hover:scale-110 p-0.5"
                            onClick={() => {
                              setPreviewRating(star)
                              setTimeout(() => setPreviewStep("details"), 300)
                            }}
                          >
                            <Star
                              className={cn(
                                "h-8 w-8 transition-all",
                                previewRating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {previewStep === "details" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Care to share more? (Optional)</label>
                        <textarea
                          className="w-full min-h-[80px] resize-none rounded-lg border border-violet-100/70 bg-white/70 p-2.5 text-sm"
                          placeholder="Your feedback helps us improve..."
                          style={{ borderColor: `${widgetColor}30` }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name (Optional)</label>
                        <input
                          className="w-full rounded-lg border border-violet-100/70 bg-white/70 p-2.5 text-sm"
                          placeholder="Anonymous"
                          style={{ borderColor: `${widgetColor}30` }}
                        />
                      </div>
                      <button
                        type="button"
                        className="w-full py-2.5 rounded-lg font-medium text-white transition-all hover:opacity-90"
                        style={{ 
                          backgroundColor: widgetColor,
                          borderRadius: `${Math.min(Number(widgetRadius), 12)}px`
                        }}
                        onClick={() => setPreviewStep("success")}
                      >
                        {widgetButtonText}
                      </button>
                    </div>
                  )}

                  {previewStep === "success" && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
                      <div className="rounded-full bg-green-500/20 p-4 text-green-500">
                        <Check className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{widgetSuccessTitle}</h3>
                        <p className="text-sm mt-1 opacity-70">{widgetSuccessMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {showBranding && (
                  <div 
                    className="p-2.5 text-center text-[10px] border-t opacity-60"
                    style={{ borderColor: `${widgetTextColor}20` }}
                  >
                    Powered by
                    <span className="ml-1 inline-flex items-center gap-1 font-semibold">
                      Askr
                      <Zap className="h-4 w-4 text-violet-600 fill-violet-600" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          <p className="text-xs text-muted-foreground text-center">
            Click the stars to see the full widget flow
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-violet-100/70">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={resetting || loading}
          className="mr-3 border-violet-200/70 hover:bg-violet-50"
        >
          {resetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset to Defaults
        </Button>
        <Button 
          type="submit" 
          disabled={loading} 
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[200px] bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save All Changes
        </Button>
      </div>
    </form>
  )
}
