import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, LayoutGrid, Activity, Globe, LogOut } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth")
  }

  // Fetch all projects with review count to determine "Live" status
  // Note: asking for reviews(count) requires the foreign key to be detected correctly by PostgREST
  const { data: projects } = await supabase
    .from("projects")
    .select("*, reviews(count)")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6">
        <div className="flex items-center gap-2 font-semibold">
          <LayoutGrid className="h-6 w-6" />
          <span>Facto Dashboard</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
            <form action="/auth/signout" method="post">
                <Button variant="ghost" size="icon" title="Sign out">
                    <LogOut className="h-4 w-4" />
                </Button>
            </form>
        </div>
      </header>

      <main className="container mx-auto py-10 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your feedback boards.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>

        {(!projects || projects.length === 0) ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Create your first project to start collecting feedback.
            </p>
            <Button asChild>
              <Link href="/dashboard/new">Create Project</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              // @ts-ignore - Supabase types inference might be tricky with the join
              const reviewCount = project.reviews?.[0]?.count || 0;
              // If distinct count is returned as array of objects or just count. 
              // Usually .select('*, reviews(count)') returns { ...project, reviews: [{ count: 123 }] }

              return (
                <Link key={project.id} href={`/dashboard/${project.id}`} className="group block h-full">
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        {reviewCount > 0 && (
                          <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                            Live
                          </span>
                        )}
                      </div>
                      <CardDescription className="font-mono text-xs">{project.slug}</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="flex items-center text-sm text-muted-foreground">
                         <Activity className="mr-2 h-4 w-4" />
                         {reviewCount} reviews collected
                       </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                        <span className="flex items-center group-hover:text-primary transition-colors">
                            Manage Project →
                        </span>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
