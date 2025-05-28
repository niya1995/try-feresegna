"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { AdminDashboardStats } from "@/components/admin/dashboard-stats"
import { AdminRecentBookings } from "@/components/admin/recent-bookings"
import { AdminRevenueChart } from "@/components/admin/revenue-chart"
import { AdminPopularRoutes } from "@/components/admin/popular-routes"
import { BarChart3, Building, FileOutput } from "lucide-react"

// Updated navigation items for admin dashboard
const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Operators", href: "/admin/operators", icon: Building },
  { name: "Reports", href: "/admin/reports", icon: FileOutput },
]

export default function AdminDashboardPage() {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <DashboardLayout title="Admin Dashboard" navigation={adminNavigation} userRole="admin">
        <div className="space-y-6">
          <AdminDashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminRevenueChart />
            <AdminPopularRoutes />
          </div>

          <AdminRecentBookings />
        </div>
      </DashboardLayout>
    </PrivateRoute>
  )
}
