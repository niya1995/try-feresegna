import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Clock, Route } from "lucide-react"
import { Button } from "@/components/ui/button"

const popularRoutes = [
  {
    id: 1,
    from: "Addis Ababa",
    to: "Bahir Dar",
    image: "/placeholder.svg?key=dl0b9",
    distance: "565 km",
    duration: "10 hours",
    price: "800 ETB",
  },
  {
    id: 2,
    from: "Addis Ababa",
    to: "Hawassa",
    image: "/placeholder.svg?key=2tvhe",
    distance: "270 km",
    duration: "4 hours",
    price: "450 ETB",
  },
  {
    id: 3,
    from: "Addis Ababa",
    to: "Gondar",
    image: "/placeholder.svg?key=v108e",
    distance: "725 km",
    duration: "12 hours",
    price: "950 ETB",
  },
  {
    id: 4,
    from: "Addis Ababa",
    to: "Dire Dawa",
    image: "/placeholder.svg?key=f0zy6",
    distance: "445 km",
    duration: "8 hours",
    price: "700 ETB",
  },
]

export function PopularRoutes() {
  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Routes</h2>
          <p className="text-xl text-blue-100">Discover the most traveled bus routes across Ethiopia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route) => (
            <div key={route.id} className="glass-effect overflow-hidden rounded-xl">
              <div className="h-48 relative">
                <Image
                  src={route.image || "/placeholder.svg"}
                  alt={`${route.from} to ${route.to}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-blue-300 mr-1" />
                    <span className="text-white">{route.from}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-300 mx-1" />
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-blue-300 mr-1" />
                    <span className="text-white">{route.to}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <Route className="h-4 w-4 text-blue-300 mr-1" />
                    <span className="text-blue-100 text-sm">{route.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-300 mr-1" />
                    <span className="text-blue-100 text-sm">{route.duration}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-accent font-bold text-lg">From {route.price}</div>
                </div>

                <Link href={`/search?origin=${route.from}&destination=${route.to}`}>
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
                    View Schedule
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/routes">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">View All Routes</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
