import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Alex Chen",
    handle: "@alexchen_dev",
    role: "Founder, DevTools",
    avatar: "/avatars/01.png",
    content: "Askr has completely transformed how we handle testimonials. Setup took 5 minutes and the result is stunning.",
    rating: 5,
  },
  {
    name: "Sarah Miller",
    handle: "@sarahm_design",
    role: "Product Designer",
    avatar: "/avatars/02.png",
    content: "The design quality of the generated walls is top-notch. It fits perfectly with our Vercel-hosted site.",
    rating: 5,
  },
  {
    name: "James Wilson",
    handle: "@jwilson_saas",
    role: "Indie Hacker",
    avatar: "/avatars/03.png",
    content: "I used to manually update my testimonials page. Now Askr does it automatically. Huge time saver!",
    rating: 5,
  },
  {
    name: "Emily Davis",
    handle: "@emilyd_tech",
    role: "CTO, StartUp Inc",
    avatar: "/avatars/04.png",
    content: "Integration was seamless. The widget looks native to our app. Highly recommended.",
    rating: 5,
  },
    {
    name: "Michael Brown",
    handle: "@mike_b",
    role: "Marketing Lead",
    avatar: "/avatars/05.png",
    content: "Social proof is critical. Askr makes it easy to collect and display. Conversion rates are up 20%.",
    rating: 5,
  },
  {
    name: "Jessica Taylor",
    handle: "@jess_t",
    role: "Freelancer",
    avatar: "/avatars/06.png",
    content: "Simple, effective, and beautiful. Exactly what I needed for my portfolio.",
    rating: 5,
  },
  {
    name: "David Kim",
    handle: "@davidk_dev",
    role: "SaaS Builder",
    avatar: "/avatars/07.png",
    content: "The best way to showcase social proof. My visitors love seeing real feedback.",
    rating: 5,
  },
  {
    name: "Anna Lee",
    handle: "@annalee_ux",
    role: "UX Researcher",
    avatar: "/avatars/08.png",
    content: "Incredible attention to detail. The widgets are responsive and look great on mobile.",
    rating: 5,
  },
  {
    name: "Tom Harris",
    handle: "@tomh_growth",
    role: "Growth Marketer",
    avatar: "/avatars/09.png",
    content: "Setup was a breeze. I had reviews on my landing page in under 2 minutes.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-white via-violet-50/30 to-white">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4 md:px-6 flex flex-col items-center justify-center gap-4 text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-2">
          Real Customer Reviews
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
          Trusted by <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">500+ SaaS Founders</span>
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
          See why leading companies choose Askr for their testimonial and social proof needs.
        </p>
      </div>

      <div className="relative w-full overflow-hidden pause-on-hover mask-gradient">
        <div className="flex animate-marquee-reverse gap-6 w-max pl-4">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Card key={index} className="w-[360px] shrink-0 bg-white/90 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-12 w-12 border-2 border-violet-100">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-white font-semibold">
                    {testimonial.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-semibold">{testimonial.name}</span>
                  <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                </div>
                <Quote className="h-8 w-8 text-violet-200 group-hover:text-violet-300 transition-colors" />
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats section */}
      <div className="container mx-auto px-4 md:px-6 mt-16">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 py-8 px-6 rounded-2xl bg-white/80 backdrop-blur-sm border shadow-sm max-w-3xl mx-auto">
          {[
            { value: "10,000+", label: "Reviews Collected" },
            { value: "34%", label: "Avg. Conversion Lift" },
            { value: "< 5kb", label: "Bundle Size" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-heading text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
