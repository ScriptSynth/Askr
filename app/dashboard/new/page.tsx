import { CreateProjectForm } from "@/components/dashboard/create-project-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-br from-violet-50/70 via-background to-blue-50/40 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 h-full w-full bg-background bg-grid-pattern opacity-35 pointer-events-none" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 w-full max-w-lg">
        <div className="mb-6">
          <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="bg-white/75 backdrop-blur-xl border border-violet-100/70 rounded-2xl shadow-2xl p-8">
          <CreateProjectForm />
        </div>
      </div>
    </div>
  )
}
