import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://askr.io"),
  title: {
    default: "Askr - #1 Testimonial & Social Proof Widget for SaaS | Collect Reviews Easily",
    template: "%s | Askr - Social Proof Platform"
  },
  description: "Collect and display customer testimonials in 60 seconds. Askr is the lightweight social proof widget that helps SaaS founders boost conversions with authentic reviews. Free to start.",
  keywords: [
    "testimonial widget",
    "social proof tool",
    "customer reviews widget",
    "saas testimonials",
    "wall of love",
    "review collection tool",
    "customer feedback widget",
    "social proof software",
    "testimonial management",
    "conversion optimization",
    "user reviews",
    "testimonial collector",
    "embed testimonials",
    "website social proof",
    "customer testimonials software"
  ],
  authors: [{ name: "Askr Team" }],
  creator: "Askr",
  publisher: "Askr",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Askr - #1 Testimonial & Social Proof Widget for SaaS",
    description: "Collect and display customer testimonials in 60 seconds. Boost conversions with authentic social proof.",
    type: "website",
    locale: "en_US",
    siteName: "Askr",
    url: "https://askr.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Askr - Social Proof Widget",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Askr - #1 Testimonial & Social Proof Widget",
    description: "Collect and display customer testimonials in 60 seconds. Boost conversions with authentic social proof.",
    images: ["/og-image.png"],
    creator: "@askr_io",
  },
  alternates: {
    canonical: "https://askr.io",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Askr",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Collect and display customer testimonials in 60 seconds. The lightweight social proof widget for SaaS.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "127"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NEXT_PUBLIC_DEMO_PROJECT_ID && (
          <Script
            src="/widget.js"
            data-project-id={process.env.NEXT_PUBLIC_DEMO_PROJECT_ID}
            strategy="afterInteractive"
          />
        )}
        <Toaster position="top-center" richColors expand />
        <Analytics />
      </body>
    </html>
  );
}
