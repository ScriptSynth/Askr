import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-14 w-14 rounded-2xl overflow-hidden shadow-lg">
                <Image src="/logo.png" alt="Askr logo" width={56} height={56} className="h-full w-full object-contain" />
              </div>
              <span className="font-heading font-bold text-xl">Askr</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The #1 testimonial widget for SaaS. Collect and display customer reviews in 60 seconds.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Use Cases</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/use-cases/collect-testimonials" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Collect Testimonials
                </Link>
              </li>
              <li>
                <Link href="/use-cases/social-proof-widget" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Social Proof Widget
                </Link>
              </li>
              <li>
                <Link href="/use-cases/wall-of-love" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Wall of Love
                </Link>
              </li>
              <li>
                <Link href="/use-cases/review-management" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Review Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/industries/saas" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  SaaS
                </Link>
              </li>
              <li>
                <Link href="/industries/ecommerce" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/industries/agencies" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Agencies
                </Link>
              </li>
              <li>
                <Link href="/industries/startups" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Startups
                </Link>
              </li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Integrations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/integrations/wordpress" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  WordPress
                </Link>
              </li>
              <li>
                <Link href="/integrations/shopify" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Shopify
                </Link>
              </li>
              <li>
                <Link href="/integrations/webflow" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Webflow
                </Link>
              </li>
              <li>
                <Link href="/integrations/nextjs" className="text-muted-foreground hover:text-violet-600 transition-colors">
                  Next.js
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Askr. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-violet-600 transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-600 transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
