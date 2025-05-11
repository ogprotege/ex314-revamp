import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server"

// This function handles your Content Security Policy headers
function addSecurityHeaders(request: NextRequest, response: NextResponse) {
  const cspDirectives = [
    "default-src 'self'",
    // Scripts: self, inline for UI components, unsafe-eval (consider reducing if possible), Clerk, Google Tag Manager, Cloudflare Turnstile
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://clerk.ex314.ai https://www.googletagmanager.com https://challenges.cloudflare.com",
    // Styles: self, inline for UI components
    "style-src 'self' 'unsafe-inline'",
    // Connections: self, Clerk, Google Analytics, Cloudflare Turnstile
    "connect-src 'self' https://*.clerk.accounts.dev https://clerk.ex314.ai https://www.google-analytics.com https://challenges.cloudflare.com https://*.turnstile.com",
    // Frames: self, Clerk, Cloudflare Turnstile
    "frame-src 'self' https://*.clerk.accounts.dev https://clerk.ex314.ai https://challenges.cloudflare.com",
    // Images: self, data URIs, blobs, Clerk, Unsplash, Cloudflare Turnstile
    "img-src 'self' data: blob: https://*.clerk.accounts.dev https://clerk.ex314.ai https://images.unsplash.com https://challenges.cloudflare.com",
    "font-src 'self' data:",
    "navigate-to 'self' https: mailto:",
  ]

  response.headers.set("Content-Security-Policy", cspDirectives.join("; "))
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  // Consider adding Strict-Transport-Security if your site is HTTPS only
  // response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  return response
}

// Define routes that require a specific role AFTER authentication
const protectedRoutesWithRoles = [
  { path: "/admin", requiredRole: "admin" },
  // Add more routes that require specific roles, e.g.:
  // { path: "/dashboard/settings", requiredRole: "org:editor" },
]

export default authMiddleware({
  publicRoutes: [
    "/",
    "/login", // Clerk's default sign-in page
    "/sign-in", // Clerk's default sign-in page if customized
    "/sign-up", // Clerk's default sign-up page if customized
    "/prayers",
    "/calendar",
    "/rosary",
    "/about",
    "/resources",
    "/contact",
    "/privacy",
    "/terms",
    "/unauthorized", // Page to redirect if role check fails
    "/api/public-route", // Example of a public API route
  ],

  afterAuth(auth, req) {
    const url = req.nextUrl.clone() // Clone to modify

    // Handle users who are authenticated but may not have the required role
    if (auth.userId) {
      const currentPath = req.nextUrl.pathname
      const matchedProtectedRoute = protectedRoutesWithRoles.find((route) =>
        currentPath === route.path || currentPath.startsWith(`${route.path}/`)
      )

      if (matchedProtectedRoute) {
        // Assuming roles are stored in Clerk's session token metadata
        // Adjust 'auth.sessionClaims?.metadata?.role' if your role storage is different
        const userRole = auth.sessionClaims?.organizationMemberships?.[0]?.role || auth.sessionClaims?.metadata?.role 

        if (userRole !== matchedProtectedRoute.requiredRole) {
          // Redirect to an unauthorized page if the role doesn't match
          url.pathname = "/unauthorized"
          let response = NextResponse.redirect(url)
          response = addSecurityHeaders(req, response)
          return response
        }
      }
    } else {
      // Handle users who are not authenticated
      const isPublic = (this.publicRoutes as string[]).some(publicPath => 
        req.nextUrl.pathname === publicPath || 
        (publicPath.endsWith("/*") && req.nextUrl.pathname.startsWith(publicPath.slice(0, -2)))
      )
      
      if (!isPublic) {
        // If the route is not public and user is not authenticated,
        // Clerk's default behavior is to redirect to sign-in.
        // We can make it explicit or customize the redirect if needed.
        let response = redirectToSignIn({ returnBackUrl: req.url })
        response = addSecurityHeaders(req, response)
        return response
      }
    }

    // For all other cases (public routes, authenticated users with correct roles, etc.)
    // proceed with the request and add security headers.
    let response = NextResponse.next()
    response = addSecurityHeaders(req, response)
    return response
  },
})

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and all file extensions.
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|json|webmanifest|xml|map|txt)).*)",
    // Always run for API routes to protect them by default
    "/api/:path*",
    "/trpc/:path*",
  ],
}
