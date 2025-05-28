"use client"

import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"

interface LogoProps {
  size?: "small" | "medium" | "large" | "icon"
}

export function Logo({ size = "medium" }: LogoProps) {
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the logo
  useEffect(() => {
    setMounted(true)
  }, [])

  // Define sizes for different variants
  const sizes = {
    icon: { width: 32, height: 32 },
    small: { width: 120, height: 32 },
    medium: { width: 150, height: 40 },
    large: { width: 180, height: 48 },
  }

  const { width, height } = sizes[size]

  // If not mounted yet, show a placeholder to avoid hydration mismatch
  if (!mounted) {
    return <div style={{ width, height }} />
  }

  // Use the same logo regardless of theme
  const logoSrc = "/images/logo.png"

  // Fallback to a placeholder if the logo doesn't exist
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "/feresegna-bus.png"
    target.onerror = null // Prevent infinite loop
  }

  return (
    <Image
      src={logoSrc || "/placeholder.svg"}
      alt="Feresegna Bus Logo"
      width={width}
      height={height}
      priority
      className="object-contain"
      onError={handleImageError}
    />
  )
}
