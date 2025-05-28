import Link from "next/link"
import { ArrowRight, Clock, Calendar, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const popularTrips = [
  {
    id: 1,
    from: "Addis Ababa",
    to: "Bahir Dar",
    departureTime: "06:00 AM",
    arrivalTime: "04:00 PM",
    date: "Daily",
    operator: "Selam Bus",
    price: "800 ETB",
    availableSeats: 25,
    totalSeats: 45,
    featured: true,
  },
  {
    id: 2,
    from: "Addis Ababa",
    to: "Hawassa",
    departureTime: "07:30 AM",
    arrivalTime: "11:30 AM",
    date: "Daily",
    operator: "Sky Bus",
    price: "450 ETB",
    availableSeats: 5,
    totalSeats: 49,
    featured: false,
  },
  {
    id: 3,
    from: "Addis Ababa",
    to: "Gondar",
    departureTime: "08:00 PM",
    arrivalTime: "08:00 AM",
    date: "Mon, Wed, Fri",
    operator: "Golden Bus",
    price: "950 ETB",
    availableSeats: 15,
    totalSeats: 45,
    featured: false,
  },
  {
    id: 4,
    from: "Addis Ababa",
    to: "Dire Dawa",
    departureTime: "09:00 PM",
    arrivalTime: "05:00 AM",
    date: "Tue, Thu, Sat",
    operator: "Abay Bus",
    price: "700 ETB",
    availableSeats: 0,
    totalSeats: 49,
    featured: false,
  },
]

export function PopularTrips() {
  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Trips</h2>
          <p className="text-xl text-blue-100">Book your seat on these frequently traveled routes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTrips.map((trip) => {
            const availabilityPercentage = (trip.availableSeats / trip.totalSeats) * 100
            let availabilityStatus = "seat-available"
            let availabilityText = "Available"

            if (availabilityPercentage === 0) {
              availabilityStatus = "seat-scarce"
              availabilityText = "Sold Out"
            } else if (availabilityPercentage <= 20) {
              availabilityStatus = "seat-limited"
              availabilityText = "Limited"
            }

            return (
              <div key={trip.id} className="glass-effect overflow-hidden rounded-xl relative">
                {trip.featured && <Badge className="absolute top-2 right-2 bg-accent text-white">Featured Trip</Badge>}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-white">{trip.from}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-blue-300 mx-1" />
                    <div className="flex items-center">
                      <span className="text-white">{trip.to}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-300 mr-1" />
                      <span className="text-blue-100 text-sm">{trip.departureTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-300 mr-1" />
                      <span className="text-blue-100 text-sm">{trip.arrivalTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-300 mr-1" />
                      <span className="text-blue-100 text-sm">{trip.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Bus className="h-4 w-4 text-blue-300 mr-1" />
                      <span className="text-blue-100 text-sm">{trip.operator}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-accent font-bold text-lg">{trip.price}</div>
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${availabilityStatus.replace("seat-", "bg-").replace("available", "green-500").replace("limited", "yellow-500").replace("scarce", "red-500")} mr-1`}
                      ></div>
                      <span
                        className={`text-xs ${availabilityStatus.replace("seat-", "text-").replace("available", "green-500").replace("limited", "yellow-500").replace("scarce", "red-500")}`}
                      >
                        {availabilityText}
                      </span>
                    </div>
                  </div>

                  <Link href={`/booking/${trip.id}`}>
                    <Button
                      className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      disabled={trip.availableSeats === 0}
                    >
                      {trip.availableSeats === 0 ? "Sold Out" : "Book Now"}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/search">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">Find More Trips</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
