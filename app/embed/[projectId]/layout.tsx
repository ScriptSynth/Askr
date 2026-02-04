import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Askr Widget",
  description: "Feedback collection widget",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ background: "transparent" }}>
      <head>
        <style>{`
          html, body {
            background: transparent !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            min-height: 100vh;
          }
        `}</style>
      </head>
      <body style={{ background: "transparent" }}>
        {children}
      </body>
    </html>
  );
}
