import { createClient } from "@/utils/supabase/server"
import { notFound, redirect } from "next/navigation"
import { ProjectNav } from "@/components/dashboard/project-nav"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const supabase = await createClient()
  const { projectId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth")
  }

  // Verify project ownership
  const { data: project } = await supabase
    .from("projects")
    .select("name, slug")
    .or(`id.eq.${projectId},slug.eq.${projectId}`)
    .eq("owner_id", user.id)
    .single()

  if (!project) {
    return notFound()
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-violet-50/70 via-background to-blue-50/40">
      <div className="pointer-events-none absolute inset-0 bg-background bg-grid-pattern opacity-35" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-violet-400/20 to-purple-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl" />

      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-violet-100/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-sm px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild title="Back to Projects" className="hover:bg-violet-50 hover:scale-110 transition-all">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="h-6 w-px bg-violet-200/70" />
          <div className="flex items-center gap-3">
            <Logo size="md" showText={false} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-none">{project.name}</span>
              <span className="text-xs text-muted-foreground font-mono bg-violet-50/80 px-2 py-0.5 rounded mt-1">{project.slug}</span>
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <form action="/auth/signout" method="post">
            <Button variant="ghost" size="icon" title="Sign out" className="hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </header>

      <ProjectNav projectId={projectId} />

      <main className="relative flex-1 p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
