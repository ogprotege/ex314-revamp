type LiturgicalSeason = {
  name: string
  description: string
  color: string
}

type Feast = {
  name: string
  date: string // Format: MM-DD
  type: "Solemnity" | "Feast" | "Memorial" | "Optional Memorial"
  color: string
}

type Saint = {
  name: string
  feast_day: string
  description: string
  type: "Solemnity" | "Feast" | "Memorial" | "Optional Memorial"
  color: string
  readings: string[]
}

// Get current liturgical season based on date
export function getCurrentSeason(date: Date): LiturgicalSeason {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  // This is a simplified version - a real implementation would need to calculate Easter
  // and other moveable feasts for the specific year

  // For 2025, Easter is April 20
  const easter2025 = new Date(2025, 3, 20) // April 20, 2025
  const pentecost2025 = new Date(2025, 4, 18) // May 18, 2025
  const ordinaryTime = new Date(2025, 5, 19) // June 19, 2025 (after Pentecost)

  // Check if we're in Easter season (Easter to Pentecost)
  if (date >= easter2025 && date < pentecost2025) {
    return {
      name: "Easter Time",
      description:
        "Easter Time is the period of fifty days from Easter Sunday to Pentecost Sunday, celebrating the resurrection of Christ and His saving work.",
      color: "White",
    }
  }

  // Check if we're in Ordinary Time after Pentecost
  if (date >= pentecost2025 && date < new Date(2025, 10, 30)) {
    // Before Advent
    return {
      name: "Ordinary Time",
      description:
        "Ordinary Time is the period in the liturgical year outside of the distinct seasons like Advent, Christmas, Lent, and Easter. It's a time for growth and maturation, a time to deepen one's faith.",
      color: "Green",
    }
  }

  // Default for May 2025 (which is Easter Time)
  return {
    name: "Easter Time",
    description:
      "Easter Time is the period of fifty days from Easter Sunday to Pentecost Sunday, celebrating the resurrection of Christ and His saving work.",
    color: "White",
  }
}

// Get upcoming feasts
export function getUpcomingFeasts(date: Date): Feast[] {
  const month = date.getMonth() + 1
  const day = date.getDate()

  // For May 2025
  const may2025Feasts = [
    {
      name: "Ascension of the Lord",
      date: "05-11",
      type: "Solemnity",
      color: "White",
    },
    {
      name: "St. Matthias",
      date: "05-14",
      type: "Feast",
      color: "Red",
    },
    {
      name: "Pentecost Sunday",
      date: "05-18",
      type: "Solemnity",
      color: "Red",
    },
    {
      name: "Trinity Sunday",
      date: "05-25",
      type: "Solemnity",
      color: "White",
    },
    {
      name: "Corpus Christi",
      date: "06-01",
      type: "Solemnity",
      color: "White",
    },
  ]

  // Filter to only show upcoming feasts
  return may2025Feasts.filter((feast) => {
    const [feastMonth, feastDay] = feast.date.split("-").map(Number)

    // If feast is in a future month
    if (feastMonth > month) return true

    // If feast is in the current month but on a future day
    if (feastMonth === month && feastDay >= day) return true

    return false
  })
}

// Get saint of the day
export function getSaintOfDay(date: Date): Saint | null {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dateString = `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`

  const saintsMap: Record<string, Saint> = {
    "05-09": {
      name: "St. Gregory Nazianzen",
      feast_day: "May 9",
      description:
        "St. Gregory Nazianzen was a 4th-century Archbishop of Constantinople and theologian. He is widely considered the most accomplished rhetorical stylist of the patristic age. Along with Basil the Great and Gregory of Nyssa, he is known as one of the Cappadocian Fathers.",
      type: "Memorial",
      color: "White",
      readings: ["Acts 18:9-18", "Psalm 47:2-7", "John 16:20-23"],
    },
    "05-10": {
      name: "St. Damien of Molokai",
      feast_day: "May 10",
      description: "Missionary priest who ministered to people with leprosy in Hawaii",
      type: "Optional Memorial",
      color: "White",
      readings: ["Acts 18:23-28", "Psalm 47:2-3, 8-10", "John 16:23-28"],
    },
    "05-11": {
      name: "Ascension of the Lord",
      feast_day: "May 11",
      description: "Celebrates Jesus's ascension into heaven 40 days after his resurrection",
      type: "Solemnity",
      color: "White",
      readings: ["Acts 1:1-11", "Psalm 47:2-3, 6-9", "Ephesians 1:17-23", "Mark 16:15-20"],
    },
    "05-12": {
      name: "Sts. Nereus and Achilleus",
      feast_day: "May 12",
      description: "Roman soldiers who converted to Christianity and were martyred",
      type: "Optional Memorial",
      color: "Red",
      readings: ["Acts 19:1-8", "Psalm 68:2-7", "John 16:29-33"],
    },
    "05-13": {
      name: "Our Lady of Fatima",
      feast_day: "May 13",
      description: "Commemorates the apparitions of the Virgin Mary to three shepherd children in Fatima, Portugal",
      type: "Optional Memorial",
      color: "White",
      readings: ["Acts 20:17-27", "Psalm 68:10-11, 20-21", "John 17:1-11"],
    },
    "05-14": {
      name: "St. Matthias",
      feast_day: "May 14",
      description: "Apostle chosen to replace Judas Iscariot",
      type: "Feast",
      color: "Red",
      readings: ["Acts 1:15-17, 20-26", "Psalm 113:1-8", "John 15:9-17"],
    },
    "05-15": {
      name: "St. Isidore the Farmer",
      feast_day: "May 15",
      description: "Spanish farmworker known for his piety and charity",
      type: "Optional Memorial",
      color: "White",
      readings: ["Acts 22:30; 23:6-11", "Psalm 16:1-2, 5, 7-11", "John 17:20-26"],
    },
  }

  return saintsMap[dateString] || null
}
