import { sql } from "@vercel/postgres"
import { nanoid } from "nanoid"

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: Date
  turnstile_verified: boolean
  ip_address?: string
  user_agent?: string
  status: "new" | "read" | "replied" | "spam" | "archived"
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  turnstileToken: string
  turnstileVerified: boolean
}

export async function saveContactSubmission(
  data: ContactFormData,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const id = nanoid()
    const status = "new"

    await sql`
      INSERT INTO contact_submissions (
        id, 
        name, 
        email, 
        subject, 
        message, 
        turnstile_verified, 
        ip_address, 
        user_agent, 
        status
      ) 
      VALUES (
        ${id}, 
        ${data.name}, 
        ${data.email}, 
        ${data.subject}, 
        ${data.message}, 
        ${data.turnstileVerified}, 
        ${ipAddress || null}, 
        ${userAgent || null}, 
        ${status}
      )
    `

    return { success: true, id }
  } catch (error) {
    console.error("Error saving contact submission:", error)
    return {
      success: false,
      error: "Failed to save your message. Please try again later.",
    }
  }
}

export async function getContactSubmissions(
  status?: string,
  page = 1,
  limit = 20,
): Promise<{ submissions: ContactSubmission[]; total: number }> {
  try {
    const offset = (page - 1) * limit

    let query = `
      SELECT * FROM contact_submissions
    `

    if (status) {
      query += ` WHERE status = '${status}'`
    }

    query += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const result = await sql.query(query)

    const countQuery = `
      SELECT COUNT(*) FROM contact_submissions
      ${status ? ` WHERE status = '${status}'` : ""}
    `

    const countResult = await sql.query(countQuery)
    const total = Number.parseInt(countResult.rows[0].count)

    return {
      submissions: result.rows as ContactSubmission[],
      total,
    }
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return { submissions: [], total: 0 }
  }
}

export async function updateSubmissionStatus(
  id: string,
  status: "new" | "read" | "replied" | "spam" | "archived",
): Promise<boolean> {
  try {
    await sql`
      UPDATE contact_submissions
      SET status = ${status}
      WHERE id = ${id}
    `
    return true
  } catch (error) {
    console.error("Error updating submission status:", error)
    return false
  }
}

export async function getSubmissionById(id: string): Promise<ContactSubmission | null> {
  try {
    const result = await sql`
      SELECT * FROM contact_submissions
      WHERE id = ${id}
    `

    if (result.rows.length === 0) {
      return null
    }

    return result.rows[0] as ContactSubmission
  } catch (error) {
    console.error("Error fetching submission by ID:", error)
    return null
  }
}
