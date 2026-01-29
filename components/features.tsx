import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Eye, FolderPlus, Feather, Gauge, ShieldCheck } from "lucide-react"

const processSteps = [
  {
    title: "1. Create your project",
    description: "Sign up and create a new project bucket for your testimonials.",
    icon: FolderPlus,
  },
  {
    title: "2. Copy the script",
    description: "Paste our lightweight JavaScript snippet into your site's <head>.",
    icon: Code,
  },
  {
    title: "3. Watch reviews roll in",
    description: "New feedback appears automatically in your dashboard and widget.",
    icon: Eye,
  },
]

const whyAskr = [
  {
    title: "Lightweight",
    description: "The entire bundle is less than 5kb gzipped. It won't bloat your bundle.",
    icon: Feather,
  },
  {
    title: "Zero Latency",
    description: "Askr loads asynchronously. It will never block your main thread or slow down your LCP.",
    icon: Gauge,
  },
  {
    title: "Zero Maintenance",
    description: "Set it and forget it. We handle the hosting, scaling, and spam filtering.",
    icon: ShieldCheck,
  },
]

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-24">
      
      {/* The Process */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">The Process</h2>
          <p className="text-muted-foreground">Three steps to social proof.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Askr */}
      <div>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Why Askr?</h2>
          <p className="text-muted-foreground">Built for speed. Optimized for developers.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {whyAskr.map((item, index) => (
            <Card key={index} className="bg-muted/30 border-none shadow-none">
              <CardHeader>
                <item.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </section>
  )
}
