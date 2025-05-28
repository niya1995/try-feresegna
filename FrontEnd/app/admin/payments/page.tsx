"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart3, Bus, Users, Route, FileText, CreditCard } from "lucide-react"

// Navigation items for admin dashboard
const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Operators", href: "/admin/operators", icon: Bus },
  { name: "Passengers", href: "/admin/passengers", icon: Users },
  { name: "Routes", href: "/admin/routes", icon: Route },
  { name: "Bookings", href: "/admin/bookings", icon: FileText },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
]

// Sample payments data
const payments = [
  {
    id: "payment-1",
    transactionId: "TXN-12345",
    bookingNumber: "BK-12345",
    passengerName: "Abebe Kebede",
    date: "2023-06-24",
    amount: "1,200 ETB",
    method: "Mobile Money",
    status: "Completed",
  },
  {
    id: "payment-2",
    transactionId: "TXN-12346",
    bookingNumber: "BK-12346",
    passengerName: "Tigist Haile",
    date: "2023-06-25",
    amount: "800 ETB",
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "payment-3",
    transactionId: "TXN-12347",
    bookingNumber: "BK-12347",
    passengerName: "Dawit Tadesse",
    date: "2023-06-26",
    amount: "1,500 ETB",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    id: "payment-4",
    transactionId: "TXN-12348",
    bookingNumber: "BK-12348",
    passengerName: "Sara Mekonnen",
    date: "2023-06-27",
    amount: "900 ETB",
    method: "Mobile Money",
    status: "Completed",
  },
  {
    id: "payment-5",
    transactionId: "TXN-12349",
    bookingNumber: "BK-12349",
    passengerName: "Yonas Girma",
    date: "2023-06-28",
    amount: "1,800 ETB",
    method: "Credit Card",
    status: "Failed",
  },
]

export default function AdminPaymentsPage() {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <DashboardLayout title="Payment Management" navigation={adminNavigation} userRole="admin">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Input placeholder="Search payments..." className="w-64" />
              <Button variant="outline">Search</Button>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Booking #</TableHead>
                    <TableHead>Passenger</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.transactionId}</TableCell>
                      <TableCell>{payment.bookingNumber}</TableCell>
                      <TableCell>{payment.passengerName}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : payment.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {payment.status === "Pending" && (
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
      </DashboardLayout>
    </PrivateRoute>
  )
}
