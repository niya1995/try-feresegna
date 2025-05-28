// Shared types for API requests and responses

// User related types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "passenger" | "operator" | "driver" | "admin"
  status: "active" | "pending" | "suspended"
  createdAt: string
  address?: string
  city?: string
  country?: string
}

export interface UserPreferences {
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  language: string
  currency: string
  seatPreference: string
}

// Authentication types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterRequest {
  name: string
  email: string
  phone: string
  password: string
}

export interface RegisterResponse {
  user: User
  token: string
}

export interface OperatorRegistrationRequest {
  companyName: string
  email: string
  phone: string
  address: string
  licenseNumber: string
  password: string
  regions?: string[]
  routeClusters?: string[]
}

export interface DriverRegistrationRequest {
  fullName: string
  email: string
  phone: string
  licenseNumber: string
  licenseExpiry: string
  password: string
}

export interface RegistrationResponse {
  message: string
  status: "pending" | "approved"
}

// Trip related types
export interface Trip {
  id: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  date: string
  operator: string
  price: number
  availableSeats: number
  totalSeats: number
  features: string[]
  busType: string
  duration: string
  distance: string
  rating?: number
  status: "active" | "cancelled"
}

export interface TripSearchRequest {
  origin: string
  destination: string
  date: string
  passengers?: number
  priceMin?: number
  priceMax?: number
  timeSlots?: string[]
  features?: string[]
}

export interface TripSearchResponse {
  trips: Trip[]
  total: number
}

export interface TripCreateRequest {
  routeId: string
  busId: string
  departureTime: string
  arrivalTime: string
  date: string
  price: number
}

// Seat related types
export interface Seat {
  id: string
  number: string
  type: "standard" | "premium" | "vip"
  isBooked: boolean
}

// Booking related types
export interface Booking {
  id: string
  userId: string
  tripId: string
  trip: Trip
  seats: Seat[]
  totalPrice: number
  status: "confirmed" | "cancelled" | "completed" | "pending"
  paymentMethod: string
  bookingReference: string
  createdAt: string
}

export interface BookingCreateRequest {
  tripId: string
  seatIds: string[]
  paymentMethod: string
}

export interface BookingCreateResponse {
  booking: Booking
  bookingId: string
}

export interface BookingListResponse {
  bookings: Booking[]
}

// Operator related types
export interface Operator {
  id: string
  name: string
  email: string
  phone: string
  address: string
  busCount: number
  routeCount: number
  status: "active" | "pending" | "suspended"
  regions: string[]
  routeClusters: string[]
  registrationDate: string
  licenseNumber?: string
}

export interface OperatorCreateRequest {
  name: string
  email: string
  phone: string
  address: string
  regions: string[]
  routeClusters: string[]
}

export interface OperatorUpdateRequest {
  name?: string
  email?: string
  phone?: string
  address?: string
  status?: string
}

export interface OperatorAssignAccessRequest {
  regions: string[]
  routeClusters: string[]
}

export interface OperatorListResponse {
  operators: Operator[]
}

// Bus related types
export interface Bus {
  id: string
  plateNumber: string
  model: string
  capacity: number
  features: string[]
  status: "active" | "maintenance" | "inactive"
  operatorId: string
}

export interface BusCreateRequest {
  plateNumber: string
  model: string
  capacity: number
  features: string[]
}

export interface BusUpdateRequest {
  plateNumber?: string
  model?: string
  capacity?: number
  status?: string
}

// Driver related types
export interface Driver {
  id: string
  fullName: string
  email: string
  phone: string
  licenseNumber: string
  licenseExpiry: string
  status: "active" | "pending" | "suspended"
  operatorId: string
}

export interface DriverCreateRequest {
  fullName: string
  email: string
  phone: string
  licenseNumber: string
  licenseExpiry: string
}

// Route related types
export interface Route {
  id: string
  name: string
  distance: string
  duration: string
  operators: string[]
  popularity: "High" | "Medium" | "Low"
  status: "Active" | "Inactive"
}

export interface RouteCreateRequest {
  name: string
  distance: string
  duration: string
  operators: string[]
}

export interface RouteUpdateRequest {
  name?: string
  distance?: string
  duration?: string
  status?: string
}

// Dashboard stats types
export interface AdminDashboardStats {
  totalOperators: number
  totalPassengers: number
  totalBookings: number
  totalRevenue: number
  recentBookings: Booking[]
  popularRoutes: Route[]
}

export interface OperatorDashboardStats {
  totalTrips: number
  totalBookings: number
  totalRevenue: number
  activeBuses: number
}

export interface DriverDashboardStats {
  todayTrips: number
  completedTrips: number
  totalPassengers: number
  nextTrip: Trip | null
}

// Contact and support types
export interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface Testimonial {
  id: string
  name: string
  message: string
  rating: number
  location: string
}

// Tracking types
export interface Location {
  latitude: number
  longitude: number
  address: string
}

export interface TripTracking {
  trip: Trip
  location: Location
  status: string
  estimatedArrival: string
}

// Passenger check-in types
export interface Passenger {
  id: string
  name: string
  email: string
  phone: string
  seatNumber: string
  checkedIn: boolean
}

export interface CheckInRequest {
  passengerId: string
}

// Profile update types
export interface ProfileUpdateRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  city?: string
  country?: string
}

export interface PasswordChangeRequest {
  currentPassword: string
  newPassword: string
}

export interface PreferencesUpdateRequest {
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  language: string
  currency: string
  seatPreference: string
}

// Generic API response types
export interface ApiResponse<T = any> {
  data?: T
  message?: string
  error?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

// Search and filter types
export interface SearchParams {
  search?: string
  status?: string
  page?: number
  limit?: number
}
