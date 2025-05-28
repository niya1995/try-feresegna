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

// Sample routes data
const routes = [
  {
    id: "route-1",
    name: "Addis Ababa to Bahir Dar",
    distance: "565 km",
    duration: "10 hours",
    operators: ["Selam Bus", "Sky Bus", "Abay Bus"],
    popularity: "High",
    status: "Active",
  },
  {
    id: "route-2",
    name: "Addis Ababa to Hawassa",
    distance: "273 km",
    duration: "4 hours",
    operators: ["Selam Bus", "Ethio Bus", "ODA Bus"],
    popularity: "High",
    status: "Active",
  },
  {
    id: "route-3",
    name: "Addis Ababa to Gondar",
    distance: "738 km",
    duration: "12 hours",
    operators: ["Selam Bus", "Sky Bus"],
    popularity: "Medium",
    status: "Active",
  },
  {
    id: "route-4",
    name: "Addis Ababa to Mekelle",
    distance: "783 km",
    duration: "13 hours",
    operators: ["Selam Bus", "Trans Ethiopia"],
    popularity: "Low",
    status: "Inactive",
  },
  {
    id: "route-5",
    name: "Addis Ababa to Jimma",
    distance: "352 km",
    duration: "6 hours",
    operators: ["Ethio Bus", "Abay Bus"],
    popularity: "Medium",
    status: "Active",
  },
]

export default function AdminRoutesPage() {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <DashboardLayout title="Route Management" navigation={adminNavigation} userRole="admin">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Input placeholder="Search routes..." className="w-64" />
              <Button variant="outline">Search</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export Data</Button>
              <Button>Add New Route</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Operators</TableHead>
                    <TableHead>Popularity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>{route.duration}</TableCell>
                      <TableCell>{route.operators.join(", ")}</TableCell>
                      <TableCell>{route.popularity}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            route.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {route.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
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
      </DashboardLayout>
    </PrivateRoute>
  )
}
