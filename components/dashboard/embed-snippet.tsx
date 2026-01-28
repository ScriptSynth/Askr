"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface EmbedSnippetProps {
  projectId: string
}

export function EmbedSnippet({ projectId }: EmbedSnippetProps) {
  const [copied, setCopied] = useState(false)

  // In production, this URL should be dynamic or fixed to the deployment domain
  const scriptCode = `<script 
  src="${typeof window !== 'undefined' ? window.location.origin : 'https://facto.me'}/widget.js" 
  data-project-id="${projectId}" 
  async
></script>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode)
    setCopied(true)
    toast.success("Embed code copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Widget</CardTitle>
        <CardDescription>
          Paste this code before the closing <code className="text-primary bg-muted px-1 rounded">{"</body>"}</code> tag of your website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
            <pre>{scriptCode}</pre>
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-2 h-8 w-8 hover:bg-background"
                onClick={copyToClipboard}
            >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy code</span>
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
