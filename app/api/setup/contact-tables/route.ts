import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), "app/api/analytics/contact-submissions-table.sql")
    const sqlQuery = fs.readFileSync(sqlFilePath, "utf8")

    // Execute the SQL query
    await sql.query(sqlQuery)

    return NextResponse.json({
      success: true,
      message: "Contact submissions table created successfully",
    })
  } catch (error) {
    console.error("Error creating contact submissions table:", error)
    return NextResponse.json({ success: false, error: "Failed to create contact submissions table" }, { status: 500 })
  }
}
