"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { PopularRoutes } from "@/components/home/popular-routes"
import { PopularTrips } from "@/components/home/popular-trips"
import { Testimonials } from "@/components/home/testimonials"
import { CTASection } from "@/components/home/cta-section"
import { AppPromotion } from "@/components/home/app-promotion"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and redirect if needed
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("feresegna_user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          // If user is admin, operator, or driver, redirect to their dashboard
          if (parsedUser.role === "admin") {
            router.push("/admin/dashboard")
          } else if (parsedUser.role === "operator") {
            router.push("/operator/dashboard")
          } else if (parsedUser.role === "driver") {
            router.push("/driver/dashboard")
          }
        } catch (error) {
          console.error("Error parsing user data:", error)
        }
      }
    }
  }, [router])

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 dark:from-gray-900 dark:to-gray-800">
        <Hero />
      </div>
      <div className="bg-gray-50 dark:bg-gray-900">
        <Features />
      </div>
      <div className="bg-white dark:bg-gray-800">
        <HowItWorks />
      </div>
      <div className="bg-gray-50 dark:bg-gray-900">
        <PopularRoutes />
      </div>
      <div className="bg-white dark:bg-gray-800">
        <PopularTrips />
      </div>
      <div className="bg-gray-50 dark:bg-gray-900">
        <Testimonials />
      </div>
      <div className="bg-white dark:bg-gray-800">
        <AppPromotion />
      </div>
      <div className="bg-primary dark:bg-gray-900">
        <CTASection />
      </div>
    </MainLayout>
  )
}
