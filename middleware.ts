import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl

  // Create a response object to modify
  const response = NextResponse.next()

  // Base CSP directives
  const cspDirectives = [
    // Default rules - restrict to same origin by default
    "default-src 'self'",

    // Scripts - allow your site and Turnstile
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com",

    // Styles - only from your site and inline styles (needed for shadcn/ui and other libraries)
    "style-src 'self' 'unsafe-inline'",

    // Connections - your site and Turnstile verification
    "connect-src 'self' https://challenges.cloudflare.com https://*.turnstile.com https://www.google-analytics.com",

    // Frames - your site and Turnstile widget
    "frame-src 'self' https://challenges.cloudflare.com",

    // Images - your site, data URLs, and Turnstile
    "img-src 'self' data: blob: https://challenges.cloudflare.com https://images.unsplash.com",

    // Fonts - your site and inline data
    "font-src 'self' data:",

    // Navigation
    "navigate-to 'self' https: mailto:",
  ]

  // Set the CSP header (now includes Turnstile domains for all pages)
  response.headers.set("Content-Security-Policy", cspDirectives.join("; "))

  return response
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    // Apply to all routes
    "/(.*)",
  ],
}
