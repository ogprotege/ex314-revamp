import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with service role key for full access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role for server operations
)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { table, payload } = data

    // Validate table name to prevent SQL injection
    const validTables = ["sessions", "page_views"]

    if (!validTables.includes(table)) {
      return NextResponse.json({ error: "Invalid table name" }, { status: 400 })
    }

    console.log(`Attempting to insert into ${table}:`, payload)

    // Validate and sanitize the payload based on the table
    const sanitizedPayload = { ...payload }

    if (table === "sessions") {
      // Ensure required fields for sessions
      if (!sanitizedPayload.session_id) {
        return NextResponse.json({ error: "Missing required field: session_id" }, { status: 400 })
      }

      // Ensure timestamps are valid
      if (!sanitizedPayload.first_visit_time) {
        sanitizedPayload.first_visit_time = new Date().toISOString()
      }

      if (!sanitizedPayload.last_activity_time) {
        sanitizedPayload.last_activity_time = new Date().toISOString()
      }

      // Ensure entry_page is not null
      if (!sanitizedPayload.entry_page) {
        sanitizedPayload.entry_page = "/"
      }
    }

    if (table === "page_views") {
      // Ensure required fields for page_views
      if (!sanitizedPayload.session_id) {
        return NextResponse.json({ error: "Missing required field: session_id" }, { status: 400 })
      }

      // Ensure page_path is not null
      if (!sanitizedPayload.page_path) {
        sanitizedPayload.page_path = "/"
      }

      // Ensure timestamp is valid
      if (!sanitizedPayload.timestamp) {
        sanitizedPayload.timestamp = new Date().toISOString()
      }

      // Remove any null or undefined values that might cause issues
      Object.keys(sanitizedPayload).forEach((key) => {
        if (sanitizedPayload[key] === null || sanitizedPayload[key] === undefined) {
          delete sanitizedPayload[key]
        }
      })
    }

    // Try to insert with detailed error handling
    try {
      // First, check if the table exists by selecting from it
      const { error: tableCheckError } = await supabase.from(table).select("*").limit(1)

      if (tableCheckError && tableCheckError.code === "PGRST116") {
        // Table doesn't exist
        return NextResponse.json(
          {
            error: `Table ${table} does not exist. Please run the setup script first.`,
            details: tableCheckError,
          },
          { status: 500 },
        )
      }

      // If updating an existing record
      if (sanitizedPayload.id) {
        const { data: updatedData, error } = await supabase
          .from(table)
          .update(sanitizedPayload)
          .eq("id", sanitizedPayload.id)
          .select("id")
          .single()

        if (error) {
          console.error(`Error updating ${table}:`, error)
          return NextResponse.json(
            {
              error: `Failed to update data: ${error.message}`,
              details: error,
              code: error.code,
              hint: error.hint,
            },
            { status: 500 },
          )
        }

        return NextResponse.json({
          success: true,
          id: updatedData?.id,
          message: "Record updated successfully",
        })
      }
      // If inserting a new record
      else {
        const { data: insertedData, error } = await supabase.from(table).insert(sanitizedPayload).select("id").single()

        if (error) {
          console.error(`Error inserting into ${table}:`, error)
          return NextResponse.json(
            {
              error: `Failed to insert data: ${error.message}`,
              details: error,
              code: error.code,
              hint: error.hint,
              payload: sanitizedPayload,
            },
            { status: 500 },
          )
        }

        return NextResponse.json({
          success: true,
          id: insertedData?.id,
          message: "Record inserted successfully",
        })
      }
    } catch (insertError) {
      console.error(`Unexpected error during ${table} operation:`, insertError)
      return NextResponse.json(
        {
          error: "Unexpected error during database operation",
          details: insertError instanceof Error ? insertError.message : String(insertError),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing beacon request:", error)
    return NextResponse.json(
      {
        error: "Invalid request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 },
    )
  }
}
