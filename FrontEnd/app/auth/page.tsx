"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useAuth } from "@/context/auth-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, user } = useAuth()

  const [mode, setMode] = useState<"login" | "register">("login")

  useEffect(() => {
    // If authenticated, redirect based on role
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else if (user.role === "operator") {
        router.push("/operator/dashboard")
      } else if (user.role === "driver") {
        router.push("/driver/dashboard")
      } else {
        router.push("/")
      }
    }

    const modeParam = searchParams.get("mode")
    if (modeParam === "login" || modeParam === "register") {
      setMode(modeParam)
    }
  }, [isAuthenticated, router, searchParams, user])

  const handleSwitchMode = (newMode: "login" | "register") => {
    setMode(newMode)
    // Update URL without full page reload
    const params = new URLSearchParams(searchParams)
    params.set("mode", newMode)
    router.push(`/auth?${params.toString()}`)
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass-effect p-8 rounded-xl w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        {mode === "login" ? (
          <LoginForm onSwitchToRegister={() => handleSwitchMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => handleSwitchMode("login")} />
        )}
      </div>
    </div>
  )
}
