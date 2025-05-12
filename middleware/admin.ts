import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs";

/**
 * Middleware to check if a user has admin privileges
 * This can be used to protect admin routes
 */
export async function isAdmin(req: NextRequest) {
  const { userId } = auth();
  
  // Not authenticated
  if (!userId) {
    return false;
  }

  try {
    // Get the user data from Clerk
    const user = await clerkClient.users.getUser(userId);
    
    // Check if user has admin role in public metadata
    // You need to set this in the Clerk dashboard for your admin users
    const isAdminUser = user.publicMetadata?.role === "admin";
    
    return isAdminUser === true;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

/**
 * Middleware to protect admin routes
 * Redirects to /unauthorized if user is not an admin
 */
export async function adminMiddleware(req: NextRequest) {
  const isAdminUser = await isAdmin(req);
  
  if (!isAdminUser) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  
  return NextResponse.next();
}