import { SignIn } from "@clerk/nextjs"
import { ChiRho } from "@/components/chi-rho"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="site-header w-full py-6 px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <ChiRho className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Ex314.ai</h1>
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                card: "rounded-lg shadow-md",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
          />
        </div>
      </div>

      <footer className="bg-gray-100 py-4 px-4 md:px-8 text-center">
        <div className="text-sm text-gray-500">© 2025 Ex314.ai</div>
      </footer>
    </div>
  )
}
