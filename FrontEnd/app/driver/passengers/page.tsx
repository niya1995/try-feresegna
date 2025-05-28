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

// Sample passengers data
const passengers = [
  {
    id: "passenger-1",
    name: "Abebe Kebede",
    ticketNumber: "TKT-12345",
    from: "Addis Ababa",
    to: "Bahir Dar",
    date: "2023-06-24",
    seatNumber: "12",
    status: "Checked In",
    phone: "+251912345678",
    email: "abebe.kebede@example.com",
    emergencyContact: "+251987654321",
  },
  {
    id: "passenger-2",
    name: "Tigist Haile",
    ticketNumber: "TKT-12346",
    from: "Addis Ababa",
    to: "Bahir Dar",
    date: "2023-06-24",
    seatNumber: "14",
    status: "Checked In",
    phone: "+251923456789",
    email: "tigist.haile@example.com",
    emergencyContact: "+251998765432",
  },
  {
    id: "passenger-3",
    name: "Dawit Tadesse",
    ticketNumber: "TKT-12347",
    from: "Addis Ababa",
    to: "Debre Markos",
    date: "2023-06-24",
    seatNumber: "23",
    status: "Not Checked In",
    phone: "+251934567890",
    email: "dawit.tadesse@example.com",
    emergencyContact: "+251909876543",
  },
  {
    id: "passenger-4",
    name: "Sara Mekonnen",
    ticketNumber: "TKT-12348",
    from: "Addis Ababa",
    to: "Bahir Dar",
    date: "2023-06-24",
    seatNumber: "32",
    status: "Checked In",
    phone: "+251945678901",
    email: "sara.mekonnen@example.com",
    emergencyContact: "+251910987654",
  },
  {
    id: "passenger-5",
    name: "Yonas Girma",
    ticketNumber: "TKT-12349",
    from: "Addis Ababa",
    to: "Dejen",
    date: "2023-06-24",
    seatNumber: "18",
    status: "Not Checked In",
    phone: "+251956789012",
    email: "yonas.girma@example.com",
    emergencyContact: "+251921098765",
  },
]

export default function DriverPassengersPage() {
  const [passengersList, setPassengersList] = useState(passengers)
  const [selectedPassenger, setSelectedPassenger] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setPassengersList(passengers)
      return
    }

    const filtered = passengers.filter(
      (passenger) =>
        passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        passenger.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setPassengersList(filtered)
  }

  const handleCheckIn = (passengerId: string) => {
    const passenger = passengers.find((p) => p.id === passengerId)
    setSelectedPassenger(passenger)
    setIsCheckInDialogOpen(true)
  }

  const confirmCheckIn = () => {
    setPassengersList((prev) => prev.map((p) => (p.id === selectedPassenger.id ? { ...p, status: "Checked In" } : p)))
    setIsCheckInDialogOpen(false)
    toast({
      title: "Passenger checked in",
      description: `${selectedPassenger.name} has been successfully checked in.`,
    })
  }

  const viewPassengerDetails = (passengerId: string) => {
    const passenger = passengers.find((p) => p.id === passengerId)
    setSelectedPassenger(passenger)
    setIsDetailsDialogOpen(true)
  }

  return (
    <PrivateRoute allowedRoles={["driver"]}>
      <DashboardLayout title="Passenger Management" navigation={driverNavigation} userRole="driver">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Input
                placeholder="Search passengers..."
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
              <Button variant="outline">Today's Trip</Button>
              <Button>Check In Passenger</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Passengers for Trip: Addis Ababa to Bahir Dar (June 24, 2023)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Ticket Number</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Seat Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passengersList.map((passenger) => (
                    <TableRow key={passenger.id}>
                      <TableCell className="font-medium">{passenger.name}</TableCell>
                      <TableCell>{passenger.ticketNumber}</TableCell>
                      <TableCell>{passenger.from}</TableCell>
                      <TableCell>{passenger.to}</TableCell>
                      <TableCell>{passenger.seatNumber}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            passenger.status === "Checked In"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {passenger.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {passenger.status === "Not Checked In" ? (
                            <Button size="sm" onClick={() => handleCheckIn(passenger.id)}>
                              Check In
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => viewPassengerDetails(passenger.id)}>
                              View Details
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

        {/* Passenger Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Passenger Details</DialogTitle>
              <DialogDescription>Complete information about the passenger.</DialogDescription>
            </DialogHeader>
            {selectedPassenger && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                    <p className="text-sm">{selectedPassenger.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ticket Number</p>
                    <p className="text-sm">{selectedPassenger.ticketNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">From</p>
                    <p className="text-sm">{selectedPassenger.from}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">To</p>
                    <p className="text-sm">{selectedPassenger.to}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Seat Number</p>
                    <p className="text-sm">{selectedPassenger.seatNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                    <p className="text-sm">{selectedPassenger.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-sm">{selectedPassenger.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm">{selectedPassenger.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Emergency Contact</p>
                    <p className="text-sm">{selectedPassenger.emergencyContact}</p>
                  </div>
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

        {/* Check In Confirmation Dialog */}
        <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Check In Passenger</DialogTitle>
              <DialogDescription>Are you sure you want to check in this passenger?</DialogDescription>
            </DialogHeader>
            {selectedPassenger && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                    <p className="text-sm">{selectedPassenger.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ticket Number</p>
                    <p className="text-sm">{selectedPassenger.ticketNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Seat Number</p>
                    <p className="text-sm">{selectedPassenger.seatNumber}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCheckInDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmCheckIn}>Confirm Check In</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
