import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with service role key for full access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role for server operations
)

export async function GET(request: Request) {
  try {
    // Basic environment check
    const environmentCheck = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing",
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing",
      supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✓ Set" : "✗ Missing",
    }

    // Check if we can connect to Supabase
    let connectionStatus = "Unknown"
    let connectionError = null
    try {
      const { data, error } = await supabase.from("_test_connection").select("*").limit(1).maybeSingle()
      if (error && error.code !== "PGRST116") {
        // PGRST116 is "relation does not exist" which is expected
        connectionStatus = "Failed"
        connectionError = error
      } else {
        connectionStatus = "Success"
      }
    } catch (e) {
      connectionStatus = "Failed"
      connectionError = e
    }

    // Check if tables exist using a simpler approach
    let sessionsTableExists = false
    let sessionsTableError = null
    let pageViewsTableExists = false
    let pageViewsTableError = null

    try {
      const { data, error } = await supabase.from("sessions").select("count").limit(1).maybeSingle()
      if (error && error.code === "PGRST116") {
        // Table doesn't exist
        sessionsTableExists = false
        sessionsTableError = error
      } else if (error) {
        // Other error
        sessionsTableExists = false
        sessionsTableError = error
      } else {
        // Table exists
        sessionsTableExists = true
      }
    } catch (e) {
      sessionsTableError = e
    }

    try {
      const { data, error } = await supabase.from("page_views").select("count").limit(1).maybeSingle()
      if (error && error.code === "PGRST116") {
        // Table doesn't exist
        pageViewsTableExists = false
        pageViewsTableError = error
      } else if (error) {
        // Other error
        pageViewsTableExists = false
        pageViewsTableError = error
      } else {
        // Table exists
        pageViewsTableExists = true
      }
    } catch (e) {
      pageViewsTableError = e
    }

    // Try to insert test records
    let sessionInsertResult = null
    let sessionInsertError = null
    let pageViewInsertResult = null
    let pageViewInsertError = null

    // Only try to insert if tables exist
    if (sessionsTableExists) {
      try {
        const { data, error } = await supabase
          .from("sessions")
          .insert({
            session_id: "test-session-" + Date.now(),
            first_visit_time: new Date().toISOString(),
            last_activity_time: new Date().toISOString(),
            ip_address: "127.0.0.1",
            entry_page: "/api/analytics/diagnostic",
            is_returning: false,
          })
          .select("id")
          .single()

        if (error) {
          sessionInsertError = error
        } else {
          sessionInsertResult = data
        }
      } catch (e) {
        sessionInsertError = e
      }
    }

    if (pageViewsTableExists) {
      try {
        const { data, error } = await supabase
          .from("page_views")
          .insert({
            session_id: "test-session-" + Date.now(),
            page_path: "/api/analytics/diagnostic",
            page_title: "Diagnostic Page",
            timestamp: new Date().toISOString(),
          })
          .select("id")
          .single()

        if (error) {
          pageViewInsertError = error
        } else {
          pageViewInsertResult = data
        }
      } catch (e) {
        pageViewInsertError = e
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: environmentCheck,
      connection: {
        status: connectionStatus,
        error: connectionError,
      },
      tables: {
        sessions: {
          exists: sessionsTableExists,
          error: sessionsTableError,
        },
        page_views: {
          exists: pageViewsTableExists,
          error: pageViewsTableError,
        },
      },
      testInserts: {
        sessions: {
          success: sessionInsertResult !== null,
          result: sessionInsertResult,
          error: sessionInsertError,
        },
        page_views: {
          success: pageViewInsertResult !== null,
          result: pageViewInsertResult,
          error: pageViewInsertError,
        },
      },
      createTablesSQL: `
-- Create sessions table
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

-- Create page_views table
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
    })
  } catch (error) {
    console.error("Diagnostic error:", error)
    return NextResponse.json(
      {
        error: "Diagnostic failed",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
