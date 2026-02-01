import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { industries } from "@/lib/pseo-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowRight, 
  Check, 
  Star, 
  Rocket, 
  ShoppingCart, 
  Briefcase, 
  User, 
  Sparkles,
  Heart
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  ShoppingCart,
  Briefcase,
  User,
  Sparkles,
  Heart
}

export async function generateStaticParams() {
  return industries.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const page = industries.find(p => p.slug === slug)
  
  if (!page) return {}

  return {
    title: `${page.title} | Askr`,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `https://askr.io/industries/${slug}`,
    },
  }
}

export default async function IndustryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const page = industries.find(p => p.slug === slug)

  if (!page) {
    notFound()
  }

  const IconComponent = iconMap[page.icon] || Sparkles

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50/70 via-background to-blue-50/40">
      <div className="pointer-events-none absolute inset-0 bg-background bg-grid-pattern opacity-35" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-violet-400/20 to-purple-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-violet-100/70 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container flex h-16 items-center mx-auto px-4 md:px-6">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl">Askr</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/#features" className="transition-all hover:text-violet-600 text-foreground/70">Features</Link>
            <Link href="/use-cases/collect-testimonials" className="transition-all hover:text-violet-600 text-foreground/70">Use Cases</Link>
            <Link href="/industries/saas" className="transition-all hover:text-violet-600 text-violet-600 font-semibold">Industries</Link>
            <Link href="/integrations/wordpress" className="transition-all hover:text-violet-600 text-foreground/70">Integrations</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-3">
            <Link href="/auth">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-violet-700 mb-6 shadow-sm">
            <IconComponent className="h-4 w-4" />
            Industry Solution
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {page.headline}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {page.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:scale-105">
                {page.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why {page.title.split(' ').slice(-1)[0]} Choose Askr</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {page.benefits.map((benefit, i) => (
              <Card key={i} className="bg-white/75 backdrop-blur-xl border border-violet-100/70 shadow-lg">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-lg font-medium">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Features Built for You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {page.features.map((feature, i) => (
              <div key={i} className="rounded-xl border border-violet-100/70 bg-white/70 backdrop-blur-xl p-4 text-center shadow-sm">
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-lg text-muted-foreground">
            Trusted by <strong className="text-foreground">500+ companies</strong> across all industries
          </p>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-violet-100/70 bg-white/75 backdrop-blur-xl p-8 md:p-12 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to boost your social proof?</h2>
          <p className="text-muted-foreground mb-6">
            Start collecting testimonials today. Free to start, no credit card required.
          </p>
          <Link href="/auth">
            <Button size="lg" className="h-14 px-10 text-lg font-semibold bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Start Collecting Reviews Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Related Industries */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-xl font-bold mb-6">Other Industries</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {industries.filter(p => p.slug !== slug).slice(0, 3).map((related) => (
              <Link key={related.slug} href={`/industries/${related.slug}`} className="group">
                <Card className="h-full bg-white/70 backdrop-blur-xl border border-violet-100/70 hover:border-violet-300/80 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-lg">
                  <CardContent className="p-5">
                    <h3 className="font-semibold group-hover:text-violet-600 transition-colors">{related.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{related.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-violet-100/70 bg-white/70 backdrop-blur-xl py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">Askr</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Askr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
