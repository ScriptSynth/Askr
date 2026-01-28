import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    name: "Alex Chen",
    handle: "@alexchen_dev",
    role: "Founder, DevTools",
    avatar: "/avatars/01.png",
    content: "Facto has completely transformed how we handle testimonials. Setup took 5 minutes and the result is stunning.",
  },
  {
    name: "Sarah Miller",
    handle: "@sarahm_design",
    role: "Product Designer",
    avatar: "/avatars/02.png",
    content: "The design quality of the generated walls is top-notch. It fits perfectly with our Vercel-hosted site.",
  },
  {
    name: "James Wilson",
    handle: "@jwilson_saas",
    role: "Indie Hacker",
    avatar: "/avatars/03.png",
    content: "I used to manually update my testimonials page. Now Facto does it automatically. Huge time saver!",
  },
  {
    name: "Emily Davis",
    handle: "@emilyd_tech",
    role: "CTO, StartUp Inc",
    avatar: "/avatars/04.png",
    content: "Integration was seamless. The widget looks native to our app. Highly recommended.",
  },
    {
    name: "Michael Brown",
    handle: "@mike_b",
    role: "Marketing Lead",
    avatar: "/avatars/05.png",
    content: "Social proof is critical. Facto makes it easy to collect and display. Conversion rates are up 20%.",
  },
  {
    name: "Jessica Taylor",
    handle: "@jess_t",
    role: "Freelancer",
    avatar: "/avatars/06.png",
    content: "Simple, effective, and beautiful. Exactly what I needed for my portfolio.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="container mx-auto px-4 md:px-6 py-24 sm:py-32 bg-muted/30">
        <div className="flex flex-col items-center justify-center gap-4 text-center mb-16">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mb-2 bg-background">
          Wall of Love
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Loved by founders worldwide
        </h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          See what others are building with Facto.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="break-inside-avoid">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{testimonial.name}</span>
                <span className="text-xs text-muted-foreground">{testimonial.handle}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
