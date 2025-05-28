"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

// Simplified mock trip data
const mockTrips = [
  {
    id: "1",
    origin: "Addis Ababa",
    destination: "Bahir Dar",
    departureTime: "06:00",
    arrivalTime: "14:00",
    date: "2023-07-15",
    operator: "Selam Bus",
    price: 800,
    availableSeats: 25,
    totalSeats: 45,
    features: ["Air Conditioning", "WiFi", "Power Outlets", "Reclining Seats"],
    busType: "Luxury",
  },
  {
    id: "2",
    origin: "Addis Ababa",
    destination: "Hawassa",
    departureTime: "08:30",
    arrivalTime: "15:30",
    date: "2023-07-15",
    operator: "Sky Bus",
    price: 750,
    availableSeats: 15,
    totalSeats: 49,
    features: ["Air Conditioning", "WiFi", "Entertainment"],
    busType: "Standard",
  },
  {
    id: "3",
    origin: "Addis Ababa",
    destination: "Gondar",
    departureTime: "12:00",
    arrivalTime: "20:00",
    date: "2023-07-15",
    operator: "Golden Bus",
    price: 700,
    availableSeats: 5,
    totalSeats: 45,
    features: ["Air Conditioning", "Toilet"],
    busType: "Standard",
  },
  {
    id: "4",
    origin: "Addis Ababa",
    destination: "Dire Dawa",
    departureTime: "16:00",
    arrivalTime: "00:00",
    date: "2023-07-15",
    operator: "Abay Bus",
    price: 650,
    availableSeats: 0,
    totalSeats: 49,
    features: ["Air Conditioning"],
    busType: "Economy",
  },
  {
    id: "5",
    origin: "Addis Ababa",
    destination: "Mekelle",
    departureTime: "20:00",
    arrivalTime: "04:00",
    date: "2023-07-15",
    operator: "Habesha Bus",
    price: 900,
    availableSeats: 30,
    totalSeats: 45,
    features: ["Air Conditioning", "WiFi", "Power Outlets", "Reclining Seats", "Toilet", "Entertainment"],
    busType: "VIP",
  },
]

// Simplified seat type
interface Seat {
  id: string
  number: string
  type: "standard" | "premium" | "vip"
  isBooked: boolean
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [trip, setTrip] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  // Check authentication first
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        // Save the trip ID to localStorage so we can redirect back after login
        const tripId = params.id as string
        localStorage.setItem("pendingBookingTripId", tripId)

        // Show toast notification
        toast({
          title: "Authentication Required",
          description: "Please log in to continue with your booking.",
          variant: "destructive",
        })

        // Redirect to login page with return URL
        const returnUrl = `/booking/${tripId}`
        router.push(`/auth?returnUrl=${encodeURIComponent(returnUrl)}`)
      } else {
        setAuthChecked(true)
      }
    }
  }, [isAuthenticated, authLoading, params.id, router, toast])

  // Load trip data only after authentication is confirmed
  useEffect(() => {
    if (!authChecked) return

    const tripId = params.id as string
    console.log("Loading trip with ID:", tripId)

    // Simulate API call to fetch trip details
    setIsLoading(true)

    // Use a shorter timeout for better UX
    const timer = setTimeout(() => {
      const foundTrip = mockTrips.find((t) => t.id === tripId)
      console.log("Found trip:", foundTrip)

      if (foundTrip) {
        setTrip(foundTrip)

        // Generate seats
        const generatedSeats = generateSeats(foundTrip)
        setSeats(generatedSeats)

        setError(null)
      } else {
        setError(`Trip with ID ${tripId} not found`)
        // Don't redirect immediately, show the error message
        setTimeout(() => router.push("/search"), 3000)
      }

      setIsLoading(false)
    }, 1000) // Reduced timeout for better UX

    return () => clearTimeout(timer)
  }, [params.id, router, authChecked])

  // Generate seats based on trip data
  const generateSeats = (trip: any): Seat[] => {
    const seats: Seat[] = []
    const bookedSeatsCount = trip.totalSeats - trip.availableSeats

    // Generate random booked seats
    const bookedSeatNumbers = new Set<number>()
    while (bookedSeatNumbers.size < bookedSeatsCount) {
      bookedSeatNumbers.add(Math.floor(Math.random() * trip.totalSeats) + 1)
    }

    for (let i = 1; i <= trip.totalSeats; i++) {
      const seatType = i <= 10 ? "vip" : i <= 30 ? "premium" : "standard"
      seats.push({
        id: `seat-${i}`,
        number: i.toString(),
        type: seatType,
        isBooked: bookedSeatNumbers.has(i),
      })
    }

    return seats
  }

  // Handle seat selection
  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return

    setSelectedSeats((prev) => {
      const seatIndex = prev.findIndex((s) => s.id === seat.id)
      if (seatIndex >= 0) {
        return prev.filter((s) => s.id !== seat.id)
      } else {
        return [...prev, seat]
      }
    })
  }

  // Get seat color based on type and selection
  const getSeatColor = (seat: Seat) => {
    if (seat.isBooked) return "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"

    const isSelected = selectedSeats.some((s) => s.id === seat.id)
    if (isSelected) return "bg-primary text-white"

    if (seat.type === "vip")
      return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800"
    if (seat.type === "premium")
      return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
    return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800"
  }

  // Handle continue to payment
  const handleContinue = () => {
    if (selectedSeats.length === 0) return

    setIsProcessing(true)

    // Store selected seats and trip in localStorage for the payment page
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats))
    localStorage.setItem("selectedTrip", JSON.stringify(trip))

    // Simulate a short delay before redirecting
    setTimeout(() => {
      router.push("/payment")
    }, 500)
  }

  const handleBack = () => {
    router.back()
  }

  // Show loading while checking authentication
  if (authLoading || !authChecked) {
    return (
      <MainLayout>
        <div className="bg-gray-50 dark:bg-gray-900 py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="bg-gray-50 dark:bg-gray-900 py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading trip details...</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-gray-50 dark:bg-gray-900 py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 max-w-md w-full text-center">
                <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Trip Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Redirecting to search page...</p>
                <Button variant="outline" onClick={() => router.push("/search")}>
                  Go to Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!trip) {
    return null
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <h1 className="text-2xl font-bold mb-2">Select Your Seats</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {trip.origin} to {trip.destination} • {trip.date} • {trip.departureTime}
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="font-medium">Selected Seats: </span>
                <span className="text-primary font-bold">{selectedSeats.length}</span>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded mr-2"></div>
                  <span className="text-sm">Booked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary rounded mr-2"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 dark:bg-green-900 rounded mr-2"></div>
                  <span className="text-sm">Available</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              {/* Bus front */}
              <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded-t-xl mb-6 flex items-center justify-center">
                <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded-md flex items-center justify-center">
                  <span className="text-sm font-medium">Driver</span>
                </div>
              </div>

              {/* Seats */}
              <div className="grid grid-cols-5 gap-3">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    className={`h-12 rounded-md flex items-center justify-center font-medium transition-colors ${getSeatColor(seat)}`}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected seats summary */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <h3 className="font-semibold mb-2">Selected Seats</h3>
              {selectedSeats.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No seats selected</p>
              ) : (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedSeats.map((seat) => (
                    <Badge key={seat.id} className="bg-primary flex items-center gap-1 pl-2">
                      Seat {seat.number}
                      <button
                        className="ml-1 hover:bg-primary-600 rounded-full p-0.5"
                        onClick={() => handleSeatClick(seat)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Total Price: </span>
                  <span className="font-bold text-lg">{trip.price * selectedSeats.length} ETB</span>
                </div>
                <Button
                  onClick={handleContinue}
                  disabled={selectedSeats.length === 0 || isProcessing}
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  {isProcessing ? (
                    <>
                      <span className="mr-2">Processing...</span>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    </>
                  ) : (
                    "Continue to Payment"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
