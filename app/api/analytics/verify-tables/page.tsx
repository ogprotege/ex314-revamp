"use client"

import { useEffect, useState } from "react"

export default function VerifyTablesPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)
  const [manualSqlStatus, setManualSqlStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [manualSqlResult, setManualSqlResult] = useState<any>(null)

  useEffect(() => {
    checkTables()
  }, [])

  const checkTables = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/analytics/direct-create-tables")
      const data = await response.json()
      setResult(data)
      setStatus(data.success ? "success" : "error")
    } catch (error) {
      console.error("Error checking tables:", error)
      setResult(error instanceof Error ? { message: error.message } : error)
      setStatus("error")
    }
  }

  const executeManualSql = async () => {
    setManualSqlStatus("loading")
    try {
      const sql = (document.getElementById("sql-input") as HTMLTextAreaElement).value

      // Execute SQL in Supabase SQL Editor manually
      setManualSqlResult({
        message: "Please execute this SQL in your Supabase SQL Editor",
        sql: sql,
      })
      setManualSqlStatus("success")
    } catch (error) {
      console.error("Error with SQL:", error)
      setManualSqlResult(error instanceof Error ? { message: error.message } : error)
      setManualSqlStatus("error")
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Verify Analytics Tables</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Table Status</h2>
        {status === "loading" && <p>Checking tables...</p>}

        {status === "success" && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
            <h3 className="font-semibold text-green-800 mb-2">Table Check Results:</h3>

            <div className="mb-2">
              <span className="font-medium">Sessions Table: </span>
              {result.sessionsTableExists ? (
                <span className="text-green-600">✅ Exists</span>
              ) : (
                <span className="text-red-600">❌ Does not exist</span>
              )}
            </div>

            <div className="mb-2">
              <span className="font-medium">Page Views Table: </span>
              {result.pageViewsTableExists ? (
                <span className="text-green-600">✅ Exists</span>
              ) : (
                <span className="text-red-600">❌ Does not exist</span>
              )}
            </div>

            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-60 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
            <p className="text-red-700 font-semibold">Error checking tables</p>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-60 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <button
          onClick={checkTables}
          disabled={status === "loading"}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {status === "loading" ? "Checking..." : "Check Tables Again"}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Manual SQL Setup</h2>
        <p className="mb-2">
          If the automatic table creation doesn't work, copy and run this SQL in your Supabase SQL Editor:
        </p>

        <textarea
          id="sql-input"
          className="w-full h-64 p-4 border rounded font-mono text-sm"
          defaultValue={`-- First, create the exec_sql function if it doesn't exist
CREATE OR REPLACE FUNCTION public.exec_sql(sql_string text)
RETURNS JSONB AS $$
BEGIN
  EXECUTE sql_string;
  RETURN jsonb_build_object('status', 'success');
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'status', 'error',
    'message', SQLERRM,
    'detail', SQLSTATE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create sessions table
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

-- Create page_views table
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

CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON public.page_views(session_id);`}
        ></textarea>

        <div className="mt-2">
          <button onClick={executeManualSql} className="px-4 py-2 bg-green-500 text-white rounded">
            Copy SQL
          </button>
        </div>

        {manualSqlStatus === "success" && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-yellow-800 font-semibold">Please execute this SQL in your Supabase SQL Editor</p>
            <p className="mt-2 text-sm">1. Go to your Supabase dashboard</p>
            <p className="text-sm">2. Click on "SQL Editor" in the left sidebar</p>
            <p className="text-sm">3. Create a new query</p>
            <p className="text-sm">4. Paste the SQL from the textarea above</p>
            <p className="text-sm">5. Click "Run" to execute the SQL</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
        <p>
          After creating the tables, you should be able to use the analytics tracking in your application. If you're
          still having issues, check the following:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Make sure your Supabase URL and API keys are correctly set in your environment variables</li>
          <li>Check that the tables were created successfully in your Supabase database</li>
          <li>Verify that your application has the necessary permissions to insert data into these tables</li>
          <li>Check your browser console for any errors related to the analytics tracking</li>
        </ul>
      </div>
    </div>
  )
}
