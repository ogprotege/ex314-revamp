"use client"

import { Auth0Provider } from "@auth0/auth0-react"
import { useRouter } from "next/navigation"
import { auth0Config } from "@/lib/auth0-config"
import type { ReactNode } from "react"

interface Auth0ProviderWithNavigationProps {
  children: ReactNode
}

export const Auth0ProviderWithNavigation = ({ children }: Auth0ProviderWithNavigationProps) => {
  const router = useRouter()

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || "/")
  }

  if (typeof window === "undefined") {
    return <>{children}</>
  }

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth0Config.authorizationParams.audience,
        scope: auth0Config.authorizationParams.scope,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
