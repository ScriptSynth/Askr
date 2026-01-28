import { createClient } from "@/utils/supabase/server"
import { ProjectSettingsForm } from "@/components/dashboard/project-settings-form"

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const supabase = await createClient()

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single()

  if (!project) return null

  return (
    <div className="max-w-2xl animate-in fade-in-50">
      <div className="mb-6">
         <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
         <p className="text-muted-foreground mt-2">Manage your project configuration.</p>
      </div>
      
      <ProjectSettingsForm project={project} />
    </div>
  )
}
