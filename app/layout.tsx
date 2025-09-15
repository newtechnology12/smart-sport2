import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AppNavigation } from "@/components/navigation/app-navigation"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SmartSports RW - Rwanda Sports Ticketing Platform",
  description:
    "Buy tickets for Football, Basketball, Volleyball and Events in Rwanda. Modern digital ticketing with QR codes and mobile money support.",
  generator: "SmartSports RW",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${playfairDisplay.variable} ${sourceSans.variable}`} suppressHydrationWarning>
        <AuthProvider>
          <AppNavigation />
          <main className="pt-16 pb-20 md:pt-16 md:pb-0">
            <Suspense fallback={null}>{children}</Suspense>
          </main>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
