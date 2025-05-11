"use client"

import type React from "react"

import { useState } from "react"
import { AuthContainer, AuthCard, AuthLabel } from "@/components/auth/auth-styles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChiRho } from "@/components/chi-rho"
import Link from "next/link"
// import { Turnstile } from "@/components/turnstile"
// import { verifyTurnstileToken } from "../../actions/verify-turnstile"

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    diocese: "",
    hometown: "",
    zipCode: "",
    phoneNumber: "",
    socialUsername: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  // const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    /* Comment out Turnstile verification
    if (!turnstileToken) {
      setError("Please complete the security check")
      return
    }
    */

    setIsSubmitting(true)
    setError(null)

    try {
      /* Comment out Turnstile verification
      // Verify the token server-side
      const verification = await verifyTurnstileToken(turnstileToken)

      if (!verification.success) {
        setError("Security check failed. Please try again.")
        setIsSubmitting(false)
        return
      }
      */

      // In a real app, this would be an API call to submit the waitlist request
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting waitlist request:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <AuthContainer>
        <AuthCard>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <ChiRho className="h-12 w-12" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
            <p className="mb-6">
              Your request to join the Ex314.ai waitlist has been submitted. We'll contact you when access becomes
              available.
            </p>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </AuthCard>
      </AuthContainer>
    )
  }

  return (
    <AuthContainer>
      <AuthCard className="max-w-lg">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <ChiRho className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">Join the Ex314.ai Waitlist</h1>
          <p className="mt-2 text-gray-600">
            Complete this form to request access to our Catholic theological AI assistant.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{error}</div>}

          <div>
            <AuthLabel htmlFor="name">Full Name</AuthLabel>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div>
            <AuthLabel htmlFor="email">Email Address</AuthLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

          <div>
            <AuthLabel htmlFor="dob">Date of Birth</AuthLabel>
            <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
          </div>

          <div>
            <AuthLabel htmlFor="diocese">Diocese</AuthLabel>
            <Input
              id="diocese"
              name="diocese"
              value={formData.diocese}
              onChange={handleChange}
              placeholder="Diocese of Example"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <AuthLabel htmlFor="hometown">Hometown</AuthLabel>
              <Input
                id="hometown"
                name="hometown"
                value={formData.hometown}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>
            <div>
              <AuthLabel htmlFor="zipCode">ZIP Code</AuthLabel>
              <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="12345" />
            </div>
          </div>

          <div>
            <AuthLabel htmlFor="phoneNumber">Phone Number</AuthLabel>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>

          <div>
            <AuthLabel htmlFor="socialUsername">Social Media Username</AuthLabel>
            <Input
              id="socialUsername"
              name="socialUsername"
              value={formData.socialUsername}
              onChange={handleChange}
              placeholder="@username"
            />
          </div>

          {/* Comment out Turnstile widget
          <div className="flex justify-center my-4">
            <Turnstile
              siteKey="0x4AAAAAABahRcWSi38KeEDV"
              onVerify={(token) => {
                setTurnstileToken(token)
                setError(null)
              }}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setError("Security check failed. Please try again.")}
            />
          </div>
          */}

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting /* || !turnstileToken */}>
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>
          </div>

          <div className="text-center text-sm mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">Already have an account?</p>
            <Link href="/login" className="text-purple-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthContainer>
  )
}
