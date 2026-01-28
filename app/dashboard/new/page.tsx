import { CreateProjectForm } from "@/components/dashboard/create-project-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
  return (
    <div className="container max-w-lg mx-auto py-10">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <CreateProjectForm />
    </div>
  )
}
