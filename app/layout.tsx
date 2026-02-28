import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900']
})

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  title: "WELCOME ITZ FIZZ | Premium Scroll Animation",
  description:
    "A production-quality scroll-driven hero section with GSAP animations, dark theme, and premium design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} noise-overlay`}>
        {children}
      </body>
    </html>
  );
}