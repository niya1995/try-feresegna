import { apiRequest } from "./config"
import type { ContactRequest, FAQ, Testimonial } from "./types"

// Submit contact form
export async function submitContactForm(data: ContactRequest): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Get FAQ data
export async function getFAQs(): Promise<{ faqs: FAQ[] }> {
  return apiRequest<{ faqs: FAQ[] }>("/faq")
}

// Get testimonials
export async function getTestimonials(): Promise<{ testimonials: Testimonial[] }> {
  return apiRequest<{ testimonials: Testimonial[] }>("/testimonials")
}

// Submit feedback
export async function submitFeedback(data: {
  rating: number
  message: string
  tripId?: string
}): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/feedback", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Get help articles
export async function getHelpArticles(): Promise<{
  articles: Array<{
    id: string
    title: string
    content: string
    category: string
  }>
}> {
  return apiRequest("/help/articles")
}
