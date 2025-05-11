import Link from "next/link"
import { Instagram, Twitter, Github } from "lucide-react"
import { ChiRhoLogo } from "./chi-rho-logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center px-4 py-6 md:flex-row md:justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <ChiRhoLogo className="h-6 w-6" />
            <span className="font-semibold">Ex314.ai</span>
          </Link>

          {/* Social icons grouped together */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-primary hover:scale-110"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-primary hover:scale-110"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-primary hover:scale-110"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>

        {/* Navigation links below social icons */}
        <div className="mt-4 flex flex-wrap justify-center space-x-4 md:mt-0">
          <Link
            href="/about"
            className="text-sm transition-all duration-200 hover:text-primary hover:underline hover:scale-105"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm transition-all duration-200 hover:text-primary hover:underline hover:scale-105"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm transition-all duration-200 hover:text-primary hover:underline hover:scale-105"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-sm transition-all duration-200 hover:text-primary hover:underline hover:scale-105"
          >
            Contact
          </Link>
        </div>

        <div className="mt-4 text-sm text-muted-foreground md:mt-0">© 2025 Ex314.ai</div>
      </div>
    </footer>
  )
}
