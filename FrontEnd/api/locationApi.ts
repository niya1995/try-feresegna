import { apiRequest } from "./config"

// Get all cities/locations
export async function getLocations(): Promise<{ cities: string[] }> {
  return apiRequest<{ cities: string[] }>("/locations")
}

// Get popular destinations
export async function getPopularDestinations(): Promise<{
  destinations: Array<{
    city: string
    count: number
    image?: string
  }>
}> {
  return apiRequest("/locations/popular")
}

// Search locations
export async function searchLocations(query: string): Promise<{ cities: string[] }> {
  return apiRequest<{ cities: string[] }>(`/locations/search?q=${encodeURIComponent(query)}`)
}
