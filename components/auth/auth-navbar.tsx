"use client"

import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { AuthNavbar } from "./auth-styles"
import { LoginButton } from "./login-button"
import { UserProfile } from "./user-profile"
import { useAuth } from "@/hooks/use-auth"

export function Auth0Navbar() {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <AuthNavbar>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ChiRho className="h-8 w-8" />
          <span className="text-xl font-semibold">Ex314.ai</span>
        </Link>

        <div>{!isLoading && <>{isAuthenticated ? <UserProfile /> : <LoginButton />}</>}</div>
      </div>
    </AuthNavbar>
  )
}
