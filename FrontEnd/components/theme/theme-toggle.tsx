"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
  size?: "default" | "sm" | "lg"
}

export function ThemeToggle({ size = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the toggle after component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16
      case "lg":
        return 24
      default:
        return 20
    }
  }

  const getButtonSize = () => {
    switch (size) {
      case "sm":
        return "sm"
      case "lg":
        return "lg"
      default:
        return "default"
    }
  }

  const iconSize = getIconSize()
  const buttonSize = getButtonSize()

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="w-10 h-10" /> // Placeholder with similar dimensions
  }

  return (
    <Button
      variant="ghost"
      size={buttonSize as any}
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
    </Button>
  )
}
