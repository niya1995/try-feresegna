import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { BookingProvider } from "@/context/booking-context"
import { NotificationProvider } from "@/context/notification-context"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { Toaster } from "@/components/ui/toaster"

// Load Inter font using Next.js font optimization
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "Feresegna Bus - Book Bus Tickets Online in Ethiopia",
  description: "Book bus tickets online across Ethiopia. Choose your seats, compare prices, and travel with comfort.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <NotificationProvider>
              <BookingProvider>
                <LoadingIndicator />
                {children}
              </BookingProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
