import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, Calendar, Clock, MapPin } from "lucide-react"

interface TripDetailsProps {
  trip: {
    id: string
    route: string
    departureTime: string
    departureDate: string
    estimatedArrival: string
    status: string
    currentLocation: string
    distanceCovered: string
    distanceRemaining: string
    driver: {
      name: string
      phone: string
      experience: string
    }
    bus: {
      plateNumber: string
      model: string
      capacity: number
    }
    stops: Array<{
      name: string
      time: string
      status: string
    }>
  }
}

export function TripDetails({ trip }: TripDetailsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Route</h3>
              <p className="text-gray-600 dark:text-gray-400">{trip.route}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Date</h3>
              <p className="text-gray-600 dark:text-gray-400">{trip.departureDate}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Departure Time</h3>
              <p className="text-gray-600 dark:text-gray-400">{trip.departureTime}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Estimated Arrival</h3>
              <p className="text-gray-600 dark:text-gray-400">{trip.estimatedArrival}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Bus className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Bus Details</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {trip.bus.model} ({trip.bus.plateNumber})
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-medium mb-2">Trip Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                <Badge
                  className={`mt-1 ${
                    trip.status === "in-transit"
                      ? "bg-green-500"
                      : trip.status === "delayed"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                >
                  {trip.status === "in-transit" ? "In Transit" : trip.status === "delayed" ? "Delayed" : "On Schedule"}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Current Location</div>
                <div className="font-medium">{trip.currentLocation}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Distance Covered</div>
                <div className="font-medium">{trip.distanceCovered}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Distance Remaining</div>
                <div className="font-medium">{trip.distanceRemaining}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
