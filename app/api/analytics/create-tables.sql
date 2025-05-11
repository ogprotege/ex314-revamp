-- First, create the exec_sql function if it doesn't exist
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

CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON public.page_views(session_id);
