"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { OperatorDashboardStats } from "@/components/operator/dashboard-stats"
import { OperatorTrips } from "@/components/operator/trips"
import { OperatorBookings } from "@/components/operator/bookings"
import { OperatorRevenue } from "@/components/operator/revenue"
import { LayoutDashboard, Bus, Route, Calendar, Users, Edit, Plus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Navigation items for operator dashboard - only the necessary ones
const navigation = [
  { name: "Dashboard", href: "/operator/dashboard", icon: LayoutDashboard },
  { name: "Buses", href: "/operator/buses", icon: Bus },
  { name: "Routes", href: "/operator/routes", icon: Route },
  { name: "Trips", href: "/operator/trips", icon: Calendar },
  { name: "Drivers", href: "/operator/drivers", icon: Users },
]

// Sample routes data for dropdown
const routes = [
  { id: "route-1", name: "Addis Ababa to Bahir Dar" },
  { id: "route-2", name: "Addis Ababa to Hawassa" },
  { id: "route-3", name: "Addis Ababa to Gondar" },
  { id: "route-4", name: "Addis Ababa to Mekelle" },
  { id: "route-5", name: "Addis Ababa to Jimma" },
]

// Sample buses data for dropdown
const buses = [
  { id: "bus-1", name: "Selam Bus 001", plateNumber: "AA-12345" },
  { id: "bus-2", name: "Selam Bus 002", plateNumber: "AA-12346" },
  { id: "bus-3", name: "Selam Bus 003", plateNumber: "AA-12347" },
]

export default function OperatorDashboardPage() {
  const router = useRouter()
  const [isAddTripDialogOpen, setIsAddTripDialogOpen] = useState(false)
  const [isEditStatsDialogOpen, setIsEditStatsDialogOpen] = useState(false)

  // Form state for new trip
  const [tripFormData, setTripFormData] = useState({
    route: "",
    departureDate: "",
    departureTime: "",
    bus: "",
  })

  // Form state for editing stats
  const [statsFormData, setStatsFormData] = useState({
    totalTrips: "156",
    totalPassengers: "7,245",
    totalRevenue: "1,245,600",
    activeDrivers: "5",
  })

  const handleTripFormChange = (field: string, value: string) => {
    setTripFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStatsFormChange = (field: string, value: string) => {
    setStatsFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddTrip = () => {
    // In a real app, you would make an API call
    setIsAddTripDialogOpen(false)
    toast({
      title: "Trip Added",
      description: `New trip for ${tripFormData.route} has been scheduled.`,
    })

    // Reset form
    setTripFormData({
      route: "",
      departureDate: "",
      departureTime: "",
      bus: "",
    })
  }

  const handleSaveStats = () => {
    // In a real app, you would make an API call
    setIsEditStatsDialogOpen(false)
    toast({
      title: "Dashboard Updated",
      description: "Dashboard statistics have been updated successfully.",
    })
  }

  const handleViewTrips = () => {
    router.push("/operator/trips")
  }

  const handleViewBookings = () => {
    router.push("/operator/bookings")
  }

  const handleViewRevenue = () => {
    router.push("/operator/reports")
  }

  return (
    <PrivateRoute allowedRoles={["operator"]}>
      <DashboardLayout title="Operator Dashboard" navigation={navigation} userRole="operator">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <Button variant="outline" size="sm" onClick={() => setIsEditStatsDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Dashboard
            </Button>
          </div>

          <OperatorDashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Recent Trips</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsAddTripDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trip
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleViewTrips}>
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </div>
              <OperatorTrips />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Revenue Overview</h3>
                <Button variant="outline" size="sm" onClick={handleViewRevenue}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
              <OperatorRevenue />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Recent Bookings</h3>
              <Button variant="outline" size="sm" onClick={handleViewBookings}>
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <OperatorBookings />
          </div>
        </div>

        {/* Add Trip Dialog */}
        <Dialog open={isAddTripDialogOpen} onOpenChange={setIsAddTripDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Trip</DialogTitle>
              <DialogDescription>Create a new trip quickly. You can add more details later.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="route">Route</Label>
                <Select onValueChange={(value) => handleTripFormChange("route", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.name}>
                        {route.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="departureDate">Departure Date</Label>
                <Input
                  id="departureDate"
                  type="date"
                  onChange={(e) => handleTripFormChange("departureDate", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input
                  id="departureTime"
                  type="time"
                  onChange={(e) => handleTripFormChange("departureTime", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bus">Bus</Label>
                <Select onValueChange={(value) => handleTripFormChange("bus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus" />
                  </SelectTrigger>
                  <SelectContent>
                    {buses.map((bus) => (
                      <SelectItem key={bus.id} value={bus.name}>
                        {bus.name} ({bus.plateNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTripDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddTrip}
                disabled={
                  !tripFormData.route || !tripFormData.departureDate || !tripFormData.departureTime || !tripFormData.bus
                }
              >
                Create Trip
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Stats Dialog */}
        <Dialog open={isEditStatsDialogOpen} onOpenChange={setIsEditStatsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Dashboard Statistics</DialogTitle>
              <DialogDescription>Update the dashboard statistics manually.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="totalTrips">Total Trips</Label>
                <Input
                  id="totalTrips"
                  defaultValue={statsFormData.totalTrips}
                  onChange={(e) => handleStatsFormChange("totalTrips", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="totalPassengers">Total Passengers</Label>
                <Input
                  id="totalPassengers"
                  defaultValue={statsFormData.totalPassengers}
                  onChange={(e) => handleStatsFormChange("totalPassengers", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="totalRevenue">Total Revenue (ETB)</Label>
                <Input
                  id="totalRevenue"
                  defaultValue={statsFormData.totalRevenue}
                  onChange={(e) => handleStatsFormChange("totalRevenue", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="activeDrivers">Active Drivers</Label>
                <Input
                  id="activeDrivers"
                  defaultValue={statsFormData.activeDrivers}
                  onChange={(e) => handleStatsFormChange("activeDrivers", e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditStatsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveStats}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
