import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
 
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
 
  return {
    title: `${post.title} | Askr.me Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <article className="prose prose-neutral dark:prose-invert lg:prose-lg mx-auto">
          <div className="mb-8 text-center not-prose">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              {post.title}
            </h1>
            <div className="text-muted-foreground flex items-center justify-center gap-4 text-sm">
                <span>{new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                <span>•</span>
                <span>{post.author}</span>
            </div>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
