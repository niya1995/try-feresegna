import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock popular routes data
const popularRoutes = [
  {
    route: "Addis Ababa to Bahir Dar",
    bookings: 1245,
    revenue: "996,000 ETB",
    growth: "+12%",
  },
  {
    route: "Addis Ababa to Hawassa",
    bookings: 987,
    revenue: "444,150 ETB",
    growth: "+8%",
  },
  {
    route: "Addis Ababa to Gondar",
    bookings: 876,
    revenue: "832,200 ETB",
    growth: "+15%",
  },
  {
    route: "Addis Ababa to Dire Dawa",
    bookings: 765,
    revenue: "535,500 ETB",
    growth: "+5%",
  },
  {
    route: "Addis Ababa to Mekelle",
    bookings: 654,
    revenue: "588,600 ETB",
    growth: "+10%",
  },
]

export function AdminPopularRoutes() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Popular Routes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularRoutes.map((route, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{route.route}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{route.bookings} bookings</span>
                  <span className="mx-2">•</span>
                  <span>{route.revenue}</span>
                </div>
              </div>
              <Badge className="bg-green-500">{route.growth}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
