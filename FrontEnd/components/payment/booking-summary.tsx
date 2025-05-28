import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MapPin, Bus } from "lucide-react"

interface BookingSummaryProps {
  trip: any
  seats: any[]
  date: string
}

export function BookingSummary({ trip, seats, date }: BookingSummaryProps) {
  const subtotal = trip.price * seats.length
  const vat = subtotal * 0.15 // 15% VAT
  const total = subtotal + vat

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Trip Details</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              <span>From</span>
            </div>
            <span className="font-medium">{trip.origin}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              <span>To</span>
            </div>
            <span className="font-medium">{trip.destination}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
              <span>Date</span>
            </div>
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              <span>Time</span>
            </div>
            <span className="font-medium">
              {trip.departureTime} - {trip.arrivalTime}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Bus className="h-4 w-4 mr-1 text-gray-500" />
              <span>Operator</span>
            </div>
            <span className="font-medium">{trip.operator}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Seats</h3>
          <div className="flex flex-wrap gap-1">
            {seats.map((seat) => (
              <Badge key={seat.id} variant="outline">
                Seat {seat.number}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t">
          <h3 className="font-medium">Price Breakdown</h3>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{subtotal} ETB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>VAT (15%)</span>
            <span>{vat} ETB</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>{total} ETB</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Booking Reference</span>
            <span className="font-mono">FB-{Math.floor(Math.random() * 1000000)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
