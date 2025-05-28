"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, MapPin, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Mock data for upcoming trips
const upcomingTrips = [
  {
    id: "1",
    route: "Addis Ababa to Bahir Dar",
    departureTime: "2023-06-15T08:00:00",
    arrivalTime: "2023-06-15T18:00:00",
    busNumber: "ET-ABC-1234",
    busModel: "Volvo 9700",
    passengerCount: 32,
    maxCapacity: 45,
    status: "scheduled",
  },
  {
    id: "2",
    route: "Addis Ababa to Hawassa",
    departureTime: "2023-06-16T07:30:00",
    arrivalTime: "2023-06-16T12:00:00",
    busNumber: "ET-XYZ-5678",
    busModel: "Mercedes-Benz Tourismo",
    passengerCount: 28,
    maxCapacity: 40,
    status: "scheduled",
  },
]

// Mock data for active trips
const activeTrips = [
  {
    id: "3",
    route: "Addis Ababa to Gondar",
    departureTime: "2023-06-14T06:00:00",
    arrivalTime: "2023-06-14T19:00:00",
    busNumber: "ET-DEF-9012",
    busModel: "Scania Touring",
    passengerCount: 38,
    maxCapacity: 45,
    status: "in-progress",
    currentLocation: "Debre Markos",
    completedPercentage: 45,
  },
]

export default function DriverCheckInPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const { toast } = useToast()
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  const handleCheckIn = (tripId: string) => {
    toast({
      title: "Check-in successful",
      description: "You have successfully checked in for this trip.",
    })
    // In a real app, you would update the trip status in the database
    router.push(`/driver/trips/${tripId}`)
  }

  const handleComplete = (tripId: string) => {
    toast({
      title: "Trip completed",
      description: "You have successfully completed this trip.",
    })
    // In a real app, you would update the trip status in the database
    router.push("/driver/dashboard")
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Driver Check-in</h1>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="active">Active Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{trip.route}</CardTitle>
                        <CardDescription>
                          Bus: {trip.busNumber} ({trip.busModel})
                        </CardDescription>
                      </div>
                      <Badge variant={trip.status === "scheduled" ? "outline" : "default"}>
                        {trip.status === "scheduled" ? "Scheduled" : "Ready"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Departure</p>
                          <p className="text-sm text-muted-foreground">{formatDate(trip.departureTime)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Arrival (Estimated)</p>
                          <p className="text-sm text-muted-foreground">{formatDate(trip.arrivalTime)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Passengers</p>
                          <p className="text-sm text-muted-foreground">
                            {trip.passengerCount} / {trip.maxCapacity} (
                            {Math.round((trip.passengerCount / trip.maxCapacity) * 100)}% full)
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleCheckIn(trip.id)}
                      disabled={new Date(trip.departureTime).getTime() - new Date().getTime() > 3600000} // Disable if more than 1 hour before departure
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Check In
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {upcomingTrips.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">No upcoming trips scheduled.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="grid gap-6 md:grid-cols-2">
              {activeTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{trip.route}</CardTitle>
                        <CardDescription>
                          Bus: {trip.busNumber} ({trip.busModel})
                        </CardDescription>
                      </div>
                      <Badge>In Progress</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Current Location</p>
                          <p className="text-sm text-muted-foreground">{trip.currentLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Departure</p>
                          <p className="text-sm text-muted-foreground">{formatDate(trip.departureTime)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Arrival (Estimated)</p>
                          <p className="text-sm text-muted-foreground">{formatDate(trip.arrivalTime)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Passengers</p>
                          <p className="text-sm text-muted-foreground">
                            {trip.passengerCount} / {trip.maxCapacity} (
                            {Math.round((trip.passengerCount / trip.maxCapacity) * 100)}% full)
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Trip Progress</p>
                          <p className="text-sm font-medium">{trip.completedPercentage}%</p>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${trip.completedPercentage}%` }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => router.push(`/track/${trip.id}`)}>
                      <MapPin className="mr-2 h-4 w-4" />
                      View Map
                    </Button>
                    <Button className="flex-1" onClick={() => handleComplete(trip.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Complete Trip
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {activeTrips.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">No active trips at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
