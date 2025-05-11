export type Reading = {
  citation: string
  text?: string
  type: "First Reading" | "Responsorial Psalm" | "Second Reading" | "Gospel"
}

export type DailyReadings = {
  date: string // Format: YYYY-MM-DD
  liturgicalYear: "A" | "B" | "C"
  weekday: string
  celebration?: string
  readings: Reading[]
}

// Helper function to get the liturgical year for a given date
// The liturgical year starts on the First Sunday of Advent
export function getLiturgicalYear(date: Date): "A" | "B" | "C" {
  // 2025 is liturgical year B
  // This is a simplified version - a real implementation would calculate based on the year
  return "B"
}

// Helper function to get readings for a specific date
export function getReadingsForDate(date: Date): DailyReadings | null {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dateString = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`

  // Get day of week
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const weekday = weekdays[date.getDay()]

  // Get liturgical year
  const liturgicalYear = getLiturgicalYear(date)

  // Return readings for the specific date
  // In a real application, this would fetch from a database or API
  return READINGS_DATA[dateString] || null
}

// Sample data for May 2025 (Year B)
// In a real application, this would be much more extensive or fetched from an API
const READINGS_DATA: Record<string, DailyReadings> = {
  "2025-05-09": {
    date: "2025-05-09",
    liturgicalYear: "B",
    weekday: "Friday",
    celebration: "Friday of the Sixth Week of Easter",
    readings: [
      {
        type: "First Reading",
        citation: "Acts 18:9-18",
        text: 'One night while Paul was in Corinth, the Lord said to him in a vision, "Do not be afraid. Go on speaking, and do not be silent, for I am with you. No one will attack and harm you, for I have many people in this city." He settled there for a year and a half and taught the word of God among them...',
      },
      {
        type: "Responsorial Psalm",
        citation: "Psalm 47:2-3, 4-5, 6-7",
        text: "R. God is king of all the earth.\nAll you peoples, clap your hands,\nshout to God with cries of gladness,\nFor the LORD, the Most High, the awesome,\nis the great king over all the earth.",
      },
      {
        type: "Gospel",
        citation: "John 16:20-23",
        text: 'Jesus said to his disciples: "Amen, amen, I say to you, you will weep and mourn, while the world rejoices; you will grieve, but your grief will become joy. When a woman is in labor, she is in anguish because her hour has arrived; but when she has given birth to a child, she no longer remembers the pain because of her joy that a child has been born into the world. So you also are now in anguish. But I will see you again, and your hearts will rejoice, and no one will take your joy away from you. On that day you will not question me about anything."',
      },
    ],
  },
  "2025-05-10": {
    date: "2025-05-10",
    liturgicalYear: "B",
    weekday: "Saturday",
    celebration: "Saturday of the Sixth Week of Easter",
    readings: [
      {
        type: "First Reading",
        citation: "Acts 18:23-28",
        text: "After staying in Antioch some time, Paul left and traveled in orderly sequence through the Galatian country and Phrygia, bringing strength to all the disciples...",
      },
      {
        type: "Responsorial Psalm",
        citation: "Psalm 47:2-3, 8-9, 10",
        text: "R. God is king of all the earth.\nAll you peoples, clap your hands;\nshout to God with cries of gladness.\nFor the LORD, the Most High, the awesome,\nis the great king over all the earth.",
      },
      {
        type: "Gospel",
        citation: "John 16:23-28",
        text: 'Jesus said to his disciples: "Amen, amen, I say to you, whatever you ask the Father in my name he will give you. Until now you have not asked anything in my name; ask and you will receive, so that your joy may be complete..."',
      },
    ],
  },
  "2025-05-11": {
    date: "2025-05-11",
    liturgicalYear: "B",
    weekday: "Sunday",
    celebration: "Solemnity of the Ascension of the Lord",
    readings: [
      {
        type: "First Reading",
        citation: "Acts 1:1-11",
        text: "In the first book, Theophilus, I dealt with all that Jesus did and taught until the day he was taken up, after giving instructions through the Holy Spirit to the apostles whom he had chosen...",
      },
      {
        type: "Responsorial Psalm",
        citation: "Psalm 47:2-3, 6-7, 8-9",
        text: "R. God mounts his throne to shouts of joy: a blare of trumpets for the Lord.\nAll you peoples, clap your hands,\nshout to God with cries of gladness,\nFor the LORD, the Most High, the awesome,\nis the great king over all the earth.",
      },
      {
        type: "Second Reading",
        citation: "Ephesians 1:17-23",
        text: "Brothers and sisters: May the God of our Lord Jesus Christ, the Father of glory, give you a Spirit of wisdom and revelation resulting in knowledge of him...",
      },
      {
        type: "Gospel",
        citation: "Mark 16:15-20",
        text: 'Jesus said to his disciples: "Go into the whole world and proclaim the gospel to every creature. Whoever believes and is baptized will be saved; whoever does not believe will be condemned..."',
      },
    ],
  },
  "2025-05-12": {
    date: "2025-05-12",
    liturgicalYear: "B",
    weekday: "Monday",
    celebration: "Monday of the Seventh Week of Easter",
    readings: [
      {
        type: "First Reading",
        citation: "Acts 19:1-8",
        text: "While Apollos was in Corinth, Paul traveled through the interior of the country and down to Ephesus where he found some disciples...",
      },
      {
        type: "Responsorial Psalm",
        citation: "Psalm 68:2-3, 4-5, 6-7",
        text: "R. Sing to God, O kingdoms of the earth.\nGod arises; his enemies are scattered,\nand those who hate him flee before him.\nAs smoke is driven away, so are they driven;\nas wax melts before the fire.",
      },
      {
        type: "Gospel",
        citation: "John 16:29-33",
        text: 'The disciples said to Jesus, "Now you are talking plainly, and not in any figure of speech. Now we realize that you know everything and that you do not need to have anyone question you. Because of this we believe that you came from God..."',
      },
    ],
  },
}

// Function to get readings for a week
export function getWeekReadings(startDate: Date): DailyReadings[] {
  const readings: DailyReadings[] = []
  const currentDate = new Date(startDate)

  // Get readings for 7 days starting from the given date
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate)
    date.setDate(date.getDate() + i)

    const dailyReading = getReadingsForDate(date)
    if (dailyReading) {
      readings.push(dailyReading)
    } else {
      // If no reading is found, create a placeholder
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const dateString = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const weekday = weekdays[date.getDay()]

      readings.push({
        date: dateString,
        liturgicalYear: getLiturgicalYear(date),
        weekday,
        celebration: `${weekday} of Easter Time`,
        readings: [
          {
            type: "First Reading",
            citation: "Readings not available",
          },
          {
            type: "Responsorial Psalm",
            citation: "Readings not available",
          },
          {
            type: "Gospel",
            citation: "Readings not available",
          },
        ],
      })
    }
  }

  return readings
}
