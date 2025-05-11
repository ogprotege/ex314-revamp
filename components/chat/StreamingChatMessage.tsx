"use client"

import { useState, useEffect, useRef } from "react"
import type { Message } from "@/lib/types"
import { HighlightedText } from "./HighlightedText"

interface StreamingChatMessageProps {
  message: Message
  searchQuery?: string
  isStreaming: boolean
  streamingContent: string
}

export const StreamingChatMessage = ({
  message,
  searchQuery,
  isStreaming,
  streamingContent,
}: StreamingChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (messageRef.current) {
      setIsVisible(true)
      messageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const displayContent = isStreaming ? streamingContent : message.content

  return (
    <div
      ref={messageRef}
      className={`p-4 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${message.role === "user" ? "bg-card-bg" : "bg-dark-bg"}`}
    >
      <div className="flex items-start gap-4 max-w-3xl mx-auto">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            message.role === "user" ? "bg-accent-purple" : "bg-accent-gold"
          }`}
        >
          {message.role === "user" ? "U" : "AI"}
        </div>
        <div className="flex-1 space-y-2">
          <div className="font-medium">{message.role === "user" ? "You" : "Ex314.ai"}</div>
          <div className="text-gray-200 whitespace-pre-wrap">
            {searchQuery ? <HighlightedText text={displayContent} searchQuery={searchQuery} /> : displayContent}
            {isStreaming && <span className="animate-pulse">▋</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
