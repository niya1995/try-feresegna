"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { SearchForm } from "@/components/search/search-form"
import { FilterPanel } from "@/components/search/filter-panel"
import { TripList } from "@/components/search/trip-list"
import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false) // Start with false
  const [showFilters, setShowFilters] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)

  // Get search parameters from URL
  const origin = searchParams.get("origin") || ""
  const destination = searchParams.get("destination") || ""
  const dateParam = searchParams.get("date") || ""
  const passengersParam = searchParams.get("passengers") || "1"

  // Parse date and passengers
  const date = dateParam ? new Date(dateParam) : new Date()
  const passengers = Number.parseInt(passengersParam) || 1

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 2000])
    setSelectedTimeSlots([])
    setSelectedFeatures([])
  }

  // Simulate loading trips
  useEffect(() => {
    if (origin && destination) {
      setIsLoading(true)
      setSearchPerformed(true)

      // Simulate API call with a shorter timeout
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000) // Reduced timeout for better UX

      return () => clearTimeout(timer)
    }
  }, [origin, destination]) // Removed dependencies that could cause re-renders

  return (
    <MainLayout>
      <section className="hero-gradient py-12 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white text-center mb-6">Find Your Perfect Trip</h1>
            <SearchForm
              initialOrigin={origin}
              initialDestination={destination}
              initialDate={date}
              initialPassengers={passengers}
            />
          </motion.div>

          {searchPerformed && origin && destination && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="text-white">
                  <h2 className="text-2xl font-semibold">
                    <span className="text-accent">Trips from</span> {origin} <span className="text-accent">to</span>{" "}
                    {destination}
                  </h2>
                  <p className="text-white/70 mt-1">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(date)}{" "}
                    • {passengers} {passengers === 1 ? "Passenger" : "Passengers"}
                  </p>
                </div>
                <Button
                  onClick={toggleFilters}
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-5 py-2 flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
                >
                  {showFilters ? (
                    <>
                      <X size={18} />
                      <span>Hide Filters</span>
                    </>
                  ) : (
                    <>
                      <Filter size={18} />
                      <span>Filter Results</span>
                    </>
                  )}
                </Button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FilterPanel
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedTimeSlots={selectedTimeSlots}
                    setSelectedTimeSlots={setSelectedTimeSlots}
                    selectedFeatures={selectedFeatures}
                    setSelectedFeatures={setSelectedFeatures}
                    clearFilters={clearFilters}
                  />
                </motion.div>
              )}

              <TripList
                isLoading={isLoading}
                origin={origin}
                destination={destination}
                date={date}
                priceRange={priceRange}
                selectedTimeSlots={selectedTimeSlots}
                selectedFeatures={selectedFeatures}
              />
            </motion.div>
          )}

          {(!searchPerformed || !origin || !destination) && (
            <motion.div
              className="mt-10 text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-effect max-w-2xl mx-auto p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Start Your Journey</h3>
                <p className="text-white/80 mb-6">
                  Enter your origin and destination above to search for available bus trips across Ethiopia.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-accent font-bold text-xl">30+</p>
                    <p className="text-white/70 text-sm">Cities</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-accent font-bold text-xl">100+</p>
                    <p className="text-white/70 text-sm">Routes</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-accent font-bold text-xl">50+</p>
                    <p className="text-white/70 text-sm">Bus Companies</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-accent font-bold text-xl">1000+</p>
                    <p className="text-white/70 text-sm">Daily Trips</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </MainLayout>
  )
}
