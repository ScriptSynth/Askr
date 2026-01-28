import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-12">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl font-bold">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights on building SaaS, automating growth, and engineering.
            </p>
          </div>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3 mt-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                   <Button asChild variant="ghost" className="pl-0">
                      <Link href={`/blog/${post.slug}`}>
                        Read more &rarr;
                      </Link>
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts found.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
