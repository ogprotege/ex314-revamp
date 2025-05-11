"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@supabase/supabase-js"

export default function ChatAnalyticsDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chatStats, setChatStats] = useState<any>(null)
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month">("week")

  useEffect(() => {
    async function fetchChatAnalytics() {
      try {
        setLoading(true)

        // Initialize Supabase client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createClient(supabaseUrl, supabaseAnonKey)

        // Calculate date range based on timeframe
        const now = new Date()
        const startDate = new Date()

        if (timeframe === "day") {
          startDate.setDate(now.getDate() - 1)
        } else if (timeframe === "week") {
          startDate.setDate(now.getDate() - 7)
        } else if (timeframe === "month") {
          startDate.setMonth(now.getMonth() - 1)
        }

        // Fetch chat analytics summary
        const { data: summaryData, error: summaryError } = await supabase
          .from("chat_analytics_summary")
          .select("*")
          .gte("day", startDate.toISOString())
          .order("day", { ascending: false })

        if (summaryError) {
          throw new Error(`Failed to fetch chat analytics summary: ${summaryError.message}`)
        }

        // Fetch total chats
        const { count: totalChats, error: chatsError } = await supabase
          .from("chat_analytics")
          .select("chat_id", { count: "exact", head: true })
          .eq("event_type", "new_chat")

        if (chatsError) {
          throw new Error(`Failed to fetch total chats: ${chatsError.message}`)
        }

        // Fetch total messages
        const { count: totalMessages, error: messagesError } = await supabase
          .from("chat_analytics")
          .select("id", { count: "exact", head: true })
          .eq("event_type", "chat_message")

        if (messagesError) {
          throw new Error(`Failed to fetch total messages: ${messagesError.message}`)
        }

        // Fetch unique users
        const { count: uniqueUsers, error: usersError } = await supabase
          .from("chat_analytics")
          .select("session_id", { count: "exact", head: true })
          .eq("event_type", "new_chat")

        if (usersError) {
          throw new Error(`Failed to fetch unique users: ${usersError.message}`)
        }

        // Set the stats
        setChatStats({
          summary: summaryData,
          totalChats,
          totalMessages,
          uniqueUsers,
        })
      } catch (err) {
        console.error("Error fetching chat analytics:", err)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchChatAnalytics()
  }, [timeframe])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Chat Analytics Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <div className="mb-6">
          <div className="flex gap-2">
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
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Chats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{chatStats?.totalChats || 0}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{chatStats?.totalMessages || 0}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Unique Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{chatStats?.uniqueUsers || 0}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Event Summary</CardTitle>
                  <CardDescription>Breakdown of chat events for the selected time period</CardDescription>
                </CardHeader>
                <CardContent>
                  {chatStats?.summary && chatStats.summary.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Date</th>
                            <th className="text-left py-2 px-4">Event Type</th>
                            <th className="text-right py-2 px-4">Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chatStats.summary.map((item: any, index: number) => (
                            <tr key={index} className="border-b">
                              <td className="py-2 px-4">{new Date(item.day).toLocaleDateString()}</td>
                              <td className="py-2 px-4">{item.event_type}</td>
                              <td className="py-2 px-4 text-right">{item.event_count}</td>
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

            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Message Analytics</CardTitle>
                  <CardDescription>Detailed analytics about chat messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-4 text-gray-500">
                    Message analytics will be displayed here. This section can be expanded with more detailed message
                    metrics.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                  <CardDescription>Detailed analytics about chat users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-4 text-gray-500">
                    User analytics will be displayed here. This section can be expanded with more detailed user metrics.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
