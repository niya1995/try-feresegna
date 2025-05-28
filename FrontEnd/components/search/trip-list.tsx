"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import {
  ArrowRight,
  Clock,
  Calendar,
  Bus,
  MapPin,
  Wifi,
  AirVent,
  Power,
  Armchair,
  TableIcon as Toilet,
  Tv,
  Star,
  Users,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface Trip {
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
  duration: string
  distance: string
  rating?: number
}

interface TripListProps {
  isLoading: boolean
  origin: string
  destination: string
  date: Date
  priceRange: [number, number]
  selectedTimeSlots: string[]
  selectedFeatures: string[]
}

// Helper function to get distance between cities
const getDistance = (origin: string, destination: string): string => {
  const distanceMap: Record<string, Record<string, string>> = {
    "Addis Ababa": {
      "Bahir Dar": "565 km",
      Gondar: "725 km",
      Hawassa: "270 km",
      "Dire Dawa": "445 km",
      Mekelle: "780 km",
      Jimma: "350 km",
      Dessie: "400 km",
      Harar: "525 km",
      Adama: "100 km",
    },
    "Bahir Dar": {
      "Addis Ababa": "565 km",
      Gondar: "180 km",
      Mekelle: "690 km",
      Dessie: "440 km",
    },
    Gondar: {
      "Addis Ababa": "725 km",
      "Bahir Dar": "180 km",
      Mekelle: "550 km",
    },
    Hawassa: {
      "Addis Ababa": "270 km",
      Adama: "210 km",
      Jimma: "350 km",
    },
    "Dire Dawa": {
      "Addis Ababa": "445 km",
      Harar: "50 km",
      Adama: "350 km",
    },
  }

  return distanceMap[origin]?.[destination] || "500 km" // Default distance if not found
}

// Helper function to calculate duration based on distance
const getDuration = (distance: string): string => {
  const km = Number.parseInt(distance.split(" ")[0])
  const hours = Math.ceil(km / 70) // Assuming average speed of 70 km/h
  return `${hours} hours`
}

export function TripList({
  isLoading,
  origin,
  destination,
  date,
  priceRange,
  selectedTimeSlots,
  selectedFeatures,
}: TripListProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])

  // Mock data for trips
  useEffect(() => {
    if (origin && destination) {
      // Get distance between cities
      const distance = getDistance(origin, destination)
      const duration = getDuration(distance)

      // Generate mock trips
      const mockTrips: Trip[] = [
        {
          id: "1",
          origin,
          destination,
          departureTime: "06:00",
          arrivalTime: "14:00",
          date: format(date, "yyyy-MM-dd"),
          operator: "Selam Bus",
          price: 800,
          availableSeats: 25,
          totalSeats: 45,
          features: ["Air Conditioning", "WiFi", "Power Outlets", "Reclining Seats"],
          duration,
          distance,
          rating: 4.7,
        },
        {
          id: "2",
          origin,
          destination,
          departureTime: "08:30",
          arrivalTime: "15:30",
          date: format(date, "yyyy-MM-dd"),
          operator: "Sky Bus",
          price: 750,
          availableSeats: 15,
          totalSeats: 49,
          features: ["Air Conditioning", "WiFi", "Entertainment"],
          duration,
          distance,
          rating: 4.5,
        },
        {
          id: "3",
          origin,
          destination,
          departureTime: "12:00",
          arrivalTime: "20:00",
          date: format(date, "yyyy-MM-dd"),
          operator: "Golden Bus",
          price: 700,
          availableSeats: 5,
          totalSeats: 45,
          features: ["Air Conditioning", "Toilet"],
          duration,
          distance,
          rating: 4.2,
        },
        {
          id: "4",
          origin,
          destination,
          departureTime: "16:00",
          arrivalTime: "00:00",
          date: format(date, "yyyy-MM-dd"),
          operator: "Abay Bus",
          price: 650,
          availableSeats: 0,
          totalSeats: 49,
          features: ["Air Conditioning"],
          duration,
          distance,
          rating: 4.0,
        },
        {
          id: "5",
          origin,
          destination,
          departureTime: "20:00",
          arrivalTime: "04:00",
          date: format(date, "yyyy-MM-dd"),
          operator: "Habesha Bus",
          price: 900,
          availableSeats: 30,
          totalSeats: 45,
          features: ["Air Conditioning", "WiFi", "Power Outlets", "Reclining Seats", "Toilet", "Entertainment"],
          duration,
          distance,
          rating: 4.9,
        },
      ]

      setTrips(mockTrips)
    } else {
      setTrips([])
    }
  }, [origin, destination, date])

  // Apply filters
  useEffect(() => {
    let filtered = [...trips]

    // Price filter
    filtered = filtered.filter((trip) => trip.price >= priceRange[0] && trip.price <= priceRange[1])

    // Time slots filter
    if (selectedTimeSlots.length > 0) {
      filtered = filtered.filter((trip) => {
        const hour = Number.parseInt(trip.departureTime.split(":")[0])

        if (selectedTimeSlots.includes("Morning (6AM-12PM)") && hour >= 6 && hour < 12) {
          return true
        }
        if (selectedTimeSlots.includes("Afternoon (12PM-6PM)") && hour >= 12 && hour < 18) {
          return true
        }
        if (selectedTimeSlots.includes("Evening (6PM-12AM)") && hour >= 18 && hour < 24) {
          return true
        }
        if (selectedTimeSlots.includes("Night (12AM-6AM)") && hour >= 0 && hour < 6) {
          return true
        }

        return false
      })
    }

    // Features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((trip) => {
        return selectedFeatures.every((feature) => trip.features.includes(feature))
      })
    }

    setFilteredTrips(filtered)
  }, [trips, priceRange, selectedTimeSlots, selectedFeatures])

  // Feature icon mapping
  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "WiFi":
        return <Wifi className="h-4 w-4" />
      case "Air Conditioning":
        return <AirVent className="h-4 w-4" />
      case "Power Outlets":
        return <Power className="h-4 w-4" />
      case "Reclining Seats":
        return <Armchair className="h-4 w-4" />
      case "Toilet":
        return <Toilet className="h-4 w-4" />
      case "Entertainment":
        return <Tv className="h-4 w-4" />
      default:
        return null
    }
  }

  if (!origin || !destination) {
    return null
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-effect p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-40 bg-white/10" />
              <Skeleton className="h-6 w-40 bg-white/10" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Skeleton className="h-5 w-full bg-white/10" />
              <Skeleton className="h-5 w-full bg-white/10" />
              <Skeleton className="h-5 w-full bg-white/10" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-20 bg-white/10" />
              <Skeleton className="h-10 w-32 bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredTrips.length === 0) {
    return (
      <motion.div
        className="glass-effect p-8 rounded-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-white text-xl mb-4">No Trips Found</h3>
        <p className="text-blue-100 mb-6">
          No trips match your search criteria. Try adjusting your filters or search for a different route.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {filteredTrips.map((trip, index) => {
        const availabilityPercentage = (trip.availableSeats / trip.totalSeats) * 100
        let availabilityStatus = "seat-available"
        let availabilityText = "Available"

        if (availabilityPercentage === 0) {
          availabilityStatus = "seat-scarce"
          availabilityText = "Sold Out"
        } else if (availabilityPercentage <= 20) {
          availabilityStatus = "seat-limited"
          availabilityText = "Limited"
        }

        return (
          <motion.div
            key={trip.id}
            className="trip-card backdrop-blur-md bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="bg-primary/20 p-1.5 rounded-full mr-2">
                      <MapPin className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-white font-medium">{trip.origin}</span>
                  </div>
                </div>
                <div className="mx-3 text-blue-300">
                  <div className="relative w-16 h-0.5 bg-blue-300/30">
                    <ArrowRight className="h-4 w-4 absolute top-1/2 right-0 transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="bg-accent/20 p-1.5 rounded-full mr-2">
                      <MapPin className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-white font-medium">{trip.destination}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Badge className="bg-primary/20 text-primary-foreground border border-primary/30 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{trip.rating}</span>
                </Badge>
                <span className="mx-2 text-white/40">|</span>
                <Badge className="bg-accent/20 text-accent border border-accent/30">{trip.operator}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <div className="bg-white/10 p-1.5 rounded-full mr-2">
                  <Clock className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <span className="text-white text-sm">Departure: </span>
                  <span className="text-white font-medium">{trip.departureTime}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-white/10 p-1.5 rounded-full mr-2">
                  <Clock className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <span className="text-white text-sm">Arrival: </span>
                  <span className="text-white font-medium">{trip.arrivalTime}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-white/10 p-1.5 rounded-full mr-2">
                  <Calendar className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <span className="text-white text-sm">Date: </span>
                  <span className="text-white font-medium">{format(new Date(trip.date), "MMM dd, yyyy")}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-white/10 p-1.5 rounded-full mr-2">
                    <Bus className="h-4 w-4 text-blue-300" />
                  </div>
                  <span className="text-blue-100 text-sm">
                    {trip.duration} • {trip.distance}
                  </span>
                  <span className="mx-2 text-white/40">|</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-300 mr-1" />
                    <span className="text-blue-100 text-sm">
                      {trip.availableSeats}/{trip.totalSeats} seats
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                  {trip.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white flex items-center gap-1"
                    >
                      {getFeatureIcon(feature)}
                      <span className="text-xs">{feature}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end mt-4 md:mt-0">
                <div className="flex items-center mb-2">
                  <div
                    className={`w-2 h-2 rounded-full ${availabilityStatus.replace("seat-", "bg-").replace("available", "green-500").replace("limited", "yellow-500").replace("scarce", "red-500")} mr-1`}
                  ></div>
                  <span
                    className={`text-xs ${availabilityStatus.replace("seat-", "text-").replace("available", "green-500").replace("limited", "yellow-500").replace("scarce", "red-500")}`}
                  >
                    {availabilityText}
                  </span>
                </div>
                <div className="text-accent font-bold text-2xl mb-2">{trip.price} ETB</div>
                <Link href={`/booking/${trip.id}`}>
                  <Button
                    className="bg-accent hover:bg-accent/90 text-white flex items-center gap-2 shadow-lg hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105"
                    disabled={trip.availableSeats === 0}
                  >
                    {trip.availableSeats === 0 ? "Sold Out" : "Select Seats"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
