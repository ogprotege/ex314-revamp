import type { Chat, Message } from "../types"

export class ChatService {
  // Generate a unique ID for chats and messages
  generateId(): string {
    return Date.now().toString()
  }

  // Create a new chat
  createChat(): Chat {
    const id = this.generateId()
    const newChat: Chat = {
      id,
      title: "New Chat",
      lastUpdated: Date.now(),
    }

    // Save to local storage
    this.saveChat(newChat)
    return newChat
  }

  // Get all chats
  getChats(): Chat[] {
    if (typeof window === "undefined") return []

    const chats: Chat[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("chat_")) {
        try {
          const chat = JSON.parse(localStorage.getItem(key) || "")
          chats.push(chat)
        } catch (e) {
          console.error("Error parsing chat:", e)
        }
      }
    }

    return chats.sort((a, b) => b.lastUpdated - a.lastUpdated)
  }

  // Get a specific chat
  getChat(id: string): Chat | null {
    if (typeof window === "undefined") return null

    const chatData = localStorage.getItem(`chat_${id}`)
    if (!chatData) return null

    try {
      return JSON.parse(chatData)
    } catch (e) {
      console.error("Error parsing chat:", e)
      return null
    }
  }

  // Save a chat
  saveChat(chat: Chat): void {
    if (typeof window === "undefined") return
    localStorage.setItem(`chat_${chat.id}`, JSON.stringify(chat))
  }

  // Update chat title
  updateChatTitle(id: string, title: string): Chat | null {
    const chat = this.getChat(id)
    if (!chat) return null

    chat.title = title
    chat.lastUpdated = Date.now()
    this.saveChat(chat)
    return chat
  }

  // Update chat status
  updateChatStatus(id: string, status: "starred" | "archived" | "deleted" | undefined): Chat | null {
    const chat = this.getChat(id)
    if (!chat) return null

    chat.status = status
    chat.lastUpdated = Date.now()
    this.saveChat(chat)
    return chat
  }

  // Delete a chat
  deleteChat(id: string): boolean {
    if (typeof window === "undefined") return false

    localStorage.removeItem(`chat_${id}`)
    localStorage.removeItem(`chat_history_${id}`)
    return true
  }

  // Get chat messages
  getChatMessages(chatId: string): Message[] {
    if (typeof window === "undefined") return []

    const messagesData = localStorage.getItem(`chat_history_${chatId}`)
    if (!messagesData) return []

    try {
      return JSON.parse(messagesData)
    } catch (e) {
      console.error("Error parsing messages:", e)
      return []
    }
  }

  // Add a message to a chat
  addMessage(chatId: string, role: "user" | "assistant", content: string): Message {
    const message: Message = {
      id: this.generateId(),
      role,
      content,
      timestamp: Date.now(),
    }

    const messages = this.getChatMessages(chatId)
    messages.push(message)

    if (typeof window !== "undefined") {
      localStorage.setItem(`chat_history_${chatId}`, JSON.stringify(messages))
    }

    // Update chat preview and last updated
    const chat = this.getChat(chatId)
    if (chat) {
      chat.preview = content.slice(0, 100)
      chat.lastUpdated = Date.now()
      this.saveChat(chat)
    }

    return message
  }
}
