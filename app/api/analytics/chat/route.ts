import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with service role key for full access
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { session_id, chat_id, event_type, event_data } = data

    // Validate required fields
    if (!session_id || !chat_id || !event_type) {
      return NextResponse.json(
        { error: "Missing required fields: session_id, chat_id, and event_type are required" },
        { status: 400 },
      )
    }

    // Insert the chat analytics event
    const { data: insertedData, error } = await supabase
      .from("chat_analytics")
      .insert({
        session_id,
        chat_id,
        event_type,
        event_data,
        timestamp: new Date().toISOString(),
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error inserting chat analytics:", error)
      return NextResponse.json({ error: `Failed to insert chat analytics: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      id: insertedData?.id,
      message: "Chat analytics event recorded successfully",
    })
  } catch (error) {
    console.error("Error processing chat analytics request:", error)
    return NextResponse.json(
      { error: "Invalid request", details: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    )
  }
}
