"use client"

import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { getCurrentSeason, getUpcomingFeasts, getSaintOfDay } from "@/lib/liturgical-calendar"
import { DailyReadingsComponent } from "@/components/DailyReadings"
import { FacebookIcon, InstagramIcon, TwitterIcon, GithubIcon, Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { LiturgicalSeasonDetails } from "@/components/liturgical-season-details"

export default function LiturgicalCalendarPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSeasonDetails, setShowSeasonDetails] = useState(false)

  // Get current date - fixed to use May 10, 2025
  const currentDate = new Date(2025, 4, 10) // May 10, 2025
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate)

  // Get liturgical information
  const currentSeason = getCurrentSeason(currentDate)
  const upcomingFeasts = getUpcomingFeasts(currentDate)
  const saintOfDay = getSaintOfDay(currentDate)

  return (
    <main className="min-h-screen flex flex-col">
      {/* Mobile-optimized Header */}
      <header className="w-full py-4 md:py-6 px-4 md:px-8 flex justify-between items-center border-b sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ChiRho className="h-6 w-6 md:h-8 md:w-8" />
            <h1 className="text-xl md:text-2xl font-bold">Ex314.ai</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-1 rounded-md hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-16 px-4">
          <nav className="flex flex-col space-y-4 text-center">
            <Link
              href="/resources"
              className="py-3 text-lg font-medium border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/calendar"
              className="py-3 text-lg font-medium border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Liturgical Calendar
            </Link>
            <Link
              href="/prayers"
              className="py-3 text-lg font-medium border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Prayers
            </Link>
            <Link
              href="/about"
              className="py-3 text-lg font-medium border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}

      {/* Calendar Hero - Mobile Optimized */}
      <section className="bg-green-50 py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Liturgical Calendar</h1>
          <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
            Follow the Church's liturgical year with feast days, solemnities, and seasons.
          </p>
        </div>
      </section>

      {/* Liturgical Seasons Section */}
      <section className="py-6 md:py-12 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Understanding Liturgical Seasons</h2>
            <button
              onClick={() => setShowSeasonDetails(!showSeasonDetails)}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
              aria-expanded={showSeasonDetails}
            >
              {showSeasonDetails ? (
                <>
                  <span>Hide Details</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>Show Details</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>

          {showSeasonDetails && (
            <div className="mb-8 animate-fadeIn">
              <LiturgicalSeasonDetails />
            </div>
          )}

          {/* Current Season Card - Always visible */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Season: {currentSeason.name}</CardTitle>
              <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{currentSeason.description}</p>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentSeason.color === "Green"
                      ? "bg-green-600"
                      : currentSeason.color === "Purple"
                        ? "bg-purple-600"
                        : currentSeason.color === "Red"
                          ? "bg-red-600"
                          : "bg-white border border-gray-300"
                  }`}
                ></div>
                <span className="text-sm">Liturgical Color: {currentSeason.color}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calendar Content - Mobile Optimized */}
      <section className="py-6 md:py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Calendar Card - Optimized for touch */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>May 2025</CardTitle>
                </CardHeader>
                <CardContent className="px-1 sm:px-4">
                  <Calendar
                    mode="single"
                    className="rounded-md border max-w-full touch-manipulation"
                    defaultMonth={new Date(2025, 4)}
                    selected={currentDate}
                    month={4}
                    year={2025}
                    initialFocus
                    fixedWeeks
                    showOutsideDays={false}
                  />
                </CardContent>
              </Card>

              {/* Today's Celebration Card */}
              {saintOfDay && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Today's Celebration</CardTitle>
                    <CardDescription>{formattedDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">{saintOfDay.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          saintOfDay.color === "Green"
                            ? "bg-green-600"
                            : saintOfDay.color === "Purple"
                              ? "bg-purple-600"
                              : saintOfDay.color === "Red"
                                ? "bg-red-600"
                                : "bg-white border border-gray-300"
                        }`}
                      ></div>
                      <span className="text-sm">
                        {saintOfDay.type} - {saintOfDay.color}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{saintOfDay.description}</p>
                    {saintOfDay.readings && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Readings:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {saintOfDay.readings.map((reading, index) => (
                            <li key={index}>{reading}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="md:col-span-1">
              {/* Upcoming Feasts Card */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Upcoming Feasts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {upcomingFeasts.map((feast, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="font-medium">{feast.name}</span>
                        <span className="text-gray-500">
                          {feast.date.split("-")[0] === "06" ? "Jun" : "May"}{" "}
                          {Number.parseInt(feast.date.split("-")[1])}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Daily Readings Section - Mobile Optimized */}
          <div className="mt-6 md:mt-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Daily Mass Readings</h2>
            <DailyReadingsComponent initialDate={currentDate} />
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-100 py-6 md:py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ChiRho className="h-6 w-6" />
              <span className="font-semibold">Ex314.ai</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Link href="https://facebook.com/ex314ai" aria-label="Facebook">
                <FacebookIcon size={18} className="text-gray-600 hover:text-gray-900" />
              </Link>
              <Link href="https://instagram.com/ex314ai" aria-label="Instagram">
                <InstagramIcon size={18} className="text-gray-600 hover:text-gray-900" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
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

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <Link href="https://twitter.com/ex314ai" aria-label="Twitter">
                <TwitterIcon size={18} className="text-gray-600 hover:text-gray-900" />
              </Link>
              <Link href="https://github.com/ex314ai" aria-label="GitHub">
                <GithubIcon size={18} className="text-gray-600 hover:text-gray-900" />
              </Link>
            </div>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>

          <div className="text-center md:text-right text-sm text-gray-500 mt-4 md:mt-0">© 2025 Ex314.ai</div>
        </div>
      </footer>
    </main>
  )
}
