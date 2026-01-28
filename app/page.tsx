import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { SiteFooter } from "@/components/site-footer"
import Script from "next/script"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <SiteFooter />
      
      {/* Facto Widget for testing */}
      <Script 
        src="http://localhost:3000/widget.js" 
        data-project-id="d28ce8a9-d379-42e3-b8ce-5e2c0dac5844" 
        strategy="afterInteractive"
      />
    </div>
  )
}