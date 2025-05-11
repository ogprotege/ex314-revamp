import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Get the Supabase URL and key from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          error: "Missing Supabase credentials",
        },
        { status: 500 },
      )
    }

    // Create sessions table
    const sessionsResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        sql_string: `
          CREATE TABLE IF NOT EXISTS sessions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            session_id TEXT NOT NULL,
            first_visit_time TIMESTAMPTZ NOT NULL,
            last_activity_time TIMESTAMPTZ NOT NULL,
            ip_address TEXT,
            entry_page TEXT NOT NULL,
            is_returning BOOLEAN DEFAULT false
          );
          
          CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
        `,
      }),
    })

    const sessionsResult = await sessionsResponse.json()

    // Create page_views table
    const pageViewsResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        sql_string: `
          CREATE TABLE IF NOT EXISTS page_views (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            session_id TEXT NOT NULL,
            page_path TEXT NOT NULL,
            page_title TEXT,
            timestamp TIMESTAMPTZ NOT NULL,
            time_on_page INTEGER,
            exit_page BOOLEAN DEFAULT false,
            referrer_page TEXT,
            query_params JSONB
          );
          
          CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
        `,
      }),
    })

    const pageViewsResult = await pageViewsResponse.json()

    return NextResponse.json({
      success: true,
      message: "Tables setup completed",
      sessionsResult,
      pageViewsResult,
    })
  } catch (error) {
    console.error("Error setting up tables:", error)
    return NextResponse.json(
      {
        error: "Failed to set up tables",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
