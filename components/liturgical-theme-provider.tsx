"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentLiturgicalSeason } from "@/lib/liturgical-calendar"

interface LiturgicalThemeContextType {
  isLiturgicalThemeEnabled: boolean
  toggleLiturgicalTheme: () => void
  currentLiturgicalColor: string
  currentSeason: string
  liturgicalTheme?: string
  setLiturgicalTheme?: (theme: string) => void
}

const LiturgicalThemeContext = createContext<LiturgicalThemeContextType>({
  isLiturgicalThemeEnabled: false,
  toggleLiturgicalTheme: () => {},
  currentLiturgicalColor: "white",
  currentSeason: "Ordinary Time",
})

export function LiturgicalThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLiturgicalThemeEnabled, setIsLiturgicalThemeEnabled] = useState(false)
  const [currentLiturgicalColor, setCurrentLiturgicalColor] = useState("white")
  const [currentSeason, setCurrentSeason] = useState("Ordinary Time")
  const [liturgicalTheme, setLiturgicalTheme] = useState("default")

  useEffect(() => {
    // Load preference from localStorage
    const savedPreference = localStorage.getItem("liturgical-theme-enabled")
    if (savedPreference) {
      setIsLiturgicalThemeEnabled(savedPreference === "true")
    }

    // Get current liturgical season and color
    const today = new Date(2025, 4, 9) // May 9, 2025
    const season = getCurrentLiturgicalSeason(today)
    if (season) {
      setCurrentLiturgicalColor(season.color.toLowerCase())
      setCurrentSeason(season.name)
    }
  }, [])

  useEffect(() => {
    // Update liturgical theme based on current season
    switch (currentSeason) {
      case "Advent":
        setLiturgicalTheme("advent")
        break
      case "Christmas":
        setLiturgicalTheme("christmas")
        break
      case "Ordinary Time":
        setLiturgicalTheme("ordinaryTime")
        break
      case "Lent":
        setLiturgicalTheme("lent")
        break
      case "Easter":
        setLiturgicalTheme("easter")
        break
      default:
        setLiturgicalTheme("default")
        break
    }
  }, [currentSeason])

  const toggleLiturgicalTheme = () => {
    const newValue = !isLiturgicalThemeEnabled
    setIsLiturgicalThemeEnabled(newValue)
    localStorage.setItem("liturgical-theme-enabled", newValue.toString())
  }

  return (
    <LiturgicalThemeContext.Provider value={{
      isLiturgicalThemeEnabled,
      toggleLiturgicalTheme,
      currentLiturgicalColor,
      currentSeason,
      liturgicalTheme,
      setLiturgicalTheme
    }}>
      {children}
    </LiturgicalThemeContext.Provider>
  )
}

export const useLiturgicalTheme = (): LiturgicalThemeContextType => {
  const context = useContext(LiturgicalThemeContext)
  if (!context) {
    throw new Error("useLiturgicalTheme must be used within a LiturgicalThemeProvider")
  }
  return context
}

