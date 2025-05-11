"use client"

import { useLiturgicalTheme } from "./liturgical-theme-provider"

export function LiturgicalSeasonIndicator() {
  const { currentSeason, currentLiturgicalColor, isLiturgicalThemeEnabled } = useLiturgicalTheme()

  if (!isLiturgicalThemeEnabled) return null

  return (
    <div className="liturgical-season-indicator">
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{
          backgroundColor:
            currentLiturgicalColor === "green"
              ? "#10b981"
              : currentLiturgicalColor === "purple"
                ? "#8b5cf6"
                : currentLiturgicalColor === "white"
                  ? "#D4AF37"
                  : currentLiturgicalColor === "red"
                    ? "#ef4444"
                    : currentLiturgicalColor === "rose"
                      ? "#f472b6"
                      : currentLiturgicalColor === "black"
                        ? "#171717"
                        : "#D4AF37",
        }}
      />
      <span>{currentSeason}</span>
    </div>
  )
}
