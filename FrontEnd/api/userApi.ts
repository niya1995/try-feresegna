import { apiRequest } from "./config"
import type {
  User,
  UserPreferences,
  ProfileUpdateRequest,
  PasswordChangeRequest,
  PreferencesUpdateRequest,
  SearchParams,
} from "./types"

// Get user profile
export async function getUserProfile(): Promise<{ user: User }> {
  return apiRequest<{ user: User }>("/users/profile")
}

// Update user profile
export async function updateUserProfile(data: ProfileUpdateRequest): Promise<{ user: User }> {
  return apiRequest<{ user: User }>("/users/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Change password
export async function changePassword(data: PasswordChangeRequest): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/users/password", {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Update user preferences
export async function updateUserPreferences(data: PreferencesUpdateRequest): Promise<{ preferences: UserPreferences }> {
  return apiRequest<{ preferences: UserPreferences }>("/users/preferences", {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Get user preferences
export async function getUserPreferences(): Promise<{ preferences: UserPreferences }> {
  return apiRequest<{ preferences: UserPreferences }>("/users/preferences")
}

// Delete user account
export async function deleteUserAccount(): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/users/account", {
    method: "DELETE",
  })
}

// Get all passengers (admin only)
export async function getAllPassengers(params?: SearchParams): Promise<{ passengers: User[] }> {
  const searchParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })
  }

  const queryString = searchParams.toString()
  return apiRequest<{ passengers: User[] }>(`/admin/passengers${queryString ? `?${queryString}` : ""}`)
}

// Update user status (admin only)
export async function updateUserStatus(id: string, status: string): Promise<{ user: User }> {
  return apiRequest<{ user: User }>(`/admin/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
}
