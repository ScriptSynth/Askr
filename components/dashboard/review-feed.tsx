"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2, Star } from "lucide-react"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"

interface Review {
  id: string
  customer_name: string
  rating: number
  content: string
  created_at: string
}

interface ReviewFeedProps {
  initialReviews: Review[]
  projectId: string
}

export function ReviewFeed({ initialReviews, projectId }: ReviewFeedProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('realtime reviews')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reviews',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          setReviews((current) => [payload.new as Review, ...current])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, projectId])

  const handleDelete = async (id: string) => {
    // Optimistic update
    const previousReviews = [...reviews]
    setReviews(reviews.filter((review) => review.id !== id))

    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id)

      if (error) {
        throw error
      }
      toast.success("Review deleted")
    } catch (error) {
      setReviews(previousReviews) // Rollback
      toast.error("Failed to delete review")
    }
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed rounded-2xl bg-white/70 backdrop-blur-xl p-12 text-center animate-in fade-in-50 shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/10 shadow-lg">
          <Star className="h-8 w-8 text-violet-600" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">No reviews yet</h3>
        <p className="mb-6 mt-2 text-sm text-muted-foreground max-w-md">
          Embed the widget on your site to start collecting feedback. Once you do, they will appear here instantly.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-violet-100/70 overflow-hidden bg-white/75 backdrop-blur-xl shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-violet-50/70 hover:bg-violet-50/70">
            <TableHead className="w-[100px] font-semibold">Rating</TableHead>
            <TableHead className="font-semibold">Feedback</TableHead>
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id} className="hover:bg-violet-50/40 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center text-yellow-500 bg-yellow-500/10 rounded-lg px-3 py-2 w-fit">
                  <span className="mr-1.5 font-bold">{review.rating}</span>
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </TableCell>
              <TableCell className="max-w-[300px] truncate font-medium" title={review.content}>
                {review.content}
              </TableCell>
              <TableCell>
                <span className="bg-violet-50/80 px-3 py-1.5 rounded-lg inline-block border border-violet-100/70">
                  {review.customer_name || "Anonymous"}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:text-destructive hover:bg-destructive/10 transition-all hover:scale-110">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white/95 backdrop-blur-xl border border-violet-100/70">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the review
                        from your database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="hover:bg-muted/50">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl transition-all"
                        onClick={() => handleDelete(review.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
