"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, Route, MapPin, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Navigation items for driver dashboard - keeping only the 5 main items
const driverNavigation = [
  { name: "Dashboard", href: "/driver/dashboard", icon: BarChart3 },
  { name: "Schedule", href: "/driver/schedule", icon: Calendar },
  { name: "Routes", href: "/driver/routes", icon: Route },
  { name: "Trips", href: "/driver/trips", icon: MapPin },
  { name: "Passengers", href: "/driver/passengers", icon: Users },
]

// Sample schedule data
const scheduleData = [
  {
    id: "schedule-1",
    date: "2023-06-24",
    route: "Addis Ababa to Bahir Dar",
    departureTime: "06:00 AM",
    arrivalTime: "02:00 PM",
    bus: "ET-ABC-123",
    status: "Scheduled",
  },
  {
    id: "schedule-2",
    date: "2023-06-25",
    route: "Addis Ababa to Hawassa",
    departureTime: "07:00 AM",
    arrivalTime: "12:00 PM",
    bus: "ET-DEF-456",
    status: "Scheduled",
  },
  {
    id: "schedule-3",
    date: "2023-06-26",
    route: "Addis Ababa to Gondar",
    departureTime: "05:30 AM",
    arrivalTime: "04:30 PM",
    bus: "ET-GHI-789",
    status: "Scheduled",
  },
  {
    id: "schedule-4",
    date: "2023-06-27",
    route: "Addis Ababa to Dire Dawa",
    departureTime: "08:00 AM",
    arrivalTime: "06:00 PM",
    bus: "ET-JKL-012",
    status: "Scheduled",
  },
  {
    id: "schedule-5",
    date: "2023-06-28",
    route: "Addis Ababa to Mekelle",
    departureTime: "06:30 AM",
    arrivalTime: "05:30 PM",
    bus: "ET-MNO-345",
    status: "Scheduled",
  },
]

export default function DriverSchedulePage() {
  const [schedule, setSchedule] = useState(scheduleData)
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const { toast } = useToast()

  const viewScheduleDetails = (scheduleId: string) => {
    const scheduleItem = schedule.find((s) => s.id === scheduleId)
    setSelectedSchedule(scheduleItem)
    setIsDetailsDialogOpen(true)
  }

  const confirmSchedule = (scheduleId: string) => {
    const scheduleItem = schedule.find((s) => s.id === scheduleId)
    setSelectedSchedule(scheduleItem)
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmSchedule = () => {
    setSchedule((prev) => prev.map((s) => (s.id === selectedSchedule.id ? { ...s, status: "Confirmed" } : s)))
    setIsConfirmDialogOpen(false)
    toast({
      title: "Schedule confirmed",
      description: `You have confirmed the schedule for ${selectedSchedule.route} on ${selectedSchedule.date}.`,
    })
  }

  return (
    <PrivateRoute allowedRoles={["driver"]}>
      <DashboardLayout title="Driver Schedule" navigation={driverNavigation} userRole="driver">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Schedule for June 2023</h2>
            <div className="flex gap-2">
              <Button variant="outline">Previous Month</Button>
              <Button variant="outline">Next Month</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Bus</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="font-medium">{item.route}</TableCell>
                      <TableCell>{item.departureTime}</TableCell>
                      <TableCell>{item.arrivalTime}</TableCell>
                      <TableCell>{item.bus}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "Confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => viewScheduleDetails(item.id)}>
                            Details
                          </Button>
                          {item.status === "Scheduled" && (
                            <Button size="sm" onClick={() => confirmSchedule(item.id)}>
                              Confirm
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Details</DialogTitle>
              <DialogDescription>Complete information about your scheduled trip.</DialogDescription>
            </DialogHeader>
            {selectedSchedule && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-sm">{selectedSchedule.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Route</p>
                    <p className="text-sm">{selectedSchedule.route}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Departure Time</p>
                    <p className="text-sm">{selectedSchedule.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Arrival Time</p>
                    <p className="text-sm">{selectedSchedule.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bus</p>
                    <p className="text-sm">{selectedSchedule.bus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                    <p className="text-sm">{selectedSchedule.status}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reporting Instructions</p>
                  <p className="text-sm">
                    Please report to the bus station 30 minutes before departure time. Ensure you have your driver ID
                    and all necessary documentation.
                  </p>
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

        {/* Confirm Schedule Dialog */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Schedule</DialogTitle>
              <DialogDescription>Are you sure you want to confirm this schedule?</DialogDescription>
            </DialogHeader>
            {selectedSchedule && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-sm">{selectedSchedule.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Route</p>
                    <p className="text-sm">{selectedSchedule.route}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Departure Time</p>
                    <p className="text-sm">{selectedSchedule.departureTime}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmSchedule}>Confirm Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </PrivateRoute>
  )
}
