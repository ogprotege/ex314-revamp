"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * AdminOnly component
 * Only renders its children if the current user has admin role
 * Otherwise shows nothing or a fallback component if provided
 */
export function AdminOnly({ children, fallback }: AdminOnlyProps) {
  const { isLoaded, userId } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Skip if auth isn't loaded yet or user isn't logged in
    if (!isLoaded || !userId) {
      setIsChecking(false);
      return;
    }

    // Check admin status via API route
    async function checkAdminStatus() {
      try {
        const response = await fetch("/api/auth/check-admin");
        const data = await response.json();
        setIsAdmin(data.isAdmin === true);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsChecking(false);
      }
    }

    checkAdminStatus();
  }, [isLoaded, userId]);

  // Still loading
  if (isChecking) {
    return null;
  }

  // Not an admin
  if (!isAdmin) {
    return fallback ? <>{fallback}</> : null;
  }

  // User is an admin
  return <>{children}</>;
}