"use client"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

interface FilterPanelProps {
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  selectedTimeSlots: string[]
  setSelectedTimeSlots: (slots: string[]) => void
  selectedFeatures: string[]
  setSelectedFeatures: (features: string[]) => void
  clearFilters: () => void
}

const timeSlots = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)", "Night (12AM-6AM)"]

const busFeatures = ["Air Conditioning", "WiFi", "Power Outlets", "Reclining Seats", "Toilet", "Entertainment"]

export function FilterPanel({
  priceRange,
  setPriceRange,
  selectedTimeSlots,
  setSelectedTimeSlots,
  selectedFeatures,
  setSelectedFeatures,
  clearFilters,
}: FilterPanelProps) {
  const toggleTimeSlot = (slot: string) => {
    if (selectedTimeSlots.includes(slot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((s) => s !== slot))
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, slot])
    }
  }

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
    } else {
      setSelectedFeatures([...selectedFeatures, feature])
    }
  }

  const hasActiveFilters = () => {
    return priceRange[0] > 0 || priceRange[1] < 2000 || selectedTimeSlots.length > 0 || selectedFeatures.length > 0
  }

  return (
    <motion.div
      className="filter-panel backdrop-blur-md bg-gradient-to-r from-primary/30 to-primary/10 p-6 rounded-xl border border-white/20 shadow-xl mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="filter-section">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <span className="bg-accent/20 w-6 h-6 flex items-center justify-center rounded-full mr-2 text-accent">
              ₽
            </span>
            Price Range
          </h3>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={2000}
            step={50}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between items-center">
            <div className="bg-white/10 px-3 py-1 rounded-md text-sm text-white">{priceRange[0]} ETB</div>
            <div className="text-white/50 text-xs">Price Range</div>
            <div className="bg-white/10 px-3 py-1 rounded-md text-sm text-white">{priceRange[1]} ETB</div>
          </div>
        </div>

        <div className="filter-section">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <span className="bg-accent/20 w-6 h-6 flex items-center justify-center rounded-full mr-2 text-accent">
              ⏰
            </span>
            Departure Time
          </h3>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <Badge
                key={slot}
                variant={selectedTimeSlots.includes(slot) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTimeSlots.includes(slot)
                    ? "bg-accent hover:bg-accent/90 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                }`}
                onClick={() => toggleTimeSlot(slot)}
              >
                {selectedTimeSlots.includes(slot) && <Check className="h-3 w-3 mr-1" />}
                {slot}
              </Badge>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <span className="bg-accent/20 w-6 h-6 flex items-center justify-center rounded-full mr-2 text-accent">
              ✨
            </span>
            Bus Features
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {busFeatures.map((feature) => (
              <Badge
                key={feature}
                variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedFeatures.includes(feature)
                    ? "bg-accent hover:bg-accent/90 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                }`}
                onClick={() => toggleFeature(feature)}
              >
                {selectedFeatures.includes(feature) && <Check className="h-3 w-3 mr-1" />}
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {hasActiveFilters() && (
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 flex items-center gap-2"
            onClick={clearFilters}
          >
            <X size={16} />
            Clear All Filters
          </Button>
        </div>
      )}
    </motion.div>
  )
}
