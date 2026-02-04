import { createClient } from "@/utils/supabase/server"
import { ProjectSettingsForm } from "@/components/dashboard/project-settings-form"

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from("projects")
    .select(`
      id,
      name,
      slug,
      widget_primary_color,
      widget_bg_color,
      widget_text_color,
      widget_border_radius,
      widget_width,
      widget_height,
      widget_open_animation,
      widget_close_animation,
      widget_show_once_session,
      widget_device_target,
      widget_position,
      widget_theme,
      widget_title,
      widget_subtitle,
      widget_button_text,
      widget_success_title,
      widget_success_message,
      widget_show_branding,
      widget_trigger_delay,
      widget_trigger_scroll
    `)
    .or(`id.eq.${projectId},slug.eq.${projectId}`)
    .single()

  if (error) {
    return (
      <div className="animate-in fade-in-50 space-y-8">
        <div className="rounded-2xl border border-violet-100/70 bg-white/70 backdrop-blur-xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-violet-700 shadow-sm">
            Setup required
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Settings unavailable</h2>
          <p className="text-muted-foreground mt-2">
            Your database schema may be missing the widget settings columns. Run the migration in
            <span className="font-mono text-foreground"> supabase_migration.sql</span> and refresh this page.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Error: {error.message}
          </p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="animate-in fade-in-50 space-y-8">
        <div className="rounded-2xl border border-violet-100/70 bg-white/70 backdrop-blur-xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-violet-700 shadow-sm">
            Not found
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Project not found</h2>
          <p className="text-muted-foreground mt-2">This project doesn’t exist or you don’t have access.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in-50 space-y-8">
      <div className="rounded-2xl border border-violet-100/70 bg-white/70 backdrop-blur-xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-violet-700 shadow-sm">
          Personalize
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Widget Settings</h2>
        <p className="text-muted-foreground mt-2">Customize your review widget appearance and behavior.</p>
      </div>
      
      <ProjectSettingsForm project={project} />
    </div>
  )
}
