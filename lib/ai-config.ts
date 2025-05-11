import { createTogetherAI } from "@ai-sdk/togetherai"
import { wrapLanguageModel, extractReasoningMiddleware } from "ai"

// Create the Together.ai provider instance
export const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY || "",
})

// Create a standard model for general chat
export const chatModel = togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo")

// Create a reasoning model that exposes thinking
export const reasoningModel = wrapLanguageModel({
  model: togetherai("deepseek-ai/DeepSeek-R1"),
  middleware: extractReasoningMiddleware({ tagName: "think" }),
})

// Create a theological model for religious questions
export const theologicalModel = togetherai("mistralai/Mixtral-8x22B-Instruct-v0.1")

// Helper function to select the appropriate model based on content
export function selectModel(content: string) {
  // Check if the content is related to theology or religion
  const theologicalKeywords = [
    "god",
    "jesus",
    "christ",
    "bible",
    "scripture",
    "faith",
    "prayer",
    "church",
    "catholic",
    "christianity",
    "religion",
    "spiritual",
    "holy",
    "saint",
    "liturgy",
    "mass",
    "sacrament",
    "priest",
    "bishop",
    "pope",
    "vatican",
    "theology",
    "doctrine",
    "dogma",
    "catechism",
  ]

  const lowerContent = content.toLowerCase()

  // Check if content contains theological keywords
  const isTheological = theologicalKeywords.some((keyword) => lowerContent.includes(keyword.toLowerCase()))

  // Check if content is asking for reasoning or explanation
  const isReasoning =
    lowerContent.includes("explain") ||
    lowerContent.includes("why") ||
    lowerContent.includes("how does") ||
    lowerContent.includes("reasoning")

  if (isTheological) {
    return theologicalModel
  } else if (isReasoning) {
    return reasoningModel
  } else {
    return chatModel
  }
}
