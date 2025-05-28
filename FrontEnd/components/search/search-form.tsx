"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Users, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format, addDays } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { locationApi } from "@/lib/api-service"

interface SearchFormProps {
  initialOrigin?: string
  initialDestination?: string
  initialDate?: Date
  initialPassengers?: number
}

export function SearchForm({
  initialOrigin = "",
  initialDestination = "",
  initialDate = new Date(),
  initialPassengers = 1,
}: SearchFormProps) {
  const router = useRouter()
  const [origin, setOrigin] = useState(initialOrigin)
  const [destination, setDestination] = useState(initialDestination)
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [passengers, setPassengers] = useState(initialPassengers)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [showExampleTooltip, setShowExampleTooltip] = useState(true)
  const [cities, setCities] = useState<string[]>([])
  const [loadingCities, setLoadingCities] = useState(true)

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoadingCities(true)
        const citiesData = await locationApi.getCities()
        setCities(citiesData)
      } catch (error) {
        console.error("Failed to fetch cities:", error)
        // Fallback to static cities if API fails
        setCities([
          "Addis Ababa",
          "Dire Dawa",
          "Gondar",
          "Bahir Dar",
          "Hawassa",
          "Mekelle",
          "Adama",
          "Jimma",
          "Dessie",
          "Debre Birhan",
          "Shashamane",
          "Bishoftu",
          "Sodo",
          "Arba Minch",
          "Hosaena",
          "Harar",
          "Dilla",
          "Nekemte",
          "Debre Markos",
          "Kombolcha",
        ])
      } finally {
        setLoadingCities(false)
      }
    }

    fetchCities()
  }, [])

  // Hide the example tooltip after 5 seconds
  useEffect(() => {
    if (showExampleTooltip) {
      const timer = setTimeout(() => {
        setShowExampleTooltip(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showExampleTooltip])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!origin || !destination || !date) return

    const searchParams = new URLSearchParams({
      origin,
      destination,
      date: date.toISOString(),
      passengers: passengers.toString(),
    })

    router.push(`/search?${searchParams.toString()}`)
  }

  // Example search presets
  const setExampleSearch = (preset: string) => {
    switch (preset) {
      case "addis-bahir":
        setOrigin("Addis Ababa")
        setDestination("Bahir Dar")
        setDate(addDays(new Date(), 1))
        setPassengers(2)
        break
      case "dire-hawassa":
        setOrigin("Dire Dawa")
        setDestination("Hawassa")
        setDate(addDays(new Date(), 2))
        setPassengers(1)
        break
      case "gondar-addis":
        setOrigin("Gondar")
        setDestination("Addis Ababa")
        setDate(addDays(new Date(), 3))
        setPassengers(3)
        break
    }
  }

  return (
    <div className="relative">
      {showExampleTooltip && (
        <div className="absolute -top-12 right-0 bg-accent text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          Try our example searches below!
        </div>
      )}

      <form onSubmit={handleSearch} className="bg-primary-800 rounded-lg shadow-lg p-4 md:p-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="w-full md:w-1/4 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MapPin size={18} />
            </div>
            <Select value={origin} onValueChange={setOrigin} disabled={loadingCities}>
              <SelectTrigger className="pl-10 h-12 bg-white/10 hover:bg-white/15 focus:bg-white/20 border-white/20 text-white placeholder:text-gray-400 rounded-lg">
                <SelectValue placeholder={loadingCities ? "Loading..." : "From"} />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/4 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MapPin size={18} />
            </div>
            <Select value={destination} onValueChange={setDestination} disabled={loadingCities}>
              <SelectTrigger className="pl-10 h-12 bg-white/10 hover:bg-white/15 focus:bg-white/20 border-white/20 text-white placeholder:text-gray-400 rounded-lg">
                <SelectValue placeholder={loadingCities ? "Loading..." : "To"} />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/4 relative">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 pl-10 justify-start text-left font-normal bg-white/10 hover:bg-white/15 border-white/20 text-white rounded-lg"
                >
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  {date ? format(date, "MMM dd, yyyy") : <span>Departure Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border border-white/20 bg-gray-900/95 backdrop-blur-md"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date)
                    setIsCalendarOpen(false)
                  }}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="rounded-lg border-none"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full md:w-1/6 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Users size={18} />
            </div>
            <Input
              id="passengers"
              type="number"
              min="1"
              max="10"
              className="pl-10 h-12 bg-white/10 hover:bg-white/15 focus:bg-white/20 border-white/20 text-white rounded-lg"
              value={passengers}
              onChange={(e) => setPassengers(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="w-full md:w-auto">
            <Button
              type="submit"
              className="w-full md:w-auto h-12 px-6 bg-accent hover:bg-accent/90 text-white rounded-lg"
            >
              <Search className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Search</span>
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExampleSearch("addis-bahir")}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Addis Ababa → Bahir Dar
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Popular route with VIP buses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExampleSearch("dire-hawassa")}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Dire Dawa → Hawassa
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Long distance route with overnight options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExampleSearch("gondar-addis")}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Gondar → Addis Ababa
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Historical route with premium buses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
