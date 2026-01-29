import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Facto - The Ultimate Social Proof Tool for SaaS Founders",
  description: "Collect, manage, and showcase testimonials with Facto. Generate a beautiful wall of love in seconds to boost your conversion rates.",
  keywords: ["social proof", "testimonials", "saas", "wall of love", "marketing", "conversion optimization", "reviews"],
  openGraph: {
    title: "Facto - Social Proof for SaaS",
    description: "Generate a beautiful wall of love in seconds.",
    type: "website",
    locale: "en_US",
    siteName: "Facto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facto - Social Proof for SaaS",
    description: "Generate a beautiful wall of love in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
