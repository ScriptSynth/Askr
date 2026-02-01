import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { SiteFooter } from "@/components/site-footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Askr - #1 Testimonial & Social Proof Widget for SaaS | Free to Start",
  description: "Collect and display customer testimonials in 60 seconds. Askr is the lightweight (5kb) testimonial widget that helps SaaS companies boost conversions with authentic reviews and social proof.",
  keywords: [
    "testimonial widget",
    "social proof tool",
    "customer reviews widget",
    "saas testimonials",
    "wall of love",
    "review collection tool",
    "customer feedback widget",
    "social proof software",
    "embed testimonials",
    "website social proof",
    "testimonial collector",
    "customer testimonials software",
    "review widget for website",
    "social proof widget",
    "testimonial management tool"
  ],
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        
        {/* FAQ Section for SEO */}
        <section className="py-24 bg-slate-50" id="faq">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
                FAQ
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to know about our testimonial widget
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: "What is a testimonial widget?",
                  a: "A testimonial widget is a tool that allows you to collect and display customer reviews directly on your website. Askr's widget is lightweight (under 5kb), easy to install with just one script tag, and helps boost conversions by showing authentic social proof to your visitors."
                },
                {
                  q: "How do I add testimonials to my website?",
                  a: "With Askr, adding testimonials to your website takes less than 60 seconds. Simply create an account, copy the provided script tag, and paste it into your website's HTML. The widget automatically collects and displays reviews without any coding required."
                },
                {
                  q: "Will the widget slow down my website?",
                  a: "No! Askr is designed with performance in mind. The entire widget is under 5kb gzipped and loads asynchronously, meaning it has zero impact on your Core Web Vitals (LCP, FID, CLS) or SEO rankings."
                },
                {
                  q: "Is Askr free to use?",
                  a: "Yes! Askr offers a generous free tier that includes all core features. You can collect unlimited reviews, customize the widget appearance, and display testimonials on your website at no cost."
                },
                {
                  q: "Can I customize the look of the testimonial widget?",
                  a: "Absolutely! Askr offers full customization including colors, fonts, positioning, and themes (light/dark/auto). You can match the widget perfectly to your brand identity."
                },
                {
                  q: "Does Askr work with any website platform?",
                  a: "Yes! Askr works with any website platform including React, Next.js, Vue, WordPress, Shopify, Webflow, Squarespace, and static HTML sites. If you can add a script tag, you can use Askr."
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
                  <summary className="flex justify-between items-center cursor-pointer list-none font-heading font-semibold text-lg">
                    {faq.q}
                    <span className="ml-4 text-violet-600 group-open:rotate-180 transition-transform">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-r from-violet-600 to-blue-600">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Boost Your Conversions?
            </h2>
            <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
              Join 500+ SaaS founders who use Askr to collect and display customer testimonials.
            </p>
            <a 
              href="/auth"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-violet-600 font-semibold text-lg hover:bg-violet-50 transition-colors shadow-xl hover:shadow-2xl"
            >
              Start Collecting Testimonials Free
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-4 text-sm text-violet-200">
              No credit card required • Free forever plan available
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}