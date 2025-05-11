import { NextResponse } from "next/server"
import { getReadingsForDate } from "@/lib/lectionary-readings"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dateParam = searchParams.get("date")

  let date: Date

  if (dateParam) {
    date = new Date(dateParam)
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
    }
  } else {
    date = new Date()
  }

  const readings = getReadingsForDate(date)

  if (!readings) {
    return NextResponse.json({ error: "Readings not found for the specified date" }, { status: 404 })
  }

  return NextResponse.json(readings)
}
