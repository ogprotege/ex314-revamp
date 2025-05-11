import { getSubmissionById, updateSubmissionStatus } from "@/lib/services/contactService"
import { formatDistanceToNow } from "date-fns"
import { notFound } from "next/navigation"
import Link from "next/link"

export const dynamic = "force-dynamic"

interface SubmissionDetailPageProps {
  params: {
    id: string
  }
}

export default async function SubmissionDetailPage({ params }: SubmissionDetailPageProps) {
  const submission = await getSubmissionById(params.id)

  if (!submission) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/admin/contact-submissions" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to all submissions
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">{submission.subject}</h1>
          <span
            className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
            ${
              submission.status === "new"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                : submission.status === "read"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : submission.status === "replied"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
                    : submission.status === "spam"
                      ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {submission.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
            <p className="font-medium">
              {submission.name} &lt;{submission.email}&gt;
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Received</p>
            <p className="font-medium">
              {new Date(submission.created_at).toLocaleString()}(
              {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })})
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Message</p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md whitespace-pre-wrap">{submission.message}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Turnstile Verification</p>
            <p
              className={`font-medium ${submission.turnstile_verified ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {submission.turnstile_verified ? "Verified ✓" : "Not Verified ✗"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">IP Address</p>
            <p className="font-medium">{submission.ip_address || "Unknown"}</p>
          </div>
        </div>

        {submission.user_agent && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">User Agent</p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-sm overflow-x-auto">
              {submission.user_agent}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <form
              action={async () => {
                "use server"
                if (submission.status !== "read") {
                  await updateSubmissionStatus(submission.id, "read")
                }
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                disabled={submission.status === "read"}
              >
                Mark as Read
              </button>
            </form>

            <form
              action={async () => {
                "use server"
                if (submission.status !== "replied") {
                  await updateSubmissionStatus(submission.id, "replied")
                }
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                disabled={submission.status === "replied"}
              >
                Mark as Replied
              </button>
            </form>

            <form
              action={async () => {
                "use server"
                if (submission.status !== "spam") {
                  await updateSubmissionStatus(submission.id, "spam")
                }
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                disabled={submission.status === "spam"}
              >
                Mark as Spam
              </button>
            </form>

            <form
              action={async () => {
                "use server"
                if (submission.status !== "archived") {
                  await updateSubmissionStatus(submission.id, "archived")
                }
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                disabled={submission.status === "archived"}
              >
                Archive
              </button>
            </form>

            <a
              href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
