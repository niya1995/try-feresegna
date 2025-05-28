"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SearchParams = {
  origin: string
  destination: string
  date: Date
  passengers: number
}

type Seat = {
  id: string
  number: string
  type: "standard" | "premium" | "vip"
}

type Trip = {
  id: string
  origin: string
  destination: string
  departureTime: Date
  arrivalTime: Date
  price: number
  operator: string
  availableSeats: number
  totalSeats: number
  busType: string
  features: string[]
}

type Booking = {
  id: string
  tripId: string
  trip: Trip
  seats: Seat[]
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  paymentMethod?: string
}

type BookingContextType = {
  searchParams: SearchParams | null
  selectedTrip: Trip | null
  selectedSeats: Seat[]
  booking: Booking | null
  setSearchParams: (params: SearchParams) => void
  selectTrip: (trip: Trip) => void
  selectSeat: (seat: Seat) => void
  createBooking: () => Booking
  clearBooking: () => void
}

const defaultSearchParams: SearchParams = {
  origin: "",
  destination: "",
  date: new Date(),
  passengers: 1,
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParamsState] = useState<SearchParams>(defaultSearchParams)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [booking, setBooking] = useState<Booking | null>(null)

  const setSearchParams = (params: SearchParams) => {
    setSearchParamsState(params)
  }

  const selectTrip = (trip: Trip) => {
    setSelectedTrip(trip)
    setSelectedSeats([])
  }

  const selectSeat = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const seatIndex = prev.findIndex((s) => s.id === seat.id)
      if (seatIndex >= 0) {
        return prev.filter((s) => s.id !== seat.id)
      } else {
        return [...prev, seat]
      }
    })
  }

  const createBooking = () => {
    if (!selectedTrip) throw new Error("No trip selected")
    if (selectedSeats.length === 0) throw new Error("No seats selected")

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      tripId: selectedTrip.id,
      trip: selectedTrip,
      seats: selectedSeats,
      totalPrice: selectedTrip.price * selectedSeats.length,
      status: "pending",
    }

    setBooking(newBooking)
    return newBooking
  }

  const clearBooking = () => {
    setSelectedTrip(null)
    setSelectedSeats([])
    setBooking(null)
  }

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        selectedTrip,
        selectedSeats,
        booking,
        setSearchParams,
        selectTrip,
        selectSeat,
        createBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
