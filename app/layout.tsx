kimport type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PrivateAnalytics } from "@/components/analytics/private-analytics"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LiturgicalThemeProvider } from "@/components/liturgical-theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { FallbackAuthProvider } from "@/context/FallbackAuthContext"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ex314.ai - Catholic Theological AI Assistant",
  description: "A Catholic theological AI assistant providing resources, prayers, and guidance.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8LELT55Q5D" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8LELT55Q5D');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="ex314-theme">
          <LiturgicalThemeProvider>
            <FallbackAuthProvider>
              <Suspense fallback={<div>Loading...</div>}>
                {children}
                <PrivateAnalytics />
                <Toaster />
              </Suspense>
            </FallbackAuthProvider>
          </LiturgicalThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

