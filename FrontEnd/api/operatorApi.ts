import { apiRequest } from "./config"
import type {
  Operator,
  OperatorCreateRequest,
  OperatorUpdateRequest,
  OperatorAssignAccessRequest,
  OperatorListResponse,
  SearchParams,
} from "./types"

// Get all operators (admin only)
export async function getAllOperators(params?: SearchParams): Promise<OperatorListResponse> {
  const searchParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })
  }

  const queryString = searchParams.toString()
  return apiRequest<OperatorListResponse>(`/admin/operators${queryString ? `?${queryString}` : ""}`)
}

// Create operator (admin only)
export async function createOperator(data: OperatorCreateRequest): Promise<{ operator: Operator }> {
  return apiRequest<{ operator: Operator }>("/admin/operators", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Update operator (admin only)
export async function updateOperator(id: string, data: OperatorUpdateRequest): Promise<{ operator: Operator }> {
  return apiRequest<{ operator: Operator }>(`/admin/operators/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Delete operator (admin only)
export async function deleteOperator(id: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/admin/operators/${id}`, {
    method: "DELETE",
  })
}

// Approve operator (admin only)
export async function approveOperator(id: string): Promise<{ operator: Operator }> {
  return apiRequest<{ operator: Operator }>(`/admin/operators/${id}/approve`, {
    method: "PATCH",
  })
}

// Suspend operator (admin only)
export async function suspendOperator(id: string): Promise<{ operator: Operator }> {
  return apiRequest<{ operator: Operator }>(`/admin/operators/${id}/suspend`, {
    method: "PATCH",
  })
}

// Assign access to operator (admin only)
export async function assignOperatorAccess(
  id: string,
  data: OperatorAssignAccessRequest,
): Promise<{ operator: Operator }> {
  return apiRequest<{ operator: Operator }>(`/admin/operators/${id}/assign-access`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Get operator profile
export async function getOperatorProfile(): Promise<{ operator: Operator }> {
  return apiRequest<{ operator: Operator }>("/operator/profile")
}

// Update operator profile
export async function updateOperatorProfile(data: Partial<OperatorUpdateRequest>): Promise<{ operator: Operator }> {
  return apiRequest<{ operator: Operator }>("/operator/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// Export operators data (admin only)
export async function exportOperatorsData(format: "csv" | "excel" = "csv"): Promise<Blob> {
  const response = await fetch(`/api/admin/export/operators?format=${format}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to export operators data")
  }

  return response.blob()
}
