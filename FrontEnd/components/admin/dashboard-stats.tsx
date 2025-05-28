import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Bus, CreditCard, Route } from "lucide-react"

export function AdminDashboardStats() {
  // Mock stats data
  const stats = [
    {
      title: "Total Revenue",
      value: "1,245,300 ETB",
      change: "+12.5%",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "Total Bookings",
      value: "8,642",
      change: "+8.2%",
      trend: "up",
      icon: Route,
    },
    {
      title: "Active Operators",
      value: "24",
      change: "+2",
      trend: "up",
      icon: Bus,
    },
    {
      title: "Registered Users",
      value: "12,456",
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900 p-2 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.change} from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
