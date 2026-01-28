import { EmbedSnippet } from "@/components/dashboard/embed-snippet"

export default async function InstallationPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  
  return (
    <div className="max-w-2xl animate-in fade-in-50">
      <div className="mb-6">
         <h2 className="text-3xl font-bold tracking-tight">Installation</h2>
         <p className="text-muted-foreground mt-2">Get your feedback widget up and running.</p>
      </div>
      
      <EmbedSnippet projectId={projectId} />
    </div>
  )
}
