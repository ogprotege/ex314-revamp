"use client"

import { useState, useEffect } from "react"

type User = {
  name?: string
  email?: string
  picture?: string
}

type AuthState = {
  isAuthenticated: boolean
  user: User | null
  login: () => void
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
}

/**
 * A fallback hook for authentication when Clerk is not available
 * This uses localStorage for a simple auth implementation
 */
export const useFallbackAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Check if user is logged in from localStorage
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
        
        // Check for admin role (this is a simplified example)
        setIsAdmin(parsedUser.email?.endsWith('@admin.com') || false)
      }
      setIsLoading(false)
    }
  }, [])

  const login = () => {
    window.location.href = "/sign-in"
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user")
    }
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
    window.location.href = "/"
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
    isAdmin,
  }
}

// Export both as named and default export
export const useAuth = useFallbackAuth
export default useFallbackAuth