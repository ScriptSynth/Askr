import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Sparkles } from "lucide-react"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glassy background with blur */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-[0_2px_20px_-2px_rgba(139,92,246,0.1)]" />
      
      <div className="container relative flex h-16 items-center mx-auto px-4 md:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-8 flex items-center group hover:scale-105 transition-all">
            <Logo size="sm" />
          </Link>
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            <Link
              href="/#features"
              className="px-4 py-2 rounded-full transition-all hover:bg-violet-50 hover:text-violet-600 text-foreground/70"
            >
              Features
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full transition-all hover:bg-violet-50 hover:text-violet-600 text-foreground/70">
                Use Cases
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white/90 backdrop-blur-xl border border-violet-100/50 rounded-2xl shadow-xl shadow-violet-500/10 p-2 min-w-[220px]">
                  <Link href="/use-cases/collect-testimonials" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Collect Testimonials</Link>
                  <Link href="/use-cases/social-proof-widget" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Social Proof Widget</Link>
                  <Link href="/use-cases/wall-of-love" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Wall of Love</Link>
                  <Link href="/use-cases/review-management" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Review Management</Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full transition-all hover:bg-violet-50 hover:text-violet-600 text-foreground/70">
                Industries
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white/90 backdrop-blur-xl border border-violet-100/50 rounded-2xl shadow-xl shadow-violet-500/10 p-2 min-w-[180px]">
                  <Link href="/industries/saas" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">SaaS</Link>
                  <Link href="/industries/ecommerce" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">E-commerce</Link>
                  <Link href="/industries/agencies" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Agencies</Link>
                  <Link href="/industries/startups" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Startups</Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full transition-all hover:bg-violet-50 hover:text-violet-600 text-foreground/70">
                Integrations
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white/90 backdrop-blur-xl border border-violet-100/50 rounded-2xl shadow-xl shadow-violet-500/10 p-2 min-w-[180px]">
                  <Link href="/integrations/wordpress" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">WordPress</Link>
                  <Link href="/integrations/shopify" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Shopify</Link>
                  <Link href="/integrations/webflow" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Webflow</Link>
                  <Link href="/integrations/nextjs" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">Next.js</Link>
                  <Link href="/integrations/react" className="block px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 text-foreground/80 hover:text-violet-600 transition-all">React</Link>
                </div>
              </div>
            </div>
            <Link
              href="/#pricing"
              className="px-4 py-2 rounded-full transition-all hover:bg-violet-50 hover:text-violet-600 text-foreground/70"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full transition-all hover:bg-violet-50 hover:text-violet-600 text-foreground/70"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="rounded-full hover:text-violet-600 hover:bg-violet-50/80 font-medium">
                Log in
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 hover:opacity-90 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all font-medium px-5">
                <Sparkles className="h-4 w-4 mr-1.5" />
                Start Free
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
