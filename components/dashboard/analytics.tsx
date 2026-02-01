"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Star, Zap, AlertCircle } from "lucide-react"

interface AnalyticsProps {
  totalReviews: number
  averageRating: number
  isConnected?: boolean
}

export function AnalyticsHeader({ totalReviews, averageRating, isConnected = false }: AnalyticsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="bg-white/75 backdrop-blur-xl border border-violet-100/70 hover:shadow-xl transition-all hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <div className="p-2 rounded-lg bg-violet-500/10">
            <MessageSquare className="h-4 w-4 text-violet-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalReviews}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Lifetime received
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white/75 backdrop-blur-xl border border-violet-100/70 hover:shadow-xl transition-all hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <Star className="h-4 w-4 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Out of 5.0 stars
          </p>
        </CardContent>
      </Card>
      <Card className={`bg-white/75 backdrop-blur-xl border border-violet-100/70 hover:shadow-xl transition-all hover:-translate-y-0.5 ${!isConnected ? 'border-yellow-500/40' : ''}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Widget Status</CardTitle>
          <div className={`p-2 rounded-lg ${isConnected ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
            {isConnected ? (
              <Zap className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <>
              <div className="text-3xl font-bold text-green-500 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                Active
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Widget is collecting feedback
              </p>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-yellow-500 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                Inactive
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Install widget to activate
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
