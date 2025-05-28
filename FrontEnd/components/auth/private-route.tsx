"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"

interface PrivateRouteProps {
  children: React.ReactNode
  allowedRoles?: ("passenger" | "operator" | "driver" | "admin")[]
}

export function PrivateRoute({ children, allowedRoles = [] }: PrivateRouteProps) {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/auth?mode=login&redirect=${encodeURIComponent(pathname)}`)
    } else if (!loading && isAuthenticated && allowedRoles.length > 0) {
      if (user && !allowedRoles.includes(user.role)) {
        router.push("/")
      }
    }
  }, [isAuthenticated, loading, router, pathname, user, allowedRoles])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
