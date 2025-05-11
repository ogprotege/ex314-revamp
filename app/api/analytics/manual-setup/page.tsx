"use client"

import { useState } from "react"

export default function ManualSetup() {
  const [status, setStatus] = useState<string>("idle")
  const [result, setResult] = useState<any>(null)

  const createTables = async () => {
    setStatus("loading")
    try {
      // Create sessions table
      const response = await fetch("/api/analytics/setup-direct")
      const data = await response.json()

      setResult(data)
      setStatus(data.success ? "success" : "error")
    } catch (error) {
      console.error("Error creating tables:", error)
      setResult(error)
      setStatus("error")
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Analytics Tables Setup</h1>
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
        <h2 className="text-xl font-semibold mb-2">Manual SQL</h2>
        <p className="mb-2">
          If the automatic setup doesn't work, you can run the following SQL in the Supabase SQL Editor:
        </p>
        <pre className="p-4 bg-gray-100 rounded overflow-auto">
          {`-- Create sessions table
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
        </pre>
      </div>
    </div>
  )
}
