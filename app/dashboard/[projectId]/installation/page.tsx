import { EmbedSnippet } from "@/components/dashboard/embed-snippet"
import { createClient } from "@/utils/supabase/server"

export default async function InstallationPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const supabase = await createClient()

  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .or(`id.eq.${projectId},slug.eq.${projectId}`)
    .single()

  const resolvedProjectId = project?.id || projectId
  
  return (
    <div className="max-w-2xl animate-in fade-in-50 space-y-6">
      <div className="rounded-2xl border border-violet-100/70 bg-white/70 backdrop-blur-xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-violet-700 shadow-sm">
          Setup
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Installation</h2>
        <p className="text-muted-foreground mt-2">Get your feedback widget up and running in minutes.</p>
      </div>

      <EmbedSnippet projectId={resolvedProjectId} />
    </div>
  )
}
