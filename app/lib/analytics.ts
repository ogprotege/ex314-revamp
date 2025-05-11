import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Get session ID from localStorage
function getSessionId(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("ex314_session_id")
}

// Track feature usage
export function trackFeatureUsage(featureName: string, details: any = {}) {
  const sessionId = getSessionId()
  if (!sessionId) return

  supabase
    .from("analytics.feature_usage")
    .insert({
      session_id: sessionId,
      feature_name: featureName,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
      details,
    })
    .catch((error) => {
      console.error("Failed to track feature usage:", error)
    })
}

// Track search queries
export function trackSearch(query: string, resultsCount: number, filters: any = {}) {
  const sessionId = getSessionId()
  if (!sessionId) return

  supabase
    .from("analytics.searches")
    .insert({
      session_id: sessionId,
      query,
      results_count: resultsCount,
      timestamp: new Date().toISOString(),
      filters: Object.keys(filters).length > 0 ? filters : null,
    })
    .catch((error) => {
      console.error("Failed to track search:", error)
    })
}

// Track content views (resources, prayers, etc.)
export function trackContentView(contentType: string, contentId: string, contentTitle: string) {
  const sessionId = getSessionId()
  if (!sessionId) return

  const startTime = Date.now()

  // Create a record of the content view
  supabase
    .from("analytics.content_views")
    .insert({
      session_id: sessionId,
      content_type: contentType,
      content_id: contentId,
      content_title: contentTitle,
      timestamp: new Date().toISOString(),
    })
    .then(({ data }) => {
      if (!data || !data[0]) return

      const recordId = data[0].id

      // Set up a visibility change listener to track time spent
      const visibilityChangeHandler = () => {
        if (document.visibilityState === "hidden") {
          const timeSpent = Math.round((Date.now() - startTime) / 1000)

          // Update the record with time spent
          supabase
            .from("analytics.content_views")
            .update({ time_spent_seconds: timeSpent })
            .eq("id", recordId)
            .catch((error) => {
              console.error("Failed to update content view time:", error)
            })

          // Remove the listener
          document.removeEventListener("visibilitychange", visibilityChangeHandler)
        }
      }

      // Add the visibility change listener
      document.addEventListener("visibilitychange", visibilityChangeHandler)

      // Also update when the user navigates away
      window.addEventListener(
        "beforeunload",
        () => {
          const timeSpent = Math.round((Date.now() - startTime) / 1000)

          // Use sendBeacon for more reliable tracking on page exit
          navigator.sendBeacon(
            `/api/analytics/beacon`,
            JSON.stringify({
              table: "content_views",
              payload: {
                id: recordId,
                time_spent_seconds: timeSpent,
              },
            }),
          )
        },
        { once: true },
      )
    })
    .catch((error) => {
      console.error("Failed to track content view:", error)
    })
}

// Track conversion events
export function trackConversion(conversionType: string, details: any = {}) {
  const sessionId = getSessionId()
  if (!sessionId) return

  // Track the conversion event
  supabase
    .from("analytics.events")
    .insert({
      session_id: sessionId,
      event_type: "conversion",
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
      additional_data: {
        conversion_type: conversionType,
        ...details,
      },
    })
    .catch((error) => {
      console.error("Failed to track conversion:", error)
    })

  // Update the user journey with conversion info
  supabase
    .from("analytics.user_journeys")
    .update({
      conversion_achieved: true,
      conversion_type: conversionType,
    })
    .eq("session_id", sessionId)
    .is("conversion_achieved", null)
    .catch((error) => {
      console.error("Failed to update journey with conversion:", error)
    })
}
