export type LiturgicalSeason = {
  name: string
  description: string
  color: "green" | "purple" | "white" | "red" | "rose"
  startDate: Date
  endDate: Date
}

export type Feast = {
  name: string
  type: "solemnity" | "feast" | "memorial" | "optional"
  color?: "white" | "red" | "green" | "purple" | "rose"
  description?: string
  readings?: string[]
}

// Fixed feast days that occur on the same date every year
const fixedFeasts: Array<{ month: number; day: number; feast: Feast }> = [
  {
    month: 5,
    day: 10,
    feast: {
      name: "St. Damien of Molokai",
      type: "optional",
      color: "white",
      description: "Missionary priest who ministered to people with leprosy in Hawaii",
      readings: ["Acts 18:23-28", "Psalm 47:2-3, 8-10", "John 16:23-28"],
    },
  },
  {
    month: 5,
    day: 11,
    feast: {
      name: "Ascension of the Lord",
      type: "solemnity",
      color: "white",
      description: "Celebrates Jesus' ascension into heaven 40 days after Easter",
      readings: ["Acts 1:1-11", "Psalm 47:2-3, 6-9", "Ephesians 1:17-23", "Mark 16:15-20"],
    },
  },
  {
    month: 5,
    day: 14,
    feast: {
      name: "St. Matthias",
      type: "feast",
      color: "red",
      description: "Apostle chosen to replace Judas Iscariot",
      readings: ["Acts 1:15-17, 20-26", "Psalm 113:1-8", "John 15:9-17"],
    },
  },
  {
    month: 5,
    day: 18,
    feast: {
      name: "Pentecost Sunday",
      type: "solemnity",
      color: "red",
      description: "Celebrates the descent of the Holy Spirit upon the Apostles",
      readings: ["Acts 2:1-11", "Psalm 104:1, 24, 29-31, 34", "1 Corinthians 12:3-7, 12-13", "John 20:19-23"],
    },
  },
  {
    month: 5,
    day: 25,
    feast: {
      name: "Trinity Sunday",
      type: "solemnity",
      color: "white",
      description: "Celebrates the doctrine of the Holy Trinity",
      readings: ["Deuteronomy 4:32-34, 39-40", "Psalm 33:4-6, 9, 18-20, 22", "Romans 8:14-17", "Matthew 28:16-20"],
    },
  },
  {
    month: 6,
    day: 1,
    feast: {
      name: "Corpus Christi",
      type: "solemnity",
      color: "white",
      description: "Celebrates the Real Presence of Christ in the Eucharist",
      readings: ["Exodus 24:3-8", "Psalm 116:12-13, 15-18", "Hebrews 9:11-15", "Mark 14:12-16, 22-26"],
    },
  },
]

// Liturgical seasons for 2025
// Note: These are approximate dates for 2025
const liturgicalSeasons2025: LiturgicalSeason[] = [
  {
    name: "Christmas Time",
    description: "The Christmas season celebrates the Incarnation and manifestation of Christ to the world.",
    color: "white",
    startDate: new Date(2024, 11, 25), // December 25, 2024
    endDate: new Date(2025, 0, 12), // January 12, 2025 (Baptism of the Lord)
  },
  {
    name: "Ordinary Time I",
    description:
      "Ordinary Time is dedicated to the mystery of Christ in all its aspects. It's a time for growth and maturation, a time to deepen one's faith.",
    color: "green",
    startDate: new Date(2025, 0, 13), // January 13, 2025
    endDate: new Date(2025, 1, 25), // February 25, 2025 (day before Ash Wednesday)
  },
  {
    name: "Lent",
    description:
      "Lent is a 40-day season of prayer, fasting, and almsgiving that begins on Ash Wednesday and ends at sundown on Holy Thursday.",
    color: "purple",
    startDate: new Date(2025, 1, 26), // February 26, 2025 (Ash Wednesday)
    endDate: new Date(2025, 3, 17), // April 17, 2025 (Holy Thursday)
  },
  {
    name: "Easter Triduum",
    description:
      "The Easter Triduum marks the end of the Lenten season and leads to Easter. It includes Holy Thursday, Good Friday, and Holy Saturday.",
    color: "red",
    startDate: new Date(2025, 3, 17), // April 17, 2025 (Holy Thursday)
    endDate: new Date(2025, 3, 19), // April 19, 2025 (Holy Saturday)
  },
  {
    name: "Easter Time",
    description:
      "Easter Time is the period of fifty days from Easter Sunday to Pentecost Sunday, celebrating the resurrection of Christ and His saving work.",
    color: "white",
    startDate: new Date(2025, 3, 20), // April 20, 2025 (Easter Sunday)
    endDate: new Date(2025, 4, 18), // May 18, 2025 (Pentecost)
  },
  {
    name: "Ordinary Time II",
    description:
      "The second period of Ordinary Time begins after Pentecost and continues until the beginning of Advent.",
    color: "green",
    startDate: new Date(2025, 4, 19), // May 19, 2025 (day after Pentecost)
    endDate: new Date(2025, 10, 29), // November 29, 2025 (day before Advent)
  },
  {
    name: "Advent",
    description:
      "Advent is a season of preparation for the coming of Christ at Christmas and his second coming at the end of time.",
    color: "purple",
    startDate: new Date(2025, 10, 30), // November 30, 2025 (First Sunday of Advent)
    endDate: new Date(2025, 11, 24), // December 24, 2025 (Christmas Eve)
  },
]

export function getCurrentLiturgicalSeason(date: Date): LiturgicalSeason | null {
  // Ensure we have a valid date
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return null
  }

  // Find the season that contains the given date
  const currentSeason = liturgicalSeasons2025.find((season) => date >= season.startDate && date <= season.endDate)

  return currentSeason || null
}

export function getFeastForDate(date: Date): Feast | null {
  // Ensure we have a valid date
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return null
  }

  const month = date.getMonth() + 1 // JavaScript months are 0-indexed
  const day = date.getDate()

  // Check for fixed feasts
  const fixedFeast = fixedFeasts.find((feast) => feast.month === month && feast.day === day)

  if (fixedFeast) {
    return fixedFeast.feast
  }

  // Default to null if no feast is found
  return null
}

export function getUpcomingFeasts(startDate: Date, count = 5): Array<{ name: string; date: Date }> {
  const result: Array<{ name: string; date: Date }> = []
  const currentYear = startDate.getFullYear()

  // Create dates for all fixed feasts in the current year
  const feastDates = fixedFeasts.map((feast) => {
    const feastDate = new Date(currentYear, feast.month - 1, feast.day)
    return {
      date: feastDate,
      name: feast.feast.name,
    }
  })

  // Filter to only upcoming feasts
  const upcoming = feastDates
    .filter((feast) => feast.date >= startDate)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count)

  return upcoming
}

// Helper function to get the liturgical color class
export function getLiturgicalColorClass(color: string): string {
  switch (color) {
    case "green":
      return "bg-green-600"
    case "purple":
      return "bg-purple-600"
    case "white":
      return "bg-yellow-300" // Using gold/yellow to represent white/gold
    case "red":
      return "bg-red-600"
    case "rose":
      return "bg-pink-400"
    default:
      return "bg-gray-400"
  }
}

// Helper function to get the liturgical color text
export function getLiturgicalColorText(color: string): string {
  switch (color) {
    case "green":
      return "text-green-600"
    case "purple":
      return "text-purple-600"
    case "white":
      return "text-yellow-600" // Using gold/yellow to represent white/gold
    case "red":
      return "text-red-600"
    case "rose":
      return "text-pink-400"
    default:
      return "text-gray-600"
  }
}

// Helper function to get the liturgical color border
export function getLiturgicalColorBorder(color: string): string {
  switch (color) {
    case "green":
      return "border-green-600"
    case "purple":
      return "border-purple-600"
    case "white":
      return "border-yellow-300" // Using gold/yellow to represent white/gold
    case "red":
      return "border-red-600"
    case "rose":
      return "border-pink-400"
    default:
      return "border-gray-400"
  }
}

// Helper function to get the liturgical color background (lighter shade)
export function getLiturgicalColorBg(color: string): string {
  switch (color) {
    case "green":
      return "bg-green-50"
    case "purple":
      return "bg-purple-50"
    case "white":
      return "bg-yellow-50" // Using gold/yellow to represent white/gold
    case "red":
      return "bg-red-50"
    case "rose":
      return "bg-pink-50"
    default:
      return "bg-gray-50"
  }
}

