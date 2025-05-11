"use client"

import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutButton } from "./logout-button"

export const UserProfile = () => {
  const { user, isLoading } = useAuth()

  if (isLoading || !user) {
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.name}</span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>
      <Avatar>
        <AvatarImage src={user.picture || "/placeholder.svg"} alt={user.name || "User"} />
        <AvatarFallback>
          {user.name
            ?.split(" ")
            .map((n) => n[0])
            .join("") || "U"}
        </AvatarFallback>
      </Avatar>
      <LogoutButton />
    </div>
  )
}
