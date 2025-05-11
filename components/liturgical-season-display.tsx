"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  getCurrentLiturgicalSeason,
  getLiturgicalColorClass,
  getLiturgicalColorText,
  getLiturgicalColorBorder,
  getLiturgicalColorBg,
} from "@/lib/liturgical-calendar"

export default function LiturgicalSeasonDisplay({ date = new Date() }: { date?: Date }) {
  const [expanded, setExpanded] = useState(false)
  const currentSeason = getCurrentLiturgicalSeason(date)

  if (!currentSeason) {
    return null
  }

  const colorClass = getLiturgicalColorClass(currentSeason.color)
  const textColorClass = getLiturgicalColorText(currentSeason.color)
  const borderColorClass = getLiturgicalColorBorder(currentSeason.color)
  const bgColorClass = getLiturgicalColorBg(currentSeason.color)

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${bgColorClass}`}>
      <div className={`p-6 border-l-4 ${borderColorClass}`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className={`text-2xl font-bold ${textColorClass}`}>{currentSeason.name}</h2>
            <div className="flex items-center mt-2">
              <div className={`w-4 h-4 rounded-full ${colorClass} mr-2`}></div>
              <span className="text-gray-600">
                Liturgical Color: {currentSeason.color.charAt(0).toUpperCase() + currentSeason.color.slice(1)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${textColorClass}`}
            aria-label={expanded ? "Show less" : "Show more"}
          >
            {expanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 animate-fadeIn">
            <p className="text-gray-700">{currentSeason.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Start Date:</span>{" "}
                {currentSeason.startDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div>
                <span className="font-medium">End Date:</span>{" "}
                {currentSeason.endDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
