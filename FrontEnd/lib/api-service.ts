import { apiConfig, endpoints, getAuthHeaders, handleApiError } from "./api-config"

// Types
export interface User {
  id: string
  name: string
  email: string
  role: "passenger" | "operator" | "driver" | "admin"
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Trip {
  id: string
  origin: string
  destination: string
  departure_time: string
  arrival_time: string
  price: number
  available_seats: number
  total_seats: number
  operator_name: string
  bus_type: string
  features: string[]
  status: "active" | "cancelled" | "completed"
  created_at: string
}

export interface Booking {
  id: string
  trip_id: string
  user_id: string
  seats: string[]
  total_price: number
  status: "confirmed" | "cancelled" | "completed"
  payment_method: string
  booking_reference: string
  created_at: string
  trip?: Trip
}

export interface Operator {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: "active" | "pending" | "suspended"
  regions: string[]
  routeClusters: string[]
  busCount: number
  routeCount: number
  registrationDate: string
}

// API Client class
class ApiClient {
  private baseURL: string

  constructor() {
    this.baseURL = apiConfig.baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      ...options,
      headers: {
        ...apiConfig.headers,
        ...getAuthHeaders(),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return await response.json()
      }

      return response.text() as unknown as T
    } catch (error) {
      return handleApiError(error)
    }
  }

  // Authentication API
  auth = {
    login: async (email: string, password: string) => {
      const response = await this.request<{ access_token: string; user: User }>(endpoints.auth.login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      // Store token and user data
      if (typeof window !== "undefined") {
        localStorage.setItem("feresegna_token", response.access_token)
        localStorage.setItem("feresegna_user", JSON.stringify(response.user))
      }

      return response
    },

    register: async (userData: any) => {
      const response = await this.request<{ access_token: string; user: User }>(endpoints.auth.register, {
        method: "POST",
        body: JSON.stringify(userData),
      })

      // Store token and user data
      if (typeof window !== "undefined") {
        localStorage.setItem("feresegna_token", response.access_token)
        localStorage.setItem("feresegna_user", JSON.stringify(response.user))
      }

      return response
    },

    logout: async () => {
      await this.request(endpoints.auth.logout, { method: "POST" })

      // Clear stored data
      if (typeof window !== "undefined") {
        localStorage.removeItem("feresegna_token")
        localStorage.removeItem("feresegna_user")
      }
    },

    getCurrentUser: async (): Promise<User> => {
      return this.request<User>(endpoints.auth.me)
    },
  }

  // Trips API
  trips = {
    search: async (params: {
      from: string
      to: string
      date: string
      passengers: number
    }): Promise<Trip[]> => {
      const searchParams = new URLSearchParams({
        origin: params.from,
        destination: params.to,
        departure_date: params.date,
        passengers: params.passengers.toString(),
      })

      return this.request<Trip[]>(`${endpoints.trips.search}?${searchParams}`)
    },

    getPopular: async (): Promise<Trip[]> => {
      return this.request<Trip[]>(endpoints.trips.popular)
    },

    getById: async (id: string): Promise<Trip> => {
      return this.request<Trip>(endpoints.trips.byId(id))
    },

    create: async (tripData: any): Promise<Trip> => {
      return this.request<Trip>(endpoints.trips.create, {
        method: "POST",
        body: JSON.stringify(tripData),
      })
    },

    update: async (id: string, tripData: any): Promise<Trip> => {
      return this.request<Trip>(endpoints.trips.update(id), {
        method: "PUT",
        body: JSON.stringify(tripData),
      })
    },

    delete: async (id: string): Promise<void> => {
      return this.request<void>(endpoints.trips.delete(id), {
        method: "DELETE",
      })
    },
  }

  // Bookings API
  bookings = {
    create: async (bookingData: any): Promise<Booking> => {
      return this.request<Booking>(endpoints.bookings.create, {
        method: "POST",
        body: JSON.stringify(bookingData),
      })
    },

    getById: async (id: string): Promise<Booking> => {
      return this.request<Booking>(endpoints.bookings.byId(id))
    },

    getUserBookings: async (): Promise<Booking[]> => {
      return this.request<Booking[]>(endpoints.bookings.userBookings)
    },

    cancel: async (id: string): Promise<Booking> => {
      return this.request<Booking>(endpoints.bookings.cancel(id), {
        method: "POST",
      })
    },

    getReceipt: async (id: string): Promise<any> => {
      return this.request<any>(endpoints.bookings.receipt(id))
    },
  }

  // Operators API
  operators = {
    getAll: async (): Promise<Operator[]> => {
      return this.request<Operator[]>(endpoints.operators.list)
    },

    create: async (operatorData: any): Promise<Operator> => {
      return this.request<Operator>(endpoints.operators.create, {
        method: "POST",
        body: JSON.stringify(operatorData),
      })
    },

    getById: async (id: string): Promise<Operator> => {
      return this.request<Operator>(endpoints.operators.byId(id))
    },

    update: async (id: string, operatorData: any): Promise<Operator> => {
      return this.request<Operator>(endpoints.operators.update(id), {
        method: "PUT",
        body: JSON.stringify(operatorData),
      })
    },

    delete: async (id: string): Promise<void> => {
      return this.request<void>(endpoints.operators.delete(id), {
        method: "DELETE",
      })
    },

    approve: async (id: string): Promise<Operator> => {
      return this.request<Operator>(endpoints.operators.approve(id), {
        method: "POST",
      })
    },

    suspend: async (id: string): Promise<Operator> => {
      return this.request<Operator>(endpoints.operators.suspend(id), {
        method: "POST",
      })
    },
  }

  // Users API
  users = {
    updateProfile: async (profileData: any): Promise<User> => {
      return this.request<User>(endpoints.users.updateProfile, {
        method: "PUT",
        body: JSON.stringify(profileData),
      })
    },

    changePassword: async (passwordData: {
      current_password: string
      new_password: string
    }): Promise<void> => {
      return this.request<void>(endpoints.users.changePassword, {
        method: "POST",
        body: JSON.stringify(passwordData),
      })
    },
  }

  // Dashboard API
  dashboard = {
    getAdminStats: async (): Promise<any> => {
      return this.request<any>(endpoints.dashboard.adminStats)
    },

    getOperatorStats: async (): Promise<any> => {
      return this.request<any>(endpoints.dashboard.operatorStats)
    },

    getDriverStats: async (): Promise<any> => {
      return this.request<any>(endpoints.dashboard.driverStats)
    },

    getRecentBookings: async (limit = 10): Promise<Booking[]> => {
      return this.request<Booking[]>(`${endpoints.dashboard.recentBookings}?limit=${limit}`)
    },

    getRevenueData: async (period = "30d"): Promise<any> => {
      return this.request<any>(`${endpoints.dashboard.revenue}?period=${period}`)
    },
  }

  // Locations API
  locations = {
    getCities: async (): Promise<string[]> => {
      return this.request<string[]>(endpoints.locations.cities)
    },

    getRegions: async (): Promise<string[]> => {
      return this.request<string[]>(endpoints.locations.regions)
    },

    search: async (query: string): Promise<string[]> => {
      return this.request<string[]>(`${endpoints.locations.search}?q=${encodeURIComponent(query)}`)
    },
  }

  // Support API
  support = {
    submitContact: async (contactData: any): Promise<void> => {
      return this.request<void>(endpoints.support.contact, {
        method: "POST",
        body: JSON.stringify(contactData),
      })
    },

    getFAQ: async (): Promise<any[]> => {
      return this.request<any[]>(endpoints.support.faq)
    },

    getTestimonials: async (): Promise<any[]> => {
      return this.request<any[]>(endpoints.support.testimonials)
    },
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export individual API modules for convenience
export const authApi = apiClient.auth
export const tripApi = apiClient.trips
export const bookingApi = apiClient.bookings
export const operatorApi = apiClient.operators
export const userApi = apiClient.users
export const dashboardApi = apiClient.dashboard
export const locationApi = apiClient.locations
export const supportApi = apiClient.support
