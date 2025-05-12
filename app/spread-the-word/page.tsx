"use client"

import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { Facebook, Twitter, Linkedin, Mail, Copy, Check, PhoneIcon as Whatsapp } from "lucide-react"
import { useState, useEffect } from "react"
import { trackShareEvent, type SharePlatform } from "@/app/actions/track-share"
import { useSearchParams } from "next/navigation"

interface ShareButtonProps {
  platform: string
  icon: SharePlatform
  color: string
  url: string
  message: string
  conversationContext?: any
  contentShared?: any
}

function ShareButton({ platform, icon, color, url, message, conversationContext, contentShared }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    let shareUrl = ""

    // Track the share event with comprehensive data
    try {
      await trackShareEvent(icon, url, conversationContext, contentShared)
    } catch (error) {
      console.error("Error tracking share event:", error)
      // Continue with sharing even if tracking fails
    }

    switch (icon) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message + " " + url)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent("Check out Ex314.ai")}&body=${encodeURIComponent(message + "\n\n" + url)}`
        break
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
    }
  }

  const IconComponent = () => {
    switch (icon) {
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "whatsapp":
        return <Whatsapp className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      case "copy":
        return copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`${color} text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 transform hover:scale-105`}
      aria-label={`Share on ${platform}`}
    >
      <IconComponent />
      <span>{platform}</span>
    </button>
  )
}

export default function SpreadTheWordPage() {
  const [copied, setCopied] = useState(false)
  const [embedCopied, setEmbedCopied] = useState(false)
  const websiteUrl = "https://ex314.ai"
  const embedCode = `<iframe src="https://ex314.ai/embed" width="100%" height="400" frameborder="0"></iframe>`
  const searchParams = useSearchParams()

  // Extract conversation context from URL parameters
  const [conversationContext, setConversationContext] = useState<any>(null)
  const [contentShared, setContentShared] = useState<any>(null)

  useEffect(() => {
    // Extract conversation context from URL parameters
    const topic = searchParams.get("topic")
    const conversationId = searchParams.get("conversation_id")
    const queryCount = searchParams.get("query_count")
    const lastQuery = searchParams.get("last_query")
    const referralSource = searchParams.get("ref")

    // Extract content information
    const contentTitle = searchParams.get("title")
    const contentType = searchParams.get("type")
    const contentTags = searchParams.get("tags")

    if (topic || conversationId || queryCount || lastQuery || referralSource) {
      setConversationContext({
        topic,
        conversation_id: conversationId,
        query_count: queryCount ? Number.parseInt(queryCount) : undefined,
        last_query: lastQuery,
        referral_source: referralSource,
        page_context: window.location.pathname,
        user_journey: [window.location.pathname],
      })
    }

    if (contentTitle || contentType || contentTags) {
      setContentShared({
        title: contentTitle,
        type: contentType,
        tags: contentTags ? contentTags.split(",") : undefined,
        url: websiteUrl,
      })
    }
  }, [searchParams])

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      // Track embed code copy as a share event
      await trackShareEvent("embed", websiteUrl, conversationContext, contentShared)
      setEmbedCopied(true)
      setTimeout(() => setEmbedCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy embed code:", error)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ChiRho className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Ex314.ai</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/resources" className="text-sm font-medium hover:underline">
            Resources
          </Link>
          <Link href="/calendar" className="text-sm font-medium hover:underline">
            Liturgical Calendar
          </Link>
          <Link href="/prayers" className="text-sm font-medium hover:underline">
            Prayers
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link href="/donate" className="text-sm font-medium hover:underline">
            Donate
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Spread the Word</h1>
          <div className="prose lg:prose-xl dark:prose-invert mx-auto">
            <p className="mb-6">
              Help us grow our community and reach more people by sharing Ex314.ai with your friends, family, and parish
              community. Your support in spreading the word helps us fulfill our mission of making Catholic prayers,
              resources, and guidance more accessible to everyone.
            </p>
            <p className="mb-8">
              Use the buttons below to share Ex314.ai on your preferred social media platforms or via email. You can
              also copy the direct link to share anywhere or embed our widget on your website.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Share Directly:</h2>
            <div className="flex flex-wrap justify-center gap-4 my-6">
              <ShareButton
                platform="Facebook"
                icon="facebook"
                color="bg-blue-600 hover:bg-blue-700"
                url={websiteUrl}
                message="Check out Ex314.ai - A Catholic theological AI assistant providing resources, prayers, and guidance."
                conversationContext={conversationContext}
                contentShared={contentShared}
              />
              <ShareButton
                platform="Twitter"
                icon="twitter"
                color="bg-sky-500 hover:bg-sky-600"
                url={websiteUrl}
                message="Discover Ex314.ai - A Catholic theological AI assistant for prayers, resources, and spiritual guidance."
                conversationContext={conversationContext}
                contentShared={contentShared}
              />
              <ShareButton
                platform="LinkedIn"
                icon="linkedin"
                color="bg-blue-700 hover:bg-blue-800"
                url={websiteUrl}
                message="Ex314.ai - Catholic theological AI assistant providing resources, prayers, and guidance."
                conversationContext={conversationContext}
                contentShared={contentShared}
              />
              <ShareButton
                platform="WhatsApp"
                icon="whatsapp"
                color="bg-green-600 hover:bg-green-700"
                url={websiteUrl}
                message="Check out Ex314.ai - A Catholic theological AI assistant providing resources, prayers, and guidance."
                conversationContext={conversationContext}
                contentShared={contentShared}
              />
              <ShareButton
                platform="Email"
                icon="email"
                color="bg-gray-600 hover:bg-gray-700"
                url={websiteUrl}
                message="Check out Ex314.ai - A Catholic theological AI assistant providing resources, prayers, and guidance."
                conversationContext={conversationContext}
                contentShared={contentShared}
              />
            </div>
            <h2 className="text-2xl font-bold mt-12 mb-4">Copy Link:</h2>
            <div className="flex justify-center mb-8">
              <ShareButton
                platform={copied ? "Copied!" : "Copy Link"}
                icon="copy"
                color="bg-purple-600 hover:bg-purple-700"
                url={websiteUrl}
                message=""
                conversationContext={conversationContext}
                contentShared={contentShared}
              />
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Embed on Your Website:</h2>
            <div className="bg-gray-100 p-4 rounded-md overflow-x-auto relative">
              <pre className="text-sm">
                <code>{embedCode}</code>
              </pre>
              <button
                onClick={copyEmbedCode}
                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded"
                aria-label="Copy embed code"
              >
                {embedCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-6">Thank you for supporting our mission!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ChiRho className="h-6 w-6" />
            <span className="font-semibold">Ex314.ai</span>
          </div>
          <div className="text-sm text-gray-500">© 2025 Ex314.ai. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}

