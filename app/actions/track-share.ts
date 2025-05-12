"use server"

import { createClient } from "@supabase/supabase-js"
import { headers } from "next/headers"
import { cookies } from "next/headers"
import { auth } from "@clerk/nextjs/server"
import { UAParser } from "ua-parser-js"

// Initialize Supabase client with service role key for server operations
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export type SharePlatform = "facebook" | "twitter" | "linkedin" | "whatsapp" | "email" | "copy" | "embed"

interface ConversationContext {
  topic?: string
  length?: number
  query_count?: number
  last_query?: string
  conversation_id?: string
  page_context?: string
  referral_source?: string
  user_journey?: string[]
}

interface ContentShared {
  title?: string
  type?: string
  url: string
  text?: string
  image_url?: string
  tags?: string[]
}

export async function trackShareEvent(
  platform: SharePlatform,
  url: string,
  conversationContext?: ConversationContext,
  contentShared?: Partial<ContentShared>,
) {
  try {
    // Get basic request info for analytics
    const headersList = headers()
    const cookieStore = cookies()
    const userAgent = headersList.get("user-agent") || "unknown"
    const referer = headersList.get("referer") || "unknown"
    const ipAddress = headersList.get("x-forwarded-for") || "unknown"

    // Get session ID from cookies or generate a new one
    let sessionId = cookieStore.get("session_id")?.value
    if (!sessionId) {
      sessionId = crypto.randomUUID()
    }

    // Get user ID if authenticated
    const { userId } = auth()

    // Parse user agent for device and browser info
    const parser = new UAParser(userAgent)
    const deviceInfo = {
      device: parser.getDevice(),
      os: parser.getOS(),
      cpu: parser.getCPU(),
    }

    const browserInfo = {
      browser: parser.getBrowser(),
      engine: parser.getEngine(),
    }

    // Prepare content shared data
    const fullContentShared: ContentShared = {
      url,
      ...contentShared,
    }

    // Insert share event into database with comprehensive data
    const { data, error } = await supabase
      .from("share_analytics")
      .insert({
        platform,
        shared_url: url,
        user_agent: userAgent,
        referer,
        ip_address: ipAddress,
        session_id: sessionId,
        user_id: userId,
        device_info: deviceInfo,
        browser_info: browserInfo,
        conversation_context: conversationContext || {},
        content_shared: fullContentShared,
        timestamp: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error tracking share event:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in trackShareEvent:", error)
    return { success: false, error: String(error) }
  }
}

export async function getShareAnalytics(
  timeframe: "day" | "week" | "month" | "all" = "all",
  includeConversationData = false,
) {
  try {
    // Calculate date range based on timeframe
    let startDate: Date | null = null
    const now = new Date()

    if (timeframe !== "all") {
      startDate = new Date()
      if (timeframe === "day") {
        startDate.setDate(now.getDate() - 1)
      } else if (timeframe === "week") {
        startDate.setDate(now.getDate() - 7)
      } else if (timeframe === "month") {
        startDate.setMonth(now.getMonth() - 1)
      }
    }

    // Build query
    let query = supabase.from("share_analytics").select("platform, count", { count: "exact" })

    // Add date filter if applicable
    if (startDate) {
      query = query.gte("timestamp", startDate.toISOString())
    }

    // Group by platform
    const { data: platformData, error: platformError } = await query
      .group("platform")
      .order("count", { ascending: false })

    if (platformError) {
      console.error("Error getting share analytics by platform:", platformError)
      return { success: false, error: platformError.message }
    }

    // Get total shares
    const { count: totalShares, error: countError } = await supabase
      .from("share_analytics")
      .select("*", { count: "exact", head: true })

    if (countError) {
      console.error("Error getting total share count:", countError)
      return { success: false, error: countError.message }
    }

    // Get daily share counts for chart
    let dailyData = []
    if (timeframe !== "day") {
      const { data: dailyShares, error: dailyError } = await supabase.rpc("get_daily_shares", {
        days_back: timeframe === "week" ? 7 : timeframe === "month" ? 30 : 90,
      })

      if (!dailyError) {
        dailyData = dailyShares
      }
    }

    // Get conversation context data if requested
    let conversationData = []
    if (includeConversationData) {
      let contextQuery = supabase.from("share_analytics_with_context").select("*")

      if (startDate) {
        contextQuery = contextQuery.gte("timestamp", startDate.toISOString())
      }

      const { data: contextData, error: contextError } = await contextQuery
        .order("timestamp", { ascending: false })
        .limit(100)

      if (!contextError) {
        conversationData = contextData
      }
    }

    return {
      success: true,
      data: {
        byPlatform: platformData,
        total: totalShares,
        dailyTrend: dailyData,
        conversationData: includeConversationData ? conversationData : undefined,
      },
    }
  } catch (error) {
    console.error("Error in getShareAnalytics:", error)
    return { success: false, error: String(error) }
  }
}

export async function exportShareAnalyticsForTraining(startDate?: string, endDate?: string) {
  try {
    const { data, error } = await supabase.rpc("export_share_analytics_for_training", {
      start_date: startDate ? new Date(startDate).toISOString() : null,
      end_date: endDate ? new Date(endDate).toISOString() : null,
    })

    if (error) {
      console.error("Error exporting share analytics for training:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in exportShareAnalyticsForTraining:", error)
    return { success: false, error: String(error) }
  }
}

