"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function CreateProjectForm() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
             throw new Error("No user found")
        }

      const { error } = await supabase.from("projects").insert({
        name,
        slug,
        owner_id: user.id,
      })

      if (error) throw error

      toast.success("Project created successfully!")
      router.push(`/dashboard/${slug}`)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to create project")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-2xl font-bold">Welcome to Facto</h1>
        <p className="text-muted-foreground">Create your first project to get started.</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 border p-6 rounded-lg bg-card">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            placeholder="My Awesome SaaS"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
          />
          <p className="text-[10px] text-muted-foreground">
            This will be used in your widget URL.
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Project
        </Button>
      </form>
    </div>
  )
}
