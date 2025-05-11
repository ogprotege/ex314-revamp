import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuth0Session } from "./lib/auth/verify-session"
import { verifyUserRole } from "./lib/auth/verify-role"
import { isTurnstilePage } from "./lib/middleware/turnstile-csp"

// Define protected routes and their required permissions
const protectedRoutes = [
  { path: "/chat", requiredRole: null }, // Requires authentication but no specific role
  { path: "/admin", requiredRole: "admin" }, // Requires admin role
  { path: "/profile", requiredRole: null }, // Requires authentication but no specific role
  // Add more protected routes as needed
]

export async function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl

  // Create a response object to modify
  const response = NextResponse.next()

  // Set a secure, but functional CSP that allows Auth0 and Turnstile
  const auth0Domain = "dev-ex314.us.auth0.com" // From your auth0-config.ts
  
  // Base CSP directives
  const cspDirectives = [
    // Default rules - restrict to same origin by default
    "default-src 'self'",
    
    // Scripts - allow your site, Auth0, and always include Turnstile
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.auth0.com https://challenges.cloudflare.com",
    
    // Styles - only from your site and inline styles (needed for shadcn/ui and other libraries)
    "style-src 'self' 'unsafe-inline'",
    
    // Connections - your site, Auth0 domains, and always include Turnstile verification
    "connect-src 'self' https://*.auth0.com https://challenges.cloudflare.com https://*.turnstile.com",
    
    // Frames - your site, Auth0 login widget, and always include Turnstile widget
    "frame-src 'self' https://*.auth0.com https://challenges.cloudflare.com",
    
    // Images - your site, data URLs, Auth0, and always include Turnstile
    "img-src 'self' data: blob: https://*.auth0.com https://challenges.cloudflare.com https://images.unsplash.com",
    
    // Fonts - your site and inline data
    "font-src 'self' data:",
    
    // Navigation
    "navigate-to 'self' https: mailto:"
  ]
  
  // Set the CSP header (now includes Turnstile domains for all pages)
  response.headers.set("Content-Security-Policy", cspDirectives.join("; "))

  // Check if the current path is a protected route
  const matchedRoute = protectedRoutes.find((route) => pathname === route.path || pathname.startsWith(`${route.path}/`))

  // If not a protected route, continue
  if (!matchedRoute) {
    return response
  }

  // Get the Auth0 session cookie
  const sessionCookie = request.cookies.get("appSession")?.value

  // If no session cookie, redirect to login
  if (!sessionCookie) {
    const returnTo = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)
    return NextResponse.redirect(new URL(`/login?returnTo=${returnTo}`, request.url))
  }

  // Verify the Auth0 session
  const isAuthenticated = await verifyAuth0Session(sessionCookie)

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    // Clear the invalid cookie by setting a header
    const response = NextResponse.redirect(
      new URL(`/login?returnTo=${encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)}`, request.url),
    )
    response.cookies.delete("appSession")
    return response
  }

  // If role is required, check user's role
  if (matchedRoute.requiredRole) {
    const hasRequiredRole = await verifyUserRole(sessionCookie, matchedRoute.requiredRole)
    if (!hasRequiredRole) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return response
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    // Apply to all routes
    "/(.*)",
  ],
}
