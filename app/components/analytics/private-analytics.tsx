"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function PrivateAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialized = useRef(false)
  const sessionId = useRef<string>("")
  const lastPageViewId = useRef<string | null>(null)
  const pageEnterTime = useRef<number>(0)

  // Initialize analytics
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Generate or retrieve session ID
    let existingSessionId = localStorage.getItem("ex314_session_id")
    const sessionExpiry = localStorage.getItem("ex314_session_expiry")
    const hasVisitedBefore = localStorage.getItem("ex314_has_visited")

    // Check if session is expired (30 min idle)
    if (sessionExpiry && Number.parseInt(sessionExpiry) < Date.now()) {
      existingSessionId = null
    }

    if (!existingSessionId) {
      // Create new session ID
      existingSessionId = crypto.randomUUID()
      localStorage.setItem("ex314_session_id", existingSessionId)
    }

    sessionId.current = existingSessionId

    // Update session expiry (30 min from now)
    localStorage.setItem("ex314_session_expiry", (Date.now() + 30 * 60 * 1000).toString())

    // Mark as returning visitor if they've been here before
    if (!hasVisitedBefore) {
      localStorage.setItem("ex314_has_visited", "true")
    }

    // Initialize session
    initSession(!!hasVisitedBefore)

    // Track when user leaves the site
    window.addEventListener("beforeunload", handlePageExit)

    return () => {
      window.removeEventListener("beforeunload", handlePageExit)
    }
  }, [])

  // Track page views
  useEffect(() => {
    // Don't track initial page load - that's handled in initSession
    if (!initialized.current || !sessionId.current) return

    // If there was a previous page view, record time spent on that page
    if (lastPageViewId.current && pageEnterTime.current > 0) {
      const timeOnPage = Math.round((performance.now() - pageEnterTime.current) / 1000)

      // Update previous page view with time spent
      fetch("/api/analytics/beacon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: "page_views",
          payload: {
            id: lastPageViewId.current,
            time_on_page: timeOnPage,
            exit_page: false,
          },
        }),
      }).catch((error) => {
        console.error("Failed to update page time:", error)
      })
    }

    // Track new page view
    trackPageView()

    // Reset page enter time
    pageEnterTime.current = performance.now()

    // Update session expiry
    localStorage.setItem("ex314_session_expiry", (Date.now() + 30 * 60 * 1000).toString())
  }, [pathname, searchParams])

  // Initialize session
  const initSession = async (isReturning: boolean) => {
    try {
      // Get visitor IP and location info
      let visitorInfo = {
        ip: "127.0.0.1",
        country: "Unknown",
        region: "Unknown",
        city: "Unknown",
      }

      try {
        const ipResponse = await fetch("/api/analytics/visitor-info")
        if (ipResponse.ok) {
          visitorInfo = await ipResponse.json()
        }
      } catch (error) {
        console.warn("Error fetching visitor info:", error)
      }

      // Create new session record using the beacon API
      const sessionResponse = await fetch("/api/analytics/beacon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: "sessions",
          payload: {
            session_id: sessionId.current,
            first_visit_time: new Date().toISOString(),
            last_activity_time: new Date().toISOString(),
            ip_address: visitorInfo.ip,
            entry_page: pathname || "/",
            is_returning: isReturning,
          },
        }),
      })

      if (!sessionResponse.ok) {
        const errorData = await sessionResponse.json()
        console.warn("Session creation notice:", errorData)
      }

      // Track initial page view
      await trackPageView()
      pageEnterTime.current = performance.now()
    } catch (error) {
      console.error("Failed to initialize analytics session:", error)
    }
  }

  // Track page view
  const trackPageView = async () => {
    try {
      // Create query params object
      const queryParamsObj = {}
      if (searchParams) {
        searchParams.forEach((value, key) => {
          queryParamsObj[key] = value
        })
      }

      // Use the beacon API
      const response = await fetch("/api/analytics/beacon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: "page_views",
          payload: {
            session_id: sessionId.current,
            page_path: pathname || "/",
            page_title: document.title,
            timestamp: new Date().toISOString(),
            referrer_page: document.referrer,
            query_params: Object.keys(queryParamsObj).length > 0 ? queryParamsObj : null,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.warn("Page view tracking notice:", result)
      } else {
        // Store the ID for later updating
        if (result.id) {
          lastPageViewId.current = result.id
        }
        console.debug("Successfully tracked page view")
      }
    } catch (error) {
      console.error("Failed to track page view:", error)
    }
  }

  // Handle page exit
  const handlePageExit = () => {
    // Update time on page
    if (lastPageViewId.current && pageEnterTime.current > 0) {
      const timeOnPage = Math.round((performance.now() - pageEnterTime.current) / 1000)

      // Use navigator.sendBeacon which is more reliable for beforeunload
      navigator.sendBeacon(
        `/api/analytics/beacon`,
        JSON.stringify({
          table: "page_views",
          payload: {
            id: lastPageViewId.current,
            time_on_page: timeOnPage,
            exit_page: true,
          },
        }),
      )
    }
  }

  return null // This component doesn't render anything
}
