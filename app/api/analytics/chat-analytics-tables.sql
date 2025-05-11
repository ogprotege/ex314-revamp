-- Create chat_analytics table to store chat-specific analytics
CREATE TABLE IF NOT EXISTS public.chat_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  chat_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_analytics_session_id ON public.chat_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_chat_id ON public.chat_analytics(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_event_type ON public.chat_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_timestamp ON public.chat_analytics(timestamp);

-- Create a view for chat analytics reporting
CREATE OR REPLACE VIEW public.chat_analytics_summary AS
SELECT
  date_trunc('day', timestamp) AS day,
  event_type,
  COUNT(*) AS event_count
FROM
  public.chat_analytics
GROUP BY
  date_trunc('day', timestamp),
  event_type
ORDER BY
  day DESC,
  event_count DESC;
