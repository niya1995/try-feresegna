"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Lock, Phone, FileText, Calendar, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface DriverRegistrationFormProps {
  onSwitchToLogin: () => void
  onSwitchType: (type: "passenger" | "operator" | "driver") => void
}

export function DriverRegistrationForm({ onSwitchToLogin, onSwitchType }: DriverRegistrationFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [licenseExpiry, setLicenseExpiry] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !email || !phone || !licenseNumber || !licenseExpiry || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Registration Submitted",
        description: "Your driver registration has been submitted for review. We will contact you soon.",
      })
      router.push("/auth?mode=login")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
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
        <h2 className="text-2xl font-bold text-white">Driver Registration</h2>
        <p className="text-blue-100 mt-2">Register as a bus driver</p>
      </div>

      <div className="flex justify-center space-x-2 mb-4">
        <Button
          type="button"
          variant="outline"
          className="bg-transparent border-white/20 text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => onSwitchType("passenger")}
        >
          Passenger
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bg-transparent border-white/20 text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => onSwitchType("operator")}
        >
          Operator
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bg-white/10 border-white/20 text-white"
          onClick={() => onSwitchType("driver")}
        >
          Driver
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full-name" className="text-white">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="full-name"
              placeholder="Your full name"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
          <Label htmlFor="license-number" className="text-white">
            Driver License Number
          </Label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="license-number"
              placeholder="License number"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="license-expiry" className="text-white">
            License Expiry Date
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="license-expiry"
              type="date"
              className="pl-10 bg-white/10 border-white/20 text-white"
              value={licenseExpiry}
              onChange={(e) => setLicenseExpiry(e.target.value)}
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
          {isLoading ? "Submitting..." : "Submit for Review"}
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
