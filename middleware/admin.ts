import { NextRequest, NextResponse } from "next/server";

// Create a fallback mechanism if Clerk is not available
let clerkImported = false;
let clerkClient: any = null;
let auth: any = null;

try {
  // Try to import Clerk
  const clerkServer = require("@clerk/nextjs/server");
  const clerkAuth = require("@clerk/nextjs");
  clerkClient = clerkServer.clerkClient;
  auth = clerkAuth.auth;
  clerkImported = true;
} catch (e) {
  console.warn("Clerk auth not available in middleware, using fallback auth");
  clerkImported = false;
}

/**
 * Middleware to check if a user has admin privileges
 * This can be used to protect admin routes
 */
export async function isAdmin(req: NextRequest) {
  // If Clerk is not available, use a fallback check
  if (!clerkImported) {
    // In a real implementation, this could check a cookie or JWT
    // For now, let's check a special header or query param for testing
    const isLocalAdmin = req.headers.get("x-is-admin") === "true" ||
                       req.nextUrl.searchParams.get("admin") === "true";
    return isLocalAdmin;
  }

  // Clerk is available, check for admin role
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