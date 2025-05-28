// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/api"

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
}

// API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },

  // Users
  users: {
    profile: "/users/profile",
    updateProfile: "/users/profile",
    changePassword: "/users/change-password",
    bookings: "/users/bookings",
  },

  // Trips
  trips: {
    search: "/trips/search",
    popular: "/trips/popular",
    byId: (id: string) => `/trips/${id}`,
    create: "/trips",
    update: (id: string) => `/trips/${id}`,
    delete: (id: string) => `/trips/${id}`,
  },

  // Bookings
  bookings: {
    create: "/bookings",
    byId: (id: string) => `/bookings/${id}`,
    cancel: (id: string) => `/bookings/${id}/cancel`,
    userBookings: "/bookings/user",
    receipt: (id: string) => `/bookings/${id}/receipt`,
  },

  // Operators
  operators: {
    list: "/operators",
    create: "/operators",
    byId: (id: string) => `/operators/${id}`,
    update: (id: string) => `/operators/${id}`,
    delete: (id: string) => `/operators/${id}`,
    approve: (id: string) => `/operators/${id}/approve`,
    suspend: (id: string) => `/operators/${id}/suspend`,
  },

  // Drivers
  drivers: {
    list: "/drivers",
    create: "/drivers",
    byId: (id: string) => `/drivers/${id}`,
    update: (id: string) => `/drivers/${id}`,
    delete: (id: string) => `/drivers/${id}`,
  },

  // Buses
  buses: {
    list: "/buses",
    create: "/buses",
    byId: (id: string) => `/buses/${id}`,
    update: (id: string) => `/buses/${id}`,
    delete: (id: string) => `/buses/${id}`,
  },

  // Routes
  routes: {
    list: "/routes",
    popular: "/routes/popular",
    create: "/routes",
    byId: (id: string) => `/routes/${id}`,
    update: (id: string) => `/routes/${id}`,
    delete: (id: string) => `/routes/${id}`,
  },

  // Dashboard
  dashboard: {
    adminStats: "/dashboard/admin/stats",
    operatorStats: "/dashboard/operator/stats",
    driverStats: "/dashboard/driver/stats",
    recentBookings: "/dashboard/recent-bookings",
    revenue: "/dashboard/revenue",
  },

  // Locations
  locations: {
    cities: "/locations/cities",
    regions: "/locations/regions",
    search: "/locations/search",
  },

  // Support
  support: {
    contact: "/support/contact",
    faq: "/support/faq",
    testimonials: "/support/testimonials",
  },

  // Export
  export: {
    operators: "/export/operators",
    bookings: "/export/bookings",
    revenue: "/export/revenue",
  },
}

// Request interceptor for adding auth token
export const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("feresegna_token") : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Response interceptor for handling auth errors
export const handleApiError = (error: any) => {
  if (error.response?.status === 401) {
    // Clear auth data and redirect to login
    if (typeof window !== "undefined") {
      localStorage.removeItem("feresegna_token")
      localStorage.removeItem("feresegna_user")
      window.location.href = "/auth"
    }
  }
  throw error
}
