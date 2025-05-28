"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { CalendarIcon, LayoutDashboard, Bus, RouteIcon, Users, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"

// Navigation items for operator dashboard
const navigation = [
  { name: "Dashboard", href: "/operator/dashboard", icon: LayoutDashboard },
  { name: "Buses", href: "/operator/buses", icon: Bus },
  { name: "Routes", href: "/operator/routes", icon: RouteIcon },
  { name: "Trips", href: "/operator/trips", icon: CalendarIcon },
  { name: "Drivers", href: "/operator/drivers", icon: Users },
]

// Sample trip data
const initialTrips = [
  {
    id: "trip-1",
    route: "Addis Ababa to Bahir Dar",
    departureDate: "2023-07-15",
    departureTime: "06:00",
    arrivalTime: "16:00",
    bus: "Selam Bus 001 (AA-12345)",
    driver: "Haile Gebrselassie",
    availableSeats: 17,
    totalSeats: 49,
    status: "Scheduled",
  },
  {
    id: "trip-2",
    route: "Addis Ababa to Hawassa",
    departureDate: "2023-07-16",
    departureTime: "07:30",
    arrivalTime: "11:30",
    bus: "Selam Bus 002 (AA-12346)",
    driver: "Abel Kebede",
    availableSeats: 4,
    totalSeats: 49,
    status: "Scheduled",
  },
  {
    id: "trip-3",
    route: "Bahir Dar to Addis Ababa",
    departureDate: "2023-07-16",
    departureTime: "07:00",
    arrivalTime: "17:00",
    bus: "Selam Bus 003 (AA-12347)",
    driver: "Not Assigned",
    availableSeats: 33,
    totalSeats: 45,
    status: "Scheduled",
  },
  {
    id: "trip-4",
    route: "Hawassa to Addis Ababa",
    departureDate: "2023-07-17",
    departureTime: "08:00",
    arrivalTime: "12:00",
    bus: "Selam Bus 004 (AA-12348)",
    driver: "Abebe Bikila",
    availableSeats: 12,
    totalSeats: 45,
    status: "Scheduled",
  },
  {
    id: "trip-5",
    route: "Addis Ababa to Gondar",
    departureDate: "2023-07-18",
    departureTime: "05:30",
    arrivalTime: "17:30",
    bus: "Selam Bus 005 (AA-12349)",
    driver: "Not Assigned",
    availableSeats: 27,
    totalSeats: 52,
    status: "Scheduled",
  },
]

// Sample bus data for dropdown
const buses = [
  { id: "bus-1", name: "Selam Bus 001", plateNumber: "AA-12345", capacity: 49 },
  { id: "bus-2", name: "Selam Bus 002", plateNumber: "AA-12346", capacity: 49 },
  { id: "bus-3", name: "Selam Bus 003", plateNumber: "AA-12347", capacity: 45 },
  { id: "bus-4", name: "Selam Bus 004", plateNumber: "AA-12348", capacity: 45 },
  { id: "bus-5", name: "Selam Bus 005", plateNumber: "AA-12349", capacity: 52 },
]

// Sample route data for dropdown
const routes = [
  { id: "route-1", name: "Addis Ababa to Bahir Dar" },
  { id: "route-2", name: "Addis Ababa to Hawassa" },
  { id: "route-3", name: "Addis Ababa to Gondar" },
  { id: "route-4", name: "Addis Ababa to Mekelle" },
  { id: "route-5", name: "Addis Ababa to Jimma" },
  { id: "route-6", name: "Bahir Dar to Addis Ababa" },
  { id: "route-7", name: "Hawassa to Addis Ababa" },
  { id: "route-8", name: "Gondar to Addis Ababa" },
  { id: "route-9", name: "Mekelle to Addis Ababa" },
  { id: "route-10", name: "Jimma to Addis Ababa" },
]

// Sample driver data for dropdown
const drivers = [
  { id: "driver-1", name: "Haile Gebrselassie", license: "D12345", rating: 4.8 },
  { id: "driver-2", name: "Abel Kebede", license: "D12346", rating: 4.5 },
  { id: "driver-3", name: "Abebe Bikila", license: "D12347", rating: 4.9 },
  { id: "driver-4", name: "Kenenisa Bekele", license: "D12348", rating: 4.7 },
  { id: "driver-5", name: "Tirunesh Dibaba", license: "D12349", rating: 4.6 },
]

export default function OperatorTripsPage() {
  const [trips, setTrips] = useState(initialTrips)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isAssignDriverDialogOpen, setIsAssignDriverDialogOpen] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [tripStatus, setTripStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Form state for new/edit trip
  const [formData, setFormData] = useState({
    route: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    bus: "",
    driver: "",
    status: "Scheduled",
    notes: "",
  })

  // Form state for driver assignment
  const [selectedDriver, setSelectedDriver] = useState("")
  const [driverNotes, setDriverNotes] = useState("")

  // Form state for cancellation
  const [cancellationReason, setCancellationReason] = useState("")

  const filteredTrips = trips
    .filter((trip) => (tripStatus === "all" ? true : trip.status.toLowerCase() === tripStatus.toLowerCase()))
    .filter((trip) =>
      searchQuery === ""
        ? true
        : trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.bus.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.driver.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleAssignDriver = (trip: any) => {
    setSelectedTrip(trip)
    setIsAssignDriverDialogOpen(true)
    setSelectedDriver("")
    setDriverNotes("")
  }

  const handleEditTrip = (trip: any) => {
    setSelectedTrip(trip)
    setFormData({
      route: trip.route,
      departureDate: trip.departureDate,
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      bus: trip.bus,
      driver: trip.driver,
      status: trip.status,
      notes: "",
    })
    setIsEditDialogOpen(true)
  }

  const handleCancelTrip = (trip: any) => {
    setSelectedTrip(trip)
    setCancellationReason("")
    setIsCancelDialogOpen(true)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddTrip = () => {
    // In a real app, you would validate the form data and make an API call
    const newTrip = {
      id: `trip-${trips.length + 1}`,
      route: formData.route,
      departureDate: formData.departureDate,
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      bus: formData.bus,
      driver: formData.driver || "Not Assigned",
      availableSeats: 45,
      totalSeats: 45,
      status: formData.status,
    }

    setTrips([...trips, newTrip])
    setIsAddDialogOpen(false)
    toast({
      title: "Trip Added",
      description: `New trip for ${formData.route} has been added successfully.`,
    })
  }

  const handleSaveEdit = () => {
    // In a real app, you would validate the form data and make an API call
    const updatedTrips = trips.map((trip) =>
      trip.id === selectedTrip.id
        ? {
            ...trip,
            route: formData.route,
            departureDate: formData.departureDate,
            departureTime: formData.departureTime,
            arrivalTime: formData.arrivalTime,
            bus: formData.bus,
            driver: formData.driver,
            status: formData.status,
          }
        : trip,
    )

    setTrips(updatedTrips)
    setIsEditDialogOpen(false)
    toast({
      title: "Trip Updated",
      description: `Trip for ${formData.route} has been updated successfully.`,
    })
  }

  const handleConfirmCancel = () => {
    // In a real app, you would make an API call
    const updatedTrips = trips.map((trip) => (trip.id === selectedTrip.id ? { ...trip, status: "Cancelled" } : trip))

    setTrips(updatedTrips)
    setIsCancelDialogOpen(false)
    toast({
      title: "Trip Cancelled",
      description: `Trip for ${selectedTrip.route} has been cancelled.`,
    })
  }

  const handleConfirmAssignDriver = () => {
    // In a real app, you would make an API call
    const driverName = drivers.find((d) => d.id === selectedDriver)?.name || "Unknown Driver"

    const updatedTrips = trips.map((trip) => (trip.id === selectedTrip.id ? { ...trip, driver: driverName } : trip))

    setTrips(updatedTrips)
    setIsAssignDriverDialogOpen(false)
    toast({
      title: "Driver Assigned",
      description: `${driverName} has been assigned to the trip for ${selectedTrip.route}.`,
    })
  }

  return (
    <PrivateRoute allowedRoles={["operator"]}>
      <DashboardLayout title="Trip Management" navigation={navigation} userRole="operator">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search trips..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline">Search</Button>
              <Tabs defaultValue="all" className="ml-4" onValueChange={setTripStatus}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New Trip</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New Trip</DialogTitle>
                  <DialogDescription>Fill in the details to create a new trip.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="route">Route</Label>
                      <Select onValueChange={(value) => handleFormChange("route", value)}>
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
                      <Label htmlFor="departureTDate">Departure Date</Label>
                      <Input
                        id="departureDate"
                        type="date"
                        onChange={(e) => handleFormChange("departureDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="departureTime">Departure Time</Label>
                      <Input
                        id="departureTime"
                        type="time"
                        onChange={(e) => handleFormChange("departureTime", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="arrivalTime">Estimated Arrival Time</Label>
                      <Input
                        id="arrivalTime"
                        type="time"
                        onChange={(e) => handleFormChange("arrivalTime", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select onValueChange={(value) => handleFormChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bus">Bus</Label>
                      <Select onValueChange={(value) => handleFormChange("bus", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bus" />
                        </SelectTrigger>
                        <SelectContent>
                          {buses.map((bus) => (
                            <SelectItem key={bus.id} value={`${bus.name} (${bus.plateNumber})`}>
                              {bus.name} ({bus.plateNumber})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="driver">Driver</Label>
                      <Select onValueChange={(value) => handleFormChange("driver", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Not Assigned">Not Assigned</SelectItem>
                          {drivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.name}>
                              {driver.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Input
                        id="notes"
                        placeholder="Any additional notes about this trip"
                        onChange={(e) => handleFormChange("notes", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTrip}>Create Trip</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Bus</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Available Seats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.route}</TableCell>
                      <TableCell>
                        <div>{format(new Date(trip.departureDate), "MMM dd, yyyy")}</div>
                        <div className="text-gray-500 dark:text-gray-400">{trip.departureTime}</div>
                      </TableCell>
                      <TableCell>{trip.arrivalTime}</TableCell>
                      <TableCell>{trip.bus}</TableCell>
                      <TableCell>
                        <div
                          className={`${trip.driver === "Not Assigned" ? "text-amber-600 dark:text-amber-400" : ""}`}
                        >
                          {trip.driver}
                        </div>
                      </TableCell>
                      <TableCell>
                        {trip.availableSeats}/{trip.totalSeats}
                        {trip.availableSeats < 5 && (
                          <span className="ml-2 text-red-500">
                            <AlertCircle className="inline h-4 w-4" />
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            trip.status === "Scheduled"
                              ? "bg-green-500"
                              : trip.status === "Completed"
                                ? "bg-blue-500"
                                : "bg-red-500"
                          }
                        >
                          {trip.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAssignDriver(trip)}
                            disabled={trip.driver !== "Not Assigned" || trip.status === "Cancelled"}
                          >
                            Assign Driver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTrip(trip)}
                            disabled={trip.status === "Cancelled" || trip.status === "Completed"}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                            onClick={() => handleCancelTrip(trip)}
                            disabled={trip.status !== "Scheduled"}
                          >
                            Cancel
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

        {/* Assign Driver Dialog */}
        <Dialog open={isAssignDriverDialogOpen} onOpenChange={setIsAssignDriverDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Driver</DialogTitle>
              <DialogDescription>
                {selectedTrip &&
                  `Assign a driver to trip for ${selectedTrip.route} on ${format(new Date(selectedTrip.departureDate), "MMM dd, yyyy")}`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="driver">Select Driver</Label>
                <Select onValueChange={setSelectedDriver}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name} (Rating: {driver.rating}/5)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  placeholder="Any special instructions for the driver"
                  value={driverNotes}
                  onChange={(e) => setDriverNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignDriverDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmAssignDriver} disabled={!selectedDriver}>
                Assign Driver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Trip Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Trip</DialogTitle>
              <DialogDescription>{selectedTrip && `Edit details for trip to ${selectedTrip.route}`}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="route">Route</Label>
                  <Select defaultValue={formData.route} onValueChange={(value) => handleFormChange("route", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.route} />
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
                  <Label htmlFor="departureTDate">Departure Date</Label>
                  <Input
                    id="departureDate"
                    type="date"
                    defaultValue={formData.departureDate}
                    onChange={(e) => handleFormChange("departureDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="departureTime">Departure Time</Label>
                  <Input
                    id="departureTime"
                    type="time"
                    defaultValue={formData.departureTime}
                    onChange={(e) => handleFormChange("departureTime", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="arrivalTime">Estimated Arrival Time</Label>
                  <Input
                    id="arrivalTime"
                    type="time"
                    defaultValue={formData.arrivalTime}
                    onChange={(e) => handleFormChange("arrivalTime", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={formData.status} onValueChange={(value) => handleFormChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bus">Bus</Label>
                  <Select defaultValue={formData.bus} onValueChange={(value) => handleFormChange("bus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.bus} />
                    </SelectTrigger>
                    <SelectContent>
                      {buses.map((bus) => (
                        <SelectItem key={bus.id} value={`${bus.name} (${bus.plateNumber})`}>
                          {bus.name} ({bus.plateNumber})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="driver">Driver</Label>
                  <Select defaultValue={formData.driver} onValueChange={(value) => handleFormChange("driver", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.driver} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Assigned">Not Assigned</SelectItem>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.name}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Any additional notes about this trip"
                    defaultValue={formData.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Trip Dialog */}
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cancel Trip</DialogTitle>
              <DialogDescription>
                {selectedTrip &&
                  `Are you sure you want to cancel the trip for ${selectedTrip.route} on ${format(new Date(selectedTrip.departureDate), "MMM dd, yyyy")}?`}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="reason">Reason for Cancellation</Label>
              <Input
                id="reason"
                placeholder="Please provide a reason for cancellation"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="mt-2"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                Go Back
              </Button>
              <Button variant="destructive" onClick={handleConfirmCancel} disabled={!cancellationReason}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
