"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { PaymentProcessor } from "@/components/payment/payment-processor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function PaymentPage() {
  const router = useRouter()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [selectedSeats, setSelectedSeats] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  // Check authentication first
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        // Show toast notification
        toast({
          title: "Authentication Required",
          description: "Please log in to continue with your payment.",
          variant: "destructive",
        })

        // Redirect to login page with return URL
        router.push(`/auth?returnUrl=${encodeURIComponent("/payment")}`)
      } else {
        setAuthChecked(true)
      }
    }
  }, [isAuthenticated, authLoading, router, toast])

  // Load data from localStorage only after authentication is confirmed
  useEffect(() => {
    if (!authChecked) return

    // Use a short timeout to ensure the component is mounted
    const timer = setTimeout(() => {
      try {
        const tripData = localStorage.getItem("selectedTrip")
        const seatsData = localStorage.getItem("selectedSeats")

        if (tripData && seatsData) {
          setSelectedTrip(JSON.parse(tripData))
          setSelectedSeats(JSON.parse(seatsData))
        } else {
          // If no data, redirect to search
          router.push("/search")
        }
      } catch (error) {
        console.error("Error loading data:", error)
        router.push("/search")
      }

      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [router, authChecked])

  const handleBack = () => {
    router.back()
  }

  const handlePayment = async (paymentMethod: string) => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create booking
      const bookingId = Math.random().toString(36).substring(2, 9)

      // Store booking in localStorage
      localStorage.setItem(
        "booking",
        JSON.stringify({
          id: bookingId,
          tripId: selectedTrip.id,
          trip: selectedTrip,
          seats: selectedSeats,
          totalPrice: selectedTrip.price * selectedSeats.length,
          status: "pending",
          paymentMethod,
        }),
      )

      // Redirect to confirmation page
      router.push(`/confirmation/${bookingId}`)
    } catch (error) {
      console.error("Payment failed:", error)
      setIsProcessing(false)
    }
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
                <p className="text-gray-600 dark:text-gray-400">Loading payment details...</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!selectedTrip || selectedSeats.length === 0) {
    return (
      <MainLayout>
        <div className="bg-gray-50 dark:bg-gray-900 py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 max-w-md w-full text-center">
                <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">No Booking Data</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No trip or seats selected. Please start a new booking.
                </p>
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

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <h1 className="text-2xl font-bold mb-6">Payment</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <PaymentProcessor
                amount={selectedTrip.price * selectedSeats.length}
                onPayment={handlePayment}
                isProcessing={isProcessing}
              />
            </div>

            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Trip Details</h3>
                    <div className="mt-1">
                      <div className="font-medium">
                        {selectedTrip.origin} to {selectedTrip.destination}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedTrip.date} • {selectedTrip.departureTime}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedTrip.operator} • {selectedTrip.busType}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Selected Seats</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedSeats.map((seat) => (
                        <Badge key={seat.id} variant="outline">
                          Seat {seat.number}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span>
                        Ticket Price ({selectedSeats.length} × {selectedTrip.price} ETB)
                      </span>
                      <span>{selectedTrip.price * selectedSeats.length} ETB</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <span>Total</span>
                      <span>{selectedTrip.price * selectedSeats.length} ETB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
