"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

// Create a fallback mechanism if Clerk is not available
let clerkImported = false
let useClerkUser: any = null
let useClerkAuth: any = null

try {
  // Try to import Clerk
  const clerk = require("@clerk/nextjs")
  useClerkUser = clerk.useUser
  useClerkAuth = clerk.useAuth
  clerkImported = true
} catch (e) {
  console.warn("Clerk auth not available, using fallback auth")
  clerkImported = false
}

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
  isAdmin: boolean
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
  isAdmin: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Handle authentication with or without Clerk
  let isAuthenticated = false
  let user: User | null = null
  let isLoading = true
  let logout = () => {}
  
  if (clerkImported) {
    // Clerk is available
    const { isSignedIn, user: clerkUser, isLoaded } = useClerkUser()
    const { signOut } = useClerkAuth()
    
    isAuthenticated = !!isSignedIn
    isLoading = !isLoaded
    
    user = isSignedIn && clerkUser
      ? {
          name: clerkUser.fullName || clerkUser.username || "",
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          picture: clerkUser.imageUrl || "",
        }
      : null
      
    logout = () => signOut()
    
    // Check if user is admin (from Clerk metadata)
    useEffect(() => {
      if (isSignedIn && clerkUser) {
        const userRole = clerkUser.publicMetadata?.role as string | undefined
        setIsAdmin(userRole === "admin")
      } else {
        setIsAdmin(false)
      }
    }, [isSignedIn, clerkUser])
  } else {
    // Fallback to local storage auth
    const [localUser, setLocalUser] = useState<User | null>(null)
    const [localIsAuthenticated, setLocalIsAuthenticated] = useState(false)
    const [localIsLoading, setLocalIsLoading] = useState(true)
    
    useEffect(() => {
      // Check if user is logged in from localStorage
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null
      if (storedUser) {
        setLocalUser(JSON.parse(storedUser))
        setLocalIsAuthenticated(true)
      }
      setLocalIsLoading(false)
    }, [])
    
    isAuthenticated = localIsAuthenticated
    user = localUser
    isLoading = localIsLoading
    
    logout = () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("user")
      }
      setLocalUser(null)
      setLocalIsAuthenticated(false)
      window.location.href = "/"
    }
  }

  // Login function works regardless of auth method
  const login = () => {
    window.location.href = "/sign-in"
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)