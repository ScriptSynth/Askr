import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Eye, FolderPlus, Feather, Gauge, ShieldCheck, Zap, Palette, BarChart3 } from "lucide-react"

const processSteps = [
  {
    title: "Create Your Project",
    step: "01",
    description: "Sign up in seconds and create a new project for collecting customer testimonials.",
    icon: FolderPlus,
  },
  {
    title: "Add One Script Tag",
    step: "02",
    description: "Copy our lightweight widget code and paste it into your website's HTML. No npm packages needed.",
    icon: Code,
  },
  {
    title: "Collect & Display",
    step: "03",
    description: "Watch as reviews automatically appear on your site. Manage everything from your dashboard.",
    icon: Eye,
  },
]

const features = [
  {
    title: "Ultra Lightweight",
    description: "Just 5kb gzipped. Our testimonial widget won't slow down your site or hurt Core Web Vitals.",
    icon: Feather,
    highlight: "< 5kb"
  },
  {
    title: "Blazing Fast",
    description: "Loads asynchronously with zero impact on your LCP, FID, or CLS scores. SEO friendly by design.",
    icon: Gauge,
    highlight: "0ms delay"
  },
  {
    title: "Fully Customizable",
    description: "Match your brand colors, fonts, and style. Dark mode, light mode, or auto-detect support.",
    icon: Palette,
    highlight: "Your brand"
  },
  {
    title: "Real-time Analytics",
    description: "Track review submissions, widget impressions, and conversion impact in real-time.",
    icon: BarChart3,
    highlight: "Live data"
  },
  {
    title: "Auto Spam Filter",
    description: "AI-powered spam detection keeps fake reviews out. Only genuine customer feedback gets through.",
    icon: ShieldCheck,
    highlight: "AI powered"
  },
  {
    title: "Instant Setup",
    description: "Go from signup to live testimonials in under 60 seconds. No technical skills required.",
    icon: Zap,
    highlight: "60 seconds"
  },
]

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-24 sm:py-32">
      
      {/* The Process */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            Simple 3-Step Setup
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            How to Add Testimonials to Your Website
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The easiest way to collect and display customer reviews. No coding experience needed.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {processSteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connecting line */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[calc(100%-1rem)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-violet-300 to-transparent z-0" />
              )}
              
              <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border bg-white hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold">
                  Step {step.step}
                </div>
                <div className="mt-4 mb-6 p-4 bg-gradient-to-br from-violet-100 to-blue-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Built for Performance
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Why SaaS Founders Choose Askr
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most lightweight, customizable testimonial widget designed specifically for modern web applications.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((item, index) => (
            <Card key={index} className="group relative overflow-hidden border bg-white hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-gradient-to-r from-violet-100 to-blue-100 text-xs font-bold text-violet-700">
                {item.highlight}
              </div>
              <CardHeader className="pb-2 pt-8">
                <div className="mb-4 p-3 bg-gradient-to-br from-violet-100 to-blue-50 rounded-xl inline-block w-fit group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 text-violet-600" />
                </div>
                <CardTitle className="font-heading text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 text-white">
          <div className="text-left">
            <h3 className="font-heading text-2xl font-bold mb-2">Ready to boost your conversions?</h3>
            <p className="text-violet-100">Join 500+ SaaS founders using Askr for social proof.</p>
          </div>
          <a href="/auth" className="shrink-0 px-8 py-3 rounded-xl bg-white text-violet-600 font-semibold hover:bg-violet-50 transition-colors shadow-lg">
            Get Started Free →
          </a>
        </div>
      </div>

    </section>
  )
}
