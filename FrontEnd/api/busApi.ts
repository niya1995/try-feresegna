import { apiRequest } from "./config"
import type { Bus, BusCreateRequest, BusUpdateRequest } from "./types"

// Get operator buses
export async function getOperatorBuses(): Promise<{ buses: Bus[] }> {
  return apiRequest<{ buses: Bus[] }>("/operator/buses")
}

// Create bus (operator only)
export async function createBus(data: BusCreateRequest): Promise<{ bus: Bus }> {
  return apiRequest<{ bus: Bus }>("/operator/buses", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Update bus (operator only)
export async function updateBus(id: string, data: BusUpdateRequest): Promise<{ bus: Bus }> {
  return apiRequest<{ bus: Bus }>(`/operator/buses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Delete bus (operator only)
export async function deleteBus(id: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/operator/buses/${id}`, {
    method: "DELETE",
  })
}

// Get bus by ID
export async function getBusById(id: string): Promise<{ bus: Bus }> {
  return apiRequest<{ bus: Bus }>(`/operator/buses/${id}`)
}

// Update bus status
export async function updateBusStatus(id: string, status: string): Promise<{ bus: Bus }> {
  return apiRequest<{ bus: Bus }>(`/operator/buses/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
}
