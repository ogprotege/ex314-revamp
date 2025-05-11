export function trackEvent(eventData: any) {
  if (typeof window === "undefined") return

  // Use navigator.sendBeacon for more reliable tracking
  navigator.sendBeacon(`/api/analytics/chat`, JSON.stringify(eventData))
}
