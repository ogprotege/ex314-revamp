"use client"

import { Button } from "@/components/ui/button"
import { useLiturgicalTheme } from "./liturgical-theme-provider"
import { PaletteIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LiturgicalThemeToggle() {
  const { isLiturgicalThemeEnabled, toggleLiturgicalTheme, currentSeason, currentLiturgicalColor } =
    useLiturgicalTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <PaletteIcon className="h-[1.2rem] w-[1.2rem]" />
          {isLiturgicalThemeEnabled && (
            <span
              className="absolute bottom-0 right-0 h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  currentLiturgicalColor === "green"
                    ? "#10b981"
                    : currentLiturgicalColor === "purple"
                      ? "#8b5cf6"
                      : currentLiturgicalColor === "white"
                        ? "#f9fafb"
                        : currentLiturgicalColor === "red"
                          ? "#ef4444"
                          : currentLiturgicalColor === "rose"
                            ? "#f472b6"
                            : currentLiturgicalColor === "black"
                              ? "#171717"
                              : "#f9fafb",
              }}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleLiturgicalTheme}>
          {isLiturgicalThemeEnabled ? "Use Standard Theme" : `Use Liturgical Theme (${currentSeason})`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
