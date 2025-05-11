"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/chat/SiteHeader"
import { Sidebar } from "@/components/chat/Sidebar"
import { ChatView } from "@/components/chat/ChatView"
import { InitialView } from "@/components/chat/InitialView"
import { ChatHistoryDrawer } from "@/components/chat/ChatHistoryDrawer"
import { ChatProvider, useChat } from "@/context/ChatContext"
import { PrivateAnalytics } from "@/components/analytics/private-analytics"
import { SiteFooter } from "@/components/chat/SiteFooter"
import { trackChatFeature } from "@/lib/analytics/chat-analytics"
import { KEYBOARD_SHORTCUTS } from "@/components/chat/ShortcutHelp"

const ChatPageContent = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false)
  const { messages, isLoading, currentChatId, sendMessage, resetChat } = useChat()
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("ex314_authenticated") === "true"
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      
      // Ctrl+F or Cmd+F to open search (existing functionality)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault()
        // This will be handled by the ChatView component
        const searchButton = document.querySelector("[data-search-button]") as HTMLButtonElement
        if (searchButton) {
          searchButton.click()
          trackChatFeature("keyboard_shortcut", { shortcut: "search" })
        }
      }
      
      // Ctrl+N: New chat
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault()
        if (resetChat) {
          resetChat()
          trackChatFeature("keyboard_shortcut", { shortcut: "new_chat" })
        }
      }
      
      // Ctrl+E: Export chat
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "e") {
        e.preventDefault()
        // Open export menu
        document.querySelector("[data-export-button]")?.dispatchEvent(
          new MouseEvent("click", { bubbles: true })
        )
        trackChatFeature("keyboard_shortcut", { shortcut: "export" })
      }
      
      // Ctrl+/: Show keyboard shortcuts
      else if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault()
        // Open shortcuts help
        document.querySelector("[data-shortcut-help]")?.dispatchEvent(
          new MouseEvent("click", { bubbles: true })
        )
        trackChatFeature("keyboard_shortcut", { shortcut: "help" })
      }
      
      // Alt+C: Clear chat
      else if (e.altKey && e.key.toLowerCase() === "c") {
        e.preventDefault()
        // Clear current chat
        if (messages.length && resetChat && window.confirm("Clear current chat?")) {
          resetChat()
          trackChatFeature("keyboard_shortcut", { shortcut: "clear" })
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [messages, resetChat])

  const handleLogout = () => {
    localStorage.removeItem("ex314_authenticated")
    router.push("/login")
  }

  return (
    <div className="flex h-screen bg-dark-bg text-white">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onLogout={handleLogout}
      />

      <div className="flex-grow flex flex-col h-full overflow-hidden">
        <SiteHeader />

        {currentChatId && messages.length > 0 ? (
          <ChatView messages={messages} isLoading={isLoading} onSendMessage={sendMessage} />
        ) : (
          <InitialView onSendMessage={sendMessage} />
        )}

        <SiteFooter />
      </div>

      <ChatHistoryDrawer isOpen={isHistoryDrawerOpen} onClose={() => setIsHistoryDrawerOpen(false)} />

      {/* Analytics tracking */}
      <PrivateAnalytics />
    </div>
  )
}

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatPageContent />
    </ChatProvider>
  )
}
