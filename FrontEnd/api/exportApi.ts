import { getAuthHeaders } from "./config"

// Export bookings data
export async function exportBookingsData(format: "csv" | "excel" = "csv"): Promise<Blob> {
  const response = await fetch(`/api/admin/export/bookings?format=${format}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to export bookings data")
  }

  return response.blob()
}

// Export passengers data
export async function exportPassengersData(format: "csv" | "excel" = "csv"): Promise<Blob> {
  const response = await fetch(`/api/admin/export/passengers?format=${format}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to export passengers data")
  }

  return response.blob()
}

// Export routes data
export async function exportRoutesData(format: "csv" | "excel" = "csv"): Promise<Blob> {
  const response = await fetch(`/api/admin/export/routes?format=${format}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to export routes data")
  }

  return response.blob()
}

// Export operator report
export async function exportOperatorReport(operatorId: string, format: "csv" | "excel" = "csv"): Promise<Blob> {
  const response = await fetch(`/api/operator/export/report?format=${format}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to export operator report")
  }

  return response.blob()
}
