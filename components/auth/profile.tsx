"use client"

import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    isAuthenticated &&
    user && (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
        {user.picture && (
          <div className="relative w-16 h-16 rounded-full mb-2 overflow-hidden">
            <Image
              src={user.picture || "/placeholder.svg"}
              alt={user.name || "User"}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        )}
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    )
  )
}
