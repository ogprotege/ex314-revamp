"use server"

import { headers } from "next/headers"
import { verifyTurnstileToken } from "./verify-turnstile"
import { saveContactSubmission, type ContactFormData } from "@/lib/services/contactService"
import { trackEvent } from "@/lib/analytics"

export async function submitContactForm(data: ContactFormData) {
  // Validate form data
  if (!data.name || !data.email || !data.subject || !data.message || !data.turnstileToken) {
    return { success: false, error: "All fields are required" }
  }

  try {
    // Verify Turnstile token
    const verification = await verifyTurnstileToken(data.turnstileToken)

    // Get IP address and user agent for analytics and spam detection
    const headersList = headers()
    const ipAddress = headersList.get("x-forwarded-for") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"

    // Save to database with verification result
    const result = await saveContactSubmission(
      {
        ...data,
        turnstileVerified: verification.success,
      },
      ipAddress,
      userAgent,
    )

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to save your message. Please try again.",
      }
    }

    // Track the event in analytics
    try {
      await trackEvent({
        event: "contact_form_submission",
        properties: {
          subject_category: data.subject,
          turnstile_verified: verification.success,
          timestamp: new Date().toISOString(),
        },
      })
    } catch (analyticsError) {
      console.error("Error tracking contact form event:", analyticsError)
      // Don't fail the submission if analytics fails
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      error: "There was an error processing your request. Please try again later.",
    }
  }
}
