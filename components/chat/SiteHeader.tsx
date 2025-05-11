import Image from "next/image"
import { LiturgicalSeasonIndicator } from "../liturgical-season-indicator"

export function SiteHeader() {
  return (
    <header className="container mx-auto py-8 px-4 md:py-12">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-900/20 p-2 rounded-lg">
            <Image src="/chi-ro.png" alt="Chi-Rho Symbol" width={40} height={40} className="h-10 w-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-accent-purple">
            ex314.ai | Where Divine Truth Meets Digital Inquiry
          </h1>
        </div>
        <div className="mb-4">
          <LiturgicalSeasonIndicator />
        </div>
        <div style={{ maxWidth: "900px" }} className="mx-auto">
          <div
            className="text-gray-300 leading-relaxed tracking-wider mb-0 whitespace-normal flex flex-col gap-1"
            style={{ fontSize: "0.7rem" }}
          >
            <p className="m-0">
              A.I., Sanctified. This is theology without confusion and philosophy without fog. Not built to replace the
              Magisterium,
            </p>
            <p className="m-0">
              but to serve it, this is the first LLM fine-tuned for clarity, approachability, and the New
              Evangelization. Trained on
            </p>
            <p className="m-0">
              the full depth of Catholic teaching, it doesn't improvise or compromise. It explains, illuminates, and
              defends the faith
            </p>
            <p className="m-0">
              with clarity, reverence, patience, and compassion—to find the lost seeking the Way, to steady the shaken
              searching for the Truth.
            </p>
          </div>
          <p className="text-gray-300 mt-2" style={{ fontSize: "0.7rem" }}>
            For all questions, comments, suggestions, curses, praises, contact{" "}
            <a
              href="mailto:notapharisee@ex314.ai"
              className="text-accent-gold hover:text-accent-gold relative inline-block transition-all duration-300 group"
            >
              notapharisee@ex314.ai
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute -inset-1 bg-accent-gold/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </p>
        </div>
      </div>
    </header>
  )
}
