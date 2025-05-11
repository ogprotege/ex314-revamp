import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { DailyReadingsComponent } from "@/components/DailyReadings"

export default function DailyReadingsPage() {
  const currentDate = new Date()

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
          <Link href="/readings" className="text-sm font-medium hover:underline">
            Daily Readings
          </Link>
          <Link href="/prayers" className="text-sm font-medium hover:underline">
            Prayers
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
        </div>
      </header>

      {/* Readings Hero */}
      <section className="bg-blue-50 py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Daily Mass Readings</h1>
          <p className="text-lg text-gray-600 mb-6">
            Follow the daily Scripture readings used in the Catholic Mass around the world.
          </p>
        </div>
      </section>

      {/* Readings Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <DailyReadingsComponent initialDate={currentDate} />

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">About the Lectionary</h2>
            <p className="text-gray-700 mb-4">
              The Lectionary is the collection of readings from Sacred Scripture that are proclaimed during the liturgy.
              The Catholic Church follows a three-year cycle (A, B, C) for Sunday readings and a two-year cycle (I, II)
              for weekday readings.
            </p>
            <p className="text-gray-700 mb-4">Each day typically includes:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>First Reading (usually from the Old Testament or Acts during Easter)</li>
              <li>Responsorial Psalm</li>
              <li>Second Reading (on Sundays and Solemnities, usually from the Epistles)</li>
              <li>Gospel Reading</li>
            </ul>
            <p className="text-gray-700">
              The current liturgical year is Year B, which focuses primarily on the Gospel of Mark.
            </p>
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
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
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
