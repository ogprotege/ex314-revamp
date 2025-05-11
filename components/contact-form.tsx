"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { Turnstile } from "@/components/turnstile"
import { submitContactForm } from "@/app/actions/contact-form"
import { ChiRho } from "@/components/chi-rho"
import { useToast } from "@/components/ui/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    /* Comment out Turnstile verification
    if (!turnstileToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the security verification before submitting.",
        variant: "destructive",
      })
      return
    }
    */

    try {
      setIsSubmitting(true)
      const result = await submitContactForm({
        ...formData,
        // turnstileToken,
        turnstileToken: "bypass_token", // Temporary bypass
      })

      if (result.success) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message. We'll get back to you soon.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        // setTurnstileToken(null)
      } else {
        toast({
          title: "Error",
          description: result.error || "There was an error sending your message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <ChiRho className="h-10 w-10 mr-2" />
        <h2 className="text-2xl font-bold">Contact Us</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="What is your message about?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message..."
            rows={5}
          />
        </div>

        {/* Comment out Turnstile widget
        <div className="flex justify-center">
          <Turnstile
            siteKey="0x4AAAAAABahRcWSi38KeEDV"
            onVerify={setTurnstileToken}
            onExpire={() => setTurnstileToken(null)}
            theme="auto"
          />
        </div>
        */}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting /* || !turnstileToken */}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  )
}
