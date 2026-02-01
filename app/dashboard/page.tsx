import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, LayoutGrid, Activity, LogOut, Settings, Zap, MessageSquare, Star, TrendingUp, Clock, ChevronRight, Sparkles } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth")
  }

  // Fetch all projects with review count and widget status
  const { data: projects } = await supabase
    .from("projects")
    .select("*, reviews(count)")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })

  // Calculate total stats
  const totalProjects = projects?.length || 0
  // @ts-ignore
  const totalReviews = projects?.reduce((acc, p) => acc + (p.reviews?.[0]?.count || 0), 0) || 0
  // @ts-ignore
  const activeProjects = projects?.filter(p => p.widget_connected).length || 0

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50/70 via-background to-blue-50/40">
      <div className="pointer-events-none absolute inset-0 bg-background bg-grid-pattern opacity-35" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-violet-400/20 to-purple-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl" />
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 border-r border-violet-100/70 bg-white/70 backdrop-blur-xl lg:block">
        <div className="flex h-16 items-center border-b border-violet-100/70 px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <Zap className="h-5 w-5 text-white fill-white" />
            </div>
            <span className="font-heading text-lg font-bold">Askr</span>
          </Link>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600/10 to-blue-600/10 text-foreground font-semibold border border-violet-200/60 shadow-sm">
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/70 text-muted-foreground hover:text-foreground transition-all">
            <MessageSquare className="h-5 w-5" />
            All Reviews
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/70 text-muted-foreground hover:text-foreground transition-all">
            <TrendingUp className="h-5 w-5" />
            Analytics
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/70 text-muted-foreground hover:text-foreground transition-all">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-violet-100/70 p-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/20 flex items-center justify-center text-sm font-semibold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
            <form action="/auth/signout" method="post">
              <Button variant="ghost" size="icon" title="Sign out" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-violet-100/70 bg-white/80 backdrop-blur-xl px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <span className="font-heading text-lg font-bold">Askr</span>
        </Link>
        <div className="ml-auto">
          <form action="/auth/signout" method="post">
            <Button variant="ghost" size="icon" title="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative lg:pl-64">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Your workspace
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Welcome back, <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">builder</span> 👋
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Track feedback performance, manage projects, and ship social proof faster.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            <Card className="bg-white/70 backdrop-blur-xl border border-violet-100/70 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -z-10 group-hover:bg-violet-500/20 transition-all" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                  <div className="p-2.5 rounded-xl bg-violet-500/10 shadow-inner">
                    <LayoutGrid className="h-5 w-5 text-violet-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{totalProjects}</div>
                <p className="text-sm text-muted-foreground mt-1">Feedback boards created</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border border-violet-100/70 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -z-10 group-hover:bg-yellow-500/20 transition-all" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Reviews</CardTitle>
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 shadow-inner">
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{totalReviews}</div>
                <p className="text-sm text-muted-foreground mt-1">Feedback collected</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border border-violet-100/70 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -z-10 group-hover:bg-green-500/20 transition-all" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Widgets</CardTitle>
                  <div className="p-2.5 rounded-xl bg-green-500/10 shadow-inner">
                    <Zap className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-500">{activeProjects}</div>
                <p className="text-sm text-muted-foreground mt-1">Connected & collecting</p>
              </CardContent>
            </Card>
          </div>

          {/* Projects Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Your Projects</h2>
              <p className="text-muted-foreground">Manage and configure your feedback boards</p>
            </div>
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105 gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
              <Link href="/dashboard/new">
                <Plus className="h-5 w-5" />
                New Project
              </Link>
            </Button>
          </div>

          {(!projects || projects.length === 0) ? (
            <Card className="border-2 border-dashed bg-white/70 backdrop-blur-xl shadow-xl">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-2xl" />
                  <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/20 flex items-center justify-center shadow-xl">
                    <Activity className="h-10 w-10 text-violet-600" />
                  </div>
                </div>
                <h3 className="mt-8 text-2xl font-bold">No projects yet</h3>
                <p className="mt-3 text-muted-foreground max-w-md text-base">
                  Create your first project to start collecting feedback and displaying beautiful testimonials on your website.
                </p>
                <Button asChild size="lg" className="mt-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                  <Link href="/dashboard/new">
                    <Plus className="h-5 w-5" />
                    Create Your First Project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => {
                // @ts-ignore
                const reviewCount = project.reviews?.[0]?.count || 0;
                // @ts-ignore
                const isConnected = project.widget_connected || false;

                return (
                  <Link key={project.id} href={`/dashboard/${project.id}`} className="group block">
                    <Card className="h-full transition-all duration-300 hover:shadow-2xl bg-white/75 backdrop-blur-xl border border-violet-100/70 hover:border-violet-300/80 group-hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl font-bold truncate group-hover:text-violet-600 transition-colors">
                              {project.name}
                            </CardTitle>
                            <CardDescription className="font-mono text-xs mt-2">
                              <span className="bg-violet-50/80 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-400/70" />
                                {project.slug}
                              </span>
                            </CardDescription>
                          </div>
                          {isConnected ? (
                            <span className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1.5 text-xs font-semibold text-green-600 shadow-sm border border-green-500/30">
                              <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-muted-foreground border border-violet-100/70">
                              <span className="mr-2 h-2 w-2 rounded-full bg-muted-foreground/50" />
                              Inactive
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-violet-50/70 border border-violet-100/70">
                            <MessageSquare className="h-4 w-4 text-violet-600" />
                            <div>
                              <p className="text-lg font-bold">{reviewCount}</p>
                              <p className="text-[10px] text-muted-foreground">Reviews</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-violet-50/70 border border-violet-100/70">
                            <Clock className="h-4 w-4 text-violet-600" />
                            <div>
                              <p className="text-lg font-bold">
                                {new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                              <p className="text-[10px] text-muted-foreground">Created</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="border-t border-violet-100/70 bg-white/50 py-3">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-violet-600 transition-colors">
                            Manage Project
                          </span>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              })}

              {/* Add New Project Card */}
              <Link href="/dashboard/new" className="group block">
                <Card className="h-full transition-all duration-300 hover:shadow-xl border-2 border-dashed hover:border-violet-300/80 bg-white/60 backdrop-blur-xl group-hover:-translate-y-1 flex flex-col items-center justify-center min-h-[280px]">
                  <CardContent className="flex flex-col items-center justify-center text-center py-12">
                    <div className="h-14 w-14 rounded-full bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                      <Plus className="h-7 w-7 text-violet-600" />
                    </div>
                    <h3 className="mt-4 font-semibold text-lg group-hover:text-violet-600 transition-colors">Add New Project</h3>
                    <p className="text-sm text-muted-foreground mt-1">Create another feedback board</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
