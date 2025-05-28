import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar, Clock, MapPin } from "lucide-react"

// Mock schedule data
const schedule = [
  {
    id: "1",
    route: "Addis Ababa to Bahir Dar",
    departureTime: "06:00",
    arrivalTime: "14:00",
    date: "2023-07-15",
    bus: "ET-ABC-123",
    status: "upcoming",
  },
  {
    id: "2",
    route: "Bahir Dar to Addis Ababa",
    departureTime: "07:00",
    arrivalTime: "15:00",
    date: "2023-07-16",
    bus: "ET-ABC-123",
    status: "upcoming",
  },
  {
    id: "3",
    route: "Addis Ababa to Hawassa",
    departureTime: "08:30",
    arrivalTime: "12:30",
    date: "2023-07-18",
    bus: "ET-DEF-456",
    status: "upcoming",
  },
]

export function DriverSchedule() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case "completed":
        return <Badge variant="outline">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Next Trips</h3>
        <Button variant="outline" size="sm">
          View Full Schedule
        </Button>
      </div>
      <div className="space-y-4">
        {schedule.map((trip) => (
          <div
            key={trip.id}
            className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
          >
            <div className="mb-2 md:mb-0">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-primary mr-2" />
                <h3 className="font-medium text-sm">{trip.route}</h3>
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{format(new Date(trip.date), "EEEE, MMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  {trip.departureTime} - {trip.arrivalTime}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:items-end">
              <div className="flex items-center mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Bus:</span>
                <span className="text-xs font-medium">{trip.bus}</span>
              </div>
              <div className="flex items-center">{getStatusBadge(trip.status)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
