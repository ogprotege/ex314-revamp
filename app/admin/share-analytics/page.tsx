"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getShareAnalytics, exportShareAnalyticsForTraining } from "@/app/actions/track-share"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download } from "lucide-react"

export default function ShareAnalyticsDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shareStats, setShareStats] = useState<any>(null)
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "all">("week")
  const [activeTab, setActiveTab] = useState("overview")
  const [exportLoading, setExportLoading] = useState(false)
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  useEffect(() => {
    fetchShareAnalytics()
  }, [timeframe, activeTab, fetchShareAnalytics])

  const fetchShareAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      const includeConversationData = activeTab === "conversations" || activeTab === "training"
      const result = await getShareAnalytics(timeframe, includeConversationData)

      if (result.success) {
        setShareStats(result.data)
      } else {
        setError(result.error || "Failed to fetch share analytics")
      }
    } catch (err) {
      console.error("Error fetching share analytics:", err)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [timeframe, activeTab])

  const handleExportData = async () => {
    try {
      setExportLoading(true)
      const result = await exportShareAnalyticsForTraining(startDate || undefined, endDate || undefined)

      if (result.success && result.data) {
        // Convert data to CSV
        const headers = Object.keys(result.data[0] || {}).join(",")
        const rows = result.data
          .map((row: any) => {
            return Object.values(row)
              .map((value) => {
                if (typeof value === "object") {
                  return `"${JSON.stringify(value).replace(/"/g, '""')}"`
                }
                return `"${String(value).replace(/"/g, '""')}"`
              })
              .join(",")
          })
          .join("\n")

        const csv = `${headers}\n${rows}`

        // Create and download CSV file
        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `share-analytics-export-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        setError(result.error || "Failed to export data")
      }
    } catch (err) {
      console.error("Error exporting data:", err)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setExportLoading(false)
    }
  }

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  // Format platform names for display
  const formatPlatformName = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Share Analytics Dashboard</h1>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="conversations">Conversation Context</TabsTrigger>
          <TabsTrigger value="training">Training Data</TabsTrigger>
        </TabsList>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTimeframe("day")}
              className={`px-3 py-1 rounded ${timeframe === "day" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Last 24 Hours
            </button>
            <button
              onClick={() => setTimeframe("week")}
              className={`px-3 py-1 rounded ${timeframe === "week" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeframe("month")}
              className={`px-3 py-1 rounded ${timeframe === "month" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeframe("all")}
              className={`px-3 py-1 rounded ${timeframe === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              All Time
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading analytics data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p className="font-medium">Error loading analytics</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Shares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{shareStats?.total || 0}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Most Popular Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {shareStats?.byPlatform && shareStats.byPlatform.length > 0
                        ? formatPlatformName(shareStats.byPlatform[0].platform)
                        : "N/A"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {timeframe === "day" ? "Today's" : timeframe === "week" ? "This Week's" : "This Month's"} Shares
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {shareStats?.dailyTrend && shareStats.dailyTrend.length > 0
                        ? shareStats.dailyTrend.reduce((sum: number, day: any) => sum + day.count, 0)
                        : 0}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Shares by Platform</CardTitle>
                    <CardDescription>Distribution of shares across different platforms</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    {shareStats?.byPlatform && shareStats.byPlatform.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={shareStats.byPlatform}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="platform"
                            label={({ platform }) => formatPlatformName(platform)}
                          >
                            {shareStats.byPlatform.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [value, formatPlatformName(name as string)]} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Daily Share Trend</CardTitle>
                    <CardDescription>Number of shares over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    {shareStats?.dailyTrend && shareStats.dailyTrend.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={shareStats.dailyTrend}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="day"
                            tickFormatter={(day) => {
                              const date = new Date(day)
                              return `${date.getMonth() + 1}/${date.getDate()}`
                            }}
                          />
                          <YAxis allowDecimals={false} />
                          <Tooltip
                            labelFormatter={(day) => {
                              const date = new Date(day)
                              return date.toLocaleDateString()
                            }}
                          />
                          <Bar dataKey="count" fill="#8884d8" name="Shares" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="platforms">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Breakdown</CardTitle>
                  <CardDescription>Detailed breakdown of shares by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  {shareStats?.byPlatform && shareStats.byPlatform.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Platform</th>
                            <th className="text-right py-2 px-4">Shares</th>
                            <th className="text-right py-2 px-4">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shareStats.byPlatform.map((platform: any, index: number) => (
                            <tr key={index} className="border-b">
                              <td className="py-2 px-4">{formatPlatformName(platform.platform)}</td>
                              <td className="py-2 px-4 text-right">{platform.count}</td>
                              <td className="py-2 px-4 text-right">
                                {((platform.count / shareStats.total) * 100).toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">No data available for the selected time period</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversations">
              <Card>
                <CardHeader>
                  <CardTitle>Conversation Context</CardTitle>
                  <CardDescription>Detailed information about conversation context during shares</CardDescription>
                </CardHeader>
                <CardContent>
                  {shareStats?.conversationData && shareStats.conversationData.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Date</th>
                            <th className="text-left py-2 px-4">Platform</th>
                            <th className="text-left py-2 px-4">Topic</th>
                            <th className="text-left py-2 px-4">Queries</th>
                            <th className="text-left py-2 px-4">Content Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shareStats.conversationData.map((item: any, index: number) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="py-2 px-4">
                                {new Date(item.timestamp).toLocaleDateString()}{" "}
                                {new Date(item.timestamp).toLocaleTimeString()}
                              </td>
                              <td className="py-2 px-4">{formatPlatformName(item.platform)}</td>
                              <td className="py-2 px-4">{item.conversation_topic || "N/A"}</td>
                              <td className="py-2 px-4">{item.query_count || "N/A"}</td>
                              <td className="py-2 px-4">{item.content_type || "N/A"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">
                      No conversation data available for the selected time period
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Export Training Data</CardTitle>
                      <CardDescription>Export comprehensive data for model training</CardDescription>
                    </div>
                    <Button onClick={handleExportData} disabled={exportLoading} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      {exportLoading ? "Exporting..." : "Export Data"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Date (Optional)</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Data Fields Included in Export:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Platform used for sharing</li>
                      <li>URL shared</li>
                      <li>Timestamp</li>
                      <li>Session ID (anonymized)</li>
                      <li>User ID (if authenticated)</li>
                      <li>Device and browser information</li>
                      <li>Conversation context (topic, query count, etc.)</li>
                      <li>Content details (title, type, tags)</li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-600">
                      This data is exported in CSV format and can be used for training your model to understand sharing
                      patterns and optimize content.
                    </p>
                  </div>

                  {shareStats?.conversationData && shareStats.conversationData.length > 0 ? (
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Preview of Available Data:</h3>
                      <div className="overflow-x-auto max-h-80 border rounded">
                        <table className="w-full border-collapse">
                          <thead className="bg-gray-100 sticky top-0">
                            <tr>
                              <th className="text-left py-2 px-4 text-sm">Date</th>
                              <th className="text-left py-2 px-4 text-sm">Platform</th>
                              <th className="text-left py-2 px-4 text-sm">Topic</th>
                              <th className="text-left py-2 px-4 text-sm">Content</th>
                            </tr>
                          </thead>
                          <tbody>
                            {shareStats.conversationData.slice(0, 10).map((item: any, index: number) => (
                              <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4 text-sm">{new Date(item.timestamp).toLocaleDateString()}</td>
                                <td className="py-2 px-4 text-sm">{formatPlatformName(item.platform)}</td>
                                <td className="py-2 px-4 text-sm">{item.conversation_topic || "N/A"}</td>
                                <td className="py-2 px-4 text-sm">{item.content_title || "N/A"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Showing {Math.min(10, shareStats.conversationData.length)} of{" "}
                        {shareStats.conversationData.length} records
                      </p>
                    </div>
                  ) : (
                    <p className="text-center py-4 mt-4 text-gray-500">
                      No training data available for the selected time period
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}

