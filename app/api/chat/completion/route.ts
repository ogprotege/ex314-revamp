import { type NextRequest, NextResponse } from "next/server"
import { generateText, streamText } from "ai"
import { selectModel } from "@/lib/ai-config"

// System prompt to guide the model's behavior
const systemPrompt = `You are Ex314.ai, a Catholic AI assistant designed to provide information and guidance on Catholic theology, liturgy, and practice.
Your responses should be faithful to Catholic teaching and tradition.
When discussing theological matters, cite relevant scripture, Church documents, or teachings when appropriate.
Be respectful, charitable, and clear in your explanations.
If you're unsure about something, acknowledge the limits of your knowledge rather than speculating.
For matters of personal spiritual guidance, remind users to consult with their priest or spiritual director.`

export async function POST(req: NextRequest) {
  try {
    const { messages, stream = false } = await req.json()

    // Get the user's latest message
    const latestMessage = messages[messages.length - 1].content

    // Select the appropriate model based on the content
    const model = selectModel(latestMessage)

    // Format messages for the AI
    const formattedMessages = [{ role: "system", content: systemPrompt }, ...messages]

    if (stream) {
      // Stream the response
      const result = await streamText({
        model,
        messages: formattedMessages,
      })

      return new Response(result.toReadableStream())
    } else {
      // Generate a complete response
      const result = await generateText({
        model,
        messages: formattedMessages,
      })

      return NextResponse.json({ text: result.text })
    }
  } catch (error) {
    console.error("Error in chat completion:", error)
    return NextResponse.json({ error: "An error occurred during chat completion" }, { status: 500 })
  }
}
