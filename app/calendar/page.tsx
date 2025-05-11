import LiturgicalCalendar from "@/components/liturgical-calendar"

export const metadata = {
  title: "Liturgical Calendar | Ex314.ai",
  description: "Catholic liturgical calendar showing feast days, solemnities, and daily celebrations",
}

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Liturgical Calendar</h1>
      <p className="text-gray-600 mb-8">
        Stay connected to the Church's liturgical year with feast days, solemnities, and seasons.
      </p>

      <LiturgicalCalendar />
    </div>
  )
}
