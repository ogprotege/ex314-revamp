"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Create a fallback mechanism if Clerk is not available
let clerkImported = false
let SignedIn: any = null
let SignedOut: any = null
let UserButton: any = null
let SignInButton: any = null
let SignUpButton: any = null

try {
  // Try to import Clerk
  const clerk = require("@clerk/nextjs")
  SignedIn = clerk.SignedIn
  SignedOut = clerk.SignedOut
  UserButton = clerk.UserButton
  SignInButton = clerk.SignInButton
  SignUpButton = clerk.SignUpButton
  clerkImported = true
} catch (e) {
  console.warn("Clerk auth not available, using fallback auth buttons")
  clerkImported = false
}

export function AuthButtons() {
  const { isAuthenticated, logout } = useAuth()

  if (clerkImported) {
    // Use Clerk components if available
    return (
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    )
  } else {
    // Fallback UI when Clerk is not available
    return (
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <Button onClick={logout} variant="ghost" size="sm">
            Sign Out
          </Button>
        )}
      </div>
    )
  }
}