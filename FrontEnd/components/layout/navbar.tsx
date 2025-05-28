"use client"

import { useState, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { NotificationBell } from "@/components/layout/notification-bell"

// Memoize the navbar to prevent unnecessary re-renders
export const Navbar = memo(function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Routes", href: "/routes" },
    { name: "Contact", href: "/contact" },
    { name: "Help", href: "/help" },
  ]

  const isActive = useCallback(
    (path: string) => {
      return pathname === path
    },
    [pathname],
  )

  // Prefetch all main navigation links
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-3" onClick={closeMenu} prefetch={true}>
              <img src="/images/logo.png" alt="Feresegna Bus" className="h-12 w-auto" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">Feresegna</span>
            </Link>
          </div>

          {/* Centered Navigation Links - Desktop */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-base font-medium ${
                    isActive(link.href)
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                  }`}
                  onClick={closeMenu}
                  prefetch={true}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Auth, Theme, Notifications */}
          <div className="hidden md:flex items-center space-x-5">
            {isAuthenticated && <NotificationBell />}
            <ThemeToggle size="lg" />
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                  <span>{user?.name}</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200 dark:border-gray-700">
                  {user?.role === "passenger" && (
                    <>
                      <Link
                        href="/my-bookings"
                        className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        prefetch={true}
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        prefetch={true}
                      >
                        Profile
                      </Link>
                    </>
                  )}
                  {user?.role === "operator" && (
                    <Link
                      href="/operator/dashboard"
                      className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      prefetch={true}
                    >
                      Operator Dashboard
                    </Link>
                  )}
                  {user?.role === "driver" && (
                    <Link
                      href="/driver/dashboard"
                      className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      prefetch={true}
                    >
                      Driver Dashboard
                    </Link>
                  )}
                  {user?.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      prefetch={true}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-base text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/auth?mode=login" prefetch={true}>
                  <Button variant="ghost" size="lg" className="text-base">
                    Login
                  </Button>
                </Link>
                <Link href="/auth?mode=register" prefetch={true}>
                  <Button size="lg" className="text-base">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {isAuthenticated && <NotificationBell />}
            <ThemeToggle size="lg" />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-lg font-medium ${
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                }`}
                onClick={closeMenu}
                prefetch={true}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {isAuthenticated ? (
              <div className="px-2 space-y-1">
                <div className="px-3 py-2 text-lg font-medium text-gray-800 dark:text-gray-200">{user?.name}</div>
                {user?.role === "passenger" && (
                  <>
                    <Link
                      href="/my-bookings"
                      className="block px-3 py-2 rounded-md text-lg font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                      onClick={closeMenu}
                      prefetch={true}
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded-md text-lg font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                      onClick={closeMenu}
                      prefetch={true}
                    >
                      Profile
                    </Link>
                  </>
                )}
                {user?.role === "operator" && (
                  <Link
                    href="/operator/dashboard"
                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                    onClick={closeMenu}
                    prefetch={true}
                  >
                    Operator Dashboard
                  </Link>
                )}
                {user?.role === "driver" && (
                  <Link
                    href="/driver/dashboard"
                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                    onClick={closeMenu}
                    prefetch={true}
                  >
                    Driver Dashboard
                  </Link>
                )}
                {user?.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                    onClick={closeMenu}
                    prefetch={true}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-lg font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <Link
                  href="/auth?mode=login"
                  className="block px-3 py-2 rounded-md text-lg font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                  onClick={closeMenu}
                  prefetch={true}
                >
                  Login
                </Link>
                <Link
                  href="/auth?mode=register"
                  className="block px-3 py-2 rounded-md text-lg font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                  onClick={closeMenu}
                  prefetch={true}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
})
