// API configuration and utilities

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Default headers for API requests
export const defaultHeaders = {
  "Content-Type": "application/json",
}

// Get authorization header with token
export function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

  return {
    ...defaultHeaders,
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// API response handler
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Build API URL
export function buildApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`
}

// Generic API request function
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = buildApiUrl(endpoint)
  const config: RequestInit = {
    headers: getAuthHeaders(),
    ...options,
  }

  const response = await fetch(url, config)
  return handleApiResponse<T>(response)
}
