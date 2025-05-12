"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/hooks/use-fallback-auth"

export default function EnvironmentDiagnosticsPage() {
  // Call useAuth to ensure it works in this component
  useAuth();
  // Clerk Auth Environment Variables
  const clerkVariables = [
    { name: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", value: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, sensitive: false },
    { name: "CLERK_SECRET_KEY", value: process.env.CLERK_SECRET_KEY, sensitive: true },
    { name: "NEXT_PUBLIC_CLERK_SIGN_IN_URL", value: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL, sensitive: false },
    { name: "NEXT_PUBLIC_CLERK_SIGN_UP_URL", value: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL, sensitive: false },
    { name: "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL", value: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL, sensitive: false },
    { name: "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL", value: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL, sensitive: false },
  ]

  // Supabase Environment Variables
  const supabaseVariables = [
    { name: "NEXT_PUBLIC_SUPABASE_URL", value: process.env.NEXT_PUBLIC_SUPABASE_URL, sensitive: false },
    { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, sensitive: true },
    { name: "SUPABASE_SERVICE_ROLE_KEY", value: process.env.SUPABASE_SERVICE_ROLE_KEY, sensitive: true },
  ]

  // Turnstile Environment Variables
  const turnstileVariables = [
    { name: "NEXT_PUBLIC_TURNSTILE_SITE_KEY", value: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY, sensitive: false },
    { name: "TURNSTILE_SECRET_KEY", value: process.env.TURNSTILE_SECRET_KEY, sensitive: true },
  ]

  // AI Environment Variables
  const aiVariables = [
    { name: "OPENAI_API_KEY", value: process.env.OPENAI_API_KEY, sensitive: true },
    { name: "AI_MODEL", value: process.env.AI_MODEL, sensitive: false },
  ]

  // Analytics Environment Variables
  const analyticsVariables = [
    { name: "GOOGLE_ANALYTICS_ID", value: process.env.GOOGLE_ANALYTICS_ID, sensitive: false },
  ]

  // Helper function to check if an environment variable is set
  const getStatus = (value: string | undefined) => {
    if (value === undefined) return "Not Set"
    if (value === "") return "Empty"
    return "Set"
  }

  // Helper function to display the value or a placeholder
  const getDisplayValue = (value: string | undefined, sensitive: boolean) => {
    if (value === undefined) return "—"
    if (value === "") return "(empty string)"
    if (sensitive) return "••••••••" + (value.length > 8 ? value.slice(-4) : "")
    return value
  }

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Set":
        return "text-green-600"
      case "Empty":
        return "text-yellow-600"
      case "Not Set":
        return "text-red-600"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Environment Variables Diagnostics</h1>
          <p className="text-gray-600">
            Check the status of environment variables needed for your application.
          </p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 text-sm font-medium"
        >
          Back to Home
        </Link>
      </div>

      <div className="space-y-8">
        {/* Environment File Status */}
        <Card>
          <CardHeader>
            <CardTitle>Environment File Status</CardTitle>
            <CardDescription>Checks if your environment files are correctly named and loaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center p-2 border rounded bg-gray-50">
                <div className="font-medium">.env.local</div>
                <div>
                  <span className={`font-medium ${process.env.NODE_ENV ? "text-green-600" : "text-yellow-600"}`}>
                    {process.env.NODE_ENV ? "Appears to be loaded" : "May not be loaded"}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Required file for environment variables in Next.js
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center p-2 border rounded bg-gray-50">
                <div className="font-medium">.envi.local</div>
                <div>
                  <span className="font-medium text-yellow-600">
                    Not loaded by Next.js
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  File name should be .env.local (without the "i")
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clerk Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Clerk Configuration</CardTitle>
            <CardDescription>Environment variables for Clerk authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Variable</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {clerkVariables.map((variable) => {
                    const status = getStatus(variable.value)
                    return (
                      <tr key={variable.name} className="hover:bg-gray-50">
                        <td className="border p-2 font-medium">{variable.name}</td>
                        <td className={`border p-2 ${getStatusColor(status)}`}>{status}</td>
                        <td className="border p-2 font-mono text-sm">
                          {getDisplayValue(variable.value, variable.sensitive)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Supabase Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Supabase Configuration</CardTitle>
            <CardDescription>Environment variables for Supabase database and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Variable</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {supabaseVariables.map((variable) => {
                    const status = getStatus(variable.value)
                    return (
                      <tr key={variable.name} className="hover:bg-gray-50">
                        <td className="border p-2 font-medium">{variable.name}</td>
                        <td className={`border p-2 ${getStatusColor(status)}`}>{status}</td>
                        <td className="border p-2 font-mono text-sm">
                          {getDisplayValue(variable.value, variable.sensitive)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Turnstile Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Turnstile Configuration</CardTitle>
            <CardDescription>Environment variables for Cloudflare Turnstile integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Variable</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {turnstileVariables.map((variable) => {
                    const status = getStatus(variable.value)
                    return (
                      <tr key={variable.name} className="hover:bg-gray-50">
                        <td className="border p-2 font-medium">{variable.name}</td>
                        <td className={`border p-2 ${getStatusColor(status)}`}>{status}</td>
                        <td className="border p-2 font-mono text-sm">
                          {getDisplayValue(variable.value, variable.sensitive)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Variables */}
        <Card>
          <CardHeader>
            <CardTitle>AI Configuration</CardTitle>
            <CardDescription>Environment variables for AI integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Variable</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {aiVariables.map((variable) => {
                    const status = getStatus(variable.value)
                    return (
                      <tr key={variable.name} className="hover:bg-gray-50">
                        <td className="border p-2 font-medium">{variable.name}</td>
                        <td className={`border p-2 ${getStatusColor(status)}`}>{status}</td>
                        <td className="border p-2 font-mono text-sm">
                          {getDisplayValue(variable.value, variable.sensitive)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Configuration</CardTitle>
            <CardDescription>Environment variables for analytics tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Variable</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsVariables.map((variable) => {
                    const status = getStatus(variable.value)
                    return (
                      <tr key={variable.name} className="hover:bg-gray-50">
                        <td className="border p-2 font-medium">{variable.name}</td>
                        <td className={`border p-2 ${getStatusColor(status)}`}>{status}</td>
                        <td className="border p-2 font-mono text-sm">
                          {getDisplayValue(variable.value, variable.sensitive)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting Section */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
            <CardDescription>Common issues and solutions for environment variables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">File Name Issue</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Next.js looks for <code className="bg-gray-100 px-1 rounded">.env.local</code> file (not <code className="bg-gray-100 px-1 rounded">.envi.local</code>). Ensure your file is correctly named.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                  <p className="text-sm text-yellow-800">
                    You mentioned having a file named <code>.envi.local</code> - this needs to be renamed to <code>.env.local</code> (without the "i") for Next.js to load it.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Server Restart</h3>
                <p className="text-sm text-gray-600">
                  After modifying environment variables, you need to restart your development server for the changes to take effect.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Environment Variable Format</h3>
                <p className="text-sm text-gray-600">
                  Ensure each variable is on its own line in the format <code className="bg-gray-100 px-1 rounded">VARIABLE_NAME=value</code> without quotes around the value unless the value itself contains spaces.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Client vs Server Variables</h3>
                <p className="text-sm text-gray-600">
                  Only variables prefixed with <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_</code> are available on the client side. Server components can access all environment variables.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 