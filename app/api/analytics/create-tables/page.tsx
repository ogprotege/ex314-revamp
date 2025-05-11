"use client"

import { useState } from "react"

export default function CreateTablesPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)

  const createTables = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/analytics/create-tables")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create tables")
      }

      setResult(data)
      setStatus("success")
    } catch (error) {
      console.error("Error creating tables:", error)
      setResult(error instanceof Error ? { message: error.message } : error)
      setStatus("error")
    }
  }

  const runSQL = async () => {
    setStatus("loading")
    try {
      // Get the SQL from the textarea
      const sql = (document.getElementById("sql-input") as HTMLTextAreaElement).value

      // Execute the SQL using the Supabase API
      const response = await fetch("/api/analytics/execute-sql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute SQL")
      }

      setResult(data)
      setStatus("success")
    } catch (error) {
      console.error("Error executing SQL:", error)
      setResult(error instanceof Error ? { message: error.message } : error)
      setStatus("error")
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Analytics Tables</h1>
      <p className="mb-4">
        This page will create the necessary tables for analytics tracking in your Supabase database.
      </p>

      <button
        onClick={createTables}
        disabled={status === "loading"}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {status === "loading" ? "Creating tables..." : "Create Tables"}
      </button>

      {status === "success" && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <p className="text-green-700 font-semibold">Tables created successfully!</p>
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-60">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700 font-semibold">Error creating tables</p>
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-60">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Manual SQL Execution</h2>
        <p className="mb-2">
          If the automatic table creation doesn't work, you can run the following SQL in the Supabase SQL Editor:
        </p>
        <textarea
          id="sql-input"
          className="w-full h-64 p-4 border rounded font-mono text-sm"
          defaultValue={`-- Create sessions table
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

CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);`}
        ></textarea>
        <div className="mt-2">
          <button
            onClick={runSQL}
            disabled={status === "loading"}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
          >
            {status === "loading" ? "Executing SQL..." : "Execute SQL"}
          </button>
        </div>
      </div>
    </div>
  )
}
