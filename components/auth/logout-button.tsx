"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

interface LogoutButtonProps {
  className?: string
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { logout } = useAuth()

  return (
    <Button onClick={() => logout()} variant="outline" className={className}>
      Log Out
    </Button>
  )
}
