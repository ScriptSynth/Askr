import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import Script from "next/script"
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
    <div className="relative min-h-screen flex flex-col bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(139,92,246,0.18), transparent 45%), radial-gradient(circle at 80% 60%, rgba(59,130,246,0.18), transparent 45%)",
          }}
        />
      </div>
      <SiteHeader />
      <main className="flex-1">
        <AnimatedSection>
          <Hero />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Features />
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <Testimonials />
        </AnimatedSection>

        {/* Pricing Section */}
        <AnimatedSection delay={0.2}>
        <section className="py-24 bg-white" id="pricing">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
                Pricing
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-muted-foreground text-lg">
                Start free and upgrade when you’re ready.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl font-semibold">Free</h3>
                  <span className="text-sm font-medium text-violet-700 bg-violet-100 px-3 py-1 rounded-full">
                    Great to start
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Unlimited testimonial collection</li>
                  <li>Customizable widget styling</li>
                  <li>Basic analytics</li>
                  <li>Community support</li>
                </ul>
                <a
                  href="/auth"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl border px-6 py-3 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Get Started Free
                </a>
              </div>

              <div className="rounded-2xl border p-8 shadow-md bg-gradient-to-b from-violet-50 to-white transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl font-semibold">Premium</h3>
                  <span className="text-sm font-medium text-white bg-violet-600 px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$5.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Everything in Free</li>
                  <li>Remove branding</li>
                  <li>Advanced analytics</li>
                  <li>Priority support</li>
                </ul>
                <a
                  href="/auth"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 text-white px-6 py-3 font-semibold hover:bg-violet-700 transition-colors shadow"
                >
                  Start Premium
                </a>
              </div>
            </div>
          </div>
        </section>
        </AnimatedSection>
        
        {/* FAQ Section for SEO */}
        <AnimatedSection delay={0.25}>
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
        </AnimatedSection>

        {/* Final CTA */}
        <AnimatedSection delay={0.3}>
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
        </AnimatedSection>
      </main>
      <SiteFooter />
      <Script
        src="/widget.js"
        data-project-id="d28ce8a9-d379-42e3-b8ce-5e2c0dac5844"
        data-origin="https://askr.me"
        strategy="afterInteractive"
      />
    </div>
  )
}