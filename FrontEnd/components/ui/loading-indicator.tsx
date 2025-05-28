"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = typeof window !== 'undefined' ? usePathname() : null;
  const searchParams = typeof window !== 'undefined' ? useSearchParams() : null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStart = () => setIsLoading(true)
      const handleComplete = () => setIsLoading(false)

      // Add event listeners for route changes
      window.addEventListener("beforeunload", handleStart)
      window.addEventListener("load", handleComplete)

      return () => {
        window.removeEventListener("beforeunload", handleStart)
        window.removeEventListener("load", handleComplete)
      }
    }
  }, [])

  // Reset loading state when the route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(false)
    }
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-primary-50">
      <div className="h-full bg-primary animate-progress-bar" style={{ width: "0%" }} />
    </div>
  )
}
