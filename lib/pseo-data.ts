// pSEO Data Source for Use Cases, Industries, and Integrations

export interface PseoPage {
  slug: string
  title: string
  description: string
  headline: string
  subheadline: string
  benefits: string[]
  features: string[]
  cta: string
  icon: string
}

// Use Cases - How customers use Askr
export const useCases: PseoPage[] = [
  {
    slug: "collect-testimonials",
    title: "Collect Testimonials Automatically",
    description: "Automate testimonial collection from happy customers with Askr's lightweight widget. No manual follow-ups needed.",
    headline: "Collect Testimonials on Autopilot",
    subheadline: "Stop chasing customers for reviews. Let Askr automatically collect authentic testimonials while you focus on building.",
    benefits: [
      "Automated collection after key moments",
      "No manual follow-up emails needed",
      "Higher response rates than email requests",
      "Real-time notifications for new reviews"
    ],
    features: [
      "Smart timing triggers",
      "Customizable prompts",
      "One-click submission for customers",
      "Dashboard to manage all reviews"
    ],
    cta: "Start Collecting Reviews",
    icon: "MessageSquare"
  },
  {
    slug: "social-proof-widget",
    title: "Social Proof Widget for Websites",
    description: "Display beautiful social proof widgets on your website to boost trust and conversions instantly.",
    headline: "Add Social Proof to Any Website",
    subheadline: "Install our lightweight widget in 60 seconds and watch your conversion rates climb with authentic customer reviews.",
    benefits: [
      "Increase landing page conversions by 34%",
      "Build instant trust with visitors",
      "Only 5kb - won't slow your site",
      "Works on any website platform"
    ],
    features: [
      "One-line embed code",
      "Fully customizable design",
      "Mobile responsive",
      "Real-time updates"
    ],
    cta: "Get Your Widget",
    icon: "Zap"
  },
  {
    slug: "wall-of-love",
    title: "Wall of Love for SaaS",
    description: "Create a stunning wall of love page showcasing all your best customer testimonials in one place.",
    headline: "Build Your Wall of Love",
    subheadline: "Showcase your happiest customers with a beautiful, auto-updating testimonial wall that converts visitors into believers.",
    benefits: [
      "Dedicated testimonial showcase page",
      "Auto-updates with new reviews",
      "Shareable link for marketing",
      "Embeddable on any page"
    ],
    features: [
      "Grid and masonry layouts",
      "Filter by rating",
      "Search functionality",
      "Custom branding"
    ],
    cta: "Create Your Wall",
    icon: "Heart"
  },
  {
    slug: "nps-surveys",
    title: "NPS Surveys & Customer Feedback",
    description: "Collect Net Promoter Score and detailed customer feedback to improve your product continuously.",
    headline: "Understand Your Customers Better",
    subheadline: "Go beyond star ratings. Collect actionable feedback that helps you build what customers actually want.",
    benefits: [
      "Track NPS over time",
      "Identify promoters and detractors",
      "Collect qualitative feedback",
      "Prioritize product improvements"
    ],
    features: [
      "NPS scoring system",
      "Follow-up questions",
      "Trend analytics",
      "Export capabilities"
    ],
    cta: "Start Surveying",
    icon: "BarChart"
  },
  {
    slug: "review-management",
    title: "Review Management Dashboard",
    description: "Manage all your customer reviews in one central dashboard. Approve, respond, and analyze feedback effortlessly.",
    headline: "All Your Reviews, One Dashboard",
    subheadline: "Stop juggling multiple platforms. Manage, moderate, and maximize your customer reviews from a single place.",
    benefits: [
      "Centralized review management",
      "Moderation before publishing",
      "Response templates",
      "Analytics and insights"
    ],
    features: [
      "Approval workflow",
      "Bulk actions",
      "Search and filter",
      "Export to CSV"
    ],
    cta: "Try the Dashboard",
    icon: "LayoutDashboard"
  }
]

// Industries - Who uses Askr
export const industries: PseoPage[] = [
  {
    slug: "saas",
    title: "Testimonial Widget for SaaS Companies",
    description: "The #1 social proof solution for SaaS. Collect and display customer testimonials to boost trial conversions.",
    headline: "Built for SaaS Growth",
    subheadline: "Join 500+ SaaS founders using Askr to convert more trials into paying customers with authentic social proof.",
    benefits: [
      "Increase trial-to-paid conversions",
      "Reduce churn with feedback insights",
      "Build trust on pricing pages",
      "Automate review collection post-onboarding"
    ],
    features: [
      "Integrates with your SaaS stack",
      "Trigger after key milestones",
      "A/B test testimonial displays",
      "API for custom integrations"
    ],
    cta: "Start Free for SaaS",
    icon: "Rocket"
  },
  {
    slug: "ecommerce",
    title: "Product Reviews for E-commerce",
    description: "Collect and display product reviews that drive sales. Perfect for Shopify, WooCommerce, and custom stores.",
    headline: "Reviews That Sell Products",
    subheadline: "Turn happy customers into your best salespeople with authentic product reviews displayed at the perfect moment.",
    benefits: [
      "Increase product page conversions",
      "Build buyer confidence",
      "Reduce return rates",
      "Improve SEO with review content"
    ],
    features: [
      "Product-specific reviews",
      "Photo and video reviews",
      "Verified purchase badges",
      "Review request automation"
    ],
    cta: "Boost Your Sales",
    icon: "ShoppingCart"
  },
  {
    slug: "agencies",
    title: "Client Testimonials for Agencies",
    description: "Showcase client success stories and testimonials to win more agency clients. Perfect for marketing and design agencies.",
    headline: "Win More Agency Clients",
    subheadline: "Let your best client results speak for themselves. Collect and display case study testimonials that close deals.",
    benefits: [
      "Build credibility with prospects",
      "Showcase diverse client portfolio",
      "Automate testimonial requests",
      "Create case study content"
    ],
    features: [
      "Client logo displays",
      "Video testimonial support",
      "Industry categorization",
      "Results-focused templates"
    ],
    cta: "Get Client Testimonials",
    icon: "Briefcase"
  },
  {
    slug: "consultants",
    title: "Reviews for Consultants & Coaches",
    description: "Build your consulting practice with powerful client testimonials. Perfect for coaches, consultants, and freelancers.",
    headline: "Testimonials for Consultants",
    subheadline: "Your expertise deserves social proof. Collect client success stories that attract your ideal customers.",
    benefits: [
      "Establish authority and trust",
      "Justify premium pricing",
      "Attract ideal clients",
      "Build personal brand"
    ],
    features: [
      "Personal branding options",
      "LinkedIn-style endorsements",
      "Outcome-focused prompts",
      "Portfolio integration"
    ],
    cta: "Build Your Reputation",
    icon: "User"
  },
  {
    slug: "startups",
    title: "Social Proof for Startups",
    description: "Early-stage startups need social proof fast. Askr helps you collect and display testimonials from day one.",
    headline: "Social Proof for Early-Stage Startups",
    subheadline: "You don't need 1000 customers to have great social proof. Start collecting testimonials from your first users.",
    benefits: [
      "Build credibility early",
      "Free tier for bootstrappers",
      "Quick 2-minute setup",
      "Grow with your startup"
    ],
    features: [
      "Generous free tier",
      "No credit card required",
      "Startup-friendly pricing",
      "Priority support"
    ],
    cta: "Start Free Today",
    icon: "Sparkles"
  },
  {
    slug: "healthcare",
    title: "Patient Testimonials for Healthcare",
    description: "Collect HIPAA-mindful patient reviews for healthcare practices. Build trust with prospective patients.",
    headline: "Patient Reviews That Build Trust",
    subheadline: "Help prospective patients choose your practice with authentic testimonials from satisfied patients.",
    benefits: [
      "Build patient trust",
      "Improve online reputation",
      "Stand out from competitors",
      "Privacy-conscious collection"
    ],
    features: [
      "HIPAA-mindful workflows",
      "Anonymous review options",
      "Treatment-specific feedback",
      "Review response templates"
    ],
    cta: "Get Patient Reviews",
    icon: "Heart"
  }
]

// Integrations - What Askr works with
export const integrations: PseoPage[] = [
  {
    slug: "wordpress",
    title: "Testimonial Widget for WordPress",
    description: "Add beautiful testimonial widgets to your WordPress site in seconds. No plugin conflicts, just copy and paste.",
    headline: "WordPress Testimonials Made Easy",
    subheadline: "The simplest way to add social proof to WordPress. No bulky plugins, no conflicts, just one line of code.",
    benefits: [
      "Works with any WordPress theme",
      "No plugin conflicts",
      "Faster than traditional plugins",
      "Automatic updates"
    ],
    features: [
      "One-line embed",
      "Gutenberg compatible",
      "Works with page builders",
      "No PHP knowledge needed"
    ],
    cta: "Add to WordPress",
    icon: "Globe"
  },
  {
    slug: "shopify",
    title: "Product Reviews for Shopify",
    description: "Collect and display product reviews on your Shopify store. Boost sales with authentic customer testimonials.",
    headline: "Shopify Reviews That Convert",
    subheadline: "Add powerful social proof to your Shopify store without the bloat of traditional review apps.",
    benefits: [
      "Increase add-to-cart rates",
      "Build buyer confidence",
      "Lightweight - no speed impact",
      "Works with any Shopify theme"
    ],
    features: [
      "Product-specific widgets",
      "Theme editor integration",
      "Post-purchase collection",
      "Import existing reviews"
    ],
    cta: "Install on Shopify",
    icon: "ShoppingBag"
  },
  {
    slug: "webflow",
    title: "Testimonials for Webflow",
    description: "Add dynamic testimonial widgets to Webflow without breaking your design. Perfect for agencies and designers.",
    headline: "Webflow Testimonials, Perfected",
    subheadline: "Beautiful testimonials that match your Webflow design. No custom code headaches, just embed and go.",
    benefits: [
      "Matches any Webflow design",
      "No custom code needed",
      "Real-time updates",
      "Designer-friendly"
    ],
    features: [
      "Embed component ready",
      "CMS integration",
      "Custom styling options",
      "Responsive by default"
    ],
    cta: "Use with Webflow",
    icon: "Palette"
  },
  {
    slug: "framer",
    title: "Reviews Widget for Framer",
    description: "Add testimonial widgets to your Framer site. Perfect for designers who want social proof without complexity.",
    headline: "Framer + Askr = Perfect Match",
    subheadline: "Add social proof to your Framer site in seconds. Beautiful, fast, and matches your design perfectly.",
    benefits: [
      "Framer-native experience",
      "No design compromises",
      "Lightning fast",
      "Easy embed"
    ],
    features: [
      "Embed ready",
      "Design customization",
      "Mobile optimized",
      "Auto-updates"
    ],
    cta: "Add to Framer",
    icon: "Layers"
  },
  {
    slug: "nextjs",
    title: "Testimonials for Next.js Apps",
    description: "Add testimonial widgets to your Next.js application. SSR compatible, lightweight, and developer-friendly.",
    headline: "Built for Next.js Developers",
    subheadline: "A testimonial solution that respects your Next.js architecture. Lightweight, SSR-ready, and type-safe.",
    benefits: [
      "SSR and SSG compatible",
      "No hydration issues",
      "TypeScript support",
      "API for custom implementations"
    ],
    features: [
      "React component",
      "API access",
      "Webhook support",
      "Edge-compatible"
    ],
    cta: "Install for Next.js",
    icon: "Code"
  },
  {
    slug: "react",
    title: "React Testimonial Component",
    description: "A lightweight React component for displaying testimonials. Easy to customize, easy to integrate.",
    headline: "React Testimonials Component",
    subheadline: "Drop-in testimonial component for React apps. Fully customizable, type-safe, and performant.",
    benefits: [
      "Native React experience",
      "Customizable props",
      "Lightweight bundle",
      "TypeScript included"
    ],
    features: [
      "React 18+ support",
      "Hooks API",
      "Server components ready",
      "CSS-in-JS friendly"
    ],
    cta: "Get React Component",
    icon: "Code"
  },
  {
    slug: "slack",
    title: "Slack Notifications for Reviews",
    description: "Get instant Slack notifications when customers leave reviews. Never miss important feedback again.",
    headline: "Reviews in Your Slack",
    subheadline: "Stay on top of customer feedback with instant Slack notifications for every new review.",
    benefits: [
      "Instant notifications",
      "Team visibility",
      "Quick response time",
      "Celebrate wins together"
    ],
    features: [
      "Real-time alerts",
      "Custom channels",
      "Rating filters",
      "One-click setup"
    ],
    cta: "Connect Slack",
    icon: "MessageSquare"
  },
  {
    slug: "zapier",
    title: "Zapier Integration for Reviews",
    description: "Connect Askr to 5000+ apps with Zapier. Automate your review workflow and sync data everywhere.",
    headline: "Connect Reviews to Everything",
    subheadline: "Use Zapier to connect your testimonials with CRMs, email tools, spreadsheets, and 5000+ more apps.",
    benefits: [
      "5000+ app connections",
      "Automated workflows",
      "No code required",
      "Sync everywhere"
    ],
    features: [
      "Trigger on new review",
      "Send to CRM",
      "Update spreadsheets",
      "Email notifications"
    ],
    cta: "Connect with Zapier",
    icon: "Zap"
  }
]

// Helper to get all pages for sitemap
export function getAllPseoPages() {
  return [
    ...useCases.map(p => ({ ...p, type: 'use-case' as const, path: `/use-cases/${p.slug}` })),
    ...industries.map(p => ({ ...p, type: 'industry' as const, path: `/industries/${p.slug}` })),
    ...integrations.map(p => ({ ...p, type: 'integration' as const, path: `/integrations/${p.slug}` })),
  ]
}
