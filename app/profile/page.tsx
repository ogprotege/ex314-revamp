import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { UserProfile } from "@/components/user-profile"

export default async function ProfilePage() {
  const user = await currentUser()

  // If the user is not signed in, redirect to the sign-in page
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-4xl font-bold text-center">Your Profile</h1>
        <p className="mb-8 text-center text-gray-600">Manage your account information and prayer preferences</p>

        <UserProfile user={user} />
      </main>

      <SiteFooter />
    </div>
  )
}
