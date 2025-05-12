import Link from "next/link";
import { ChiRho } from "@/components/chi-rho";

export default function SpreadTheWordPage() {
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
           <Link href="/donate" className="text-sm font-medium hover:underline">
            Donate
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Spread the Word</h1>
          <div className="prose lg:prose-xl dark:prose-invert mx-auto">
            <p>
              Help us grow our community and reach more people by sharing Ex314.ai with your friends, family, and networks.
            </p>
            <p>
              This page will soon feature resources like pre-written messages, shareable images, and direct links to share on social media.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Share Directly:</h2>
            {/* Add social sharing links/buttons here */}
            <p className="text-center">
              <em>(Social sharing links will be added here soon)</em>
            </p>
            <p className="mt-6">
              Thank you for supporting our mission!
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
          <div className="text-sm text-gray-500">© 2025 Ex314.ai. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
