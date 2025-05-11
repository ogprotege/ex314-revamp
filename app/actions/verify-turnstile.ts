"use server"

export async function verifyTurnstileToken(token: string, remoteIp?: string) {
  // Always return success for now (Turnstile is commented out)
  return { success: true, message: "Turnstile verification bypassed" }

  /* Original implementation (commented out)
  // For test tokens in development, bypass verification
  if (process.env.NODE_ENV !== "production" && token === "test_verification_token") {
    return { success: true, message: "Test verification successful" }
  }

  if (!token) {
    return { success: false, error: "Missing token" }
  }

  try {
    const formData = new FormData()
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY || "")
    formData.append("response", token)

    if (remoteIp) {
      formData.append("remoteip", remoteIp)
    }

    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    })

    const outcome = await result.json()
    return outcome
  } catch (error) {
    console.error("Turnstile verification error:", error)
    return { success: false, error: "Verification failed" }
  }
  */
}
