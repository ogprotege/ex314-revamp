"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"

interface LoginButtonProps {
  className?: string
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  const { login } = useAuth()

  return (
    <SignInButton mode="modal">
      <Button className={className}>
        Log In
      </Button>
    </SignInButton>
  )
}