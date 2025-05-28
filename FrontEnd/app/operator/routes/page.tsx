"use client"
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LayoutDashboard, Bus, RouteIcon, Calendar, Users, Plus, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

// Navigation items for operator dashboard
const navigation = [
  { name: "Dashboard", href: "/operator/dashboard", icon: LayoutDashboard },
  { name: "Buses", href: "/operator/buses", icon: Bus },
  { name: "Routes", href: "/operator/routes", icon: RouteIcon },
  { name: "Trips", href: "/operator/trips", icon: Calendar },
  { name: "Drivers", href: "/operator/drivers", icon: Users },
]

// Sample route data
const initialRoutes = [
  {
    id: "route-1",
    name: "Addis Ababa to Bahir Dar",
    distance: "565 km",
    duration: "10 hours",
    stops: ["Debre Markos", "Dejen", "Goha Tsion"],
    status: "Active",
    description: "Popular route connecting the capital to Lake Tana",
    fare: 850,
  },
  {
    id: "route-2",
    name: "Addis Ababa to Hawassa",
    distance: "273 km",
    duration: "4 hours",
    stops: ["Bishoftu", "Mojo", "Ziway"],
    status: "Active",
    description: "Scenic route to the lake city of Hawassa",
    fare: 450,
  },
  {
    id: "route-3",
    name: "Addis Ababa to Gondar",
    distance: "738 km",
    duration: "12 hours",
    stops: ["Debre Markos", "Bahir Dar", "Debre Tabor"],
    status: "Active",
    description: "Historical route to the ancient city of Gondar",
    fare: 950,
  },
  {
    id: "route-4",
    name: "Addis Ababa to Mekelle",
    distance: "783 km",
    duration: "13 hours",
    stops: ["Dessie", "Woldiya", "Alamata"],
    status: "Inactive",
    description: "Northern route to Mekelle through mountainous terrain",
    fare: 1050,
  },
  {
    id: "route-5",
    name: "Addis Ababa to Jimma",
    distance: "352 km",
    duration: "6 hours",
    stops: ["Wolkite", "Worabe"],
    status: "Active",
    description: "Western route to the coffee region of Jimma",
    fare: 550,
  },
]

// Major cities in Ethiopia for stops
const ethiopianCities = [
  "Addis Ababa",
  "Dire Dawa",
  "Gondar",
  "Bahir Dar",
  "Mekelle",
  "Hawassa",
  "Adama",
  "Jimma",
  "Dessie",
  "Debre Markos",
  "Bishoftu",
  "Sodo",
  "Jijiga",
  "Shashemene",
  "Arba Minch",
  "Hosaena",
  "Debre Birhan",
  "Asella",
  "Harar",
  "Nekemte",
  "Debre Tabor",
  "Dejen",
  "Goha Tsion",
  "Wolkite",
  "Worabe",
  "Mojo",
  "Ziway",
  "Woldiya",
  "Alamata",
]

export default function OperatorRoutesPage() {
  const [routes, setRoutes] = useState(initialRoutes)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isStopsDialogOpen, setIsStopsDialogOpen] = useState(false)
  const [currentRoute, setCurrentRoute] = useState<any>(null)
  const [newStop, setNewStop] = useState("")
  const [newRoute, setNewRoute] = useState({
    name: "",
    distance: "",
    duration: "",
    stops: [] as string[],
    status: "Active",
    description: "",
    fare: "",
  })

  // Filter routes based on search query
  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.stops.some((stop) => stop.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Handle adding a new route
  const handleAddRoute = () => {
    const id = `route-${Date.now()}`
    const fare = Number.parseInt(newRoute.fare)
    const routeToAdd = {
      ...newRoute,
      id,
      fare: isNaN(fare) ? 0 : fare,
    }

    setRoutes([...routes, routeToAdd])
    setIsAddDialogOpen(false)
    setNewRoute({
      name: "",
      distance: "",
      duration: "",
      stops: [],
      status: "Active",
      description: "",
      fare: "",
    })
  }

  // Handle editing a route
  const handleEditRoute = () => {
    if (!currentRoute) return

    const updatedRoutes = routes.map((route) => (route.id === currentRoute.id ? currentRoute : route))

    setRoutes(updatedRoutes)
    setIsEditDialogOpen(false)
    setCurrentRoute(null)
  }

  // Handle deleting a route
  const handleDeleteRoute = () => {
    if (!currentRoute) return

    const updatedRoutes = routes.filter((route) => route.id !== currentRoute.id)
    setRoutes(updatedRoutes)
    setIsDeleteDialogOpen(false)
    setCurrentRoute(null)
  }

  // Open edit dialog
  const openEditDialog = (route: any) => {
    setCurrentRoute({ ...route })
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (route: any) => {
    setCurrentRoute(route)
    setIsDeleteDialogOpen(true)
  }

  // Open stops management dialog
  const openStopsDialog = (route: any) => {
    setCurrentRoute({ ...route })
    setIsStopsDialogOpen(true)
  }

  // Add a stop to the current route
  const addStopToCurrentRoute = () => {
    if (!newStop || !currentRoute) return

    if (!currentRoute.stops.includes(newStop)) {
      setCurrentRoute({
        ...currentRoute,
        stops: [...currentRoute.stops, newStop],
      })
    }

    setNewStop("")
  }

  // Remove a stop from the current route
  const removeStopFromCurrentRoute = (stopToRemove: string) => {
    if (!currentRoute) return

    setCurrentRoute({
      ...currentRoute,
      stops: currentRoute.stops.filter((stop: string) => stop !== stopToRemove),
    })
  }

  // Save stops changes
  const saveStopsChanges = () => {
    if (!currentRoute) return

    const updatedRoutes = routes.map((route) => (route.id === currentRoute.id ? currentRoute : route))

    setRoutes(updatedRoutes)
    setIsStopsDialogOpen(false)
    setCurrentRoute(null)
  }

  return (
    <PrivateRoute allowedRoles={["operator"]}>
      <DashboardLayout title="Route Management" navigation={navigation} userRole="operator">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Input
                placeholder="Search routes..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                {searchQuery ? "Clear" : "Search"}
              </Button>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New Route</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New Route</DialogTitle>
                  <DialogDescription>Fill in the details to create a new bus route.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Route Name</Label>
                      <Input
                        id="name"
                        value={newRoute.name}
                        onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                        placeholder="e.g., Addis Ababa to Bahir Dar"
                      />
                    </div>
                    <div>
                      <Label htmlFor="distance">Distance</Label>
                      <Input
                        id="distance"
                        value={newRoute.distance}
                        onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                        placeholder="e.g., 565 km"
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={newRoute.duration}
                        onChange={(e) => setNewRoute({ ...newRoute, duration: e.target.value })}
                        placeholder="e.g., 10 hours"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fare">Fare (ETB)</Label>
                      <Input
                        id="fare"
                        type="number"
                        value={newRoute.fare}
                        onChange={(e) => setNewRoute({ ...newRoute, fare: e.target.value })}
                        placeholder="e.g., 850"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newRoute.status}
                        onValueChange={(value) => setNewRoute({ ...newRoute, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newRoute.description}
                        onChange={(e) => setNewRoute({ ...newRoute, description: e.target.value })}
                        placeholder="Brief description of the route"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRoute}>Create Route</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>{route.duration}</TableCell>
                      <TableCell>{route.stops.join(", ")}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            route.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {route.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openStopsDialog(route)}>
                            Stops
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(route)}>
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                            onClick={() => openDeleteDialog(route)}
                          >
                            Delete
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

        {/* Edit Route Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Route</DialogTitle>
              <DialogDescription>Update the details of {currentRoute?.name}.</DialogDescription>
            </DialogHeader>
            {currentRoute && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="edit-name">Route Name</Label>
                    <Input
                      id="edit-name"
                      value={currentRoute.name}
                      onChange={(e) => setCurrentRoute({ ...currentRoute, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-distance">Distance</Label>
                    <Input
                      id="edit-distance"
                      value={currentRoute.distance}
                      onChange={(e) => setCurrentRoute({ ...currentRoute, distance: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-duration">Duration</Label>
                    <Input
                      id="edit-duration"
                      value={currentRoute.duration}
                      onChange={(e) => setCurrentRoute({ ...currentRoute, duration: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-fare">Fare (ETB)</Label>
                    <Input
                      id="edit-fare"
                      type="number"
                      value={currentRoute.fare}
                      onChange={(e) => setCurrentRoute({ ...currentRoute, fare: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={currentRoute.status}
                      onValueChange={(value) => setCurrentRoute({ ...currentRoute, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={currentRoute.description}
                      onChange={(e) => setCurrentRoute({ ...currentRoute, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditRoute}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manage Stops Dialog */}
        <Dialog open={isStopsDialogOpen} onOpenChange={setIsStopsDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Manage Stops</DialogTitle>
              <DialogDescription>Add or remove stops for {currentRoute?.name}.</DialogDescription>
            </DialogHeader>
            {currentRoute && (
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-2">
                  <Select value={newStop} onValueChange={setNewStop}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a city to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {ethiopianCities
                        .filter((city) => !currentRoute.stops.includes(city))
                        .map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addStopToCurrentRoute} disabled={!newStop}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Current Stops</h3>
                  {currentRoute.stops.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {currentRoute.stops.map((stop: string) => (
                        <Badge key={stop} className="flex items-center gap-1 py-1.5">
                          {stop}
                          <button
                            onClick={() => removeStopFromCurrentRoute(stop)}
                            className="ml-1 rounded-full hover:bg-red-200 dark:hover:bg-red-800 p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No stops added yet.</p>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsStopsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveStopsChanges}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Route Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the route "{currentRoute?.name}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteRoute} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
