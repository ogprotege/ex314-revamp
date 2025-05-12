"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  getDay,
} from "date-fns"
import {
  getFeastForDate,
  getCurrentLiturgicalSeason,
  getLiturgicalColorClass,
  getLiturgicalColorBg,
} from "@/lib/liturgical-calendar"
import LiturgicalSeasonDisplay from "./liturgical-season-display"
import DailyReadings from "./daily-readings"

export default function LiturgicalCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [upcomingFeasts, setUpcomingFeasts] = useState<Array<{ name: string; date: Date }>>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Ensure we have the current date set correctly (May 12, 2025)
  useEffect(() => {
    // We'll use May 12, 2025 as our current date
    const today = new Date(2025, 4, 12) // Month is 0-indexed, so 4 = May
    setCurrentDate(today)
    setCurrentMonth(today)
    setSelectedDate(today)

    // Get upcoming feasts
    const nextTwoMonths = eachDayOfInterval({
      start: today,
      end: addMonths(today, 2),
    })

    const feasts = nextTwoMonths
      .map((date) => ({ date, feast: getFeastForDate(date) }))
      .filter(({ feast }) => feast && feast.type === "solemnity")
      .map(({ date, feast }) => ({ name: feast!.name, date }))
      .slice(0, 5)

    setUpcomingFeasts(feasts)
  }, [/* Only run once on initial load */])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Calculate days needed to fill the calendar grid
  const startDay = getDay(monthStart)
  const endDay = 6 - getDay(monthEnd)

  // Previous and next month navigation
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  // Get current liturgical season
  const currentSeason = getCurrentLiturgicalSeason(currentDate)
  const seasonColorBg = currentSeason ? getLiturgicalColorBg(currentSeason.color) : "bg-gray-50"

  // Handle day selection
  const selectDay = (day: Date) => {
    setSelectedDate(day)
    // Also update the readings component
    if (day.getMonth() !== currentMonth.getMonth()) {
      // If selecting a day from a different month, update the current month view
      setCurrentMonth(day)
    }
  }

  return (
    <div className="space-y-8">
      {/* Current Liturgical Season */}
      <LiturgicalSeasonDisplay date={currentDate} />

      {/* Calendar */}
      <div className={`rounded-lg shadow-md p-6 ${seasonColorBg} transition-colors duration-500`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</div>

          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          <div className="font-medium">Su</div>
          <div className="font-medium">Mo</div>
          <div className="font-medium">Tu</div>
          <div className="font-medium">We</div>
          <div className="font-medium">Th</div>
          <div className="font-medium">Fr</div>
          <div className="font-medium">Sa</div>

          {/* Empty cells for days before the start of the month */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-start-${index}`} className="h-10 w-10"></div>
          ))}

          {/* Days of the month */}
          {monthDays.map((day) => {
            const isToday = isSameDay(day, currentDate)
            const isSelected = isSameDay(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const feast = getFeastForDate(day)
            const daySeason = getCurrentLiturgicalSeason(day)
            const seasonColor = daySeason ? getLiturgicalColorClass(daySeason.color) : ""

            return (
              <div
                key={day.toString()}
                className={`h-10 w-10 flex items-center justify-center rounded-full
                  ${isSelected ? "ring-2 ring-offset-2 ring-purple-500" : ""}
                  ${isToday ? "bg-purple-600 text-white font-bold" : ""}
                  ${!isToday && isCurrentMonth && feast?.type === "solemnity" ? "bg-purple-100 font-medium" : ""}
                  ${!isToday && isCurrentMonth && feast?.type === "feast" ? "bg-red-100 font-medium" : ""}
                  ${!isToday && isCurrentMonth && !feast ? `hover:${seasonColor} hover:bg-opacity-20` : ""}
                  ${!isCurrentMonth ? "text-gray-400" : ""}
                  transition-colors duration-200 cursor-pointer relative`}
                title={feast?.name || ""}
                onClick={() => selectDay(day)}
              >
                {format(day, "d")}
                {feast && (
                  <span
                    className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
                      feast.color ? getLiturgicalColorClass(feast.color) : "bg-gray-400"
                    }`}
                  ></span>
                )}
              </div>
            )
          })}

          {/* Empty cells for days after the end of the month */}
          {Array.from({ length: endDay }).map((_, index) => (
            <div key={`empty-end-${index}`} className="h-10 w-10"></div>
          ))}
        </div>
      </div>

      {/* Daily Readings */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Daily Mass Readings</h2>
        <DailyReadings initialDate={selectedDate} />
      </div>

      {/* Upcoming Feasts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Feasts</h2>
        <ul className="space-y-3">
          {upcomingFeasts.map((feast, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{feast.name}</span>
              <span className="text-gray-500">{format(feast.date, "MMM d")}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Today's Celebration */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">Today's Celebration</h2>
        <p className="text-gray-500 mb-4">{format(currentDate, "MMMM d, yyyy")}</p>

        <TodayCelebration date={currentDate} />
      </div>
    </div>
  )
}

function TodayCelebration({ date }: { date: Date }) {
  const feast = getFeastForDate(date)
  const season = getCurrentLiturgicalSeason(date)

  if (!feast) {
    return (
      <div>
        <p>No special celebration today.</p>
        {season && (
          <div className="mt-4">
            <p className="text-gray-600">
              Today is in the season of <span className="font-medium">{season.name}</span>.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{feast.name}</h3>
      {feast.type && (
        <div className="flex items-center mb-2">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              feast.color ? getLiturgicalColorClass(feast.color) : "bg-gray-300"
            }`}
          ></div>
          <span className="text-sm capitalize">
            {feast.type} {feast.color ? `- ${feast.color}` : ""}
          </span>
        </div>
      )}

      {feast.description && <p className="mb-4">{feast.description}</p>}

      {feast.readings && (
        <div>
          <h4 className="font-medium mb-2">Readings:</h4>
          <ul className="list-disc list-inside space-y-1">
            {feast.readings.map((reading, index) => (
              <li key={index}>{reading}</li>
            ))}
          </ul>
        </div>
      )}

      {season && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Today is in the season of <span className="font-medium">{season.name}</span>.
          </p>
        </div>
      )}
    </div>
  )
}

