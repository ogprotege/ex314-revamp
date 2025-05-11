"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Saint {
  name: string
  feast_day: string
  description: string
  patronage: string
  full_description?: string
}

interface SaintOfDayProps {
  date?: Date
}

export function SaintOfDay({ date = new Date(2025, 4, 10) }: SaintOfDayProps) {
  const [saint, setSaint] = useState<Saint | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    async function fetchSaint() {
      try {
        // Format date for API query
        const formattedDate = date.toISOString().split("T")[0]
        const response = await fetch(`/api/saint-of-day?date=${formattedDate}`)
        const data = await response.json()

        if (data.success && data.saint) {
          setSaint(data.saint)
        }
      } catch (error) {
        console.error("Error fetching saint of the day:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSaint()
  }, [date])

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Saint of the Day</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="h-24 flex items-center justify-center">
            <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!saint) {
    return null
  }

  // Hardcoded saint for May 10, 2025
  const currentSaint = {
    name: "St. Damien of Molokai",
    feast_day: "May 10",
    description: "Missionary priest who ministered to people with leprosy in Hawaii",
    patronage: "People with leprosy, outcasts, Hawaii",
    full_description:
      "St. Damien of Molokai (1840-1889), born Jozef De Veuster in Belgium, was a Roman Catholic priest and member of the Congregation of the Sacred Hearts of Jesus and Mary. He is best known for his ministry to people with leprosy (Hansen's disease) on the island of Molokai in Hawaii. After 16 years of dedicated service, he eventually contracted and died of the disease himself. His selfless dedication to the isolated leper colony led to his canonization in 2009. Pope Benedict XVI described him as a 'spiritual light' for the afflicted and marginalized.",
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Saint of the Day</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{currentSaint.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{currentSaint.feast_day}</p>
        <p className="text-gray-600 mb-4">{currentSaint.description}</p>

        {expanded && currentSaint.full_description && (
          <div className="text-gray-600 mb-4 animate-fadeIn">{currentSaint.full_description}</div>
        )}

        {currentSaint.patronage && (
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium">Patron of:</span> {currentSaint.patronage}
          </p>
        )}

        <Button variant="link" className="p-0 flex items-center gap-1" onClick={toggleExpanded}>
          {expanded ? (
            <>
              Read less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
