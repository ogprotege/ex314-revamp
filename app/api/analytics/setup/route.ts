import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with service role key for full access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role for server operations
)

export async function GET(request: Request) {
  try {
    // Execute SQL directly to create tables
    const { error: sessionsError } = await supabase.rpc("exec_sql", {
      sql_string: `
        CREATE TABLE IF NOT EXISTS sessions (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          session_id TEXT NOT NULL,
          first_visit_time TIMESTAMPTZ NOT NULL,
          last_activity_time TIMESTAMPTZ NOT NULL,
          ip_address TEXT,
          entry_page TEXT NOT NULL,
          is_returning BOOLEAN DEFAULT false
        );
        
        CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
      `,
    })

    if (sessionsError) {
      console.error("Error creating sessions table:", sessionsError)

      // Try alternative approach if the RPC method fails
      const { error: altSessionsError } = await supabase.from("_exec_sql").insert({
        query: `
          CREATE TABLE IF NOT EXISTS sessions (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            session_id TEXT NOT NULL,
            first_visit_time TIMESTAMPTZ NOT NULL,
            last_activity_time TIMESTAMPTZ NOT NULL,
            ip_address TEXT,
            entry_page TEXT NOT NULL,
            is_returning BOOLEAN DEFAULT false
          );
          
          CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
        `,
      })

      if (altSessionsError) {
        console.error("Alternative approach also failed:", altSessionsError)
        return NextResponse.json(
          {
            error: "Failed to create sessions table",
            details: altSessionsError,
          },
          { status: 500 },
        )
      }
    }

    const { error: pageViewsError } = await supabase.rpc("exec_sql", {
      sql_string: `
        CREATE TABLE IF NOT EXISTS page_views (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

    if (pageViewsError) {
      console.error("Error creating page_views table:", pageViewsError)

      // Try alternative approach if the RPC method fails
      const { error: altPageViewsError } = await supabase.from("_exec_sql").insert({
        query: `
          CREATE TABLE IF NOT EXISTS page_views (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

      if (altPageViewsError) {
        console.error("Alternative approach also failed:", altPageViewsError)
        return NextResponse.json(
          {
            error: "Failed to create page_views table",
            details: altPageViewsError,
          },
          { status: 500 },
        )
      }
    }

    // Check if tables exist by trying to select from them
    const { error: checkSessionsError } = await supabase.from("sessions").select("id").limit(1)

    const { error: checkPageViewsError } = await supabase.from("page_views").select("id").limit(1)

    return NextResponse.json({
      success: true,
      message: "Tables setup completed",
      sessionsTableExists: !checkSessionsError,
      pageViewsTableExists: !checkPageViewsError,
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
