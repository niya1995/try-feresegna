import { apiRequest } from "./config"
import type { Booking, BookingCreateRequest, BookingCreateResponse, BookingListResponse, SearchParams } from "./types"

// Create booking
export async function createBooking(data: BookingCreateRequest): Promise<BookingCreateResponse> {
  return apiRequest<BookingCreateResponse>("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Get booking by ID
export async function getBookingById(id: string): Promise<{ booking: Booking }> {
  return apiRequest<{ booking: Booking }>(`/bookings/${id}`)
}

// Get user bookings
export async function getUserBookings(status?: string): Promise<BookingListResponse> {
  const params = status ? `?status=${status}` : ""
  return apiRequest<BookingListResponse>(`/users/bookings${params}`)
}

// Cancel booking
export async function cancelBooking(id: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/bookings/${id}/cancel`, {
    method: "PATCH",
  })
}

// Get all bookings (admin only)
export async function getAllBookings(params?: SearchParams): Promise<BookingListResponse> {
  const searchParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })
  }

  const queryString = searchParams.toString()
  return apiRequest<BookingListResponse>(`/admin/bookings${queryString ? `?${queryString}` : ""}`)
}

// Admin cancel booking
export async function adminCancelBooking(id: string): Promise<{ booking: Booking }> {
  return apiRequest<{ booking: Booking }>(`/admin/bookings/${id}/cancel`, {
    method: "PATCH",
  })
}

// Download booking receipt
export async function downloadBookingReceipt(id: string): Promise<Blob> {
  const response = await fetch(`/api/bookings/${id}/receipt`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to download receipt")
  }

  return response.blob()
}

// Download e-ticket
export async function downloadETicket(id: string): Promise<Blob> {
  const response = await fetch(`/api/bookings/${id}/ticket`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to download e-ticket")
  }

  return response.blob()
}
