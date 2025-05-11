import { type NextRequest, NextResponse } from "next/server"

// Sample saints data for the API
const saintsDatabase: Record<string, any> = {
  // Format: "YYYY-MM-DD": Saint data
  "2025-05-10": {
    name: "St. Damien of Molokai",
    feast_day: "May 10",
    description: "Missionary priest who ministered to people with leprosy in Hawaii",
    patronage: "People with leprosy, outcasts, Hawaii",
    full_description:
      "St. Damien of Molokai (1840-1889), born Jozef De Veuster in Belgium, was a Roman Catholic priest and member of the Congregation of the Sacred Hearts of Jesus and Mary. He is best known for his ministry to people with leprosy (Hansen's disease) on the island of Molokai in Hawaii. After 16 years of dedicated service, he eventually contracted and died of the disease himself. His selfless dedication to the isolated leper colony led to his canonization in 2009. Pope Benedict XVI described him as a 'spiritual light' for the afflicted and marginalized.",
  },
  "2025-05-11": {
    name: "St. Ignatius of Laconi",
    feast_day: "May 11",
    description: "Capuchin friar known for his humility and service to the poor",
    patronage: "Beggars, students",
    full_description:
      "St. Ignatius of Laconi (1701-1781) was a Capuchin Franciscan friar from Sardinia, Italy. Born Francis Ignatius Vincent Peis, he joined the Capuchins after recovering from a serious illness. For 40 years, he served as a questor (beggar) for his community, collecting alms with great humility. Despite his simple role, he became known for his holiness, wisdom, and ability to read hearts. He was particularly devoted to helping the poor and sick. He was canonized in 1951 by Pope Pius XII.",
  },
}

export async function GET(request: NextRequest) {
  try {
    // Get date from query parameter or use current date
    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get("date")

    const date = dateParam || new Date().toISOString().split("T")[0]

    // Check if we have data for this date
    if (saintsDatabase[date]) {
      return NextResponse.json(
        {
          success: true,
          saint: saintsDatabase[date],
        },
        { status: 200 },
      )
    }

    // If no data for specific date, return today's saint or a default
    const today = new Date().toISOString().split("T")[0]
    const defaultSaint = saintsDatabase[today] || saintsDatabase["2025-05-10"]

    return NextResponse.json(
      {
        success: true,
        saint: defaultSaint,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error in saint-of-day API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve saint of the day",
      },
      { status: 500 },
    )
  }
}
