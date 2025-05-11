"use client"

import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SaintOfDay } from "@/components/saint-of-day"
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="site-header w-full py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChiRho className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Ex314.ai</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/resources" className="nav-link">
            Resources
          </Link>
          <Link href="/calendar" className="nav-link">
            Liturgical Calendar
          </Link>
          <Link href="/prayers" className="nav-link">
            Prayers
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 md:py-24">
        <div className="max-w-3xl mx-auto">
          <ChiRho className="h-24 w-24 mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Catholic Theological AI Assistant</h1>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Explore Catholic theology, access resources, and deepen your faith with our AI-powered assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                window.location.href = "/login"
              }}
            >
              Try the Chat Interface
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Theological Guidance</h3>
              <p className="text-gray-600">
                Ask questions about Catholic theology, doctrine, and teachings from trusted sources.
              </p>
            </div>
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Prayer Resources</h3>
              <p className="text-gray-600">
                Access traditional prayers, novenas, and devotions to enrich your spiritual life.
              </p>
            </div>
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Liturgical Calendar</h3>
              <p className="text-gray-600">
                Stay connected to the Church's liturgical year with feast days, solemnities, and seasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Saint of the Day */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Saint of the Day</h2>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                    "_blank",
                  )
                }
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent("Check out Ex314.ai - Catholic Theological AI Assistant")}`,
                    "_blank",
                  )
                }
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open(
                    `mailto:?subject=${encodeURIComponent("Ex314.ai - Catholic Theological AI Assistant")}&body=${encodeURIComponent(`Check out Ex314.ai: ${window.location.href}`)}`,
                    "_blank",
                  )
                }
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Share via Email</span>
              </Button>
            </div>
          </div>
          <SaintOfDay />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ChiRho className="h-6 w-6" />
              <span className="font-semibold">Ex314.ai</span>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center my-4 md:my-0">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
            <a href="mailto:support@ex314.ai" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">© 2025 Ex314.ai</div>
            <div className="flex items-center gap-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
