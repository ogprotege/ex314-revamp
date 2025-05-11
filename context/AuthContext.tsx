"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

type User = {
  name?: string
  email?: string
  picture?: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  login: () => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = () => {
    // For now, just redirect to a login page
    window.location.href = "/login"
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
