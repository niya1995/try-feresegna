"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Eye } from "lucide-react"

// Mock bookings data
const recentBookings = [
  {
    id: "1",
    bookingRef: "FB-123456",
    passenger: "Abebe Kebede",
    route: "Addis Ababa to Bahir Dar",
    date: "2023-07-15",
    seats: "12, 13",
    amount: "1,600 ETB",
    status: "confirmed",
  },
  {
    id: "2",
    bookingRef: "FB-123457",
    passenger: "Sara Hailu",
    route: "Addis Ababa to Hawassa",
    date: "2023-07-15",
    seats: "5",
    amount: "450 ETB",
    status: "confirmed",
  },
  {
    id: "3",
    bookingRef: "FB-123458",
    passenger: "Dawit Mekonnen",
    route: "Addis Ababa to Bahir Dar",
    date: "2023-07-16",
    seats: "22, 23",
    amount: "1,600 ETB",
    status: "pending",
  },
  {
    id: "4",
    bookingRef: "FB-123459",
    passenger: "Tigist Alemu",
    route: "Hawassa to Addis Ababa",
    date: "2023-07-16",
    seats: "15",
    amount: "450 ETB",
    status: "cancelled",
  },
  {
    id: "5",
    bookingRef: "FB-123460",
    passenger: "Yonas Tadesse",
    route: "Bahir Dar to Addis Ababa",
    date: "2023-07-17",
    seats: "8",
    amount: "800 ETB",
    status: "confirmed",
  },
]

export function OperatorBookings() {
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(recentBookings.length / itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Booking Ref</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Passenger</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Route</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Seats</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 font-mono">{booking.bookingRef}</td>
                  <td className="py-3 px-4">{booking.passenger}</td>
                  <td className="py-3 px-4">{booking.route}</td>
                  <td className="py-3 px-4">{format(new Date(booking.date), "MMM dd, yyyy")}</td>
                  <td className="py-3 px-4">{booking.seats}</td>
                  <td className="py-3 px-4">{booking.amount}</td>
                  <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, recentBookings.length)} of{" "}
            {recentBookings.length} entries
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
