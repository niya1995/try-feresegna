"use client"

import type React from "react"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, LogOut, Moon, Sun } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { Logo } from "@/components/ui/logo"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

interface NavigationItem {
  name: string
  href: string
  icon: React.ElementType
}

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  navigation: NavigationItem[]
  userRole: "admin" | "operator" | "driver"
}

export function DashboardLayout({ children, title, navigation, userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()
  const { theme, setTheme } = useTheme()

  // Check if we're on mobile and close sidebar by default
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Set mounted to true after component mounts
    setMounted(true)

    // Check initially
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const dashboardRoot = `/${userRole}`

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition duration-200 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${sidebarOpen ? "w-64" : "w-20"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href={dashboardRoot} className="flex items-center">
              {sidebarOpen ? <Logo size="small" /> : <Logo size="icon" />}
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                      ? "bg-primary-50 text-primary dark:bg-primary-900 dark:text-primary-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${isActive
                        ? "text-primary dark:text-primary-100"
                        : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                        }`}
                    />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={logout}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 w-full"
            >
              <LogOut className="mr-3 h-5 w-5 text-red-500 dark:text-red-400" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={toggleSidebar}
                className="mr-2 md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              >
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
            </div>

            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Theme toggle */}
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Mobile overlay when sidebar is open */}
        {sidebarOpen && isMobile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar} />
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
          {mounted ? children : <div>Loading...</div>}
        </main>
      </div>
    </div>
  )
}
