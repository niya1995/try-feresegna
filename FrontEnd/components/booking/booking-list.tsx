"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight, Calendar, Clock, MapPin, Bus, Download, Eye, AlertCircle } from "lucide-react"

interface BookingListProps {
  bookings: any[]
  type: "upcoming" | "past" | "cancelled"
}

export function BookingList({ bookings, type }: BookingListProps) {
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="flex flex-col items-center">
          {type === "upcoming" && <Calendar className="h-12 w-12 text-gray-400 mb-4" />}
          {type === "past" && <Clock className="h-12 w-12 text-gray-400 mb-4" />}
          {type === "cancelled" && <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />}

          <h3 className="text-xl font-semibold mb-2">No {type} bookings</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {type === "upcoming" && "You don't have any upcoming trips. Book a new trip to get started!"}
            {type === "past" && "You haven't taken any trips with us yet."}
            {type === "cancelled" && "You don't have any cancelled bookings."}
          </p>

          {type === "upcoming" && (
            <Link href="/search">
              <Button className="bg-accent hover:bg-accent/90 text-white">Book a Trip</Button>
            </Link>
          )}
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-green-500">Upcoming</Badge>
      case "past":
        return <Badge variant="outline">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <Bus className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{booking.trip.operator}</span>
              </div>
              {getStatusBadge(booking.status)}
            </div>

            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="font-medium">{booking.trip.origin}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-3" />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="font-medium">{booking.trip.destination}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{format(new Date(booking.trip.date), "MMM dd, yyyy")}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Departure: </span>
                    <span className="font-medium">{booking.trip.departureTime}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Arrival: </span>
                    <span className="font-medium">{booking.trip.arrivalTime}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm">
                    <span className="text-gray-500">Booking Ref: </span>
                    <span className="font-mono font-medium">{booking.bookingReference}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <div className="text-sm mb-2 md:mb-0">
                    <span className="text-gray-500">Seats: </span>
                    {booking.seats.map((seat: any) => (
                      <Badge key={seat.id} variant="outline" className="mr-1">
                        {seat.number}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0">
                  <div className="text-lg font-bold text-primary mr-4 mb-2 md:mb-0">{booking.totalPrice} ETB</div>

                  <div className="flex space-x-2">
                    {type === "upcoming" && (
                      <>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Download className="mr-1 h-4 w-4" />
                          <span>E-Ticket</span>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="flex items-center" onClick={() => setSelectedBooking(booking)}>
                              <Eye className="mr-1 h-4 w-4" />
                              <span>Details</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-sm text-gray-500">From</div>
                                    <div className="font-medium">{selectedBooking.trip.origin}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">To</div>
                                    <div className="font-medium">{selectedBooking.trip.destination}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">Date</div>
                                    <div className="font-medium">
                                      {format(new Date(selectedBooking.trip.date), "MMM dd, yyyy")}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">Time</div>
                                    <div className="font-medium">
                                      {selectedBooking.trip.departureTime} - {selectedBooking.trip.arrivalTime}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">Operator</div>
                                    <div className="font-medium">{selectedBooking.trip.operator}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">Booking Reference</div>
                                    <div className="font-mono font-medium">{selectedBooking.bookingReference}</div>
                                  </div>
                                </div>

                                <div>
                                  <div className="text-sm text-gray-500 mb-1">Seats</div>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedBooking.seats.map((seat: any) => (
                                      <Badge key={seat.id} variant="outline">
                                        Seat {seat.number}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-sm text-gray-500 mb-1">Payment</div>
                                  <div className="flex justify-between">
                                    <span>{selectedBooking.paymentMethod}</span>
                                    <span className="font-bold">{selectedBooking.totalPrice} ETB</span>
                                  </div>
                                </div>

                                <div className="flex justify-end space-x-2 pt-4">
                                  <Button variant="outline">Download E-Ticket</Button>
                                  {type === "upcoming" && <Button variant="destructive">Cancel Booking</Button>}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </>
                    )}

                    {type === "past" && (
                      <>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Download className="mr-1 h-4 w-4" />
                          <span>Receipt</span>
                        </Button>
                        <Button size="sm" className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          <span>Details</span>
                        </Button>
                      </>
                    )}

                    {type === "cancelled" && (
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        <span>Details</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
