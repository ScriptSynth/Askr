import { createClient } from "@/utils/supabase/server"
import { AnalyticsHeader } from "@/components/dashboard/analytics"
import { ReviewFeed } from "@/components/dashboard/review-feed"

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const supabase = await createClient()
  
  // Fetch project info including widget status
  const { data: project } = await supabase
    .from("projects")
    .select("id, widget_connected, widget_last_ping")
    .or(`id.eq.${projectId},slug.eq.${projectId}`)
    .single()
  
  // Fetch reviews
  const resolvedProjectId = project?.id || projectId

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("project_id", resolvedProjectId)
    .order("created_at", { ascending: false })

  const totalReviews = reviews?.length || 0
  const averageRating =
    totalReviews > 0
      ? reviews!.reduce((acc, review) => acc + review.rating, 0) / totalReviews
      : 0
  
  // Consider connected if widget_connected is true AND last ping was within 10 minutes
  const lastPing = project?.widget_last_ping ? new Date(project.widget_last_ping) : null
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
  const isConnected = project?.widget_connected && lastPing && lastPing > tenMinutesAgo

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="rounded-2xl border border-violet-100/70 bg-white/70 backdrop-blur-xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-violet-700 shadow-sm">
          Project overview
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Overview
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Monitor reviews, ratings, and widget status in real time.
        </p>
      </div>

      <AnalyticsHeader
        totalReviews={totalReviews}
        averageRating={averageRating}
        isConnected={!!isConnected}
      />
      
      <div>
        <h3 className="mb-4 text-lg font-medium">Review Feed</h3>
        <ReviewFeed initialReviews={reviews || []} projectId={projectId} />
      </div>
    </div>
  )
}
