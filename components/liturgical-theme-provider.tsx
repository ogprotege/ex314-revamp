"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentSeason } from "@/lib/liturgical-calendar"

interface LiturgicalThemeContextProps {
  liturgicalTheme: string
  setLiturgicalTheme: (theme: string) => void
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
    const season = getCurrentSeason(today)
    setCurrentLiturgicalColor(season.color.toLowerCase())
    setCurrentSeason(season.name)
  }, [])

  useEffect(() => {
    const season = getCurrentLiturgicalSeason()
    switch (season) {
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
  }, [theme])

  return (
    <LiturgicalThemeContext.Provider value={{ liturgicalTheme, setLiturgicalTheme }}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
        {children}
      </ThemeProvider>
    </LiturgicalThemeContext.Provider>
  )
}

export const useLiturgicalTheme = (): LiturgicalThemeContextProps => {
  const context = useContext(LiturgicalThemeContext)
  if (!context) {
    throw new Error("useLiturgicalTheme must be used within a LiturgicalThemeProvider")
  }
  return context
}

