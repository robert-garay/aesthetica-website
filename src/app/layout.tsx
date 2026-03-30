import type { Metadata } from "next"
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Aesthetica — Learn to Glow",
    template: "%s | Aesthetica",
  },
  description:
    "Virginia state-qualified aesthetic learning portal. Complete your 600-hour esthetics theory requirement online, at your pace.",
  keywords: [
    "esthetics school",
    "Virginia esthetician",
    "DPOR approved",
    "aesthetics education",
    "beauty school online",
    "esthetician license Virginia",
  ],
  authors: [{ name: "Aesthetica" }],
  creator: "Aesthetica",
  metadataBase: new URL("https://aesthetica.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aesthetica.app",
    title: "Aesthetica — Learn to Glow",
    description:
      "Virginia state-qualified aesthetic learning portal. Complete your 600-hour esthetics theory online.",
    siteName: "Aesthetica",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aesthetica — Learn to Glow",
    description:
      "Virginia state-qualified aesthetic learning portal.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
