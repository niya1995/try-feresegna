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

// Sample passengers data
const passengers = [
  {
    id: "passenger-1",
    name: "Abebe Kebede",
    email: "abebe@example.com",
    phone: "+251911234567",
    totalBookings: 12,
    lastBooking: "2023-06-15",
    status: "Active",
  },
  {
    id: "passenger-2",
    name: "Tigist Haile",
    email: "tigist@example.com",
    phone: "+251922345678",
    totalBookings: 8,
    lastBooking: "2023-06-10",
    status: "Active",
  },
  {
    id: "passenger-3",
    name: "Dawit Tadesse",
    email: "dawit@example.com",
    phone: "+251933456789",
    totalBookings: 5,
    lastBooking: "2023-05-28",
    status: "Active",
  },
  {
    id: "passenger-4",
    name: "Sara Mekonnen",
    email: "sara@example.com",
    phone: "+251944567890",
    totalBookings: 3,
    lastBooking: "2023-05-20",
    status: "Inactive",
  },
  {
    id: "passenger-5",
    name: "Yonas Girma",
    email: "yonas@example.com",
    phone: "+251955678901",
    totalBookings: 15,
    lastBooking: "2023-06-18",
    status: "Active",
  },
]

export default function AdminPassengersPage() {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <DashboardLayout title="Passenger Management" navigation={adminNavigation} userRole="admin">
        <Suspense fallback={<div>Loading passengers...</div>}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Input placeholder="Search passengers..." className="w-64" />
                <Button variant="outline">Search</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Export Data</Button>
                <Button>Create Passenger</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Passengers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Last Booking</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {passengers.map((passenger) => (
                      <TableRow key={passenger.id}>
                        <TableCell className="font-medium">{passenger.name}</TableCell>
                        <TableCell>{passenger.email}</TableCell>
                        <TableCell>{passenger.phone}</TableCell>
                        <TableCell>{passenger.totalBookings}</TableCell>
                        <TableCell>{passenger.lastBooking}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${passenger.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                          >
                            {passenger.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                            >
                              Delete
                            </Button>
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
