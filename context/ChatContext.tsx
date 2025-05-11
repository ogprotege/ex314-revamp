"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Chat, Message } from "@/lib/types"
import { ChatService } from "@/lib/services/chatService"
import { trackNewChat, trackMessage, trackChatView, trackChatFeature } from "@/lib/analytics/chat-analytics"

interface MessageFilter {
  type?: "user" | "assistant" | "all"
  dateRange?: {
    from?: Date
    to?: Date
  }
}

interface ChatContextType {
  currentChatId: string | null
  chats: Chat[]
  messages: Message[]
  isLoading: boolean
  selectChat: (chatId: string) => void
  newChat: () => void
  resetChat: () => void
  sendMessage: (content: string) => Promise<void>
  updateChatTitle: (chatId: string, title: string) => void
  updateChatStatus: (chatId: string, status: "starred" | "archived" | "deleted" | undefined) => void
  deleteChat: (chatId: string) => void
  filterMessages: (filter: MessageFilter) => Message[]
}

const ChatContext = createContext<ChatContextType>({
  currentChatId: null,
  chats: [],
  messages: [],
  isLoading: false,
  selectChat: () => {},
  newChat: () => {},
  resetChat: () => {},
  sendMessage: async () => {},
  updateChatTitle: () => {},
  updateChatStatus: () => {},
  deleteChat: () => {},
  filterMessages: () => [],
})

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatService] = useState(() => new ChatService())
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load chats on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadedChats = chatService.getChats()
      setChats(loadedChats)

      // If there are chats, select the most recent one
      if (loadedChats.length > 0) {
        setCurrentChatId(loadedChats[0].id)
        setMessages(chatService.getChatMessages(loadedChats[0].id))

        // Track the chat view
        trackChatView(loadedChats[0].id, loadedChats[0].title)
      }
    }
  }, [])

  // Select a chat
  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId)
    setMessages(chatService.getChatMessages(chatId))

    // Get the chat title
    const chat = chats.find((c) => c.id === chatId)
    if (chat) {
      // Track the chat view
      trackChatView(chatId, chat.title)
    }
  }

  // Create a new chat
  const newChat = () => {
    const chat = chatService.createChat()
    setChats([chat, ...chats])
    setCurrentChatId(chat.id)
    setMessages([])

    // Track new chat creation
    trackNewChat(chat.id)
  }

  // Reset the current chat (essentially the same as newChat but with tracking)
  const resetChat = () => {
    // First, track that we're resetting the current chat
    if (currentChatId) {
      trackChatFeature("reset_chat", {
        previous_chat_id: currentChatId,
        timestamp: new Date().toISOString(),
      })
    }
    
    // Then create a new chat
    newChat()
  }

  // Send a message
  const sendMessage = async (content: string) => {
    if (!currentChatId) {
      // Create a new chat if none exists
      const chat = chatService.createChat()
      setChats([chat, ...chats])
      setCurrentChatId(chat.id)

      // Track new chat creation
      trackNewChat(chat.id)

      // Add user message
      const userMessage = chatService.addMessage(chat.id, "user", content)
      setMessages([userMessage])

      // Track user message
      trackMessage(chat.id, "user", content.length)

      // Set loading state
      setIsLoading(true)

      try {
        // Update chat title based on first message
        chatService.updateChatTitle(chat.id, content.slice(0, 30) + (content.length > 30 ? "..." : ""))

        // Get AI response using the API
        const response = await fetch("/api/chat/completion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content }],
            stream: false,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get AI response")
        }

        const data = await response.json()
        const assistantResponse = data.text

        // Add assistant message
        const assistantMessage = chatService.addMessage(chat.id, "assistant", assistantResponse)
        setMessages((prev) => [...prev, assistantMessage])

        // Track assistant message
        trackMessage(chat.id, "assistant", assistantResponse.length)

        // Refresh chats list
        setChats(chatService.getChats())
      } catch (error) {
        console.error("Error getting AI response:", error)

        // Add error message
        const errorMessage = chatService.addMessage(
          chat.id,
          "assistant",
          "I'm sorry, I encountered an error processing your request. Please try again.",
        )
        setMessages((prev) => [...prev, errorMessage])

        // Track error
        trackChatFeature("error", {
          chat_id: chat.id,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      // Add user message to existing chat
      const userMessage = chatService.addMessage(currentChatId, "user", content)
      setMessages((prev) => [...prev, userMessage])

      // Track user message
      trackMessage(currentChatId, "user", content.length)

      // Set loading state
      setIsLoading(true)

      try {
        // Get all messages for context
        const chatMessages = chatService.getChatMessages(currentChatId)

        // Format messages for the API
        const formattedMessages = chatMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

        // Get AI response using the API
        const response = await fetch("/api/chat/completion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: formattedMessages,
            stream: false,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get AI response")
        }

        const data = await response.json()
        const assistantResponse = data.text

        // Add assistant message
        const assistantMessage = chatService.addMessage(currentChatId, "assistant", assistantResponse)
        setMessages((prev) => [...prev, assistantMessage])

        // Track assistant message
        trackMessage(currentChatId, "assistant", assistantResponse.length)

        // Refresh chats list
        setChats(chatService.getChats())
      } catch (error) {
        console.error("Error getting AI response:", error)

        // Add error message
        const errorMessage = chatService.addMessage(
          currentChatId,
          "assistant",
          "I'm sorry, I encountered an error processing your request. Please try again.",
        )
        setMessages((prev) => [...prev, errorMessage])

        // Track error
        trackChatFeature("error", {
          chat_id: currentChatId,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Update chat title
  const updateChatTitle = (chatId: string, title: string) => {
    const updatedChat = chatService.updateChatTitle(chatId, title)
    if (updatedChat) {
      setChats(chatService.getChats())
    }
  }

  // Update chat status
  const updateChatStatus = (chatId: string, status: "starred" | "archived" | "deleted" | undefined) => {
    const updatedChat = chatService.updateChatStatus(chatId, status)
    if (updatedChat) {
      setChats(chatService.getChats())

      // Track status change
      trackChatFeature("status_change", {
        chat_id: chatId,
        new_status: status,
        timestamp: new Date().toISOString(),
      })
    }
  }

  // Delete chat
  const deleteChat = (chatId: string) => {
    const success = chatService.deleteChat(chatId)
    if (success) {
      setChats(chatService.getChats())
      if (currentChatId === chatId) {
        setCurrentChatId(null)
        setMessages([])
      }

      // Track chat deletion
      trackChatFeature("delete_chat", {
        chat_id: chatId,
        timestamp: new Date().toISOString(),
      })
    }
  }

  const filterMessages = (filter: MessageFilter) => {
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

    return filtered
  }

  return (
    <ChatContext.Provider
      value={{
        currentChatId,
        chats,
        messages,
        isLoading,
        selectChat,
        newChat,
        resetChat,
        sendMessage,
        updateChatTitle,
        updateChatStatus,
        deleteChat,
        filterMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
