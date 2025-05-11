import { ContactForm } from "@/components/contact-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Ex314.ai",
  description: "Get in touch with the Ex314.ai team. We'd love to hear from you!",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Get in Touch</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Have questions, feedback, or want to learn more about Ex314.ai? We'd love to hear from you!
        </p>

        <ContactForm />

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Other Ways to Connect</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div>
              <h3 className="font-medium mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">support@ex314.ai</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Social Media</h3>
              <p className="text-gray-600 dark:text-gray-400">@ex314ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
