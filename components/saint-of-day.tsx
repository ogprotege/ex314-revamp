"use client"

import { useState, useEffect } from "react"
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

// Hardcoded saints data for different days
const saintsData: Record<string, Saint> = {
  // Format: "MM-DD": Saint
  "05-10": {
    name: "St. Damien of Molokai",
    feast_day: "May 10",
    description: "Missionary priest who ministered to people with leprosy in Hawaii",
    patronage: "People with leprosy, outcasts, Hawaii",
    full_description:
      "St. Damien of Molokai (1840-1889), born Jozef De Veuster in Belgium, was a Roman Catholic priest and member of the Congregation of the Sacred Hearts of Jesus and Mary. He is best known for his ministry to people with leprosy (Hansen's disease) on the island of Molokai in Hawaii. After 16 years of dedicated service, he eventually contracted and died of the disease himself. His selfless dedication to the isolated leper colony led to his canonization in 2009. Pope Benedict XVI described him as a 'spiritual light' for the afflicted and marginalized.",
  },
  "05-11": {
    name: "St. Ignatius of Laconi",
    feast_day: "May 11",
    description: "Capuchin friar known for his humility and service to the poor",
    patronage: "Beggars, students",
    full_description:
      "St. Ignatius of Laconi (1701-1781) was a Capuchin Franciscan friar from Sardinia, Italy. Born Francis Ignatius Vincent Peis, he joined the Capuchins after recovering from a serious illness. For 40 years, he served as a questor (beggar) for his community, collecting alms with great humility. Despite his simple role, he became known for his holiness, wisdom, and ability to read hearts. He was particularly devoted to helping the poor and sick. He was canonized in 1951 by Pope Pius XII.",
  },
  "05-12": {
    name: "Sts. Nereus and Achilleus",
    feast_day: "May 12",
    description: "Early Christian martyrs who were Roman soldiers before their conversion",
    patronage: "Roman soldiers, converts",
    full_description:
      "Saints Nereus and Achilleus were Roman soldiers who converted to Christianity and were martyred during the reign of Emperor Trajan around 100 AD. According to tradition, they were members of the Praetorian Guard who witnessed the courage of Christian martyrs and subsequently converted. They were beheaded for refusing to sacrifice to idols. Pope Damasus I (366-384) placed an inscription at their burial site praising their courage in abandoning the military to follow Christ. Their feast day commemorates their witness to the transformative power of faith.",
  },
  "05-13": {
    name: "Our Lady of Fatima",
    feast_day: "May 13",
    description: "Commemorates the apparitions of the Virgin Mary to three shepherd children in Portugal",
    patronage: "Portugal, peace in the world",
    full_description:
      "Our Lady of Fatima commemorates the apparitions of the Virgin Mary to three shepherd children—Lucia, Francisco, and Jacinta—in Fatima, Portugal, in 1917. Over a series of six appearances from May to October, Mary revealed three secrets concerning prayer, penance, and the wars and persecutions that would afflict humanity. The message of Fatima emphasizes devotion to the Immaculate Heart of Mary, the recitation of the Rosary, and prayer for the conversion of sinners. The feast day was officially established in 1952 by Pope Pius XII and is celebrated worldwide.",
  },
  "05-14": {
    name: "St. Matthias",
    feast_day: "May 14",
    description: "Apostle chosen to replace Judas Iscariot after his betrayal",
    patronage: "Carpenters, tailors, reformed alcoholics",
    full_description:
      "St. Matthias was the apostle chosen by the early Church to replace Judas Iscariot following his betrayal of Jesus and subsequent death. As recounted in the Acts of the Apostles, Matthias was selected by lot from among the disciples who had accompanied Jesus throughout his ministry. Little else is known about him from the New Testament. According to tradition, he preached in Judea and then in Cappadocia and the region around the Caspian Sea. Various accounts suggest he was martyred either by crucifixion or by beheading. He is often depicted in art with an axe, symbolizing his martyrdom.",
  },
}

export function SaintOfDay() {
  const [saint, setSaint] = useState<Saint | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Get today's date in MM-DD format
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    const dateKey = `${month}-${day}`

    // Get saint for today or default to May 10th if not found
    const todaySaint = saintsData[dateKey] || saintsData["05-10"]

    // Simulate loading for a smoother experience
    const timer = setTimeout(() => {
      setSaint(todaySaint)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Saint of the Day</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{saint.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{saint.feast_day}</p>
        <p className="text-gray-600 mb-4">{saint.description}</p>

        {expanded && saint.full_description && (
          <div className="text-gray-600 mb-4 animate-fadeIn">{saint.full_description}</div>
        )}

        {saint.patronage && (
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium">Patron of:</span> {saint.patronage}
          </p>
        )}

        {saint.full_description && (
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
        )}
      </CardContent>
    </Card>
  )
}

export default SaintOfDay
