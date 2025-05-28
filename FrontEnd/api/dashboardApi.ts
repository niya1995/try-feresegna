import { apiRequest } from "./config"
import type { AdminDashboardStats, OperatorDashboardStats, DriverDashboardStats } from "./types"

// Get admin dashboard stats
export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  return apiRequest<AdminDashboardStats>("/admin/dashboard/stats")
}

// Get operator dashboard stats
export async function getOperatorDashboardStats(): Promise<OperatorDashboardStats> {
  return apiRequest<OperatorDashboardStats>("/operator/dashboard/stats")
}

// Get driver dashboard stats
export async function getDriverDashboardStats(): Promise<DriverDashboardStats> {
  return apiRequest<DriverDashboardStats>("/driver/dashboard/stats")
}

// Get admin revenue chart data
export async function getAdminRevenueChart(period: "week" | "month" | "year" = "month"): Promise<{
  labels: string[]
  data: number[]
}> {
  return apiRequest(`/admin/dashboard/revenue?period=${period}`)
}

// Get operator revenue chart data
export async function getOperatorRevenueChart(period: "week" | "month" | "year" = "month"): Promise<{
  labels: string[]
  data: number[]
}> {
  return apiRequest(`/operator/dashboard/revenue?period=${period}`)
}
