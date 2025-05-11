import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PrivateAnalytics } from "@/components/analytics/private-analytics"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LiturgicalThemeProvider } from "@/components/liturgical-theme-provider"
import { Toaster } from "@/components/ui/toaster"
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W8C4F87P');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8C4F87P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ThemeProvider defaultTheme="light" storageKey="ex314-theme">
          <LiturgicalThemeProvider>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
              <PrivateAnalytics />
              <Toaster />
            </Suspense>
          </LiturgicalThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
