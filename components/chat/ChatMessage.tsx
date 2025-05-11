"use client"

import type { Message } from "@/lib/types"
import { User, Bot } from "lucide-react"
import { useEffect, useRef } from "react"

interface ChatMessageProps {
  message: Message
  id?: string
  searchTerm?: string
  isHighlighted?: boolean
}

export function ChatMessage({ message, id, searchTerm = "", isHighlighted = false }: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)

  // Highlight the message if it's the current search result
  useEffect(() => {
    if (isHighlighted && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [isHighlighted])

  // Function to highlight search terms in the message
  const highlightSearchTerm = (content: string, term: string) => {
    if (!term.trim()) return content

    const parts = content.split(new RegExp(`(${term})`, "gi"))

    return parts.map((part, i) => {
      if (part.toLowerCase() === term.toLowerCase()) {
        return (
          <mark key={i} className="bg-yellow-500/30 rounded px-0.5">
            {part}
          </mark>
        )
      }
      return part
    })
  }

  return (
    <div
      id={id}
      ref={messageRef}
      className={`mb-4 p-3 rounded-lg ${
        message.role === "user" ? "bg-card-bg border border-[#444]" : "bg-[#2a2a2a]"
      } ${isHighlighted ? "ring-2 ring-accent-purple" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            message.role === "user" ? "bg-accent-purple/20" : "bg-accent-purple/10"
          }`}
        >
          {message.role === "user" ? (
            <User size={16} className="text-accent-purple" />
          ) : (
            <Bot size={16} className="text-accent-purple" />
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <div className="font-medium text-sm">{message.role === "user" ? "You" : "AI Assistant"}</div>
            <div className="text-xs text-gray-custom">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
          <div className="text-sm whitespace-pre-wrap">
            {searchTerm ? highlightSearchTerm(message.content, searchTerm) : message.content}
          </div>
        </div>
      </div>
    </div>
  )
}
