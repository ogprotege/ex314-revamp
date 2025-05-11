import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with service role key for full access
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: Request) {
  try {
    // Create sessions table
    const { error: sessionsError } = await supabase.from("sessions").select("id").limit(1)

    if (sessionsError && sessionsError.code === "PGRST116") {
      // Table doesn't exist, create it
      const { error: createSessionsError } = await supabase.rpc("exec_sql", {
        sql_string: `
          CREATE TABLE IF NOT EXISTS public.sessions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            session_id TEXT NOT NULL,
            first_visit_time TIMESTAMPTZ NOT NULL,
            last_activity_time TIMESTAMPTZ NOT NULL,
            ip_address TEXT,
            entry_page TEXT NOT NULL,
            is_returning BOOLEAN DEFAULT false
          );
          
          CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON public.sessions(session_id);
        `,
      })

      if (createSessionsError) {
        // If RPC fails, try direct SQL
        console.log("RPC failed, trying direct SQL for sessions table")

        // Try creating the table directly with individual statements
        await supabase
          .from("_temp_create_sessions")
          .insert({
            query: `
            CREATE TABLE IF NOT EXISTS public.sessions (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              session_id TEXT NOT NULL,
              first_visit_time TIMESTAMPTZ NOT NULL,
              last_activity_time TIMESTAMPTZ NOT NULL,
              ip_address TEXT,
              entry_page TEXT NOT NULL,
              is_returning BOOLEAN DEFAULT false
            );
          `,
          })
          .select()
          .maybeSingle()

        await supabase
          .from("_temp_create_index")
          .insert({
            query: `
            CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON public.sessions(session_id);
          `,
          })
          .select()
          .maybeSingle()
      }
    }

    // Create page_views table
    const { error: pageViewsError } = await supabase.from("page_views").select("id").limit(1)

    if (pageViewsError && pageViewsError.code === "PGRST116") {
      // Table doesn't exist, create it
      const { error: createPageViewsError } = await supabase.rpc("exec_sql", {
        sql_string: `
          CREATE TABLE IF NOT EXISTS public.page_views (
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
          
          CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON public.page_views(session_id);
        `,
      })

      if (createPageViewsError) {
        // If RPC fails, try direct SQL
        console.log("RPC failed, trying direct SQL for page_views table")

        // Try creating the table directly with individual statements
        await supabase
          .from("_temp_create_page_views")
          .insert({
            query: `
            CREATE TABLE IF NOT EXISTS public.page_views (
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
          `,
          })
          .select()
          .maybeSingle()

        await supabase
          .from("_temp_create_page_views_index")
          .insert({
            query: `
            CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON public.page_views(session_id);
          `,
          })
          .select()
          .maybeSingle()
      }
    }

    // Verify tables exist
    const { error: checkSessionsError } = await supabase.from("sessions").select("id").limit(1)
    const { error: checkPageViewsError } = await supabase.from("page_views").select("id").limit(1)

    return NextResponse.json({
      success: true,
      message: "Tables setup completed",
      sessionsTableExists: !checkSessionsError,
      pageViewsTableExists: !checkPageViewsError,
      sessionsError: checkSessionsError,
      pageViewsError: checkPageViewsError,
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
