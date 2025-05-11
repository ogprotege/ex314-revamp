import { SiteFooter } from "@/components/chat/SiteFooter"

export const metadata = {
  title: "Privacy Policy | Ex314.ai",
  description: "Privacy policy for Ex314.ai - Catholic Theological AI Assistant",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">Last updated: May 10, 2025</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p>
            Ex314.ai ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
            This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>We collect several types of information from and about users of our website, including:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Personal identifiers such as name and email address when you contact us</li>
            <li>Usage data including pages visited, time spent on the site, and referring websites</li>
            <li>Device information such as IP address, browser type, and operating system</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide, maintain, and improve our website and services</li>
            <li>Respond to your inquiries and fulfill your requests</li>
            <li>Send administrative information, such as updates or changes to our terms</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Protect against fraudulent or unauthorized activity</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Sharing and Disclosure</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Service providers who perform functions on our behalf</li>
            <li>Legal authorities when required by law or to protect our rights</li>
            <li>In connection with a business transfer, merger, or acquisition</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Access to your personal data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Restriction or objection to processing</li>
            <li>Data portability</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions about this privacy policy or our practices, please contact us at:
            <br />
            <a href="mailto:privacy@ex314.ai" className="text-blue-600 hover:underline">
              privacy@ex314.ai
            </a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
