"use client"

import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
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

      {/* About Hero */}
      <section className="bg-amber-50 py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Ex314.ai</h1>
          <p className="text-lg text-gray-600">
            Learn about our mission to provide faithful Catholic theological resources through AI technology.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                Ex314.ai was created to provide faithful Catholic theological resources and guidance through modern AI
                technology. Our mission is to make the rich tradition and teachings of the Catholic Church more
                accessible to everyone, while ensuring that all content remains faithful to the Magisterium.
              </p>

              <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
              <p className="text-gray-600 mb-6">
                Our platform is designed to help users explore Catholic theology, access prayers and devotions, and
                navigate the liturgical calendar. We provide resources from trusted Catholic sources, including Church
                documents, the Catechism, writings of the saints, and more.
              </p>

              <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
              <p className="text-gray-600 mb-6">
                We believe that technology can be a powerful tool for evangelization and catechesis when used properly.
                Our platform is built on authentic Catholic teachings and is designed to provide accurate
                information while respecting the complexity and depth of Catholic theology.
              </p>

              <h2 className="text-2xl font-bold mb-4">Limitations</h2>
              <p className="text-gray-600 mb-6">
                While our platform strives to provide accurate information, it is not a substitute for the guidance
                of priests, spiritual directors, or official Church teaching. For matters of personal spiritual
                direction, moral guidance, or official Church positions, we encourage users to consult with their local
                clergy or refer to official Church documents.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-2">Our Name</h3>
                <p className="text-gray-600">
                  The name "Ex314.ai" is inspired from Exodus 3:14, where God reveals His name to Moses as "I AM WHO I
                  AM." This biblical reference reminds us that all our efforts to understand and explain theology are
                  ultimately directed toward knowing God, who is the source of all truth.
                </p>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                  <p className="text-gray-600 mb-4">
                    Have questions, suggestions, or feedback? We'd love to hear from you.
                  </p>
                  <Link href="/contact" passHref>
                    <Button className="w-full">Send Message</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Support Our Mission</h3>
                  <p className="text-gray-600 mb-4">
                    Help us continue to provide faithful Catholic resources through your support.
                  </p>
                  <Link href="/donate" passHref>
                    <Button variant="outline" className="w-full">
                      Support Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Ecclesiastical Approval</h3>
                <p className="text-gray-600 mb-4">
                  While we strive to remain faithful to Catholic teaching, Ex314.ai is not an official ministry of the
                  Catholic Church and has not sought ecclesiastical approval.
                </p>
              </div>
            </div>
          </div>
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
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">© 2025 Ex314.ai. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}
