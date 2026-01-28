import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MousePointerClick, LayoutTemplate, Globe, Sparkles, ShieldCheck, Zap } from "lucide-react"

const features = [
  {
    title: "One-click Capture",
    description: "Send a unique link to your users and collect feedback instantly without any friction.",
    icon: MousePointerClick,
  },
  {
    title: "Auto-generated Wall",
    description: "We automatically design a stunning wall of love hosted on your own subdomain.",
    icon: LayoutTemplate,
  },
  {
    title: "Embed Anywhere",
    description: "Use our lightweight widget to showcase testimonials on your landing page or app.",
    icon: Globe,
  },
    {
    title: "AI Analysis",
    description: "Automatically sentiment analysis to highlight the best feedback for your product.",
    icon: Sparkles,
  },
  {
    title: "Verified Reviews",
    description: "We verify the identity of your reviewers via LinkedIn or Twitter login.",
    icon: ShieldCheck,
  },
  {
    title: "Lightning Fast",
    description: "Optimized for speed. Your wall loads in milliseconds, ensuring great SEO.",
    icon: Zap,
  },
]

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-24 sm:py-32">
      <div className="flex flex-col items-center justify-center gap-4 text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Everything you need to build trust.
        </h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Facto provides all the tools you need to collect, manage, and showcase social proof.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
