"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { DailyReadings } from "@/lib/lectionary-readings"
import { getWeekReadings } from "@/lib/lectionary-readings"

interface DailyReadingsProps {
  initialDate?: Date
}

export function DailyReadingsComponent({ initialDate = new Date() }: DailyReadingsProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const [weekReadings, setWeekReadings] = useState<DailyReadings[]>(getWeekReadings(initialDate))
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0)

  // Update readings when initialDate changes
  useEffect(() => {
    setSelectedDate(initialDate)
    setWeekReadings(getWeekReadings(initialDate))
    setSelectedDayIndex(0)
  }, [initialDate])

  // Format date for display
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number)
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Format date for mobile display
  const formatMobileDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number)
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 7)
    setSelectedDate(newDate)
    setWeekReadings(getWeekReadings(newDate))
    setSelectedDayIndex(0)
  }

  // Navigate to next week
  const goToNextWeek = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 7)
    setSelectedDate(newDate)
    setWeekReadings(getWeekReadings(newDate))
    setSelectedDayIndex(0)
  }

  // Select a specific day
  const selectDay = (index: number) => {
    setSelectedDayIndex(index)
  }

  // Get the selected day's readings
  const selectedDayReadings = weekReadings[selectedDayIndex]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg md:text-xl">Daily Mass Readings</CardTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousWeek}
              className="p-1 rounded-full hover:bg-gray-200"
              aria-label="Previous week"
            >
              <ChevronLeft size={20} />
            </button>
            <button onClick={goToNextWeek} className="p-1 rounded-full hover:bg-gray-200" aria-label="Next week">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <CardDescription>Liturgical Year {selectedDayReadings?.liturgicalYear || "B"}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="0" className="w-full">
          {/* Mobile-optimized tabs */}
          <TabsList className="grid grid-cols-7 mb-4 w-full overflow-x-auto touch-pan-x">
            {weekReadings.map((day, index) => {
              const [_, month, dayNum] = day.date.split("-")
              return (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  onClick={() => selectDay(index)}
                  className="text-xs p-1 sm:p-2"
                >
                  <div className="flex flex-col items-center">
                    <span className="hidden sm:block">{day.weekday.slice(0, 3)}</span>
                    <span className="sm:hidden">{day.weekday.slice(0, 1)}</span>
                    <span>{Number.parseInt(dayNum)}</span>
                  </div>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-semibold">{selectedDayReadings?.celebration}</h3>
            <p className="text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">{formatDate(selectedDayReadings?.date)}</span>
              <span className="sm:hidden">{formatMobileDate(selectedDayReadings?.date)}</span>
            </p>
          </div>

          <div className="space-y-6">
            {selectedDayReadings?.readings.map((reading, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h4 className="font-medium text-xs sm:text-sm text-gray-500 mb-1">{reading.type}</h4>
                <p className="font-semibold text-sm sm:text-base mb-2">{reading.citation}</p>
                {reading.text && (
                  <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line">{reading.text}</div>
                )}
              </div>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
