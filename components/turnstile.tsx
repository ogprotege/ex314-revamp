"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          theme?: "light" | "dark" | "auto"
          callback?: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
          size?: "normal" | "compact" | "flexible"
        },
      ) => string
      reset: (widgetId: string) => void
      getResponse: (widgetId: string) => string
      remove: (widgetId: string) => void
    }
    onloadTurnstileCallback: () => void
  }
}

export interface TurnstileProps {
  siteKey?: string
  onVerify: (token: string) => void
  theme?: "light" | "dark" | "auto"
  size?: "normal" | "compact" | "flexible"
  className?: string
  onError?: () => void
  onExpire?: () => void
  testMode?: boolean
}

export function Turnstile({
  siteKey,
  onVerify,
  theme = "auto",
  size = "normal",
  className = "",
  onError,
  onExpire,
  testMode,
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [widgetId, setWidgetId] = useState<string | null>(null)
  const [useFallback, setUseFallback] = useState(false)

  // Determine if we should use test mode
  const isTestEnvironment = process.env.NODE_ENV !== "production"
  const shouldUseTestMode = testMode !== undefined ? testMode : isTestEnvironment
  const [isTestMode, setIsTestMode] = useState(shouldUseTestMode || useFallback)

  // Get the site key from props or environment variables
  const turnstileSiteKey = siteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""

  useEffect(() => {
    setIsTestMode(shouldUseTestMode || useFallback)
  }, [shouldUseTestMode, useFallback])

  // If in test mode, provide a fallback
  if (isTestMode) {
    return (
      <div className={`p-4 border rounded ${className}`}>
        <p className="text-sm text-gray-600 mb-2">Security check (development mode)</p>
        <button
          onClick={() => onVerify("test_verification_token")}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Verify (Test Mode)
        </button>
      </div>
    )
  }

  useEffect(() => {
    const currentWidgetId: string | null = null

    if (!turnstileSiteKey) {
      console.error("Turnstile site key is missing. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY environment variable.")
      setUseFallback(true)
      return () => {} // Return an empty cleanup function
    }

    // Skip if script is already loaded
    if (document.querySelector('script[src*="turnstile/v0/api.js"]')) {
      if (window.turnstile && containerRef.current && !widgetId) {
        renderWidget()
      }
      return () => {} // Return an empty cleanup function
    }

    // Define the callback function that will be called when the script loads
    window.onloadTurnstileCallback = () => {
      if (containerRef.current && !widgetId) {
        renderWidget()
      }
    }

    // Create and append the script
    const script = document.createElement("script")
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
    // Important: Do NOT use async or defer when using onload callback
    document.head.appendChild(script)

    return () => {
      // Clean up widget when component unmounts
      if (currentWidgetId) {
        window.turnstile?.remove(currentWidgetId)
      }
    }
  }, [turnstileSiteKey, theme, size, onVerify, onExpire, onError, widgetId])

  // Function to render the widget
  const renderWidget = () => {
    if (!containerRef.current || !window.turnstile || !turnstileSiteKey) return

    try {
      const id = window.turnstile.render(containerRef.current, {
        sitekey: turnstileSiteKey,
        theme,
        size,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": () => {
          if (onError) onError()
          setUseFallback(true)
        },
      })
      setWidgetId(id)
    } catch (error) {
      console.error("Error rendering Turnstile:", error)
      setUseFallback(true)
    }
  }

  return <div ref={containerRef} className={className} />
}
