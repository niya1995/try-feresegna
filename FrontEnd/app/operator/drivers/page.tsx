"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Bus,
  Route,
  Calendar,
  Users,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  CalendarIcon,
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"

// Navigation items for operator dashboard
const navigation = [
  { name: "Dashboard", href: "/operator/dashboard", icon: LayoutDashboard },
  { name: "Buses", href: "/operator/buses", icon: Bus },
  { name: "Routes", href: "/operator/routes", icon: Route },
  { name: "Trips", href: "/operator/trips", icon: Calendar },
  { name: "Drivers", href: "/operator/drivers", icon: Users },
]

// Sample driver data
const initialDrivers = [
  {
    id: "driver-1",
    name: "Haile Gebrselassie",
    avatar: "/diverse-group.png",
    email: "haile@example.com",
    phone: "+251 91 234 5678",
    licenseNumber: "D12345",
    licenseExpiry: "2025-06-30",
    experience: "7 years",
    status: "Active",
    address: "Addis Ababa, Ethiopia",
    rating: 4.8,
    completedTrips: 456,
    pendingTrips: 2,
    joinDate: "2018-03-15",
  },
  {
    id: "driver-2",
    name: "Abel Kebede",
    avatar: "/diverse-group.png",
    email: "abel@example.com",
    phone: "+251 91 234 5679",
    licenseNumber: "D12346",
    licenseExpiry: "2024-08-15",
    experience: "5 years",
    status: "Active",
    address: "Bahir Dar, Ethiopia",
    rating: 4.5,
    completedTrips: 312,
    pendingTrips: 1,
    joinDate: "2019-07-21",
  },
  {
    id: "driver-3",
    name: "Abebe Bikila",
    avatar: "/diverse-group.png",
    email: "abebe@example.com",
    phone: "+251 91 234 5680",
    licenseNumber: "D12347",
    licenseExpiry: "2025-03-10",
    experience: "10 years",
    status: "Active",
    address: "Hawassa, Ethiopia",
    rating: 4.9,
    completedTrips: 621,
    pendingTrips: 0,
    joinDate: "2015-11-03",
  },
  {
    id: "driver-4",
    name: "Kenenisa Bekele",
    avatar: "/diverse-group.png",
    email: "kenenisa@example.com",
    phone: "+251 91 234 5681",
    licenseNumber: "D12348",
    experience: "3 years",
    licenseExpiry: "2024-11-20",
    status: "On Leave",
    address: "Gondar, Ethiopia",
    rating: 4.7,
    completedTrips: 189,
    pendingTrips: 0,
    joinDate: "2021-02-15",
  },
  {
    id: "driver-5",
    name: "Tirunesh Dibaba",
    avatar: "/diverse-group.png",
    email: "tirunesh@example.com",
    phone: "+251 91 234 5682",
    licenseNumber: "D12349",
    licenseExpiry: "2024-05-05",
    experience: "4 years",
    status: "Active",
    address: "Mekele, Ethiopia",
    rating: 4.6,
    completedTrips: 247,
    pendingTrips: 1,
    joinDate: "2020-08-12",
  },
]

// Sample trip history data
const driverTripHistory = [
  {
    id: "trip-101",
    route: "Addis Ababa to Bahir Dar",
    date: "2023-06-30",
    departureTime: "06:00",
    arrivalTime: "16:00",
    bus: "Selam Bus 001",
    status: "Completed",
    passengerCount: 47,
    rating: 4.9,
    notes: "Arrived 15 minutes early.",
  },
  {
    id: "trip-102",
    route: "Bahir Dar to Addis Ababa",
    date: "2023-07-01",
    departureTime: "07:00",
    arrivalTime: "17:00",
    bus: "Selam Bus 001",
    status: "Completed",
    passengerCount: 43,
    rating: 4.8,
    notes: "Some traffic delay but handled well.",
  },
  {
    id: "trip-103",
    route: "Addis Ababa to Bahir Dar",
    date: "2023-07-05",
    departureTime: "06:00",
    arrivalTime: "16:00",
    bus: "Selam Bus 001",
    status: "Completed",
    passengerCount: 49,
    rating: 4.7,
    notes: "No issues reported.",
  },
  {
    id: "trip-104",
    route: "Bahir Dar to Addis Ababa",
    date: "2023-07-06",
    departureTime: "07:00",
    arrivalTime: "17:00",
    bus: "Selam Bus 001",
    status: "Completed",
    passengerCount: 45,
    rating: 4.9,
    notes: "Excellent service reported by multiple passengers.",
  },
  {
    id: "trip-105",
    route: "Addis Ababa to Hawassa",
    date: "2023-07-10",
    departureTime: "08:30",
    arrivalTime: "12:30",
    bus: "Selam Bus 002",
    status: "Completed",
    passengerCount: 48,
    rating: 4.8,
    notes: "Smooth trip.",
  },
]

// Sample upcoming trips
const driverUpcomingTrips = [
  {
    id: "trip-201",
    route: "Addis Ababa to Bahir Dar",
    date: "2023-07-15",
    departureTime: "06:00",
    arrivalTime: "16:00",
    bus: "Selam Bus 001",
    status: "Scheduled",
    bookedSeats: 32,
    totalSeats: 49,
  },
  {
    id: "trip-202",
    route: "Bahir Dar to Addis Ababa",
    date: "2023-07-16",
    departureTime: "07:00",
    arrivalTime: "17:00",
    bus: "Selam Bus 001",
    status: "Scheduled",
    bookedSeats: 12,
    totalSeats: 49,
  },
]

// Sample driver feedback
const driverFeedback = [
  {
    id: "feedback-1",
    passenger: "Meseret Defar",
    rating: 5,
    comment: "Very professional and punctual driver. Made the journey comfortable.",
    date: "2023-06-30",
    trip: "Addis Ababa to Bahir Dar",
  },
  {
    id: "feedback-2",
    passenger: "Daniel Teferra",
    rating: 4,
    comment: "Good driving skills, but could improve on communication with passengers.",
    date: "2023-07-01",
    trip: "Bahir Dar to Addis Ababa",
  },
  {
    id: "feedback-3",
    passenger: "Hiwot Ayalew",
    rating: 5,
    comment: "Extremely courteous and helped with luggage. Great experience!",
    date: "2023-07-05",
    trip: "Addis Ababa to Bahir Dar",
  },
]

export default function OperatorDriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers)
  const [viewDriverId, setViewDriverId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [driverDetailTab, setDriverDetailTab] = useState("info")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Form state for new/edit driver
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseExpiry: "",
    experience: "",
    address: "",
    notes: "",
    password: "",
    confirmPassword: "",
  })

  // Form state for suspension
  const [suspensionReason, setSuspensionReason] = useState("")

  const viewDriver = drivers.find((driver) => driver.id === viewDriverId)

  const filteredDrivers = drivers
    .filter((driver) =>
      activeTab === "all" ? true : activeTab === "active" ? driver.status === "Active" : driver.status !== "Active",
    )
    .filter((driver) =>
      searchQuery === ""
        ? true
        : driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          driver.phone.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleEditDriver = (driver: any) => {
    setFormData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      licenseExpiry: driver.licenseExpiry,
      experience: driver.experience,
      address: driver.address,
      notes: "",
      password: "",
      confirmPassword: "",
    })
    setIsEditDialogOpen(true)
  }

  const handleSuspendDriver = (driver: any) => {
    setViewDriverId(driver.id)
    setSuspensionReason("")
    setIsSuspendDialogOpen(true)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddDriver = () => {
    // Validate password
    if (!formData.password || formData.password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    // Rest of the existing function remains the same
    const newDriver = {
      id: `driver-${drivers.length + 1}`,
      name: formData.name,
      avatar: "/diverse-group.png",
      email: formData.email,
      phone: formData.phone,
      licenseNumber: formData.licenseNumber,
      licenseExpiry: formData.licenseExpiry,
      experience: formData.experience,
      status: "Active",
      address: formData.address,
      rating: 0,
      completedTrips: 0,
      pendingTrips: 0,
      joinDate: new Date().toISOString().split("T")[0],
    }

    setDrivers([...drivers, newDriver])
    setIsAddDialogOpen(false)

    // Reset form including password fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      licenseNumber: "",
      licenseExpiry: "",
      experience: "",
      address: "",
      notes: "",
      password: "",
      confirmPassword: "",
    })

    toast({
      title: "Driver Added",
      description: `${formData.name} has been added successfully.`,
    })
  }

  const handleSaveEdit = () => {
    // In a real app, you would validate the form data and make an API call
    const updatedDrivers = drivers.map((driver) =>
      driver.id === viewDriverId
        ? {
            ...driver,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            licenseNumber: formData.licenseNumber,
            licenseExpiry: formData.licenseExpiry,
            experience: formData.experience,
            address: formData.address,
          }
        : driver,
    )

    setDrivers(updatedDrivers)
    setIsEditDialogOpen(false)
    toast({
      title: "Driver Updated",
      description: `${formData.name}'s information has been updated successfully.`,
    })
  }

  const handleConfirmSuspend = () => {
    // In a real app, you would make an API call
    const updatedDrivers = drivers.map((driver) =>
      driver.id === viewDriverId ? { ...driver, status: driver.status === "Active" ? "Suspended" : "Active" } : driver,
    )

    setDrivers(updatedDrivers)
    setIsSuspendDialogOpen(false)

    const driver = drivers.find((d) => d.id === viewDriverId)
    const newStatus = driver?.status === "Active" ? "suspended" : "reactivated"

    toast({
      title: `Driver ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      description: `${driver?.name} has been ${newStatus}.`,
    })
  }

  return (
    <PrivateRoute allowedRoles={["operator"]}>
      <DashboardLayout title="Driver Management" navigation={navigation} userRole="operator">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search drivers..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline">Search</Button>
              <Tabs defaultValue="all" className="ml-4" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Drivers</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">On Leave/Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New Driver</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New Driver</DialogTitle>
                  <DialogDescription>Fill in the driver details to add them to your company.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Full name"
                        onChange={(e) => handleFormChange("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        onChange={(e) => handleFormChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Phone number"
                        onChange={(e) => handleFormChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        placeholder="Driver license number"
                        onChange={(e) => handleFormChange("licenseNumber", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                      <Input
                        id="licenseExpiry"
                        type="date"
                        onChange={(e) => handleFormChange("licenseExpiry", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="text"
                        placeholder="Experience"
                        onChange={(e) => handleFormChange("experience", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Full address"
                        onChange={(e) => handleFormChange("address", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => handleFormChange("password", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleFormChange("confirmPassword", e.target.value)}
                      />
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                        )}
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information"
                        onChange={(e) => handleFormChange("notes", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddDriver}
                    disabled={
                      !formData.name ||
                      !formData.email ||
                      !formData.phone ||
                      !formData.licenseNumber ||
                      !formData.password ||
                      formData.password !== formData.confirmPassword
                    }
                  >
                    Add Driver
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {viewDriverId ? (
            <div className="space-y-6">
              <Button variant="outline" size="sm" onClick={() => setViewDriverId(null)}>
                Back to Drivers List
              </Button>

              {viewDriver && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-1">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={viewDriver.avatar || "/placeholder.svg"} alt={viewDriver.name} />
                          <AvatarFallback>{viewDriver.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <h2 className="text-xl font-bold">{viewDriver.name}</h2>
                          <div className="flex items-center justify-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">
                              {viewDriver.rating}/5 ({viewDriver.completedTrips} trips)
                            </span>
                          </div>
                          <Badge className={`mt-2 ${viewDriver.status === "Active" ? "bg-green-500" : "bg-amber-500"}`}>
                            {viewDriver.status}
                          </Badge>
                        </div>

                        <div className="w-full space-y-3 mt-4">
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 opacity-70" />
                            <span>{viewDriver.phone}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 opacity-70" />
                            <span>{viewDriver.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 opacity-70" />
                            <span>{viewDriver.address}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CalendarIcon className="h-4 w-4 mr-2 opacity-70" />
                            <span>Joined: {format(new Date(viewDriver.joinDate), "MMM dd, yyyy")}</span>
                          </div>
                        </div>

                        <div className="w-full flex justify-between mt-4 space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleSuspendDriver(viewDriver)}
                          >
                            {viewDriver.status === "Active" ? "Suspend" : "Reactivate"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEditDriver(viewDriver)}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <Tabs defaultValue="info" onValueChange={setDriverDetailTab}>
                        <TabsList>
                          <TabsTrigger value="info">Info</TabsTrigger>
                          <TabsTrigger value="history">Trip History</TabsTrigger>
                          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
                          <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardHeader>
                    <CardContent>
                      {driverDetailTab === "info" && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium">Driver Information</h3>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">License Number</p>
                                <p className="font-medium">{viewDriver.licenseNumber}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">License Expiry</p>
                                <p className="font-medium">
                                  {format(new Date(viewDriver.licenseExpiry), "MMM dd, yyyy")}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                                <p className="font-medium">{viewDriver.experience}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Completed Trips</p>
                                <p className="font-medium">{viewDriver.completedTrips}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium">Performance Summary</h3>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                              <Card>
                                <CardContent className="p-4 text-center">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
                                  <div className="flex items-center justify-center mt-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="ml-1 font-bold text-xl">{viewDriver.rating}/5</span>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-4 text-center">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Trips</p>
                                  <p className="font-bold text-xl mt-1">{viewDriver.completedTrips}</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-4 text-center">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming Trips</p>
                                  <p className="font-bold text-xl mt-1">{viewDriver.pendingTrips}</p>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                      )}

                      {driverDetailTab === "history" && (
                        <div className="space-y-4">
                          {driverTripHistory.map((trip) => (
                            <Card key={trip.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{trip.route}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <CalendarIcon className="h-4 w-4 mr-1" />
                                      <span>{format(new Date(trip.date), "MMM dd, yyyy")}</span>
                                      <span className="mx-2">•</span>
                                      <Clock className="h-4 w-4 mr-1" />
                                      <span>
                                        {trip.departureTime} - {trip.arrivalTime}
                                      </span>
                                    </div>
                                  </div>
                                  <Badge className="bg-blue-500">{trip.status}</Badge>
                                </div>
                                <div className="flex justify-between mt-3">
                                  <div className="text-sm">
                                    <span className="text-gray-500">Bus:</span> {trip.bus}
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-gray-500">Passengers:</span> {trip.passengerCount}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <span className="text-gray-500 mr-1">Rating:</span>
                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                    <span className="ml-1">{trip.rating}/5</span>
                                  </div>
                                </div>
                                {trip.notes && (
                                  <div className="mt-3 text-sm">
                                    <span className="text-gray-500">Notes:</span> {trip.notes}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {driverDetailTab === "upcoming" && (
                        <div className="space-y-4">
                          {driverUpcomingTrips.length > 0 ? (
                            driverUpcomingTrips.map((trip) => (
                              <Card key={trip.id}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium">{trip.route}</h3>
                                      <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <CalendarIcon className="h-4 w-4 mr-1" />
                                        <span>{format(new Date(trip.date), "MMM dd, yyyy")}</span>
                                        <span className="mx-2">•</span>
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>
                                          {trip.departureTime} - {trip.arrivalTime}
                                        </span>
                                      </div>
                                    </div>
                                    <Badge className="bg-green-500">{trip.status}</Badge>
                                  </div>
                                  <div className="flex justify-between mt-3">
                                    <div className="text-sm">
                                      <span className="text-gray-500">Bus:</span> {trip.bus}
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-500">Booked Seats:</span> {trip.bookedSeats}/
                                      {trip.totalSeats}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-500">No upcoming trips scheduled for this driver.</p>
                            </div>
                          )}
                        </div>
                      )}

                      {driverDetailTab === "feedback" && (
                        <div className="space-y-4">
                          {driverFeedback.map((feedback) => (
                            <Card key={feedback.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="font-medium">{feedback.passenger}</h3>
                                    <p className="text-sm text-gray-500">{feedback.trip}</p>
                                  </div>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="text-sm">{feedback.comment}</p>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                  {format(new Date(feedback.date), "MMM dd, yyyy")}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDrivers.map((driver) => (
                    <Card key={driver.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                              <AvatarFallback>{driver.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{driver.name}</h3>
                              <div className="flex items-center mt-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 text-sm">{driver.rating}/5</span>
                                <span className="mx-1 text-gray-400">•</span>
                                <span className="text-sm text-gray-500">{driver.completedTrips} trips</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 opacity-70" />
                              <span>{driver.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 opacity-70" />
                              <span>{driver.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className={`${driver.status === "Active" ? "bg-green-500" : "bg-amber-500"}`}>
                                {driver.status}
                              </Badge>
                              <span className="ml-2">
                                {driver.pendingTrips > 0
                                  ? `${driver.pendingTrips} upcoming ${driver.pendingTrips === 1 ? "trip" : "trips"}`
                                  : "No upcoming trips"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                          <div className="flex justify-between">
                            <Button variant="ghost" size="sm" onClick={() => setViewDriverId(driver.id)}>
                              View Details
                            </Button>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditDriver(driver)}>
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                                onClick={() => handleSuspendDriver(driver)}
                              >
                                {driver.status === "Active" ? "Suspend" : "Reactivate"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Edit Driver Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Driver</DialogTitle>
              <DialogDescription>{viewDriver && `Update information for ${viewDriver.name}`}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    defaultValue={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    defaultValue={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    defaultValue={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    placeholder="Driver license number"
                    defaultValue={formData.licenseNumber}
                    onChange={(e) => handleFormChange("licenseNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                  <Input
                    id="licenseExpiry"
                    type="date"
                    defaultValue={formData.licenseExpiry}
                    onChange={(e) => handleFormChange("licenseExpiry", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="text"
                    placeholder="Experience"
                    defaultValue={formData.experience}
                    onChange={(e) => handleFormChange("experience", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Full address"
                    defaultValue={formData.address}
                    onChange={(e) => handleFormChange("address", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information"
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

        {/* Suspend Driver Dialog */}
        <Dialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {viewDriver && viewDriver.status === "Active" ? "Suspend Driver" : "Reactivate Driver"}
              </DialogTitle>
              <DialogDescription>
                {viewDriver && viewDriver.status === "Active"
                  ? `Are you sure you want to suspend ${viewDriver.name}? They will not be able to be assigned to trips.`
                  : `Are you sure you want to reactivate ${viewDriver?.name}? They will be available for trip assignments.`}
              </DialogDescription>
            </DialogHeader>
            {viewDriver && viewDriver.status === "Active" && (
              <div className="py-4">
                <Label htmlFor="reason">Reason for Suspension</Label>
                <Input
                  id="reason"
                  placeholder="Please provide a reason for suspension"
                  value={suspensionReason}
                  onChange={(e) => setSuspensionReason(e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSuspendDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant={viewDriver?.status === "Active" ? "destructive" : "default"}
                onClick={handleConfirmSuspend}
                disabled={viewDriver?.status === "Active" && !suspensionReason}
              >
                {viewDriver?.status === "Active" ? "Suspend Driver" : "Reactivate Driver"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
