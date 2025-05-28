"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { RouteCard } from "@/components/routes/route-card"
import { RouteFilter } from "@/components/routes/route-filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Mock routes data
const allRoutes = [
  {
    id: "1",
    from: "Addis Ababa",
    to: "Bahir Dar",
    distance: "565 km",
    duration: "10 hours",
    price: "800 ETB",
    image: "/placeholder.svg?key=dl0b9",
    operators: ["Selam Bus", "Sky Bus", "Golden Bus"],
    frequency: "Daily",
    popularity: "high",
  },
  {
    id: "2",
    from: "Addis Ababa",
    to: "Hawassa",
    distance: "270 km",
    duration: "4 hours",
    price: "450 ETB",
    image: "/placeholder.svg?key=2tvhe",
    operators: ["Selam Bus", "Sky Bus", "Abay Bus"],
    frequency: "Daily",
    popularity: "high",
  },
  {
    id: "3",
    from: "Addis Ababa",
    to: "Gondar",
    distance: "725 km",
    duration: "12 hours",
    price: "950 ETB",
    image: "/placeholder.svg?key=v108e",
    operators: ["Golden Bus", "Abay Bus"],
    frequency: "Mon, Wed, Fri",
    popularity: "medium",
  },
  {
    id: "4",
    from: "Addis Ababa",
    to: "Dire Dawa",
    distance: "445 km",
    duration: "8 hours",
    price: "700 ETB",
    image: "/placeholder.svg?key=f0zy6",
    operators: ["Selam Bus", "Abay Bus"],
    frequency: "Tue, Thu, Sat",
    popularity: "medium",
  },
  {
    id: "5",
    from: "Addis Ababa",
    to: "Mekelle",
    distance: "780 km",
    duration: "13 hours",
    price: "900 ETB",
    image: "/placeholder.svg?key=m3k9l",
    operators: ["Selam Bus", "Habesha Bus"],
    frequency: "Daily",
    popularity: "medium",
  },
  {
    id: "6",
    from: "Addis Ababa",
    to: "Jimma",
    distance: "335 km",
    duration: "6 hours",
    price: "500 ETB",
    image: "/placeholder.svg?key=j1mm4",
    operators: ["Sky Bus", "Golden Bus"],
    frequency: "Daily",
    popularity: "medium",
  },
  {
    id: "7",
    from: "Bahir Dar",
    to: "Gondar",
    distance: "180 km",
    duration: "3 hours",
    price: "300 ETB",
    image: "/placeholder.svg?key=b2g0n",
    operators: ["Selam Bus", "Abay Bus"],
    frequency: "Daily",
    popularity: "low",
  },
  {
    id: "8",
    from: "Hawassa",
    to: "Arba Minch",
    distance: "275 km",
    duration: "5 hours",
    price: "400 ETB",
    image: "/placeholder.svg?key=h2w4r",
    operators: ["Sky Bus", "Habesha Bus"],
    frequency: "Tue, Thu, Sat",
    popularity: "low",
  },
  {
    id: "9",
    from: "Dire Dawa",
    to: "Harar",
    distance: "50 km",
    duration: "1 hour",
    price: "150 ETB",
    image: "/placeholder.svg?key=d1r3h",
    operators: ["Selam Bus", "Abay Bus"],
    frequency: "Daily",
    popularity: "low",
  },
  {
    id: "10",
    from: "Addis Ababa",
    to: "Adama",
    distance: "100 km",
    duration: "2 hours",
    price: "200 ETB",
    image: "/placeholder.svg?key=4d4m4",
    operators: ["Selam Bus", "Sky Bus", "Golden Bus", "Abay Bus"],
    frequency: "Daily",
    popularity: "high",
  },
  {
    id: "11",
    from: "Addis Ababa",
    to: "Dessie",
    distance: "400 km",
    duration: "7 hours",
    price: "600 ETB",
    image: "/placeholder.svg?key=d3ss1",
    operators: ["Selam Bus", "Habesha Bus"],
    frequency: "Mon, Wed, Fri",
    popularity: "medium",
  },
  {
    id: "12",
    from: "Addis Ababa",
    to: "Debre Markos",
    distance: "300 km",
    duration: "5 hours",
    price: "450 ETB",
    image: "/placeholder.svg?key=d3br3",
    operators: ["Golden Bus", "Abay Bus"],
    frequency: "Daily",
    popularity: "medium",
  },
]

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    popularity: [] as string[],
    operators: [] as string[],
    frequency: [] as string[],
  })

  // Filter routes based on search query and filters
  const filteredRoutes = allRoutes.filter((route) => {
    // Search filter
    const searchMatch =
      searchQuery === "" ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase())

    // Popularity filter
    const popularityMatch = filters.popularity.length === 0 || filters.popularity.includes(route.popularity)

    // Operators filter
    const operatorsMatch =
      filters.operators.length === 0 || route.operators.some((operator) => filters.operators.includes(operator))

    // Frequency filter
    const frequencyMatch =
      filters.frequency.length === 0 ||
      (filters.frequency.includes("Daily") && route.frequency === "Daily") ||
      (filters.frequency.includes("Specific Days") && route.frequency !== "Daily")

    return searchMatch && popularityMatch && operatorsMatch && frequencyMatch
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the state change
  }

  return (
    <MainLayout>
      <section className="hero-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Bus Routes</h1>
            <p className="text-xl text-blue-100">Discover the most traveled bus routes across Ethiopia</p>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search routes by city..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="hidden">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <RouteFilter filters={filters} setFilters={setFilters} />
            </div>

            <div className="lg:col-span-3">
              {filteredRoutes.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No Routes Found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    No routes match your search criteria. Try adjusting your filters or search query.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setFilters({
                        popularity: [],
                        operators: [],
                        frequency: [],
                      })
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRoutes.map((route) => (
                    <RouteCard key={route.id} route={route} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
