import { auth0Config } from "../auth0-config"
import { jwtVerify, createRemoteJWKSet } from "jose"

// Cache for JWKS
let jwksCache: ReturnType<typeof createRemoteJWKSet> | null = null

/**
 * Gets the JWKS (JSON Web Key Set) from Auth0
 */
function getJWKS() {
  if (!jwksCache) {
    const jwksUri = new URL(`https://${auth0Config.domain}/.well-known/jwks.json`)
    jwksCache = createRemoteJWKSet(jwksUri)
  }
  return jwksCache
}

/**
 * Extracts the JWT token from the Auth0 session cookie
 * @param sessionCookie The session cookie from Auth0
 * @returns The extracted JWT token
 */
async function extractJwtFromCookie(sessionCookie: string): Promise<string | null> {
  try {
    // Auth0's session cookie is typically a JWT token
    // In some configurations, it might be encrypted or have a specific format
    // This is a simplified implementation - adjust based on your Auth0 configuration

    // For standard Auth0 configuration, the cookie is the JWT token
    return sessionCookie

    // If your Auth0 cookie is encrypted or has a different format,
    // you'll need to implement the appropriate decryption/extraction logic here
  } catch (error) {
    console.error("Error extracting JWT from cookie:", error)
    return null
  }
}

/**
 * Verifies an Auth0 session cookie
 * @param sessionCookie The session cookie to verify
 * @returns boolean indicating if the session is valid
 */
export async function verifyAuth0Session(sessionCookie: string): Promise<boolean> {
  try {
    // Extract the JWT token from the cookie
    const token = await extractJwtFromCookie(sessionCookie)
    if (!token) {
      return false
    }

    // Get the JWKS for verifying the token
    const jwks = getJWKS()

    // Verify the token
    const { payload } = await jwtVerify(token, jwks, {
      issuer: `https://${auth0Config.domain}/`,
      audience: auth0Config.clientId,
    })

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    if (!payload.exp || payload.exp < currentTime) {
      console.log("Token expired")
      return false
    }

    // Additional checks can be added here
    // For example, checking specific claims or permissions

    return true
  } catch (error) {
    console.error("Error verifying session:", error)
    return false
  }
}

/**
 * Gets the user information from the Auth0 session
 * @param sessionCookie The session cookie
 * @returns The user information from the JWT payload
 */
export async function getUserFromSession(sessionCookie: string): Promise<any | null> {
  try {
    const token = await extractJwtFromCookie(sessionCookie)
    if (!token) {
      return null
    }

    const jwks = getJWKS()
    const { payload } = await jwtVerify(token, jwks, {
      issuer: `https://${auth0Config.domain}/`,
      audience: auth0Config.clientId,
    })

    return payload
  } catch (error) {
    console.error("Error getting user from session:", error)
    return null
  }
}

/**
 * Verifies if a user has a specific role
 * @param sessionCookie The session cookie
 * @param requiredRole The role to check for
 * @returns boolean indicating if the user has the required role
 */
export async function verifyUserRole(sessionCookie: string, requiredRole: string): Promise<boolean> {
  try {
    const user = await getUserFromSession(sessionCookie)
    if (!user) {
      return false
    }

    // Check for roles in the Auth0 token
    // The location of roles depends on your Auth0 configuration
    // Common locations include:
    // - user[`${auth0Config.namespace}/roles`]
    // - user.roles
    // - user[`https://${auth0Config.domain}/roles`]

    const namespace = auth0Config.namespace || `https://${auth0Config.domain}`
    const roles = user[`${namespace}/roles`] || user.roles || []

    return Array.isArray(roles) && roles.includes(requiredRole)
  } catch (error) {
    console.error("Error verifying user role:", error)
    return false
  }
}
