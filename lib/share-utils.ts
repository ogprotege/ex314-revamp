/**
 * Generates a URL for the spread-the-word page with conversation context
 * @param baseUrl The base URL of the site
 * @param conversationContext The conversation context to include
 * @param contentInfo Information about the content being shared
 * @returns A URL with query parameters for tracking
 */
export function generateShareUrl(
  baseUrl = "https://ex314.ai",
  conversationContext?: {
    topic?: string
    conversationId?: string
    queryCount?: number
    lastQuery?: string
    referralSource?: string
  },
  contentInfo?: {
    title?: string
    type?: string
    tags?: string[]
  },
) {
  const url = new URL("/spread-the-word", baseUrl)

  // Add conversation context parameters
  if (conversationContext) {
    if (conversationContext.topic) {
      url.searchParams.append("topic", conversationContext.topic)
    }
    if (conversationContext.conversationId) {
      url.searchParams.append("conversation_id", conversationContext.conversationId)
    }
    if (conversationContext.queryCount) {
      url.searchParams.append("query_count", conversationContext.queryCount.toString())
    }
    if (conversationContext.lastQuery) {
      url.searchParams.append("last_query", conversationContext.lastQuery)
    }
    if (conversationContext.referralSource) {
      url.searchParams.append("ref", conversationContext.referralSource)
    }
  }

  // Add content information parameters
  if (contentInfo) {
    if (contentInfo.title) {
      url.searchParams.append("title", contentInfo.title)
    }
    if (contentInfo.type) {
      url.searchParams.append("type", contentInfo.type)
    }
    if (contentInfo.tags && contentInfo.tags.length > 0) {
      url.searchParams.append("tags", contentInfo.tags.join(","))
    }
  }

  return url.toString()
}

/**
 * Creates a share button that includes conversation context
 * @param platform The platform to share on
 * @param conversationContext The conversation context
 * @param contentInfo Information about the content being shared
 * @returns JSX for a share button
 */
export function createContextualShareButton(platform: string, conversationContext?: any, contentInfo?: any) {
  const shareUrl = generateShareUrl("https://ex314.ai", conversationContext, contentInfo)

  return (
    <a
      href={shareUrl}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Share on {platform}</span>
    </a>
  )
}

