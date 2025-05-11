import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { LiturgicalTimeline } from "@/components/liturgical-timeline"
import { FacebookIcon, InstagramIcon, TwitterIcon, GithubIcon } from "lucide-react"

export default function LiturgicalTimelinePage() {
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

      {/* Hero */}
      <section className="bg-amber-50 py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Liturgical Calendar Timeline</h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore the historical development of the Catholic liturgical calendar from the early Church to the present
            day.
          </p>
        </div>
      </section>

      {/* Timeline Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              The liturgical calendar has evolved over two millennia, reflecting the Church's deepening understanding of
              the mysteries of faith and responding to historical circumstances. This timeline highlights key
              developments in the formation of the liturgical year as we know it today.
            </p>
            <div className="flex gap-4 mb-6">
              <Link href="/calendar" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                ← Back to Liturgical Calendar
              </Link>
              <Link
                href="/liturgical-seasons"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                View Liturgical Seasons →
              </Link>
            </div>
          </div>

          <LiturgicalTimeline />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <ChiRho className="h-6 w-6" />
              <span className="font-semibold">Ex314.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="https://facebook.com/ex314ai" aria-label="Facebook">
                <FacebookIcon size={18} className="text-gray-600 hover:text-gray-900" />
              </Link>
              <Link href="https://instagram.com/ex314ai" aria-label="Instagram">
                <InstagramIcon size={18} className="text-gray-600 hover:text-gray-900" />
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <Link href="https://twitter.com/ex314ai" aria-label="Twitter">
                <TwitterIcon size={18} className="text-gray-600 hover:text-gray-900" />
              </Link>
              <Link href="https://github.com/ex314ai" aria-label="GitHub">
                <GithubIcon size={18} className="text-gray-600 hover:text-gray-900" />
              </Link>
            </div>
            <Link href="mailto:support@ex314.ai" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
