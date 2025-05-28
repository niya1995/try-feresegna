"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, RouteIcon, MapPin, Users, Map } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Navigation items for driver dashboard - keeping only the 5 main items
const driverNavigation = [
  { name: "Dashboard", href: "/driver/dashboard", icon: BarChart3 },
  { name: "Schedule", href: "/driver/schedule", icon: Calendar },
  { name: "Routes", href: "/driver/routes", icon: RouteIcon },
  { name: "Trips", href: "/driver/trips", icon: MapPin },
  { name: "Passengers", href: "/driver/passengers", icon: Users },
]

// Sample routes data
const routes = [
  {
    id: "route-1",
    name: "Addis Ababa to Bahir Dar",
    distance: "565 km",
    duration: "8 hours",
    stops: ["Debre Markos", "Dejen", "Gohatsion", "Mota"],
    terrain: "Mountainous",
    roadCondition: "Good",
  },
  {
    id: "route-2",
    name: "Addis Ababa to Hawassa",
    distance: "273 km",
    duration: "4 hours",
    stops: ["Mojo", "Ziway", "Shashemene"],
    terrain: "Flat",
    roadCondition: "Excellent",
  },
  {
    id: "route-3",
    name: "Addis Ababa to Gondar",
    distance: "738 km",
    duration: "11 hours",
    stops: ["Debre Markos", "Bahir Dar", "Wereta"],
    terrain: "Mixed",
    roadCondition: "Good",
  },
]

export default function DriverRoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRoutes, setFilteredRoutes] = useState(routes)

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredRoutes(routes)
      return
    }

    const filtered = routes.filter((route) => route.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredRoutes(filtered)
  }

  const viewRouteDetails = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId)
    setSelectedRoute(route)
    setIsDetailsDialogOpen(true)
  }

  const viewRouteMap = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId)
    setSelectedRoute(route)
    setIsMapDialogOpen(true)
  }

  return (
    <PrivateRoute allowedRoles={["driver"]}>
      <DashboardLayout title="Route Information" navigation={driverNavigation} userRole="driver">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Input
                placeholder="Search routes..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="outline" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Road Condition</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>{route.duration}</TableCell>
                      <TableCell>{route.roadCondition}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => viewRouteDetails(route.id)}>
                            Details
                          </Button>
                          <Button size="sm" onClick={() => viewRouteMap(route.id)}>
                            View Map
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Route Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Route Details</DialogTitle>
              <DialogDescription>Complete information about the route.</DialogDescription>
            </DialogHeader>
            {selectedRoute && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Route Name</p>
                    <p className="text-sm">{selectedRoute.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Distance</p>
                    <p className="text-sm">{selectedRoute.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="text-sm">{selectedRoute.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Terrain</p>
                    <p className="text-sm">{selectedRoute.terrain}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Road Condition</p>
                    <p className="text-sm">{selectedRoute.roadCondition}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stops</p>
                  <ul className="list-disc list-inside text-sm">
                    {selectedRoute.stops.map((stop: string, index: number) => (
                      <li key={index}>{stop}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Route Map Dialog */}
        <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Route Map</DialogTitle>
              <DialogDescription>{selectedRoute?.name}</DialogDescription>
            </DialogHeader>
            {selectedRoute && (
              <div className="space-y-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-md h-64 flex items-center justify-center">
                  <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                    <Map className="h-12 w-12 mb-2" />
                    <p>Map visualization would appear here</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Route Information:</p>
                  <p className="text-sm">
                    {selectedRoute.distance} • {selectedRoute.duration} • {selectedRoute.terrain} terrain
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsMapDialogOpen(false)}>
                Close
              </Button>
              <Button>Download Map</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
