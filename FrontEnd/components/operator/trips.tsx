"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Edit, Plus } from "lucide-react"

// Mock trips data
const trips = [
  {
    id: "1",
    route: "Addis Ababa to Bahir Dar",
    departureTime: "06:00",
    date: "2023-07-15",
    bus: "ET-ABC-123",
    capacity: "45",
    booked: "32",
    status: "scheduled",
  },
  {
    id: "2",
    route: "Addis Ababa to Hawassa",
    departureTime: "08:30",
    date: "2023-07-15",
    bus: "ET-DEF-456",
    capacity: "49",
    booked: "45",
    status: "scheduled",
  },
  {
    id: "3",
    route: "Bahir Dar to Addis Ababa",
    departureTime: "07:00",
    date: "2023-07-16",
    bus: "ET-ABC-123",
    capacity: "45",
    booked: "12",
    status: "scheduled",
  },
  {
    id: "4",
    route: "Hawassa to Addis Ababa",
    departureTime: "09:00",
    date: "2023-07-16",
    bus: "ET-DEF-456",
    capacity: "49",
    booked: "28",
    status: "scheduled",
  },
]

export function OperatorTrips() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-green-500">Scheduled</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "completed":
        return <Badge variant="outline">Completed</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Trips</CardTitle>
        <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
          <Plus className="h-4 w-4 mr-1" />
          Add Trip
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{trip.route}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{format(new Date(trip.date), "MMM dd, yyyy")}</span>
                  <span className="mx-2">•</span>
                  <span>{trip.departureTime}</span>
                  <span className="mx-2">•</span>
                  <span>Bus: {trip.bus}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>
                    Booked: {trip.booked}/{trip.capacity}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{getStatusBadge(trip.status)}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="outline" size="sm">
            View All Trips
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
