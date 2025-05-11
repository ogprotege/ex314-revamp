import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AuthContainerProps {
  children: ReactNode
  className?: string
}

export function AuthContainer({ children, className }: AuthContainerProps) {
  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50", className)}>
      {children}
    </div>
  )
}

interface AuthCardProps {
  children: ReactNode
  className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
  return <div className={cn("w-full max-w-md p-6 bg-white rounded-lg shadow-md", className)}>{children}</div>
}

interface AuthLabelProps {
  children: ReactNode
  htmlFor?: string
  className?: string
}

export function AuthLabel({ children, htmlFor, className }: AuthLabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn("block mb-2 text-sm font-medium text-gray-700", className)}>
      {children}
    </label>
  )
}

interface AuthNavbarProps {
  children: ReactNode
  className?: string
}

export function AuthNavbar({ children, className }: AuthNavbarProps) {
  return <nav className={cn("min-h-[115px] px-4 py-3 bg-white border-b", className)}>{children}</nav>
}
