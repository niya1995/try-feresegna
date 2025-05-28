import { apiRequest } from "./config"
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  OperatorRegistrationRequest,
  DriverRegistrationRequest,
  RegistrationResponse,
} from "./types"

// User login
export async function login(data: LoginRequest): Promise<LoginResponse> {
  // Use URLSearchParams for form-urlencoded data required by backend login endpoint
  const formData = new URLSearchParams();
  formData.append("username", data.email);
  formData.append("password", data.password);
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })
}

// User registration (passenger)
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse>("/api/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Operator registration
export async function registerOperator(data: OperatorRegistrationRequest): Promise<RegistrationResponse> {
  return apiRequest<RegistrationResponse>("/api/auth/register/operator", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Driver registration
export async function registerDriver(data: DriverRegistrationRequest): Promise<RegistrationResponse> {
  return apiRequest<RegistrationResponse>("/api/auth/register/driver", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Logout
export async function logout(): Promise<void> {
  return apiRequest<void>("/api/auth/logout", {
    method: "POST",
  })
}

// Refresh token
export async function refreshToken(): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/api/auth/refresh", {
    method: "POST",
  })
}

// Forgot password
export async function forgotPassword(email: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
}

// Reset password
export async function resetPassword(token: string, password: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  })
}
