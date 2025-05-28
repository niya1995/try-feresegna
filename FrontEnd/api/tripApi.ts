import { apiRequest } from "./config"
import type { Trip, TripSearchRequest, TripSearchResponse, TripCreateRequest, Seat } from "./types"

// Search trips
export async function searchTrips(params: TripSearchRequest): Promise<TripSearchResponse> {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item.toString()))
      } else {
        searchParams.append(key, value.toString())
      }
    }
  })

  return apiRequest<TripSearchResponse>(`/trips/search?${searchParams.toString()}`)
}

// Get trip by ID
export async function getTripById(id: string): Promise<{ trip: Trip; seats: Seat[] }> {
  return apiRequest<{ trip: Trip; seats: Seat[] }>(`/trips/${id}`)
}

// Get popular trips
export async function getPopularTrips(): Promise<{ trips: Trip[] }> {
  return apiRequest<{ trips: Trip[] }>("/trips/popular")
}

// Create trip (operator only)
export async function createTrip(data: TripCreateRequest): Promise<Trip> {
  return apiRequest<Trip>("/trips", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Update trip (operator only)
export async function updateTrip(id: string, data: Partial<TripCreateRequest>): Promise<Trip> {
  return apiRequest<Trip>(`/trips/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Delete trip (operator only)
export async function deleteTrip(id: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/trips/${id}`, {
    method: "DELETE",
  })
}

// Get operator trips
export async function getOperatorTrips(): Promise<{ trips: Trip[] }> {
  return apiRequest<{ trips: Trip[] }>("/operator/trips")
}

// Track trip
export async function trackTrip(id: string): Promise<{
  trip: Trip
  location: { latitude: number; longitude: number; address: string }
  status: string
  estimatedArrival: string
}> {
  return apiRequest(`/trips/${id}/tracking`)
}
