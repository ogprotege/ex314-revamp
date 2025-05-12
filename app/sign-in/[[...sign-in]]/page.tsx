"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { Button } from "@/components/ui/button"

// Create a fallback mechanism if Clerk is not available
let clerkImported = false
let SignIn: any = null

try {
  // Try to import Clerk
  const clerk = require("@clerk/nextjs")
  SignIn = clerk.SignIn
  clerkImported = true
} catch (e) {
  console.warn("Clerk auth not available, using fallback sign in")
  clerkImported = false
}

// Fallback sign-in component
function FallbackSignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // Simple fallback authentication
    const user = {
      email,
      name: email.split("@")[0],
      picture: null,
    }

    localStorage.setItem("user", JSON.stringify(user))
    router.push("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <ChiRho className="h-12 w-12 mx-auto" />
          <h2 className="mt-6 text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
              register a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Clerk SignIn component
function ClerkSignIn() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="site-header w-full py-6 px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <ChiRho className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Ex314.ai</h1>
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                card: "rounded-lg shadow-md",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
          />
        </div>
      </div>

      <footer className="bg-gray-100 py-4 px-4 md:px-8 text-center">
        <div className="text-sm text-gray-500">© 2025 Ex314.ai</div>
      </footer>
    </div>
  )
}

export default function SignInPage() {
  if (clerkImported) {
    return <ClerkSignIn />
  } else {
    return <FallbackSignIn />
  }
}
