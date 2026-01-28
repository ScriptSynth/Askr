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
  
  // Fetch reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })

  const totalReviews = reviews?.length || 0
  const averageRating =
    totalReviews > 0
      ? reviews!.reduce((acc, review) => acc + review.rating, 0) / totalReviews
      : 0

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
      </div>

      <AnalyticsHeader
        totalReviews={totalReviews}
        averageRating={averageRating}
      />
      
      <div>
         <h3 className="mb-4 text-lg font-medium">Review Feed</h3>
         <ReviewFeed initialReviews={reviews || []} projectId={projectId} />
      </div>
    </div>
  )
}
