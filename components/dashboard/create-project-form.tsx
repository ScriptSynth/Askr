"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2, Sparkles } from "lucide-react"

export function CreateProjectForm() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleNameChange = (value: string) => {
    setName(value)
    // Auto-generate slug from name
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    setSlug(generatedSlug)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error("No user found")
      }

      const { data, error } = await supabase
        .from("projects")
        .insert({
          name,
          slug,
          owner_id: user.id,
        })
        .select("id")
        .single()

      if (error) throw error

      toast.success("Project created successfully!")
      router.push(`/dashboard/${data?.id || slug}`)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to create project")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Create New Project</h1>
        <p className="text-sm text-muted-foreground">
          Set up a new project to start collecting feedback
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            placeholder="My Awesome SaaS"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="bg-muted/30 border-2 h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Project Slug (ID)</Label>
          <Input
            id="slug"
            placeholder="my-awesome-saas"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="bg-muted/30 border-2 font-mono h-11"
          />
          <p className="text-xs text-muted-foreground">
            This will be used in your widget URL. Auto-generated from name.
          </p>
        </div>
        <Button 
          type="submit" 
          className="w-full h-11 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700" 
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Project
        </Button>
      </form>
    </div>
  )
}
