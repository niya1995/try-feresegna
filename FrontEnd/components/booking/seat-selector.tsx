"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/context/booking-context"
import { Badge } from "@/components/ui/badge"
import { X, ChevronRight, ShipWheelIcon as SteeringWheel, DoorOpen, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface Seat {
  id: string
  number: string
  type: "standard" | "premium" | "vip"
  isBooked: boolean
  position: "window-left" | "aisle-left" | "aisle-right" | "window-right" | "single-left" | "single-right"
}

interface SeatSelectorProps {
  trip: any
}

export function SeatSelector({ trip }: SeatSelectorProps) {
  const router = useRouter()
  const { selectedSeats, selectSeat } = useBooking()
  const [isLoading, setIsLoading] = useState(false)
  const [busType, setBusType] = useState<"standard" | "luxury">("standard")

  // Generate seats based on total seats
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = []
    const totalSeats = trip.totalSeats || 45
    const bookedSeatsCount = Math.min(totalSeats - trip.availableSeats, Math.floor(totalSeats * 0.6))

    // Generate random booked seats
    const bookedSeatNumbers = new Set<number>()
    while (bookedSeatNumbers.size < bookedSeatsCount) {
      bookedSeatNumbers.add(Math.floor(Math.random() * totalSeats) + 1)
    }

    let seatNumber = 1

    if (busType === "standard") {
      // Standard bus has 2-2 seating arrangement
      const rows = Math.ceil(totalSeats / 4)

      for (let row = 1; row <= rows; row++) {
        // Left window seat
        if (seatNumber <= totalSeats) {
          seats.push({
            id: `seat-${seatNumber}`,
            number: seatNumber.toString(),
            type: row <= 2 ? "vip" : row <= 6 ? "premium" : "standard",
            isBooked: bookedSeatNumbers.has(seatNumber),
            position: "window-left",
          })
          seatNumber++
        }

        // Left aisle seat
        if (seatNumber <= totalSeats) {
          seats.push({
            id: `seat-${seatNumber}`,
            number: seatNumber.toString(),
            type: row <= 2 ? "vip" : row <= 6 ? "premium" : "standard",
            isBooked: bookedSeatNumbers.has(seatNumber),
            position: "aisle-left",
          })
          seatNumber++
        }

        // Right aisle seat
        if (seatNumber <= totalSeats) {
          seats.push({
            id: `seat-${seatNumber}`,
            number: seatNumber.toString(),
            type: row <= 2 ? "vip" : row <= 6 ? "premium" : "standard",
            isBooked: bookedSeatNumbers.has(seatNumber),
            position: "aisle-right",
          })
          seatNumber++
        }

        // Right window seat
        if (seatNumber <= totalSeats) {
          seats.push({
            id: `seat-${seatNumber}`,
            number: seatNumber.toString(),
            type: row <= 2 ? "vip" : row <= 6 ? "premium" : "standard",
            isBooked: bookedSeatNumbers.has(seatNumber),
            position: "window-right",
          })
          seatNumber++
        }
      }
    } else {
      // Luxury bus has 2-1 seating arrangement
      const rows = Math.ceil(totalSeats / 3)

      for (let row = 1; row <= rows; row++) {
        // Left window seat
        if (seatNumber <= totalSeats) {
          seats.push({
            id: `seat-${seatNumber}`,
            number: seatNumber.toString(),
            type: row <= 3 ? "vip" : row <= 8 ? "premium" : "standard",
            isBooked: bookedSeatNumbers.has(seatNumber),
            position: "window-left",
          })
          seatNumber++
        }

        // Left aisle seat
        if (seatNumber <= totalSeats) {
          seats.push({
            id: `seat-${seatNumber}`,
            number: seatNumber.toString(),
            type: row <= 3 ? "vip" : row <= 8 ? "premium" : "standard",
            isBooked: bookedSeatNumbers.has(seatNumber),
            position: "aisle-left",
          })
          seatNumber++
        }

        // Right single seat
        if (seatNumber <= totalSeats) {
          seats.push({
            id: `seat-${seatNumber}`,
            number: seatNumber.toString(),
            type: row <= 3 ? "vip" : row <= 8 ? "premium" : "standard",
            isBooked: bookedSeatNumbers.has(seatNumber),
            position: "single-right",
          })
          seatNumber++
        }
      }
    }

    return seats
  }

  const [seats, setSeats] = useState<Seat[]>(generateSeats)

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return
    selectSeat(seat)
  }

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

  const handleContinue = () => {
    if (selectedSeats.length === 0) return

    setIsLoading(true)

    // Simulate a short delay before redirecting
    setTimeout(() => {
      router.push("/payment")
    }, 500)
  }

  const toggleBusType = () => {
    setBusType((prev) => (prev === "standard" ? "luxury" : "standard"))
    setSeats(generateSeats())
  }

  // Group seats by row for the bus layout
  const getRowsFromSeats = () => {
    const rows = []
    const seatsPerRow = busType === "standard" ? 4 : 3

    for (let i = 0; i < seats.length; i += seatsPerRow) {
      rows.push(seats.slice(i, i + seatsPerRow))
    }

    return rows
  }

  const rows = getRowsFromSeats()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="font-medium">Selected Seats: </span>
          <span className="text-primary font-bold">{selectedSeats.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={toggleBusType} className="text-xs">
            Switch to {busType === "standard" ? "Luxury" : "Standard"} Bus
          </Button>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded mr-2"></div>
              <span className="text-sm">Booked</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-primary rounded mr-2"></div>
              <span className="text-sm">Selected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        {/* Realistic Bus Layout */}
        <div className="relative max-w-2xl mx-auto">
          {/* Bus outline */}
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-3xl p-6 border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
            {/* Direction indicator */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium">
              <span>Front</span>
              <ArrowRight className="h-3 w-3" />
              <span>Back</span>
            </div>

            {/* Driver area */}
            <div className="absolute top-6 left-6 flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mb-1">
                <SteeringWheel className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="text-xs text-gray-500">Driver</span>
            </div>

            {/* Door */}
            <div className="absolute top-6 right-6 flex flex-col items-center">
              <div className="w-8 h-14 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center mb-1">
                <DoorOpen className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="text-xs text-gray-500">Door</span>
            </div>

            {/* Seats layout */}
            <div className="mt-24 mb-4">
              {rows.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex justify-center mb-4">
                  {busType === "standard" ? (
                    // Standard bus layout (2-2)
                    <>
                      {/* Left side seats */}
                      <div className="flex gap-1">
                        {row
                          .filter((seat) => seat.position === "window-left")
                          .map((seat) => (
                            <motion.button
                              key={seat.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isBooked}
                            >
                              {seat.number}
                            </motion.button>
                          ))}
                        {row
                          .filter((seat) => seat.position === "aisle-left")
                          .map((seat) => (
                            <motion.button
                              key={seat.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isBooked}
                            >
                              {seat.number}
                            </motion.button>
                          ))}
                      </div>

                      {/* Aisle */}
                      <div className="w-8"></div>

                      {/* Right side seats */}
                      <div className="flex gap-1">
                        {row
                          .filter((seat) => seat.position === "aisle-right")
                          .map((seat) => (
                            <motion.button
                              key={seat.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isBooked}
                            >
                              {seat.number}
                            </motion.button>
                          ))}
                        {row
                          .filter((seat) => seat.position === "window-right")
                          .map((seat) => (
                            <motion.button
                              key={seat.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isBooked}
                            >
                              {seat.number}
                            </motion.button>
                          ))}
                      </div>
                    </>
                  ) : (
                    // Luxury bus layout (2-1)
                    <>
                      {/* Left side seats */}
                      <div className="flex gap-1">
                        {row
                          .filter((seat) => seat.position === "window-left")
                          .map((seat) => (
                            <motion.button
                              key={seat.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isBooked}
                            >
                              {seat.number}
                            </motion.button>
                          ))}
                        {row
                          .filter((seat) => seat.position === "aisle-left")
                          .map((seat) => (
                            <motion.button
                              key={seat.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isBooked}
                            >
                              {seat.number}
                            </motion.button>
                          ))}
                      </div>

                      {/* Aisle */}
                      <div className="w-8"></div>

                      {/* Right side single seat */}
                      <div className="flex">
                        {row
                          .filter((seat) => seat.position === "single-right")
                          .map((seat) => (
                            <motion.button
                              key={seat.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isBooked}
                            >
                              {seat.number}
                            </motion.button>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Back of the bus */}
            <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-b-xl"></div>

            {/* Seat type indicators */}
            <div className="mt-4 flex justify-center gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 dark:bg-purple-900 rounded mr-2"></div>
                <span className="text-xs">VIP</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded mr-2"></div>
                <span className="text-xs">Premium</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 dark:bg-green-900 rounded mr-2"></div>
                <span className="text-xs">Standard</span>
              </div>
            </div>
          </div>
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
                <button className="ml-1 hover:bg-primary-600 rounded-full p-0.5" onClick={() => selectSeat(seat)}>
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
            disabled={selectedSeats.length === 0 || isLoading}
            className="bg-accent hover:bg-accent/90 text-white"
          >
            {isLoading ? (
              <>
                <span className="mr-2">Processing...</span>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              </>
            ) : (
              <>
                Continue to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
