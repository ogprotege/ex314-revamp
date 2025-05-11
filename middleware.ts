import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { authMiddleware } from "@clerk/nextjs/server"

// This function handles your existing CSP headers
function addSecurityHeaders(request: NextRequest, response: NextResponse) {
  // Base CSP directives
  const cspDirectives = [
    // Default rules - restrict to same origin by default
    "default-src 'self'",

    // Scripts - allow your site and Turnstile
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com",

    // Styles - only from your site and inline styles (needed for shadcn/ui and other libraries)
    "style-src 'self' 'unsafe-inline'",

    // Connections - your site and Turnstile verification
    "connect-src 'self' https://challenges.cloudflare.com https://*.turnstile.com https://www.google-analytics.com https://*.clerk.accounts.dev https://clerk.ex314.ai",

    // Frames - your site and Turnstile widget
    "frame-src 'self' https://challenges.cloudflare.com https://*.clerk.accounts.dev https://clerk.ex314.ai",

    // Images - your site, data URLs, and Turnstile
    "img-src 'self' data: blob: https://challenges.cloudflare.com https://images.unsplash.com https://*.clerk.accounts.dev https://clerk.ex314.ai",

    // Fonts - your site and inline data
    "font-src 'self' data:",

    // Navigation
    "navigate-to 'self' https: mailto:",
  ]

  // Set the CSP header (now includes Turnstile domains for all pages)
  response.headers.set("Content-Security-Policy", cspDirectives.join("; "))

  return response
}

// Combine Clerk auth middleware with your security headers
export default authMiddleware({
  // Your Clerk configuration options here
  publicRoutes: ["/", "/prayers", "/calendar", "/rosary", "/about", "/resources", "/contact", "/privacy", "/terms"],

  // This function runs after Clerk's auth checks
  afterAuth(auth, req, evt) {
    // Get the response from Clerk's middleware
    const response = NextResponse.next()

    // Add your security headers
    return addSecurityHeaders(req, response)
  },
})

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/(?:(?!_next|[^?]*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(?:api|trpc)(?:.*)",
  ],
}

