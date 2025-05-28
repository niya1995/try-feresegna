"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, Route, MapPin, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Navigation items for driver dashboard - keeping only the 5 main items
const driverNavigation = [
  { name: "Dashboard", href: "/driver/dashboard", icon: BarChart3 },
  { name: "Schedule", href: "/driver/schedule", icon: Calendar },
  { name: "Routes", href: "/driver/routes", icon: Route },
  { name: "Trips", href: "/driver/trips", icon: MapPin },
  { name: "Passengers", href: "/driver/passengers", icon: Users },
]

// Sample trips data
const trips = [
  {
    id: "trip-1",
    route: "Addis Ababa to Bahir Dar",
    date: "2023-06-24",
    departureTime: "06:00 AM",
    arrivalTime: "02:00 PM",
    bus: "ET-ABC-123",
    status: "Scheduled",
    passengers: 32,
    stops: ["Debre Markos", "Dejen", "Gohatsion"],
  },
  {
    id: "trip-2",
    route: "Addis Ababa to Hawassa",
    date: "2023-06-25",
    departureTime: "07:00 AM",
    arrivalTime: "12:00 PM",
    bus: "ET-DEF-456",
    status: "Scheduled",
    passengers: 28,
    stops: ["Mojo", "Ziway", "Shashemene"],
  },
  {
    id: "trip-3",
    route: "Addis Ababa to Gondar",
    date: "2023-06-26",
    departureTime: "05:30 AM",
    arrivalTime: "04:30 PM",
    bus: "ET-GHI-789",
    status: "Scheduled",
    passengers: 35,
    stops: ["Debre Markos", "Bahir Dar", "Wereta"],
  },
]

export default function DriverTripsPage() {
  const [tripsList, setTripsList] = useState(trips)
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isStartTripDialogOpen, setIsStartTripDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setTripsList(trips)
      return
    }

    const filtered = trips.filter(
      (trip) => trip.route.toLowerCase().includes(searchQuery.toLowerCase()) || trip.date.includes(searchQuery),
    )
    setTripsList(filtered)
  }

  const viewTripDetails = (tripId: string) => {
    const trip = trips.find((t) => t.id === tripId)
    setSelectedTrip(trip)
    setIsDetailsDialogOpen(true)
  }

  const startTrip = (tripId: string) => {
    const trip = trips.find((t) => t.id === tripId)
    setSelectedTrip(trip)
    setIsStartTripDialogOpen(true)
  }

  const confirmStartTrip = () => {
    setTripsList((prev) => prev.map((t) => (t.id === selectedTrip.id ? { ...t, status: "In Progress" } : t)))
    setIsStartTripDialogOpen(false)
    toast({
      title: "Trip started",
      description: `Trip ${selectedTrip.route} has been started successfully.`,
    })
  }

  return (
    <PrivateRoute allowedRoles={["driver"]}>
      <DashboardLayout title="Trip Management" navigation={driverNavigation} userRole="driver">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Input
                placeholder="Search trips..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="outline" onClick={handleSearch}>
                Search
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Today's Trips</Button>
              <Button>Upcoming Trips</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Assigned Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Bus</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tripsList.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.route}</TableCell>
                      <TableCell>{trip.date}</TableCell>
                      <TableCell>{trip.departureTime}</TableCell>
                      <TableCell>{trip.arrivalTime}</TableCell>
                      <TableCell>{trip.bus}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            trip.status === "In Progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : trip.status === "Completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </TableCell>
                      <TableCell>{trip.passengers}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => viewTripDetails(trip.id)}>
                            Details
                          </Button>
                          {trip.status === "Scheduled" && (
                            <Button size="sm" onClick={() => startTrip(trip.id)}>
                              Start Trip
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

        {/* Trip Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Trip Details</DialogTitle>
              <DialogDescription>Complete information about the trip.</DialogDescription>
            </DialogHeader>
            {selectedTrip && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Route</p>
                    <p className="text-sm">{selectedTrip.route}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-sm">{selectedTrip.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Departure Time</p>
                    <p className="text-sm">{selectedTrip.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Arrival Time</p>
                    <p className="text-sm">{selectedTrip.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bus</p>
                    <p className="text-sm">{selectedTrip.bus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                    <p className="text-sm">{selectedTrip.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Passengers</p>
                    <p className="text-sm">{selectedTrip.passengers}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stops</p>
                  <ul className="list-disc list-inside text-sm">
                    {selectedTrip.stops.map((stop: string, index: number) => (
                      <li key={index}>{stop}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Start Trip Confirmation Dialog */}
        <Dialog open={isStartTripDialogOpen} onOpenChange={setIsStartTripDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Start Trip</DialogTitle>
              <DialogDescription>Are you sure you want to start this trip?</DialogDescription>
            </DialogHeader>
            {selectedTrip && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Route</p>
                    <p className="text-sm">{selectedTrip.route}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-sm">{selectedTrip.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Departure Time</p>
                    <p className="text-sm">{selectedTrip.departureTime}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsStartTripDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmStartTrip}>Start Trip</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
