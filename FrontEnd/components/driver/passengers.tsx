import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock passengers data
const passengers = [
  {
    id: "1",
    name: "Alex Johnson",
    trip: "Addis Ababa to Bahir Dar",
    date: "July 15, 2023",
    seatNumber: "12A",
    status: "checked-in",
    avatar: "/diverse-group.png",
  },
  {
    id: "2",
    name: "Sarah Williams",
    trip: "Addis Ababa to Bahir Dar",
    date: "July 15, 2023",
    seatNumber: "14B",
    status: "pending",
    avatar: "/diverse-group.png",
  },
  {
    id: "3",
    name: "Michael Brown",
    trip: "Addis Ababa to Bahir Dar",
    date: "July 15, 2023",
    seatNumber: "8C",
    status: "pending",
    avatar: "/diverse-group.png",
  },
]

export function DriverPassengers() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "checked-in":
        return <Badge className="bg-green-500">Checked In</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Today's Passengers</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {passengers.map((passenger) => (
          <div
            key={passenger.id}
            className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={passenger.avatar || "/placeholder.svg"} alt={passenger.name} />
                <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{passenger.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Seat {passenger.seatNumber}</p>
              </div>
            </div>
            <div className="flex items-center">
              {getStatusBadge(passenger.status)}
              <Button variant="ghost" size="sm" className="ml-2">
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
