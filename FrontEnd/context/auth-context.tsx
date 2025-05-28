"use client"

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authApi, type User } from "@/lib/api-service"

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Load user data on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        try {
          const token = localStorage.getItem("feresegna_token")
          const storedUser = localStorage.getItem("feresegna_user")

          if (token && storedUser) {
            // Verify token is still valid by fetching current user
            try {
              const currentUser = await authApi.getCurrentUser()
              setUser(currentUser)

              // Update stored user data
              localStorage.setItem("feresegna_user", JSON.stringify(currentUser))

              // Handle redirects based on role
              if (pathname === "/" || pathname === "/auth") {
                if (currentUser.role === "admin") {
                  router.push("/admin/dashboard")
                } else if (currentUser.role === "operator") {
                  router.push("/operator/dashboard")
                } else if (currentUser.role === "driver") {
                  router.push("/driver/dashboard")
                }
              }
            } catch (error) {
              // Token is invalid, clear auth data
              console.error("Token validation failed:", error)
              localStorage.removeItem("feresegna_token")
              localStorage.removeItem("feresegna_user")
            }
          }
        } catch (error) {
          console.error("Auth initialization error:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    initializeAuth()
  }, [router, pathname])

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      try {
        const response = await authApi.login(email, password)
        setUser(response.user)

        // Redirect based on user role
        if (response.user.role === "admin") {
          router.push("/admin/dashboard")
        } else if (response.user.role === "operator") {
          router.push("/operator/dashboard")
        } else if (response.user.role === "driver") {
          router.push("/driver/dashboard")
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("Login failed:", error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
    setUser(null)
    router.push("/")
  }, [router])

  const register = useCallback(
    async (userData: any) => {
      setLoading(true)
      try {
        const response = await authApi.register(userData)
        setUser(response.user)
        router.push("/")
      } catch (error) {
        console.error("Registration failed:", error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
      register,
    }),
    [user, loading, login, logout, register],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
