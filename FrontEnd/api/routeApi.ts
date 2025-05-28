import { apiRequest } from "./config"
import type { Route, RouteCreateRequest, RouteUpdateRequest } from "./types"

// Get all routes
export async function getAllRoutes(): Promise<{ routes: Route[] }> {
  return apiRequest<{ routes: Route[] }>("/routes")
}

// Get popular routes
export async function getPopularRoutes(): Promise<{ routes: Route[] }> {
  return apiRequest<{ routes: Route[] }>("/routes/popular")
}

// Get route by ID
export async function getRouteById(id: string): Promise<{ route: Route }> {
  return apiRequest<{ route: Route }>(`/routes/${id}`)
}

// Create route (admin only)
export async function createRoute(data: RouteCreateRequest): Promise<{ route: Route }> {
  return apiRequest<{ route: Route }>("/admin/routes", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Update route (admin only)
export async function updateRoute(id: string, data: RouteUpdateRequest): Promise<{ route: Route }> {
  return apiRequest<{ route: Route }>(`/admin/routes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Delete route (admin only)
export async function deleteRoute(id: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/admin/routes/${id}`, {
    method: "DELETE",
  })
}

// Get operator routes
export async function getOperatorRoutes(): Promise<{ routes: Route[] }> {
  return apiRequest<{ routes: Route[] }>("/operator/routes")
}
