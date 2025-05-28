import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Clock, RouteIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RouteCardProps {
  route: {
    id: string
    from: string
    to: string
    distance: string
    duration: string
    price: string
    image: string
    operators: string[]
    frequency: string
    popularity: string
  }
}

export function RouteCard({ route }: RouteCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden card-hover">
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
            <MapPin className="h-4 w-4 text-primary mr-1" />
            <span>{route.from}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-primary mr-1" />
            <span>{route.to}</span>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <RouteIcon className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">{route.distance}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">{route.duration}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Operators:</div>
          <div className="flex flex-wrap gap-1">
            {route.operators.map((operator, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {operator}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-accent font-bold text-lg">From {route.price}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{route.frequency}</div>
        </div>

        <Link href={`/search?origin=${route.from}&destination=${route.to}`}>
          <Button className="w-full">View Schedule</Button>
        </Link>
      </div>
    </div>
  )
}
