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
    <>
      <style>{`
        html, body {
          background: transparent !important;
          overflow: hidden;
        }
      `}</style>
      {children}
    </>
  );
}
