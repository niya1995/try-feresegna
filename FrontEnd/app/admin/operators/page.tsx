"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BarChart3,
  Building,
  FileOutput,
  Search,
  CheckCircle,
  XCircle,
  Plus,
  Download,
  Edit,
  Trash2,
  MapPin,
  Bus,
} from "lucide-react"

// Updated navigation items for admin dashboard
const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Operators", href: "/admin/operators", icon: Building },
  { name: "Reports", href: "/admin/reports", icon: FileOutput },
]

// Mock operators data
const mockOperators = [
  {
    id: "1",
    name: "Selam Bus",
    email: "info@selambus.com",
    phone: "+251912345678",
    address: "Bole Road, Addis Ababa",
    busCount: 12,
    routeCount: 8,
    status: "active",
    registrationDate: "2022-01-15",
    regions: ["Addis Ababa", "Amhara", "Oromia"],
    routeClusters: ["Northern Routes", "Central Routes"],
  },
  {
    id: "2",
    name: "Sky Bus",
    email: "info@skybus.com",
    phone: "+251923456789",
    address: "Meskel Square, Addis Ababa",
    busCount: 8,
    routeCount: 6,
    status: "active",
    registrationDate: "2022-03-20",
    regions: ["Addis Ababa", "SNNPR"],
    routeClusters: ["Southern Routes"],
  },
  {
    id: "3",
    name: "Golden Bus",
    email: "info@goldenbus.com",
    phone: "+251934567890",
    address: "Piazza, Addis Ababa",
    busCount: 6,
    routeCount: 5,
    status: "active",
    registrationDate: "2022-05-10",
    regions: ["Addis Ababa", "Tigray"],
    routeClusters: ["Northern Routes"],
  },
  {
    id: "4",
    name: "Abay Bus",
    email: "info@abaybus.com",
    phone: "+251945678901",
    address: "Mexico Square, Addis Ababa",
    busCount: 10,
    routeCount: 7,
    status: "active",
    registrationDate: "2022-02-05",
    regions: ["Addis Ababa", "Amhara", "Benishangul-Gumuz"],
    routeClusters: ["Western Routes", "Northern Routes"],
  },
  {
    id: "5",
    name: "Habesha Bus",
    email: "info@habeshabus.com",
    phone: "+251956789012",
    address: "Kazanchis, Addis Ababa",
    busCount: 5,
    routeCount: 4,
    status: "pending",
    registrationDate: "2023-06-30",
    regions: ["Addis Ababa", "Oromia"],
    routeClusters: ["Central Routes"],
  },
  {
    id: "6",
    name: "Ethiopia Bus",
    email: "info@ethiopiabus.com",
    phone: "+251967890123",
    address: "Megenagna, Addis Ababa",
    busCount: 0,
    routeCount: 0,
    status: "pending",
    registrationDate: "2023-07-05",
    regions: [],
    routeClusters: [],
  },
]

// Available regions in Ethiopia
const ethiopianRegions = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "SNNPR",
  "Tigray",
]

// Route clusters
const routeClusters = ["Northern Routes", "Southern Routes", "Eastern Routes", "Western Routes", "Central Routes"]

export default function AdminOperatorsPage() {
  const [operators, setOperators] = useState(mockOperators)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [currentOperator, setCurrentOperator] = useState<any>(null)
  const [newOperator, setNewOperator] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    regions: [] as string[],
    routeClusters: [] as string[],
    password: "",
    confirmPassword: "",
  })
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedRouteClusters, setSelectedRouteClusters] = useState<string[]>([])

  // Filter operators based on search query and status filter
  const filteredOperators = operators.filter((operator) => {
    const searchMatch =
      searchQuery === "" ||
      operator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchQuery.toLowerCase())

    const statusMatch = statusFilter === null || operator.status === statusFilter

    return searchMatch && statusMatch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return null
    }
  }

  const handleAddOperator = () => {
    // Validate passwords
    if (newOperator.password !== newOperator.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (newOperator.password.length < 6) {
      alert("Password must be at least 6 characters long")
      return
    }

    const newId = (operators.length + 1).toString()
    const operatorToAdd = {
      id: newId,
      ...newOperator,
      busCount: 0,
      routeCount: 0,
      status: "pending",
      registrationDate: new Date().toISOString().split("T")[0],
    }
    setOperators([...operators, operatorToAdd])
    setNewOperator({
      name: "",
      email: "",
      phone: "",
      address: "",
      regions: [],
      routeClusters: [],
      password: "",
      confirmPassword: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditOperator = () => {
    if (!currentOperator) return

    const updatedOperators = operators.map((op) => (op.id === currentOperator.id ? { ...currentOperator } : op))

    setOperators(updatedOperators)
    setIsEditDialogOpen(false)
  }

  const handleDeleteOperator = (id: string) => {
    if (confirm("Are you sure you want to delete this operator?")) {
      setOperators(operators.filter((op) => op.id !== id))
    }
  }

  const handleAssignAccess = () => {
    if (!currentOperator) return

    const updatedOperator = {
      ...currentOperator,
      regions: selectedRegions,
      routeClusters: selectedRouteClusters,
    }

    const updatedOperators = operators.map((op) => (op.id === currentOperator.id ? updatedOperator : op))

    setOperators(updatedOperators)
    setIsAssignDialogOpen(false)
  }

  const openEditDialog = (operator: any) => {
    setCurrentOperator(operator)
    setIsEditDialogOpen(true)
  }

  const openAssignDialog = (operator: any) => {
    setCurrentOperator(operator)
    setSelectedRegions(operator.regions || [])
    setSelectedRouteClusters(operator.routeClusters || [])
    setIsAssignDialogOpen(true)
  }

  const handleApproveOperator = (id: string) => {
    const updatedOperators = operators.map((op) => (op.id === id ? { ...op, status: "active" } : op))
    setOperators(updatedOperators)
  }

  const handleSuspendOperator = (id: string) => {
    const updatedOperators = operators.map((op) => (op.id === id ? { ...op, status: "suspended" } : op))
    setOperators(updatedOperators)
  }

  const handleRejectOperator = (id: string) => {
    if (confirm("Are you sure you want to reject this operator?")) {
      setOperators(operators.filter((op) => op.id !== id))
    }
  }

  const exportToCSV = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Address",
      "Status",
      "Registration Date",
      "Regions",
      "Route Clusters",
    ]
    const csvRows = [headers]

    filteredOperators.forEach((op) => {
      csvRows.push([
        op.id,
        op.name,
        op.email,
        op.phone,
        op.address,
        op.status,
        op.registrationDate,
        op.regions?.join(", ") || "",
        op.routeClusters?.join(", ") || "",
      ])
    })

    const csvContent = csvRows.map((row) => row.join(",")).join("\n")

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "operators.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <DashboardLayout title="Manage Operators" navigation={adminNavigation} userRole="admin">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <Button variant={statusFilter === null ? "default" : "outline"} onClick={() => setStatusFilter(null)}>
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              onClick={() => setStatusFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "suspended" ? "default" : "outline"}
              onClick={() => setStatusFilter("suspended")}
            >
              Suspended
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search operators..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Operator
            </Button>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredOperators.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Bus className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Operators Found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  No operators match your search criteria. Try adjusting your filters or search query.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOperators.map((operator) => (
              <Card key={operator.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{operator.name}</CardTitle>
                  {getStatusBadge(operator.status)}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Contact</div>
                      <div className="font-medium">{operator.email}</div>
                      <div className="text-sm">{operator.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <div className="font-medium">{operator.address}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Registration Date</div>
                      <div className="font-medium">{operator.registrationDate}</div>
                    </div>
                  </div>

                  {(operator.regions?.length > 0 || operator.routeClusters?.length > 0) && (
                    <div className="mb-4">
                      {operator.regions?.length > 0 && (
                        <div className="mb-2">
                          <div className="text-sm text-gray-500 mb-1">Assigned Regions</div>
                          <div className="flex flex-wrap gap-1">
                            {operator.regions.map((region) => (
                              <Badge
                                key={region}
                                variant="outline"
                                className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              >
                                <MapPin className="h-3 w-3 mr-1" />
                                {region}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {operator.routeClusters?.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Route Clusters</div>
                          <div className="flex flex-wrap gap-1">
                            {operator.routeClusters.map((cluster) => (
                              <Badge
                                key={cluster}
                                variant="outline"
                                className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              >
                                <Bus className="h-3 w-3 mr-1" />
                                {cluster}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex space-x-4 mb-4 md:mb-0">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{operator.busCount}</div>
                        <div className="text-sm text-gray-500">Buses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{operator.routeCount}</div>
                        <div className="text-sm text-gray-500">Routes</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(operator)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openAssignDialog(operator)}>
                        <MapPin className="h-4 w-4 mr-1" />
                        Assign Access
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                        onClick={() => handleDeleteOperator(operator.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>

                      {operator.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleApproveOperator(operator.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleRejectOperator(operator.id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {operator.status === "active" && (
                        <Button variant="destructive" size="sm" onClick={() => handleSuspendOperator(operator.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add Operator Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Operator</DialogTitle>
              <DialogDescription>Enter the details for the new bus operator.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={newOperator.name}
                    onChange={(e) => setNewOperator({ ...newOperator, name: e.target.value })}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newOperator.email}
                    onChange={(e) => setNewOperator({ ...newOperator, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newOperator.phone}
                    onChange={(e) => setNewOperator({ ...newOperator, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newOperator.address}
                    onChange={(e) => setNewOperator({ ...newOperator, address: e.target.value })}
                    placeholder="Enter address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newOperator.password}
                    onChange={(e) => setNewOperator({ ...newOperator, password: e.target.value })}
                    placeholder="Enter password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={newOperator.confirmPassword}
                    onChange={(e) => setNewOperator({ ...newOperator, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <Tabs defaultValue="regions">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="regions">Regions</TabsTrigger>
                  <TabsTrigger value="routes">Route Clusters</TabsTrigger>
                </TabsList>
                <TabsContent value="regions" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {ethiopianRegions.map((region) => (
                      <div key={region} className="flex items-center space-x-2">
                        <Checkbox
                          id={`region-${region}`}
                          checked={newOperator.regions.includes(region)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewOperator({
                                ...newOperator,
                                regions: [...newOperator.regions, region],
                              })
                            } else {
                              setNewOperator({
                                ...newOperator,
                                regions: newOperator.regions.filter((r) => r !== region),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`region-${region}`}>{region}</Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="routes" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {routeClusters.map((cluster) => (
                      <div key={cluster} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cluster-${cluster}`}
                          checked={newOperator.routeClusters.includes(cluster)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewOperator({
                                ...newOperator,
                                routeClusters: [...newOperator.routeClusters, cluster],
                              })
                            } else {
                              setNewOperator({
                                ...newOperator,
                                routeClusters: newOperator.routeClusters.filter((c) => c !== cluster),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`cluster-${cluster}`}>{cluster}</Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddOperator}>Add Operator</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Operator Dialog */}
        {currentOperator && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Operator</DialogTitle>
                <DialogDescription>Update the details for {currentOperator.name}.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Company Name</Label>
                    <Input
                      id="edit-name"
                      value={currentOperator.name}
                      onChange={(e) => setCurrentOperator({ ...currentOperator, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={currentOperator.email}
                      onChange={(e) => setCurrentOperator({ ...currentOperator, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input
                      id="edit-phone"
                      value={currentOperator.phone}
                      onChange={(e) => setCurrentOperator({ ...currentOperator, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-address">Address</Label>
                    <Input
                      id="edit-address"
                      value={currentOperator.address}
                      onChange={(e) => setCurrentOperator({ ...currentOperator, address: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentOperator.status}
                    onValueChange={(value) => setCurrentOperator({ ...currentOperator, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditOperator}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Assign Access Dialog */}
        {currentOperator && (
          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Assign Access</DialogTitle>
                <DialogDescription>
                  Assign regional access and route clusters for {currentOperator.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Tabs defaultValue="regions">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="regions">Regions</TabsTrigger>
                    <TabsTrigger value="routes">Route Clusters</TabsTrigger>
                  </TabsList>
                  <TabsContent value="regions" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {ethiopianRegions.map((region) => (
                        <div key={region} className="flex items-center space-x-2">
                          <Checkbox
                            id={`assign-region-${region}`}
                            checked={selectedRegions.includes(region)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRegions([...selectedRegions, region])
                              } else {
                                setSelectedRegions(selectedRegions.filter((r) => r !== region))
                              }
                            }}
                          />
                          <Label htmlFor={`assign-region-${region}`}>{region}</Label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="routes" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {routeClusters.map((cluster) => (
                        <div key={cluster} className="flex items-center space-x-2">
                          <Checkbox
                            id={`assign-cluster-${cluster}`}
                            checked={selectedRouteClusters.includes(cluster)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRouteClusters([...selectedRouteClusters, cluster])
                              } else {
                                setSelectedRouteClusters(selectedRouteClusters.filter((c) => c !== cluster))
                              }
                            }}
                          />
                          <Label htmlFor={`assign-cluster-${cluster}`}>{cluster}</Label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignAccess}>Save Assignments</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DashboardLayout>
    </PrivateRoute>
  )
}
