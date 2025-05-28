"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const ethiopianCities = [
  "Addis Ababa",
  "Adama",
  "Gondar",
  "Mekelle",
  "Hawassa",
  "Bahir Dar",
  "Dire Dawa",
  "Dessie",
  "Jimma",
  "Jijiga",
  "Shashamane",
  "Bishoftu",
  "Sodo",
  "Arba Minch",
  "Hosaena",
  "Harar",
  "Dilla",
  "Nekemte",
  "Debre Birhan",
  "Asella",
]

export function Hero() {
  const router = useRouter()
  const { theme } = useTheme()
  const [origin, setOrigin] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [passengers, setPassengers] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isAnimated, setIsAnimated] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsAnimated(true)
    setMounted(true)
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!origin || !destination) {
      setError("Please enter both origin and destination")
      return
    }

    if (origin.toLowerCase() === destination.toLowerCase()) {
      setError("Origin and destination cannot be the same")
      return
    }

    setIsSearching(true)

    try {
      const searchParams = new URLSearchParams({
        origin,
        destination,
        date,
        passengers: passengers.toString(),
      })

      setTimeout(() => {
        setIsSearching(false)
        router.push(`/search?${searchParams.toString()}`)
      }, 500)
    } catch (err) {
      setIsSearching(false)
      setError("An error occurred while searching. Please try again.")
      console.error("Search error:", err)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const popularDestinations = [
    { from: "Addis Ababa", to: "Bahir Dar" },
    { from: "Addis Ababa", to: "Hawassa" },
    { from: "Addis Ababa", to: "Gondar" },
    { from: "Bahir Dar", to: "Addis Ababa" },
  ]

  const today = new Date().toISOString().split("T")[0]

  // Use a consistent gradient class regardless of theme
  const gradientClass = "bg-gradient-to-br from-primary-800 via-primary-900 to-primary-900"

  return (
    <section className="relative overflow-hidden">
      <div className={`absolute inset-0 ${gradientClass}`}>
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-white/5 animate-pulse blur-3xl" />
        <div
          className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-white/5 animate-pulse blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center md:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              Travel Smarter, Not Harder
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto md:mx-0 font-light"
            >
              Book bus tickets easily, track your journey in real-time, and enjoy comfortable travel with Feresegna Bus.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              <Link href="/search">
                <Button
                  className="bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide"
                  size="lg"
                >
                  Book Your Trip
                </Button>
              </Link>
              <Link href="/routes">
                <Button
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 uppercase tracking-wide"
                  size="lg"
                  variant="outline"
                >
                  Explore Routes
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            className="max-w-xl mx-auto w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 md:p-8"
          >
            <form onSubmit={handleSearch} className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Find Your Journey</h2>

              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor="origin" className="block text-sm font-medium text-white mb-2">
                    From
                  </Label>
                  <Select onValueChange={(value) => setOrigin(value)} value={origin}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent>
                      {ethiopianCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Label htmlFor="destination" className="block text-sm font-medium text-white mb-2">
                    To
                  </Label>
                  <Select onValueChange={(value) => setDestination(value)} value={destination}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select destination city" />
                    </SelectTrigger>
                    <SelectContent>
                      {ethiopianCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="block text-sm font-medium text-white mb-2">
                      Date
                    </Label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                        size={18}
                      />
                      <Input
                        id="date"
                        type="date"
                        min={today}
                        className="pl-10 w-full bg-white/10 border-white/20 text-white"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="passengers" className="block text-sm font-medium text-white mb-2">
                      Passengers
                    </Label>
                    <Select
                      onValueChange={(value) => setPassengers(Number.parseInt(value))}
                      value={passengers.toString()}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="1 Passenger" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Passenger" : "Passengers"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-sm p-3 rounded-md bg-red-900/30"
                >
                  {error}
                </motion.div>
              )}

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-10 rounded-lg transition-all duration-300 shadow-lg w-full md:w-auto"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={20} className="mr-2" />
                      Search Trips
                    </>
                  )}
                </Button>
              </div>
            </form>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6">
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="font-medium text-white/80">Popular routes:</span>
                {popularDestinations.map((route, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setOrigin(route.from)
                      setDestination(route.to)
                    }}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
                  >
                    {route.from} → {route.to}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
