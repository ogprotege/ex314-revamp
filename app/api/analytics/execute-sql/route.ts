import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with service role key for full access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role for server operations
)

export async function POST(request: Request) {
  try {
    const { sql } = await request.json()

    if (!sql) {
      return NextResponse.json({ error: "No SQL provided" }, { status: 400 })
    }

    // Execute the SQL using the Supabase client
    const { data, error } = await supabase.rpc("exec_sql", {
      sql_string: sql,
    })

    if (error) {
      console.error("Error executing SQL:", error)
      return NextResponse.json(
        {
          error: `Failed to execute SQL: ${error.message}`,
          details: error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "SQL executed successfully",
      data,
    })
  } catch (error) {
    console.error("Error executing SQL:", error)
    return NextResponse.json(
      {
        error: "Failed to execute SQL",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
