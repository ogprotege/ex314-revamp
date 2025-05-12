"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { useTheme } from "next-themes"
import { getCurrentLiturgicalSeason } from "@/lib/liturgical-calendar"

interface LiturgicalThemeContextProps {
  liturgicalTheme: string
  setLiturgicalTheme: (theme: string) => void
}

const LiturgicalThemeContext = createContext<LiturgicalThemeContextProps | null>(null)

interface LiturgicalThemeProviderProps {
  children: ReactNode
}

export const LiturgicalThemeProvider: React.FC<LiturgicalThemeProviderProps> = ({ children }) => {
  const [liturgicalTheme, setLiturgicalTheme] = useState<string>("default")
  const { theme } = useTheme()

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

