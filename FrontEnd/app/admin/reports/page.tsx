"use client"

import { useState } from "react"
import { CalendarIcon, Filter, BarChart3, Building, FileOutput } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ExportData } from "@/components/admin/export-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PrivateRoute } from "@/components/auth/private-route"

// Updated navigation items for admin dashboard
const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Operators", href: "/admin/operators", icon: Building },
  { name: "Reports", href: "/admin/reports", icon: FileOutput },
]

// Sample report data
const bookingReportData = [
  { id: 1, date: "2023-07-01", totalBookings: 145, revenue: 87000, completedTrips: 142, cancelledTrips: 3 },
  { id: 2, date: "2023-07-02", totalBookings: 132, revenue: 79200, completedTrips: 130, cancelledTrips: 2 },
  { id: 3, date: "2023-07-03", totalBookings: 156, revenue: 93600, completedTrips: 154, cancelledTrips: 2 },
  { id: 4, date: "2023-07-04", totalBookings: 168, revenue: 100800, completedTrips: 165, cancelledTrips: 3 },
  { id: 5, date: "2023-07-05", totalBookings: 175, revenue: 105000, completedTrips: 172, cancelledTrips: 3 },
  { id: 6, date: "2023-07-06", totalBookings: 183, revenue: 109800, completedTrips: 180, cancelledTrips: 3 },
  { id: 7, date: "2023-07-07", totalBookings: 192, revenue: 115200, completedTrips: 189, cancelledTrips: 3 },
]

const operatorReportData = [
  { id: 1, name: "Selam Bus", totalTrips: 450, totalRevenue: 270000, averageRating: 4.7, busCount: 12 },
  { id: 2, name: "Sky Bus", totalTrips: 380, totalRevenue: 228000, averageRating: 4.5, busCount: 8 },
  { id: 3, name: "Golden Bus", totalTrips: 320, totalRevenue: 192000, averageRating: 4.3, busCount: 6 },
  { id: 4, name: "Abay Bus", totalTrips: 410, totalRevenue: 246000, averageRating: 4.6, busCount: 10 },
  { id: 5, name: "Habesha Bus", totalTrips: 290, totalRevenue: 174000, averageRating: 4.2, busCount: 5 },
]

const routeReportData = [
  {
    id: 1,
    route: "Addis Ababa to Bahir Dar",
    totalTrips: 210,
    averageOccupancy: "92%",
    revenue: 252000,
    popularity: "High",
  },
  {
    id: 2,
    route: "Addis Ababa to Hawassa",
    totalTrips: 180,
    averageOccupancy: "88%",
    revenue: 144000,
    popularity: "High",
  },
  {
    id: 3,
    route: "Addis Ababa to Gondar",
    totalTrips: 150,
    averageOccupancy: "85%",
    revenue: 225000,
    popularity: "Medium",
  },
  {
    id: 4,
    route: "Addis Ababa to Mekelle",
    totalTrips: 120,
    averageOccupancy: "78%",
    revenue: 216000,
    popularity: "Low",
  },
  {
    id: 5,
    route: "Addis Ababa to Jimma",
    totalTrips: 160,
    averageOccupancy: "82%",
    revenue: 144000,
    popularity: "Medium",
  },
]

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<"7days" | "30days" | "90days" | "custom">("30days")
  const [activeTab, setActiveTab] = useState("bookings")

  // Get the appropriate data for the current tab
  const getCurrentReportData = () => {
    switch (activeTab) {
      case "bookings":
        return bookingReportData
      case "operators":
        return operatorReportData
      case "routes":
        return routeReportData
      default:
        return []
    }
  }

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <DashboardLayout title="Reports & Analytics" navigation={adminNavigation} userRole="admin">
        <div className="container mx-auto py-4">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Select defaultValue="30days" onValueChange={(value: any) => setDateRange(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>

                {dateRange === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-[240px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                )}

                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>

                <ExportData
                  data={getCurrentReportData()}
                  filename={`${activeTab}-report`}
                  title={`Export ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">ETB 1,245,670</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-500 font-medium">↑ 12.5%</span> from previous period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,642</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-500 font-medium">↑ 8.2%</span> from previous period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Operators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-500 font-medium">↑ 4.3%</span> from previous period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.7/5</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-500 font-medium">↑ 0.2</span> from previous period
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="operators">Operators</TabsTrigger>
                    <TabsTrigger value="routes">Routes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="bookings">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Total Bookings</TableHead>
                          <TableHead>Revenue (ETB)</TableHead>
                          <TableHead>Completed Trips</TableHead>
                          <TableHead>Cancelled Trips</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookingReportData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.totalBookings}</TableCell>
                            <TableCell>{row.revenue.toLocaleString()}</TableCell>
                            <TableCell>{row.completedTrips}</TableCell>
                            <TableCell>{row.cancelledTrips}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="operators">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Operator</TableHead>
                          <TableHead>Total Trips</TableHead>
                          <TableHead>Revenue (ETB)</TableHead>
                          <TableHead>Average Rating</TableHead>
                          <TableHead>Bus Count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {operatorReportData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.totalTrips}</TableCell>
                            <TableCell>{row.totalRevenue.toLocaleString()}</TableCell>
                            <TableCell>{row.averageRating}</TableCell>
                            <TableCell>{row.busCount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="routes">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Route</TableHead>
                          <TableHead>Total Trips</TableHead>
                          <TableHead>Average Occupancy</TableHead>
                          <TableHead>Revenue (ETB)</TableHead>
                          <TableHead>Popularity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {routeReportData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.route}</TableCell>
                            <TableCell>{row.totalTrips}</TableCell>
                            <TableCell>{row.averageOccupancy}</TableCell>
                            <TableCell>{row.revenue.toLocaleString()}</TableCell>
                            <TableCell>{row.popularity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  )
}
