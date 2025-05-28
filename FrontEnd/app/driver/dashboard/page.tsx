"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Calendar, Route, MapPin, Users } from "lucide-react"
import { DriverStats } from "@/components/driver/stats"
import { DriverSchedule } from "@/components/driver/schedule"
import { DriverPassengers } from "@/components/driver/passengers"

// Navigation items for driver dashboard
const driverNavigation = [
  { name: "Dashboard", href: "/driver/dashboard", icon: BarChart3 },
  { name: "Schedule", href: "/driver/schedule", icon: Calendar },
  { name: "Routes", href: "/driver/routes", icon: Route },
  { name: "Trips", href: "/driver/trips", icon: MapPin },
  { name: "Passengers", href: "/driver/passengers", icon: Users },
]

export default function DriverDashboardPage() {
  return (
    <PrivateRoute allowedRoles={["driver"]}>
      <DashboardLayout title="Driver Dashboard" navigation={driverNavigation} userRole="driver">
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+5.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,531 km</div>
                <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">Based on 342 reviews</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Next Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Tomorrow</div>
                <p className="text-xs text-muted-foreground">Addis Ababa to Bahir Dar</p>
              </CardContent>
            </Card>
          </div>

          {/* Driver Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <DriverStats />
            </CardContent>
          </Card>

          {/* Schedule and Passengers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <DriverSchedule />
              </CardContent>
            </Card>
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Recent Passengers</CardTitle>
              </CardHeader>
              <CardContent>
                <DriverPassengers />
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  )
}
