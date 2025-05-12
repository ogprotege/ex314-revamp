"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import type { Message } from "@/lib/types"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { Search, Filter, X, ArrowUp, ArrowDown } from "lucide-react"
import { trackChatFeature } from "@/lib/analytics/chat-analytics"
import { ChatFilter, type MessageFilter } from "./ChatFilter"
import { ExportButton } from "./ExportButton"
import { ShortcutHelp } from "./ShortcutHelp"

interface ChatViewProps {
  messages: Message[]
  isLoading: boolean
  onSendMessage: (message: string) => void
}

export function ChatView({ messages, isLoading, onSendMessage }: ChatViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<number[]>([])
  const [currentResultIndex, setCurrentResultIndex] = useState(0)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filter, setFilter] = useState<MessageFilter>({ type: "all", preset: "all" })
  const [filteredMessages, setFilteredMessages] = useState<Message[]>(messages)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!isSearchOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isSearchOpen])

  // Apply filters to messages
  useEffect(() => {
    let filtered = [...messages]

    // Filter by type
    if (filter.type && filter.type !== "all") {
      filtered = filtered.filter((message) => message.role === filter.type)
    }

    // Filter by date
    if (filter.dateRange) {
      const { from, to } = filter.dateRange

      if (from) {
        filtered = filtered.filter((message) => new Date(message.timestamp) >= from)
      }

      if (to) {
        // Add one day to include the entire "to" day
        const endDate = new Date(to)
        endDate.setDate(endDate.getDate() + 1)
        filtered = filtered.filter((message) => new Date(message.timestamp) < endDate)
      }
    }

    setFilteredMessages(filtered)

    // Reset search when filters change
    if (isSearchOpen && searchTerm) {
      // We need to manually perform search here to avoid dependency issues
      const results: number[] = []
      const lowerTerm = searchTerm.toLowerCase()

      filtered.forEach((message, index) => {
        if (message.content.toLowerCase().includes(lowerTerm)) {
          results.push(index)
        }
      })

      setSearchResults(results)
      setCurrentResultIndex(results.length > 0 ? 0 : -1)

      // Scroll to first result if available
      setTimeout(() => {
        if (results.length > 0) {
          const messageIndex = results[0]
          const messageElement = document.getElementById(`message-${messageIndex}`)
          messageElement?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)
    }
  }, [filter, messages, isSearchOpen, searchTerm])

  // Scroll to a specific search result
  const scrollToResult = useCallback((resultIndex: number) => {
    const messageIndex = searchResults[resultIndex]
    const messageElement = document.getElementById(`message-${messageIndex}`)

    if (messageElement && messagesContainerRef.current) {
      const containerRect = messagesContainerRef.current.getBoundingClientRect()
      const messageRect = messageElement.getBoundingClientRect()

      const isInView = messageRect.top >= containerRect.top && messageRect.bottom <= containerRect.bottom

      if (!isInView) {
        messageElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }

      // Highlight the message
      messageElement.classList.add("highlight-search")
      setTimeout(() => {
        messageElement.classList.remove("highlight-search")
      }, 1500)
    }
  }, [searchResults, messagesContainerRef])

  // Perform search on filtered messages
  const performSearch = useCallback((term: string, messagesToSearch = filteredMessages) => {
    if (!term.trim()) {
      setSearchResults([])
      setCurrentResultIndex(0)
      return
    }

    const results: number[] = []
    const lowerTerm = term.toLowerCase()

    messagesToSearch.forEach((message, index) => {
      if (message.content.toLowerCase().includes(lowerTerm)) {
        results.push(index)
      }
    })

    setSearchResults(results)
    setCurrentResultIndex(results.length > 0 ? 0 : -1)

    // Track search
    if (results.length > 0) {
      trackChatFeature("search_messages", {
        term,
        results_count: results.length,
      })
    }

    // Scroll to first result
    setTimeout(() => {
      if (results.length > 0) {
        scrollToResult(0)
      }
    }, 100)
  }, [filteredMessages, scrollToResult])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    performSearch(term)
  }

  // Navigate to next search result
  const goToNextResult = () => {
    if (searchResults.length === 0) return

    const nextIndex = (currentResultIndex + 1) % searchResults.length
    setCurrentResultIndex(nextIndex)
    scrollToResult(nextIndex)

    trackChatFeature("search_navigation", { direction: "next" })
  }

  // Navigate to previous search result
  const goToPrevResult = () => {
    if (searchResults.length === 0) return

    const prevIndex = (currentResultIndex - 1 + searchResults.length) % searchResults.length
    setCurrentResultIndex(prevIndex)
    scrollToResult(prevIndex)

    trackChatFeature("search_navigation", { direction: "previous" })
  }

  // Close search
  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchTerm("")
    setSearchResults([])
  }

  // Toggle filter panel
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
    if (isFilterOpen) {
      trackChatFeature("filter_close")
    } else {
      trackChatFeature("filter_open")
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-dark-bg">
      {/* Header with search and filter */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-dark-card-bg border-b dark:border-gray-800">
        {isSearchOpen ? (
          <div className="flex items-center flex-grow gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search in conversation..."
              className="flex-grow p-1 text-sm border rounded dark:bg-dark-input-bg dark:border-gray-700 dark:text-white"
              autoFocus
            />
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[60px]">
                {searchResults.length > 0
                  ? `${currentResultIndex + 1}/${searchResults.length}`
                  : "No results"}
              </span>
              <button
                onClick={goToPrevResult}
                disabled={searchResults.length === 0}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:text-white"
                title="Previous result"
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={goToNextResult}
                disabled={searchResults.length === 0}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:text-white"
                title="Next result"
              >
                <ArrowDown size={16} />
              </button>
              <button
                onClick={closeSearch}
                className="p-1 ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                title="Close search"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold dark:text-white">Chat</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsSearchOpen(true)
                  trackChatFeature("search_open")
                }}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                title="Search messages"
              >
                <Search size={18} />
              </button>
              <button
                onClick={toggleFilter}
                className={`p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white ${
                  isFilterOpen ? "bg-gray-200 dark:bg-gray-700 rounded" : ""
                }`}
                title="Filter messages"
              >
                <Filter size={18} />
              </button>
              <ExportButton messages={messages} />
              <ShortcutHelp />
            </div>
          </>
        )}
      </div>

      {/* Filter panel */}
      {isFilterOpen && (
        <ChatFilter
          filter={filter}
          onFilterChange={(newFilter) => {
            setFilter(newFilter)
            trackChatFeature("filter_change", { filter: JSON.stringify(newFilter) })
          }}
        />
      )}

      {/* Chat messages */}
      <div
        ref={messagesContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar"
      >
        {filteredMessages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            id={`message-${index}`}
            highlight={searchResults.includes(index) && searchTerm !== ""}
            isHighlighted={index === searchResults[currentResultIndex] && searchResults.length > 0}
            searchTerm={searchTerm}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-white dark:bg-dark-card-bg border-t dark:border-gray-800">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}