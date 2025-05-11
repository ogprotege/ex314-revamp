"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

type TimelineEvent = {
  year: string
  title: string
  description: string
  category: "development" | "council" | "reform" | "document"
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1st Century",
    title: "Early Christian Worship",
    description:
      "The earliest Christians, following Jewish tradition, observed the Sabbath but began gathering on 'the first day of the week' (Sunday) to commemorate Christ's resurrection. The celebration of Easter was the first annual observance.",
    category: "development",
  },
  {
    year: "2nd Century",
    title: "Development of Easter Celebration",
    description:
      "By the second century, Easter was universally celebrated, though there were controversies about the date (Quartodeciman controversy). The season of preparation before Easter (later known as Lent) began to develop.",
    category: "development",
  },
  {
    year: "3rd-4th Century",
    title: "Christmas and Epiphany",
    description:
      "The celebration of Christ's birth on December 25 (Christmas) emerged in Rome around the 4th century, while the Eastern churches celebrated Epiphany (January 6) as the primary feast of Christ's manifestation.",
    category: "development",
  },
  {
    year: "4th Century",
    title: "Formalization After Constantine",
    description:
      "After Christianity became legal under Emperor Constantine, liturgical practices became more formalized. The Council of Nicaea (325) established rules for calculating the date of Easter.",
    category: "council",
  },
  {
    year: "5th-6th Century",
    title: "Development of Advent",
    description:
      "Advent emerged as a preparatory season for Christmas, initially with a penitential character similar to Lent. The liturgical year began to take a more defined shape with distinct seasons.",
    category: "development",
  },
  {
    year: "7th-8th Century",
    title: "Roman Influence",
    description:
      "The Roman liturgical calendar spread throughout Western Europe, influenced by the Gregorian Sacramentary. Feast days of martyrs and saints became more prominent in local calendars.",
    category: "development",
  },
  {
    year: "9th-10th Century",
    title: "Carolingian Reforms",
    description:
      "Under Charlemagne and his successors, liturgical practices were standardized across the Frankish Empire, further solidifying the structure of the liturgical year.",
    category: "reform",
  },
  {
    year: "12th-13th Century",
    title: "Feast of Corpus Christi",
    description:
      "New feasts were added, including Corpus Christi (established in 1264), reflecting theological developments and popular devotions of the medieval period.",
    category: "development",
  },
  {
    year: "16th Century",
    title: "Council of Trent",
    description:
      "The Council of Trent (1545-1563) reformed and standardized the Roman liturgical calendar in response to the Protestant Reformation, resulting in the Tridentine Calendar used for the next 400 years.",
    category: "council",
  },
  {
    year: "1568",
    title: "Tridentine Calendar",
    description:
      "Pope Pius V promulgated the Tridentine Missal, which included a standardized liturgical calendar that would remain largely unchanged until the 20th century.",
    category: "reform",
  },
  {
    year: "1910-1914",
    title: "Reforms of Pope Pius X",
    description:
      "Pope Pius X reformed the Breviary and emphasized the importance of Sundays over saints' feasts, beginning a process of liturgical renewal.",
    category: "reform",
  },
  {
    year: "1955",
    title: "Holy Week Reforms",
    description:
      "Pope Pius XII reformed the Holy Week liturgies, restoring the Easter Vigil to the evening and making other significant changes to better reflect ancient traditions.",
    category: "reform",
  },
  {
    year: "1962-1965",
    title: "Second Vatican Council",
    description:
      "The Second Vatican Council called for a comprehensive reform of the liturgy in the Constitution on the Sacred Liturgy (Sacrosanctum Concilium), leading to major changes in the liturgical calendar.",
    category: "council",
  },
  {
    year: "1969",
    title: "Calendar Reform",
    description:
      "Pope Paul VI promulgated the revised Roman Calendar, which simplified the ranking of feasts, reduced the number of saints' days, and established the current structure of the liturgical year with Ordinary Time.",
    category: "reform",
  },
  {
    year: "1980",
    title: "Second Edition of Roman Missal",
    description:
      "The second edition of the Roman Missal included additional saints and further refinements to the liturgical calendar.",
    category: "document",
  },
  {
    year: "2002",
    title: "Third Edition of Roman Missal",
    description:
      "The third edition of the Roman Missal, implemented in English in 2011, included additional saints' days and other calendar adjustments.",
    category: "document",
  },
  {
    year: "2007",
    title: "Summorum Pontificum",
    description:
      "Pope Benedict XVI's motu proprio allowed for wider use of the 1962 Missal (Extraordinary Form), which follows the pre-Vatican II calendar, creating a situation where two liturgical calendars exist side by side.",
    category: "document",
  },
  {
    year: "Present Day",
    title: "Ongoing Development",
    description:
      "The liturgical calendar continues to evolve with the addition of new saints and occasional adjustments to feast days, reflecting the living tradition of the Church.",
    category: "development",
  },
]

export function LiturgicalTimeline() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const toggleEvent = (year: string) => {
    if (expandedEvent === year) {
      setExpandedEvent(null)
    } else {
      setExpandedEvent(year)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "development":
        return "bg-blue-100 border-blue-300 text-blue-800"
      case "council":
        return "bg-purple-100 border-purple-300 text-purple-800"
      case "reform":
        return "bg-green-100 border-green-300 text-green-800"
      case "document":
        return "bg-amber-100 border-amber-300 text-amber-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "development":
        return "Historical Development"
      case "council":
        return "Church Council"
      case "reform":
        return "Liturgical Reform"
      case "document":
        return "Church Document"
      default:
        return category
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-bold">Historical Timeline of the Liturgical Calendar</h2>
        <p className="text-gray-600">
          Explore how the Catholic liturgical calendar developed over 2,000 years of Church history.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="px-3 py-1 text-xs rounded-full bg-blue-100 border border-blue-300 text-blue-800">
            Historical Development
          </div>
          <div className="px-3 py-1 text-xs rounded-full bg-purple-100 border border-purple-300 text-purple-800">
            Church Council
          </div>
          <div className="px-3 py-1 text-xs rounded-full bg-green-100 border border-green-300 text-green-800">
            Liturgical Reform
          </div>
          <div className="px-3 py-1 text-xs rounded-full bg-amber-100 border border-amber-300 text-amber-800">
            Church Document
          </div>
        </div>
      </div>

      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 pl-6 md:pl-8 space-y-8">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[34px] md:-left-[42px] mt-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white bg-gray-200 shadow"></div>

            {/* Year label */}
            <div className="absolute -left-[130px] md:-left-[150px] w-[100px] md:w-[120px] text-right pr-4 font-medium text-gray-600">
              {event.year}
            </div>

            {/* Content card */}
            <Card className="ml-2">
              <CardHeader className="py-3 px-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${getCategoryColor(event.category)}`}
                      >
                        {getCategoryName(event.category)}
                      </span>
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => toggleEvent(event.year)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label={expandedEvent === event.year ? "Collapse details" : "Expand details"}
                  >
                    {expandedEvent === event.year ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </CardHeader>
              {expandedEvent === event.year && (
                <CardContent className="py-3 px-4 pt-0 animate-fadeIn">
                  <p className="text-gray-700">{event.description}</p>
                </CardContent>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
