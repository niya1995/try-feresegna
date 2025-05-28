"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart3, Bus, Users, Route, FileText, CreditCard } from "lucide-react"
import { Suspense } from 'react';

// Navigation items for admin dashboard
const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Operators", href: "/admin/operators", icon: Bus },
  { name: "Passengers", href: "/admin/passengers", icon: Users },
  { name: "Routes", href: "/admin/routes", icon: Route },
  { name: "Bookings", href: "/admin/bookings", icon: FileText },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
]

// Sample bookings data
const bookings = [
  {
    id: "booking-1",
    bookingNumber: "BK-12345",
    passengerName: "Abebe Kebede",
    route: "Addis Ababa to Bahir Dar",
    date: "2023-06-24",
    amount: "1,200 ETB",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
  },
  {
    id: "booking-2",
    bookingNumber: "BK-12346",
    passengerName: "Tigist Haile",
    route: "Addis Ababa to Hawassa",
    date: "2023-06-25",
    amount: "800 ETB",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
  },
  {
    id: "booking-3",
    bookingNumber: "BK-12347",
    passengerName: "Dawit Tadesse",
    route: "Addis Ababa to Gondar",
    date: "2023-06-26",
    amount: "1,500 ETB",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
  },
  {
    id: "booking-4",
    bookingNumber: "BK-12348",
    passengerName: "Sara Mekonnen",
    route: "Addis Ababa to Jimma",
    date: "2023-06-27",
    amount: "900 ETB",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
  },
  {
    id: "booking-5",
    bookingNumber: "BK-12349",
    passengerName: "Yonas Girma",
    route: "Addis Ababa to Mekelle",
    date: "2023-06-28",
    amount: "1,800 ETB",
    paymentStatus: "Cancelled",
    bookingStatus: "Cancelled",
  },
]

export default function AdminBookingsPage() {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <DashboardLayout title="Booking Management" navigation={adminNavigation} userRole="admin">
        <Suspense fallback={<div>Loading bookings...</div>}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Input placeholder="Search bookings..." className="w-64" />
                <Button variant="outline">Search</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Export Data</Button>
                <Button>Create Booking</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking #</TableHead>
                      <TableHead>Passenger</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Booking Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.bookingNumber}</TableCell>
                        <TableCell>{booking.passengerName}</TableCell>
                        <TableCell>{booking.route}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${booking.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : booking.paymentStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                          >
                            {booking.paymentStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${booking.bookingStatus === "Confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : booking.bookingStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                          >
                            {booking.bookingStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            {booking.bookingStatus !== "Cancelled" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </DashboardLayout>
    </PrivateRoute>
  )
}
