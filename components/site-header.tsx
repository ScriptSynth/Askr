import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center mx-auto px-4 md:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <div className="h-9 w-9 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <Image src="/logo.png" alt="Askr logo" width={36} height={36} className="h-full w-full object-contain" />
            </div>
            <span className="font-heading font-bold text-xl">Askr</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/#features"
              className="transition-all hover:text-violet-600 text-foreground/70"
            >
              Features
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 transition-all hover:text-violet-600 text-foreground/70">
                Use Cases
                <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white border border-violet-100/70 rounded-xl shadow-xl p-2 min-w-[200px]">
                  <Link href="/use-cases/collect-testimonials" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Collect Testimonials</Link>
                  <Link href="/use-cases/social-proof-widget" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Social Proof Widget</Link>
                  <Link href="/use-cases/wall-of-love" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Wall of Love</Link>
                  <Link href="/use-cases/review-management" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Review Management</Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 transition-all hover:text-violet-600 text-foreground/70">
                Industries
                <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white border border-violet-100/70 rounded-xl shadow-xl p-2 min-w-[180px]">
                  <Link href="/industries/saas" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">SaaS</Link>
                  <Link href="/industries/ecommerce" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">E-commerce</Link>
                  <Link href="/industries/agencies" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Agencies</Link>
                  <Link href="/industries/startups" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Startups</Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 transition-all hover:text-violet-600 text-foreground/70">
                Integrations
                <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white border border-violet-100/70 rounded-xl shadow-xl p-2 min-w-[180px]">
                  <Link href="/integrations/wordpress" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">WordPress</Link>
                  <Link href="/integrations/shopify" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Shopify</Link>
                  <Link href="/integrations/webflow" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Webflow</Link>
                  <Link href="/integrations/nextjs" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">Next.js</Link>
                  <Link href="/integrations/react" className="block px-3 py-2 rounded-lg hover:bg-violet-50 text-foreground/80 hover:text-violet-600">React</Link>
                </div>
              </div>
            </div>
            <Link
              href="/#pricing"
              className="transition-all hover:text-violet-600 text-foreground/70"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="transition-all hover:text-violet-600 text-foreground/70"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-3">
          <nav className="flex items-center space-x-3">
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="hover:text-violet-600 hover:bg-violet-50">
                Log in
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all">
                Start Free
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
