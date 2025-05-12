-- Create share_analytics table with comprehensive tracking
CREATE TABLE IF NOT EXISTS public.share_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  shared_url TEXT NOT NULL,
  user_agent TEXT,
  referer TEXT,
  ip_address TEXT,
  session_id TEXT,
  user_id TEXT,
  device_info JSONB,
  browser_info JSONB,
  location_info JSONB,
  conversation_context JSONB,
  content_shared JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_share_analytics_platform ON public.share_analytics(platform);
CREATE INDEX IF NOT EXISTS idx_share_analytics_timestamp ON public.share_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_share_analytics_session_id ON public.share_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_share_analytics_user_id ON public.share_analytics(user_id);

-- Create a function to get daily share counts
CREATE OR REPLACE FUNCTION public.get_daily_shares(days_back INTEGER)
RETURNS TABLE (
  day DATE,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH date_series AS (
    SELECT generate_series(
      date_trunc('day', now()) - ((days_back - 1) || ' days')::interval,
      date_trunc('day', now()),
      '1 day'::interval
    )::date AS day
  )
  SELECT
    ds.day,
    COALESCE(COUNT(sa.id), 0)::BIGINT
  FROM
    date_series ds
  LEFT JOIN
    share_analytics sa ON date_trunc('day', sa.timestamp)::date = ds.day
  GROUP BY
    ds.day
  ORDER BY
    ds.day;
END;
$$ LANGUAGE plpgsql;

-- Create a view for share analytics reporting with conversation context
CREATE OR REPLACE VIEW public.share_analytics_with_context AS
SELECT
  sa.id,
  sa.platform,
  sa.shared_url,
  sa.timestamp,
  sa.session_id,
  sa.user_id,
  sa.conversation_context->>'topic' AS conversation_topic,
  sa.conversation_context->>'length' AS conversation_length,
  sa.conversation_context->>'query_count' AS query_count,
  sa.content_shared->>'title' AS content_title,
  sa.content_shared->>'type' AS content_type
FROM
  public.share_analytics sa;

-- Create a function to export share analytics data for training
CREATE OR REPLACE FUNCTION public.export_share_analytics_for_training(
  start_date TIMESTAMPTZ DEFAULT NULL,
  end_date TIMESTAMPTZ DEFAULT NULL
)
RETURNS SETOF public.share_analytics AS $$
BEGIN
  IF start_date IS NULL THEN
    start_date := now() - interval '30 days';
  END IF;
  
  IF end_date IS NULL THEN
    end_date := now();
  END IF;

  RETURN QUERY
  SELECT *
  FROM public.share_analytics
  WHERE timestamp BETWEEN start_date AND end_date
  ORDER BY timestamp DESC;
END;
$$ LANGUAGE plpgsql;

