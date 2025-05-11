"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChiRho } from "@/components/chi-rho"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    diocese: "",
    hometown: "",
    zipCode: "",
    socialUsernames: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to submit the waitlist form
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ChiRho className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Ex314.ai</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/resources" className="text-sm font-medium hover:underline">
            Resources
          </Link>
          <Link href="/calendar" className="text-sm font-medium hover:underline">
            Liturgical Calendar
          </Link>
          <Link href="/prayers" className="text-sm font-medium hover:underline">
            Prayers
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
        </div>
      </header>

      {/* Waitlist Content */}
      <section className="py-12 px-4 md:px-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Thank You!</CardTitle>
                <CardDescription className="text-center">
                  Your request to join the waitlist has been submitted successfully.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6">
                  We'll review your application and get back to you soon. You'll be redirected to the homepage in a few
                  seconds.
                </p>
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
                <CardDescription>Fill out this form to request access to the Ex314.ai chat interface.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diocese">Diocese *</Label>
                      <Input id="diocese" name="diocese" value={formData.diocese} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hometown">Hometown *</Label>
                      <Input id="hometown" name="hometown" value={formData.hometown} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socialUsernames">Social Media Usernames</Label>
                      <Input
                        id="socialUsernames"
                        name="socialUsernames"
                        placeholder="@username (Twitter, Instagram, etc.)"
                        value={formData.socialUsernames}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Why do you want to use Ex314.ai? *</Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      rows={4}
                      value={formData.reason}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ChiRho className="h-6 w-6" />
            <span className="font-semibold">Ex314.ai</span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com/ex314ai" className="text-sm text-gray-600 hover:text-gray-900">
                Facebook
              </Link>
              <Link href="https://instagram.com/ex314ai" className="text-sm text-gray-600 hover:text-gray-900">
                Instagram
              </Link>
            </div>
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
            <div className="flex items-center gap-4">
              <Link href="https://twitter.com/ex314ai" className="text-sm text-gray-600 hover:text-gray-900">
                X
              </Link>
              <Link href="https://github.com/ex314ai" className="text-sm text-gray-600 hover:text-gray-900">
                GitHub
              </Link>
            </div>
            <Link href="mailto:support@ex314.ai" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">© 2025 Ex314.ai. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}
