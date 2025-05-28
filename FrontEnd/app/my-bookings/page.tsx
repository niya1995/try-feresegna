"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { BookingList } from "@/components/booking/booking-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

// Mock booking data
const mockBookings = [
  {
    id: "1",
    trip: {
      origin: "Addis Ababa",
      destination: "Bahir Dar",
      departureTime: "06:00",
      arrivalTime: "14:00",
      date: "2023-07-15",
      operator: "Selam Bus",
    },
    seats: [
      { id: "seat-1", number: "12" },
      { id: "seat-2", number: "13" },
    ],
    totalPrice: 1600,
    status: "upcoming",
    bookingReference: "FB-123456",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    trip: {
      origin: "Addis Ababa",
      destination: "Hawassa",
      departureTime: "08:30",
      arrivalTime: "12:30",
      date: "2023-06-20",
      operator: "Sky Bus",
    },
    seats: [{ id: "seat-3", number: "5" }],
    totalPrice: 750,
    status: "past",
    bookingReference: "FB-789012",
    paymentMethod: "Mobile Payment - TeleBirr",
  },
  {
    id: "3",
    trip: {
      origin: "Addis Ababa",
      destination: "Gondar",
      departureTime: "20:00",
      arrivalTime: "08:00",
      date: "2023-05-10",
      operator: "Golden Bus",
    },
    seats: [
      { id: "seat-4", number: "22" },
      { id: "seat-5", number: "23" },
    ],
    totalPrice: 1900,
    status: "past",
    bookingReference: "FB-345678",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "4",
    trip: {
      origin: "Bahir Dar",
      destination: "Addis Ababa",
      departureTime: "07:00",
      arrivalTime: "15:00",
      date: "2023-08-05",
      operator: "Selam Bus",
    },
    seats: [{ id: "seat-6", number: "8" }],
    totalPrice: 800,
    status: "upcoming",
    bookingReference: "FB-901234",
    paymentMethod: "Credit Card",
  },
  {
    id: "5",
    trip: {
      origin: "Addis Ababa",
      destination: "Dire Dawa",
      departureTime: "21:00",
      arrivalTime: "05:00",
      date: "2023-06-15",
      operator: "Abay Bus",
    },
    seats: [{ id: "seat-7", number: "15" }],
    totalPrice: 650,
    status: "cancelled",
    bookingReference: "FB-567890",
    paymentMethod: "Mobile Payment - CBE Birr",
  },
]

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Filter bookings based on active tab
  const filteredBookings = mockBookings.filter((booking) => booking.status === activeTab)

  // Count bookings by status
  const upcomingCount = mockBookings.filter((booking) => booking.status === "upcoming").length
  const pastCount = mockBookings.filter((booking) => booking.status === "past").length
  const cancelledCount = mockBookings.filter((booking) => booking.status === "cancelled").length

  return (
    <PrivateRoute allowedRoles={["passenger"]}>
      <MainLayout>
        <div className="bg-gray-50 dark:bg-gray-900 py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">My Bookings</h1>
                <Link href="/search">
                  <Button className="bg-accent hover:bg-accent/90 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    New Booking
                  </Button>
                </Link>
              </div>

              <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="upcoming">Upcoming ({upcomingCount})</TabsTrigger>
                  <TabsTrigger value="past">Past ({pastCount})</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled ({cancelledCount})</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  <BookingList bookings={filteredBookings} type="upcoming" />
                </TabsContent>

                <TabsContent value="past">
                  <BookingList bookings={filteredBookings} type="past" />
                </TabsContent>

                <TabsContent value="cancelled">
                  <BookingList bookings={filteredBookings} type="cancelled" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </MainLayout>
    </PrivateRoute>
  )
}
