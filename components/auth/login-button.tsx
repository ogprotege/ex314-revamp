"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

interface LoginButtonProps {
  className?: string
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  const { login } = useAuth()

  return (
    <Button onClick={login} className={className}>
      Log In
    </Button>
  )
}