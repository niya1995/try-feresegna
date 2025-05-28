"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Home, Printer, Share2, Copy } from "lucide-react"
import { TicketGenerator } from "@/components/booking/ticket-generator"
import { useToast } from "@/components/ui/use-toast"

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [booking, setBooking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopying, setIsCopying] = useState(false)

  // Load booking from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const bookingData = localStorage.getItem("booking")

        if (bookingData) {
          const parsedBooking = JSON.parse(bookingData)
          // Check if the booking ID matches the URL parameter
          if (parsedBooking.id === params.id) {
            setBooking(parsedBooking)
          } else {
            router.push("/search")
          }
        } else {
          router.push("/search")
        }
      } catch (error) {
        console.error("Error loading booking:", error)
        router.push("/search")
      }

      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id, router])

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (!booking) return

    const shareData = {
      title: "My Feresegna Bus Ticket",
      text: `I've booked a trip from ${booking.trip.origin} to ${booking.trip.destination} on ${booking.trip.date}`,
      url: window.location.href,
    }

    try {
      // Check if navigator.share is available and supported
      if (navigator.share && typeof navigator.share === "function") {
        await navigator.share(shareData)
        toast({
          title: "Shared successfully",
          description: "Your booking has been shared.",
          variant: "success",
        })
      } else {
        // Fallback to copy to clipboard
        handleCopyToClipboard()
      }
    } catch (error) {
      console.error("Error sharing:", error)
      // Fallback to copy to clipboard if sharing fails
      handleCopyToClipboard()
    }
  }

  const handleCopyToClipboard = async () => {
    if (!booking) return

    setIsCopying(true)

    try {
      const textToCopy = `My Feresegna Bus Ticket
Trip: ${booking.trip.origin} to ${booking.trip.destination}
Date: ${booking.trip.date}
Time: ${booking.trip.departureTime}
Booking Reference: #${booking.id}
View my booking: ${window.location.href}`

      await navigator.clipboard.writeText(textToCopy)

      toast({
        title: "Copied to clipboard",
        description: "Booking details copied to clipboard. You can now paste and share it.",
        variant: "success",
      })
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      toast({
        title: "Couldn't copy to clipboard",
        description: "Please try again or manually share the booking details.",
        variant: "destructive",
      })
    } finally {
      setIsCopying(false)
    }
  }

  const handleGenerateStart = () => {
    setIsGenerating(true)
    toast({
      title: "Generating ticket",
      description: "Please wait while we prepare your ticket...",
    })
  }

  const handleGenerateEnd = () => {
    setIsGenerating(false)
    toast({
      title: "Ticket ready!",
      description: "Your ticket has been downloaded successfully.",
      variant: "success",
    })
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="bg-gray-50 dark:bg-gray-900 py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading booking details...</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!booking) {
    return (
      <MainLayout>
        <div className="bg-gray-50 dark:bg-gray-900 py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 max-w-md w-full text-center">
                <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Booking Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The booking you're looking for doesn't exist or has expired.
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
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3 mb-6">
              <div className="bg-green-100 dark:bg-green-800 rounded-full p-2">
                <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h2 className="font-semibold text-green-800 dark:text-green-300">Booking Confirmed!</h2>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  Your booking has been confirmed and your tickets are ready.
                </p>
              </div>
            </div>

            <Card className="mb-6 overflow-hidden">
              <div className="bg-primary text-white p-4">
                <h2 className="text-xl font-bold">Booking Reference: #{booking.id}</h2>
              </div>

              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
                <CardDescription>
                  {booking.trip.origin} to {booking.trip.destination}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</h3>
                    <p className="mt-1">
                      {booking.trip.date} • {booking.trip.departureTime}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bus Operator</h3>
                    <p className="mt-1">
                      {booking.trip.operator} • {booking.trip.busType}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Seats</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {booking.seats.map((seat: any) => (
                        <Badge key={seat.id} variant="outline">
                          Seat {seat.number}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</h3>
                    <p className="mt-1">{booking.paymentMethod}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span>
                      Ticket Price ({booking.seats.length} × {booking.trip.price} ETB)
                    </span>
                    <span>{booking.trip.price * booking.seats.length} ETB</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>{booking.totalPrice} ETB</span>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Important Information</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
                    <li>Please arrive at the bus station at least 30 minutes before departure.</li>
                    <li>Bring a valid ID that matches the name on your booking.</li>
                    <li>Each passenger is allowed one piece of luggage (max 20kg) and one carry-on bag.</li>
                    <li>No refunds for missed buses. Rescheduling must be done at least 24 hours in advance.</li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="flex flex-wrap gap-3 justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrint} disabled={isGenerating || isCopying}>
                    <Printer className="h-4 w-4 mr-1" /> Print
                  </Button>
                  <TicketGenerator
                    booking={booking}
                    onGenerateStart={handleGenerateStart}
                    onGenerateEnd={handleGenerateEnd}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    disabled={isGenerating || isCopying}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {isCopying ? "Copying..." : "Copy"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare} disabled={isGenerating || isCopying}>
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                </div>
                <Button
                  onClick={() => router.push("/")}
                  className="bg-accent hover:bg-accent/90 text-white"
                  disabled={isGenerating || isCopying}
                >
                  <Home className="h-4 w-4 mr-1" /> Back to Home
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
