import { type NextRequest, NextResponse } from "next/server"
// import { addTurnstileCSP, isTurnstilePage } from "@/lib/middleware/turnstile-csp"

// NOTE: This middleware is now deprecated. 
// Turnstile CSP headers are now included in the main middleware.ts
// for all pages to avoid duplication and conflicts.

export function middleware(request: NextRequest) {
  // Return the response unmodified - CSP is handled in main middleware
  return NextResponse.next()
}

export const config = {
  matcher: [
    // No longer matching any routes
    // "/not-used/:path*",
  ],
}
