import { SignIn } from "@clerk/nextjs"
import { SiteFooter } from "@/components/site-footer"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-8 text-3xl font-bold text-center">Sign In</h1>
          <div className="w-full max-w-md">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                  card: "rounded-lg shadow-md",
                },
              }}
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
            />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
