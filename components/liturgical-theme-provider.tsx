"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentLiturgicalSeason } from "@/lib/liturgical-calendar"

type LiturgicalThemeContextType = {
  isLiturgicalThemeEnabled: boolean
  toggleLiturgicalTheme: () => void
  currentLiturgicalColor: string
  currentSeason: string
}

const LiturgicalThemeContext = createContext<LiturgicalThemeContextType>({
  isLiturgicalThemeEnabled: false,
  toggleLiturgicalTheme: () => {},
  currentLiturgicalColor: "white",
  currentSeason: "Ordinary Time",
})

export const useLiturgicalTheme = () => useContext(LiturgicalThemeContext)

export function LiturgicalThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLiturgicalThemeEnabled, setIsLiturgicalThemeEnabled] = useState(false)
  const [currentLiturgicalColor, setCurrentLiturgicalColor] = useState("white")
  const [currentSeason, setCurrentSeason] = useState("Ordinary Time")

  useEffect(() => {
    // Load preference from localStorage
    const savedPreference = localStorage.getItem("liturgical-theme-enabled")
    if (savedPreference) {
      setIsLiturgicalThemeEnabled(savedPreference === "true")
    }

    // Get current liturgical season and color
    const today = new Date(2025, 4, 9) // May 9, 2025
    const season = getCurrentLiturgicalSeason(today)
    setCurrentLiturgicalColor(season.color.toLowerCase())
    setCurrentSeason(season.name)
  }, [])

  useEffect(() => {
    if (!isLiturgicalThemeEnabled) return

    // Apply liturgical colors to the document
    const root = document.documentElement

    // Remove any existing liturgical color classes
    root.classList.remove(
      "liturgical-green",
      "liturgical-purple",
      "liturgical-white",
      "liturgical-red",
      "liturgical-rose",
      "liturgical-black",
    )

    // Add the current liturgical color class
    root.classList.add(`liturgical-${currentLiturgicalColor.toLowerCase()}`)

    // Store preference
    localStorage.setItem("liturgical-theme-enabled", String(isLiturgicalThemeEnabled))
  }, [isLiturgicalThemeEnabled, currentLiturgicalColor])

  const toggleLiturgicalTheme = () => {
    setIsLiturgicalThemeEnabled((prev) => !prev)
  }

  return (
    <LiturgicalThemeContext.Provider
      value={{
        isLiturgicalThemeEnabled,
        toggleLiturgicalTheme,
        currentLiturgicalColor,
        currentSeason,
      }}
    >
      {children}
    </LiturgicalThemeContext.Provider>
  )
}
