"use client"
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LayoutDashboard, Bus, RouteIcon, Calendar, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Textarea } from "@/components/ui/textarea"

// Navigation items for operator dashboard
const navigation = [
  { name: "Dashboard", href: "/operator/dashboard", icon: LayoutDashboard },
  { name: "Buses", href: "/operator/buses", icon: Bus },
  { name: "Routes", href: "/operator/routes", icon: RouteIcon },
  { name: "Trips", href: "/operator/trips", icon: Calendar },
  { name: "Drivers", href: "/operator/drivers", icon: Users },
]

// Sample bus data
const initialBuses = [
  {
    id: "bus-1",
    name: "Selam Bus 001",
    plateNumber: "AA-12345",
    model: "Volvo B11R",
    capacity: 49,
    amenities: ["WiFi", "AC", "TV", "Reclining Seats"],
    status: "Active",
  },
  {
    id: "bus-2",
    name: "Selam Bus 002",
    plateNumber: "AA-12346",
    model: "Volvo B11R",
    capacity: 49,
    amenities: ["WiFi", "AC", "TV", "Reclining Seats"],
    status: "Active",
  },
  {
    id: "bus-3",
    name: "Selam Bus 003",
    plateNumber: "AA-12347",
    model: "Scania K410",
    capacity: 45,
    amenities: ["WiFi", "AC", "TV", "USB Charging"],
    status: "Maintenance",
  },
  {
    id: "bus-4",
    name: "Selam Bus 004",
    plateNumber: "AA-12348",
    model: "Scania K410",
    capacity: 45,
    amenities: ["WiFi", "AC", "TV", "USB Charging"],
    status: "Active",
  },
  {
    id: "bus-5",
    name: "Selam Bus 005",
    plateNumber: "AA-12349",
    model: "Mercedes-Benz O500",
    capacity: 52,
    amenities: ["WiFi", "AC", "TV", "Reclining Seats", "USB Charging"],
    status: "Active",
  },
]

// Available amenities
const availableAmenities = [
  { id: "wifi", label: "WiFi" },
  { id: "ac", label: "AC" },
  { id: "tv", label: "TV" },
  { id: "reclining", label: "Reclining Seats" },
  { id: "usb", label: "USB Charging" },
  { id: "toilet", label: "Toilet" },
  { id: "snacks", label: "Snacks" },
  { id: "water", label: "Water" },
]

// Bus models
const busModels = ["Volvo B11R", "Scania K410", "Mercedes-Benz O500", "Yutong ZK6122H9", "King Long XMQ6127"]

export default function OperatorBusesPage() {
  const [buses, setBuses] = useState(initialBuses)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentBus, setCurrentBus] = useState<any>(null)
  const [newBus, setNewBus] = useState({
    name: "",
    plateNumber: "",
    model: "",
    capacity: "",
    amenities: [] as string[],
    status: "Active",
  })

  // Filter buses based on search query
  const filteredBuses = buses.filter(
    (bus) =>
      bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.model.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle adding a new bus
  const handleAddBus = () => {
    const id = `bus-${Date.now()}`
    const capacity = Number.parseInt(newBus.capacity)
    const busToAdd = {
      ...newBus,
      id,
      capacity: isNaN(capacity) ? 0 : capacity,
    }

    setBuses([...buses, busToAdd])
    setIsAddDialogOpen(false)
    setNewBus({
      name: "",
      plateNumber: "",
      model: "",
      capacity: "",
      amenities: [],
      status: "Active",
    })
  }

  // Handle editing a bus
  const handleEditBus = () => {
    if (!currentBus) return

    const updatedBuses = buses.map((bus) => (bus.id === currentBus.id ? currentBus : bus))

    setBuses(updatedBuses)
    setIsEditDialogOpen(false)
    setCurrentBus(null)
  }

  // Handle deleting a bus
  const handleDeleteBus = () => {
    if (!currentBus) return

    const updatedBuses = buses.filter((bus) => bus.id !== currentBus.id)
    setBuses(updatedBuses)
    setIsDeleteDialogOpen(false)
    setCurrentBus(null)
  }

  // Open edit dialog
  const openEditDialog = (bus: any) => {
    setCurrentBus({ ...bus })
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (bus: any) => {
    setCurrentBus(bus)
    setIsDeleteDialogOpen(true)
  }

  // Handle amenity toggle for new bus
  const handleNewBusAmenityToggle = (amenity: string) => {
    if (newBus.amenities.includes(amenity)) {
      setNewBus({
        ...newBus,
        amenities: newBus.amenities.filter((a) => a !== amenity),
      })
    } else {
      setNewBus({
        ...newBus,
        amenities: [...newBus.amenities, amenity],
      })
    }
  }

  // Handle amenity toggle for current bus
  const handleCurrentBusAmenityToggle = (amenity: string) => {
    if (!currentBus) return

    if (currentBus.amenities.includes(amenity)) {
      setCurrentBus({
        ...currentBus,
        amenities: currentBus.amenities.filter((a: string) => a !== amenity),
      })
    } else {
      setCurrentBus({
        ...currentBus,
        amenities: [...currentBus.amenities, amenity],
      })
    }
  }

  return (
    <PrivateRoute allowedRoles={["operator"]}>
      <DashboardLayout title="Bus Management" navigation={navigation} userRole="operator">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Input
                placeholder="Search buses..."
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
                <Button>Add New Bus</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New Bus</DialogTitle>
                  <DialogDescription>Fill in the details to add a new bus to your fleet.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Bus Name</Label>
                      <Input
                        id="name"
                        value={newBus.name}
                        onChange={(e) => setNewBus({ ...newBus, name: e.target.value })}
                        placeholder="Bus name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="plateNumber">Plate Number</Label>
                      <Input
                        id="plateNumber"
                        value={newBus.plateNumber}
                        onChange={(e) => setNewBus({ ...newBus, plateNumber: e.target.value })}
                        placeholder="Plate number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Select value={newBus.model} onValueChange={(value) => setNewBus({ ...newBus, model: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {busModels.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacity (Seats)</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={newBus.capacity}
                        onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })}
                        placeholder="Number of seats"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={newBus.status} onValueChange={(value) => setNewBus({ ...newBus, status: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                          <SelectItem value="Out of Service">Out of Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block">Amenities</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableAmenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`amenity-${amenity.id}`}
                            checked={newBus.amenities.includes(amenity.label)}
                            onCheckedChange={() => handleNewBusAmenityToggle(amenity.label)}
                          />
                          <label
                            htmlFor={`amenity-${amenity.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Any additional information about this bus" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBus}>Add Bus</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Buses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus Name</TableHead>
                    <TableHead>Plate Number</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Amenities</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBuses.map((bus) => (
                    <TableRow key={bus.id}>
                      <TableCell className="font-medium">{bus.name}</TableCell>
                      <TableCell>{bus.plateNumber}</TableCell>
                      <TableCell>{bus.model}</TableCell>
                      <TableCell>{bus.capacity} seats</TableCell>
                      <TableCell>{bus.amenities.join(", ")}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            bus.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {bus.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(bus)}>
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                            onClick={() => openDeleteDialog(bus)}
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

        {/* Edit Bus Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Bus</DialogTitle>
              <DialogDescription>Update the details of {currentBus?.name}.</DialogDescription>
            </DialogHeader>
            {currentBus && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Bus Name</Label>
                    <Input
                      id="edit-name"
                      value={currentBus.name}
                      onChange={(e) => setCurrentBus({ ...currentBus, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-plateNumber">Plate Number</Label>
                    <Input
                      id="edit-plateNumber"
                      value={currentBus.plateNumber}
                      onChange={(e) => setCurrentBus({ ...currentBus, plateNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-model">Model</Label>
                    <Select
                      value={currentBus.model}
                      onValueChange={(value) => setCurrentBus({ ...currentBus, model: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {busModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-capacity">Capacity (Seats)</Label>
                    <Input
                      id="edit-capacity"
                      type="number"
                      value={currentBus.capacity}
                      onChange={(e) => setCurrentBus({ ...currentBus, capacity: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={currentBus.status}
                      onValueChange={(value) => setCurrentBus({ ...currentBus, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Out of Service">Out of Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Amenities</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableAmenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-amenity-${amenity.id}`}
                          checked={currentBus.amenities.includes(amenity.label)}
                          onCheckedChange={() => handleCurrentBusAmenityToggle(amenity.label)}
                        />
                        <label
                          htmlFor={`edit-amenity-${amenity.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-notes">Additional Notes</Label>
                  <Textarea id="edit-notes" placeholder="Any additional information about this bus" />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditBus}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Bus Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {currentBus?.name} ({currentBus?.plateNumber}) from your fleet. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteBus} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
