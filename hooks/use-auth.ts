"use client"

import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/navigation"

export const useAuth = () => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout,
    user,
    getAccessTokenSilently,
  } = useAuth0()
  const router = useRouter()

  const login = (returnTo?: string) => {
    loginWithRedirect({
      appState: {
        returnTo: returnTo || window.location.pathname,
      },
    })
  }

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  const getToken = async () => {
    try {
      return await getAccessTokenSilently()
    } catch (error) {
      console.error("Error getting token:", error)
      return null
    }
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    getToken,
  }
}
