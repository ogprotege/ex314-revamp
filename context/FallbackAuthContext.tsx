"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

type FallbackAuthContextType = {
  isAuthenticated: boolean
  user: any | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const defaultContext: FallbackAuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => ({ success: false, message: "Not implemented" }),
  logout: () => {},
  isLoading: false,
  error: null,
}

export const FallbackAuthContext = createContext<FallbackAuthContextType>(defaultContext)

export const FallbackAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is already authenticated via fallback method
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("fallback_auth_token")
        if (token) {
          // In a real implementation, you would validate the token here
          // For now, we'll just assume it's valid if it exists
          setIsAuthenticated(true)
          setUser({
            email: localStorage.getItem("fallback_auth_email") || "user@example.com",
            name: localStorage.getItem("fallback_auth_name") || "User",
          })
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Only run on client side
    if (typeof window !== "undefined") {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, you would call an API to validate credentials
      // For now, we'll just simulate a successful login for demo purposes
      // with a simple check for non-empty email and password
      if (email && password) {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Store auth info in localStorage
        localStorage.setItem("fallback_auth_token", "demo_token_" + Date.now())
        localStorage.setItem("fallback_auth_email", email)
        localStorage.setItem("fallback_auth_name", email.split("@")[0])

        setIsAuthenticated(true)
        setUser({
          email,
          name: email.split("@")[0],
        })

        return { success: true, message: "Login successful" }
      } else {
        setError("Please enter both email and password")
        return { success: false, message: "Please enter both email and password" }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("fallback_auth_token")
    localStorage.removeItem("fallback_auth_email")
    localStorage.removeItem("fallback_auth_name")
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <FallbackAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </FallbackAuthContext.Provider>
  )
}

export const useFallbackAuth = () => useContext(FallbackAuthContext)
