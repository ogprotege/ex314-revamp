import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { Instagram, Twitter, Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center gap-2">
            <ChiRho className="h-6 w-6" />
            <span className="font-semibold">Ex314.ai</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="https://instagram.com/ex314ai" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            </Link>
            <Link href="https://twitter.com/ex314ai" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
              <Twitter className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            </Link>
            <Link href="https://github.com/ex314ai" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <nav className="flex gap-4 md:gap-6">
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <p className="text-sm text-gray-500">© 2025 Ex314.ai</p>
        </div>
      </div>
    </footer>
  )
}
