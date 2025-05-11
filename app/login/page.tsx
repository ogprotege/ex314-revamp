"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthContainer, AuthCard } from "@/components/auth/auth-styles"
import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
// import { Turnstile } from "@/components/turnstile"
// import { verifyTurnstileToken } from "../actions/verify-turnstile"
import { useAuth0 } from "@auth0/auth0-react"
import { Auth0ProviderWithNavigation } from "@/components/auth/auth0-provider"
import { FallbackLogin } from "@/components/auth/fallback-login"

function LoginContent() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo")
  // const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [auth0Failed, setAuth0Failed] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Redirect to the returnTo path if available, otherwise to /chat
      router.push(returnTo ? decodeURIComponent(returnTo) : "/chat")
    }
  }, [isAuthenticated, isLoading, router, returnTo])

  // Check if Auth0 is blocked
  useEffect(() => {
    const checkAuth0 = async () => {
      try {
        // Try to load Auth0 domain to check if it's blocked
        const timeout = setTimeout(() => {
          setAuth0Failed(true)
        }, 5000) // 5 second timeout

        const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "auth0.com"}/favicon.ico`, {
          mode: "no-cors",
          cache: "no-cache",
        })

        clearTimeout(timeout)

        // If we get here, Auth0 is not blocked
        setAuth0Failed(false)
      } catch (error) {
        console.error("Auth0 check failed:", error)
        setAuth0Failed(true)
      }
    }

    checkAuth0()

    // Also check for URL parameter to force fallback
    if (searchParams.get("fallback") === "true") {
      setShowFallback(true)
    }
  }, [searchParams])

  const handleLogin = async () => {
    /* Comment out Turnstile verification
    if (!turnstileToken) {
      setError("Please complete the security check")
      return
    }

    // Verify the token server-side
    const verification = await verifyTurnstileToken(turnstileToken)

    if (!verification.success) {
      setError("Security check failed. Please try again.")
      return
    }
    */

    try {
      // Pass the returnTo value to the login function
      loginWithRedirect({
        appState: {
          returnTo: returnTo ? decodeURIComponent(returnTo) : "/chat",
        },
      })
    } catch (error) {
      console.error("Auth0 login failed:", error)
      setAuth0Failed(true)
      setError("Authentication service unavailable. Please use the fallback login option.")
    }
  }

  const toggleFallback = () => {
    setShowFallback(!showFallback)
  }

  if (showFallback) {
    return (
      <AuthContainer>
        <AuthCard>
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <ChiRho className="h-12 w-12" />
            </div>
            <h1 className="text-2xl font-bold">Welcome to Ex314.ai</h1>
            <p className="mt-2 text-gray-600">Fallback Login</p>
          </div>

          <FallbackLogin returnTo={returnTo ? decodeURIComponent(returnTo) : "/chat"} />

          <div className="mt-4 text-center">
            <button onClick={toggleFallback} className="text-sm text-purple-600 hover:underline">
              Try standard login
            </button>
          </div>
        </AuthCard>
      </AuthContainer>
    )
  }

  return (
    <AuthContainer>
      <AuthCard>
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <ChiRho className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to Ex314.ai</h1>
          <p className="mt-2 text-gray-600">Please log in to access the chat interface</p>
        </div>

        <div className="space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{error}</div>}

          {auth0Failed && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md text-sm">
              Authentication service may be unavailable.
              <button onClick={toggleFallback} className="ml-2 underline font-medium">
                Use fallback login
              </button>
            </div>
          )}

          {/* Comment out Turnstile widget
          <div className="flex justify-center mb-4">
            <Turnstile
              onVerify={(token) => {
                setTurnstileToken(token)
                setError(null)
              }}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setError("Security check failed. Please try again.")}
            />
          </div>
          */}

          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            // disabled={!turnstileToken} // Remove Turnstile dependency
          >
            Log In
          </button>

          <div className="text-center text-sm mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">Don't have an account?</p>
            <Link href="/login/waitlist" className="text-purple-600 hover:underline font-medium">
              Join the waitlist
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthContainer>
  )
}

export default function LoginPage() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return <div>Loading...</div>
  }

  return (
    <Auth0ProviderWithNavigation>
      <LoginContent />
    </Auth0ProviderWithNavigation>
  )
}
