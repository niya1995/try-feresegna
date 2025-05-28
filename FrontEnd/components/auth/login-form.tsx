"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

interface LoginFormProps {
  onSwitchToRegister: () => void
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please fill in all fields")
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // The login function will handle all redirections based on user role
      await login(email, password)
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      })
      // No redirection here - it's handled in the auth context
    } catch (error) {
      console.error("Login error:", error)
      setError("Invalid email or password. Please check your credentials and try again.")
      toast({
        title: "Error",
        description: "Invalid email or password. Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <span className="text-2xl font-bold text-primary">Feresegna</span>
          <span className="text-2xl font-bold text-accent ml-1">Bus</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Sign In</h2>
        <p className="text-blue-100 mt-2">Welcome back! Please sign in to continue.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Link href="/auth/forgot-password" className="text-sm text-blue-300 hover:text-blue-200">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-blue-100">
            Remember me
          </label>
        </div>

        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-blue-100">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={onSwitchToRegister} className="text-accent hover:text-accent/90 font-medium">
            Register
          </button>
        </p>
      </div>

      <div className="text-center text-blue-100 text-sm space-y-2">
        <p>
          <strong>Note:</strong> Only passengers can register directly.
        </p>
        <p>Bus operators are registered by administrators.</p>
        <p>Drivers are registered by their bus operators.</p>
      </div>

      <div className="text-center text-blue-100 text-sm">
        <p className="font-semibold mb-1">Demo accounts:</p>
        <div className="grid grid-cols-1 gap-1">
          <div className="bg-blue-900/30 p-1 rounded">passenger@example.com / password</div>
          <div className="bg-blue-900/30 p-1 rounded">operator@example.com / password</div>
          <div className="bg-blue-900/30 p-1 rounded">driver@example.com / password</div>
          <div className="bg-blue-900/30 p-1 rounded">admin@example.com / password</div>
        </div>
      </div>
    </div>
  )
}
