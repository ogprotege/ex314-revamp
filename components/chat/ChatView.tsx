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
      performSearch(searchTerm, filtered)
    }
  }, [filter, messages, isSearchOpen, searchTerm, performSearch])

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
  }, [filteredMessages])
        scrollToResult(0)
      }
    }, 100)
  }

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

  // Scroll to a specific search result
  const scrollToResult = (resultIndex: number) => {
    const messageIndex = searchResults[resultIndex]
    const messageElement = document.getElementById(`message-${messageIndex}`)

    if (messageElement && messagesContainerRef.current) {
      const containerRect = messagesContainerRef.current.getBoundingClientRect()
      const messageRect = messageElement.getBoundingClientRect()

      const isInView = messageRect.top >= containerRect.top && messageRect.bottom <= containerRect.bottom

      if (!isInView) {
        messageElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }

  // Toggle search
  const toggleSearch = () => {
    const newState = !isSearchOpen
    setIsSearchOpen(newState)

    if (!newState) {
      setSearchTerm("")
      setSearchResults([])
    } else {
      trackChatFeature("open_search", {})
    }
  }

  // Toggle filter
  const toggleFilter = () => {
    const newState = !isFilterOpen
    setIsFilterOpen(newState)

    if (newState) {
      trackChatFeature("open_filter", {})
    }
  }

  // Handle filter changes
  const handleFilterChange = (newFilter: MessageFilter) => {
    setFilter(newFilter)
  }

  // Check if any filters are active
  const isFilterActive = () => {
    return filter.type !== "all" || filter.preset !== "all"
  }

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden relative">
      <div className="flex justify-between items-center p-2 border-b border-[#333] gap-2">
        <div className="flex-1">
          <ExportButton />
        </div>
        <div className="flex items-center gap-2">
          <ShortcutHelp />
          <button
            onClick={toggleSearch}
            className="p-1.5 rounded-md text-gray-custom hover:text-white hover:bg-[#333] transition-colors"
            aria-label="Search messages"
            data-search-button
          >
            <Search size={18} />
          </button>
          <div className="relative">
            <button
              onClick={toggleFilter}
              className={`p-1.5 rounded-md transition-colors ${
                isFilterActive() ? "text-white bg-accent-purple" : "text-gray-custom hover:text-white hover:bg-[#333]"
              }`}
              aria-label="Filter messages"
            >
              <Filter size={18} />
            </button>
            {isFilterOpen && (
              <ChatFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onFilterChange={handleFilterChange}
              />
            )}
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="absolute top-12 left-0 right-0 z-10 bg-card-bg border-b border-[#444] p-2 flex items-center gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search in conversation..."
              className="w-full p-2 pl-8 bg-input-bg border border-[#444] rounded text-sm text-white placeholder:text-gray-custom"
              autoFocus
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-custom" size={16} />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={goToPrevResult}
              disabled={searchResults.length === 0}
              className="p-1.5 rounded-md text-gray-custom hover:text-white hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous result"
            >
              <ArrowUp size={16} />
            </button>
            <button
              onClick={goToNextResult}
              disabled={searchResults.length === 0}
              className="p-1.5 rounded-md text-gray-custom hover:text-white hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next result"
            >
              <ArrowDown size={16} />
            </button>
            <span className="text-xs text-gray-custom min-w-[60px] text-center">
              {searchResults.length > 0
                ? `${currentResultIndex + 1} of ${searchResults.length}`
                : searchTerm
                  ? "No results"
                  : ""}
            </span>
            <button
              onClick={toggleSearch}
              className="p-1.5 rounded-md text-gray-custom hover:text-white hover:bg-[#333]"
              aria-label="Close search"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div
        className="flex-grow overflow-y-auto p-4 custom-scrollbar"
        ref={messagesContainerRef}
        style={{ paddingTop: isSearchOpen ? "60px" : "16px" }}
      >
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4 bg-card-bg rounded-lg border border-[#444] max-w-md">
              <Filter className="mx-auto mb-2 text-gray-custom" size={24} />
              <h3 className="text-lg font-medium text-white mb-1">No messages match your filters</h3>
              <p className="text-sm text-gray-custom">Try adjusting your filter settings to see more messages.</p>
              <button
                onClick={() => {
                  setFilter({ type: "all", preset: "all" })
                  trackChatFeature("reset_filters", {})
                }}
                className="mt-3 px-4 py-2 bg-accent-purple text-white text-sm rounded-md"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              id={`message-${index}`}
              searchTerm={isSearchOpen ? searchTerm : ""}
              isHighlighted={searchResults.indexOf(index) === currentResultIndex}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[#333]">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
