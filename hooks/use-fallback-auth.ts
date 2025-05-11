import { useFallbackAuth as useAuthContext } from "@/context/FallbackAuthContext"

// Re-export the hook with a different name to avoid duplication
export const useFallbackAuth = useAuthContext
