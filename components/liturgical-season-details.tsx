"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { liturgicalSeasons, type LiturgicalSeasonDetail } from "@/lib/liturgical-seasons-data"

export function LiturgicalSeasonDetails() {
  const [activeSeason, setActiveSeason] = useState<string>("easter")

  const getSeasonColor = (color: string) => {
    switch (color.toLowerCase()) {
      case "green":
        return "bg-green-600"
      case "purple":
        return "bg-purple-600"
      case "white":
        return "bg-yellow-500" // Gold for white
      case "red":
        return "bg-red-600"
      case "rose":
        return "bg-pink-400"
      case "black":
        return "bg-black"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="easter" value={activeSeason} onValueChange={setActiveSeason}>
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
          {liturgicalSeasons.map((season) => (
            <TabsTrigger key={season.id} value={season.id} className="flex items-center gap-2 text-xs md:text-sm">
              <span className={`w-2 h-2 rounded-full ${getSeasonColor(season.color)}`}></span>
              <span className="truncate">{season.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {liturgicalSeasons.map((season) => (
          <TabsContent key={season.id} value={season.id} className="space-y-6">
            <SeasonDetail season={season} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function SeasonDetail({ season }: { season: LiturgicalSeasonDetail }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl md:text-3xl font-bold">{season.name}</h2>
        <div
          className={`w-4 h-4 rounded-full ${
            season.color.toLowerCase() === "green"
              ? "bg-green-600"
              : season.color.toLowerCase() === "purple"
                ? "bg-purple-600"
                : season.color.toLowerCase() === "white"
                  ? "bg-yellow-500"
                  : season.color.toLowerCase() === "red"
                    ? "bg-red-600"
                    : season.color.toLowerCase() === "rose"
                      ? "bg-pink-400"
                      : "bg-black"
          }`}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>{season.timeframe}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{season.description}</p>
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  season.color.toLowerCase() === "green"
                    ? "bg-green-600"
                    : season.color.toLowerCase() === "purple"
                      ? "bg-purple-600"
                      : season.color.toLowerCase() === "white"
                        ? "bg-yellow-500"
                        : season.color.toLowerCase() === "red"
                          ? "bg-red-600"
                          : season.color.toLowerCase() === "rose"
                            ? "bg-pink-400"
                            : "bg-black"
                }`}
              ></div>
              <span className="text-sm">Liturgical Color: {season.color}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historical Background</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{season.history}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theological Significance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{season.significance}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liturgical Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{season.practices}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scripture Emphasis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{season.scriptureEmphasis}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prayers & Devotions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {season.prayers.map((prayer, index) => (
                <li key={index}>{prayer}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Dates & Celebrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {season.keyDates.map((date, index) => (
              <div key={index} className="border rounded-md p-3">
                <h4 className="font-medium mb-1">{date.name}</h4>
                <p className="text-sm text-gray-600">{date.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
