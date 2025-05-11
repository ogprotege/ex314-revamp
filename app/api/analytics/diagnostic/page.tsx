"use client"

import { useEffect, useState } from "react"

export default function DiagnosticPage() {
  const [diagnosticData, setDiagnosticData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rawResponse, setRawResponse] = useState<string | null>(null)

  useEffect(() => {
    async function runDiagnostic() {
      try {
        const response = await fetch("/api/analytics/diagnostic")

        // Store the raw response text for debugging
        const responseText = await response.text()
        setRawResponse(responseText)

        // Try to parse as JSON
        let data
        try {
          data = JSON.parse(responseText)
        } catch (parseError) {
          throw new Error(`Failed to parse response as JSON: ${responseText}`)
        }

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${data.error || "Unknown error"}`)
        }

        setDiagnosticData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    runDiagnostic()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Analytics Diagnostic</h1>
        <p>Running diagnostics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Analytics Diagnostic</h1>
        <div className="p-4 bg-red-100 border border-red-400 rounded mb-4">
          <p className="text-red-700 font-bold">Error: {error}</p>
        </div>

        {rawResponse && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Raw Response</h2>
            <pre className="p-4 bg-gray-100 rounded overflow-auto text-sm max-h-96">{rawResponse}</pre>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Manual SQL for Table Creation</h2>
          <pre className="p-4 bg-gray-100 rounded overflow-auto text-sm">
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Analytics Diagnostic</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Check</h2>
        <ul className="list-disc pl-5">
          <li>Supabase URL: {diagnosticData.environment.supabaseUrl}</li>
          <li>Supabase Anon Key: {diagnosticData.environment.supabaseAnonKey}</li>
          <li>Supabase Service Key: {diagnosticData.environment.supabaseServiceKey}</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
        <p className={diagnosticData.connection.status === "Success" ? "text-green-600" : "text-red-600"}>
          {diagnosticData.connection.status === "Success" ? "✅ Connected to Supabase" : "❌ Connection failed"}
        </p>
        {diagnosticData.connection.error && (
          <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
            {JSON.stringify(diagnosticData.connection.error, null, 2)}
          </pre>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Table Status</h2>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-1">Sessions Table</h3>
          {diagnosticData.tables.sessions.exists ? (
            <p className="text-green-600">✅ Table exists</p>
          ) : (
            <div className="text-red-600">
              <p>❌ Table does not exist</p>
              {diagnosticData.tables.sessions.error && (
                <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                  {JSON.stringify(diagnosticData.tables.sessions.error, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-1">Page Views Table</h3>
          {diagnosticData.tables.page_views.exists ? (
            <p className="text-green-600">✅ Table exists</p>
          ) : (
            <div className="text-red-600">
              <p>❌ Table does not exist</p>
              {diagnosticData.tables.page_views.error && (
                <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                  {JSON.stringify(diagnosticData.tables.page_views.error, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test Inserts</h2>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-1">Sessions Insert</h3>
          {diagnosticData.testInserts.sessions.success ? (
            <div className="text-green-600">
              <p>✅ Insert successful</p>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                {JSON.stringify(diagnosticData.testInserts.sessions.result, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-red-600">
              <p>❌ Insert failed</p>
              {!diagnosticData.tables.sessions.exists ? (
                <p>Table does not exist</p>
              ) : diagnosticData.testInserts.sessions.error ? (
                <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                  {JSON.stringify(diagnosticData.testInserts.sessions.error, null, 2)}
                </pre>
              ) : (
                <p>Unknown error</p>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-1">Page Views Insert</h3>
          {diagnosticData.testInserts.page_views.success ? (
            <div className="text-green-600">
              <p>✅ Insert successful</p>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                {JSON.stringify(diagnosticData.testInserts.page_views.result, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-red-600">
              <p>❌ Insert failed</p>
              {!diagnosticData.tables.page_views.exists ? (
                <p>Table does not exist</p>
              ) : diagnosticData.testInserts.page_views.error ? (
                <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                  {JSON.stringify(diagnosticData.testInserts.page_views.error, null, 2)}
                </pre>
              ) : (
                <p>Unknown error</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Manual SQL for Table Creation</h2>
        <pre className="p-4 bg-gray-100 rounded overflow-auto text-sm">{diagnosticData.createTablesSQL}</pre>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Raw Diagnostic Data</h2>
        <pre className="p-4 bg-gray-100 rounded overflow-auto text-sm max-h-96">
          {JSON.stringify(diagnosticData, null, 2)}
        </pre>
      </div>
    </div>
  )
}
