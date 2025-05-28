import { MapPin, Clock, Calendar, Users } from "lucide-react"

export function DriverStats() {
  // Mock stats data
  const stats = [
    {
      title: "Total Trips",
      value: "124",
      subtitle: "This month",
      icon: MapPin,
    },
    {
      title: "Total Distance",
      value: "8,642 km",
      subtitle: "This month",
      icon: Clock,
    },
    {
      title: "Next Trip",
      value: "Tomorrow",
      subtitle: "Addis Ababa to Bahir Dar",
      icon: Calendar,
    },
    {
      title: "Total Passengers",
      value: "3,456",
      subtitle: "This month",
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.subtitle}</p>
            </div>
            <div className="bg-primary-50 dark:bg-primary-900 p-2 rounded-lg">
              <stat.icon className="h-5 w-5 text-primary dark:text-primary-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
