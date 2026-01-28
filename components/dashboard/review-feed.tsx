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
          <div className="flex flex-col items-center justify-center min-h-[300px] border border-dashed rounded-lg p-8 text-center animate-in fade-in-50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Star className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No reviews yet</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
                  Embed the widget on your site to start collecting feedback. Once you do, they will appear here instantly.
              </p>
          </div>
      )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rating</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">
                <div className="flex items-center text-yellow-500">
                  <span className="mr-1">{review.rating}</span>
                  <Star className="h-3 w-3 fill-current" />
                </div>
              </TableCell>
              <TableCell className="max-w-[300px] truncate" title={review.content}>
                {review.content}
              </TableCell>
              <TableCell>{review.customer_name || "Anonymous"}</TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the review
                        from your database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
