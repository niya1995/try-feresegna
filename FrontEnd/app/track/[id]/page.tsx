"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BusTrackingMap } from "@/components/tracking/bus-tracking-map"
import { TripDetails } from "@/components/tracking/trip-details"
import { Loader2 } from "lucide-react"

// Mock trip data
const mockTrip = {
  id: "123",
  route: "Addis Ababa to Bahir Dar",
  departureTime: "08:00 AM",
  arrivalTime: "04:30 PM",
  currentLocation: "Debre Markos",
  status: "On Time",
  estimatedArrival: "04:30 PM",
  busNumber: "ET-1234",
  driver: "Abebe Kebede",
  stops: [
    { name: "Addis Ababa", time: "08:00 AM", status: "departed" },
    { name: "Debre Birhan", time: "10:30 AM", status: "departed" },
    { name: "Debre Markos", time: "01:00 PM", status: "current" },
    { name: "Bahir Dar", time: "04:30 PM", status: "upcoming" },
  ],
  // Mock coordinates for the bus route
  coordinates: {
    start: { lat: 9.0222, lng: 38.7468 }, // Addis Ababa
    current: { lat: 10.3333, lng: 37.7333 }, // Somewhere between Debre Markos and Bahir Dar
    end: { lat: 11.5742, lng: 37.3614 }, // Bahir Dar
  },
}

export default function TrackPage() {
  const params = useParams()
  const tripId = params.id as string

  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, fetch the trip data from an API
    const fetchTripData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // For demo purposes, we'll use mock data
        setTrip(mockTrip)
        setLoading(false)
      } catch (err) {
        setError("Failed to load trip data. Please try again.")
        setLoading(false)
      }
    }

    fetchTripData()
  }, [tripId])

  // Simulate real-time updates
  useEffect(() => {
    if (!trip) return

    const interval = setInterval(() => {
      // Simulate small movement of the bus
      setTrip((prev) => {
        if (!prev) return prev

        const newLat = prev.coordinates.current.lat + (Math.random() * 0.01 - 0.005)
        const newLng = prev.coordinates.current.lng + (Math.random() * 0.01 - 0.005)

        return {
          ...prev,
          coordinates: {
            ...prev.coordinates,
            current: { lat: newLat, lng: newLng },
          },
        }
      })
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [trip])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg">Loading trip information...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-red-500 text-xl">⚠️</div>
        <h2 className="text-xl font-bold mt-2">Error</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-amber-500 text-xl">⚠️</div>
        <h2 className="text-xl font-bold mt-2">Trip Not Found</h2>
        <p className="text-muted-foreground">The trip you're looking for doesn't exist or has been completed.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Track Your Bus</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BusTrackingMap trip={trip} />
        </div>
        <div>
          <TripDetails trip={trip} />
        </div>
      </div>
    </div>
  )
}
