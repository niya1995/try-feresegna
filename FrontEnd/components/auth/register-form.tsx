"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter()
  const { register } = useAuth()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields")
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await register({ name, email, phone, password })
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      })
      router.push("/")
    } catch (error) {
      console.error("Registration error:", error)
      setError("Failed to create account. Please try again.")
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
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
        <h2 className="text-2xl font-bold text-white">Create Passenger Account</h2>
        <p className="text-blue-100 mt-2">Register as a passenger to book bus tickets</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="name"
              placeholder="John Doe"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

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
          <Label htmlFor="phone" className="text-white">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="phone"
              placeholder="+251 912 345 678"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
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

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-white">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-blue-100">
            I agree to the{" "}
            <a href="/terms" className="text-accent hover:text-accent/90">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-accent hover:text-accent/90">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-blue-100">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin} className="text-accent hover:text-accent/90 font-medium">
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}
