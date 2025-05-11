import type { NextRequest, NextResponse } from "next/server"

/**
 * Adds necessary Content Security Policy headers for Cloudflare Turnstile
 * Updates an existing CSP without overriding other directives
 */
export function addTurnstileCSP(request: NextRequest, response: NextResponse): NextResponse {
  // Get existing CSP header
  const existingCSP = response.headers.get("Content-Security-Policy") || ""
  
  // If no existing CSP, don't modify
  if (!existingCSP) {
    return response
  }
  
  // Parse the existing CSP into individual directives
  const directives = existingCSP.split(';').map((d: string) => d.trim())
  const directiveMap: Record<string, string> = {}
  
  // Extract each directive type and its values
  directives.forEach((directive: string) => {
    const [key, ...values] = directive.split(' ')
    if (key) {
      directiveMap[key] = values.join(' ')
    }
  })
  
  // Add Turnstile domains to relevant directives
  if (directiveMap['script-src'] && !directiveMap['script-src'].includes('challenges.cloudflare.com')) {
    directiveMap['script-src'] += ' https://challenges.cloudflare.com'
  }
  
  if (directiveMap['connect-src'] && !directiveMap['connect-src'].includes('challenges.cloudflare.com')) {
    directiveMap['connect-src'] += ' https://challenges.cloudflare.com https://*.turnstile.com'
  }
  
  if (directiveMap['frame-src'] && !directiveMap['frame-src'].includes('challenges.cloudflare.com')) {
    directiveMap['frame-src'] += ' https://challenges.cloudflare.com'
  }
  
  if (directiveMap['img-src'] && !directiveMap['img-src'].includes('challenges.cloudflare.com')) {
    directiveMap['img-src'] += ' https://challenges.cloudflare.com'
  }
  
  // Reconstruct the CSP with updated directives
  const newCSP = Object.entries(directiveMap)
    .map(([key, value]) => `${key} ${value}`)
    .join('; ')
  
  // Set the updated CSP header
  response.headers.set("Content-Security-Policy", newCSP)
  
  return response
}

/**
 * Checks if a path is a Turnstile-enabled page
 */
export function isTurnstilePage(pathname: string): boolean {
  const turnstilePages = [
    "/login",
    "/login/waitlist",
    "/about/message",
    "/contact",
    "/feedback",
    "/admin/contact-submissions",
  ]

  return turnstilePages.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}
