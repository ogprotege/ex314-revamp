import { NextResponse } from "next/server"

// This is a fallback data in case the API is unavailable
const fallbackSaints = [
  {
    name: "St. Thomas Aquinas",
    feast_day: "January 28",
    description: "Italian Dominican friar, philosopher, Catholic priest, and Doctor of the Church.",
    patronage: "Academics, theologians, students",
  },
  {
    name: "St. Augustine of Hippo",
    feast_day: "August 28",
    description: "Early Christian theologian and philosopher whose writings influenced Western Christianity.",
    patronage: "Theologians, printers, brewers",
  },
  {
    name: "St. Thérèse of Lisieux",
    feast_day: "October 1",
    description: "French Carmelite nun known as 'The Little Flower' and Doctor of the Church.",
    patronage: "Missionaries, florists, France",
  },
  {
    name: "St. Francis of Assisi",
    feast_day: "October 4",
    description: "Italian Catholic friar, deacon, and founder of the Franciscan Order.",
    patronage: "Animals, ecology, merchants",
  },
  {
    name: "St. Teresa of Ávila",
    feast_day: "October 15",
    description: "Spanish Carmelite nun, mystic, and Doctor of the Church.",
    patronage: "Spain, sick people, religious",
  },
]

export async function GET() {
  try {
    // Try to fetch from a real API (this is a placeholder - replace with actual API)
    // For now, we'll use a fallback

    // Get current date
    const today = new Date()
    const month = today.toLocaleString("en-US", { month: "long" })
    const day = today.getDate()
    const dateString = `${month} ${day}`

    // Try to find a saint with matching feast day, or use a random one
    const saint =
      fallbackSaints.find((s) => s.feast_day === dateString) ||
      fallbackSaints[Math.floor(Math.random() * fallbackSaints.length)]

    return NextResponse.json({
      success: true,
      saint,
    })
  } catch (error) {
    console.error("Error fetching saint of the day:", error)

    // Return a random saint from the fallback list
    const randomSaint = fallbackSaints[Math.floor(Math.random() * fallbackSaints.length)]

    return NextResponse.json({
      success: true,
      saint: randomSaint,
    })
  }
}
