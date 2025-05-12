import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = auth();
  
  // Not authenticated
  if (!userId) {
    return NextResponse.json({ isAdmin: false });
  }

  try {
    // Get the user data from Clerk
    const user = await clerkClient.users.getUser(userId);
    
    // Check if user has admin role in public metadata
    const isAdmin = user.publicMetadata?.role === "admin";
    
    return NextResponse.json({ isAdmin: isAdmin === true });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ isAdmin: false });
  }
}