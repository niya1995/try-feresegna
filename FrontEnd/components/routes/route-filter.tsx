"use client"

import type React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface RouteFilterProps {
  filters: {
    popularity: string[]
    operators: string[]
    frequency: string[]
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      popularity: string[]
      operators: string[]
      frequency: string[]
    }>
  >
}

export function RouteFilter({ filters, setFilters }: RouteFilterProps) {
  const handlePopularityChange = (value: string) => {
    setFilters((prev) => {
      if (prev.popularity.includes(value)) {
        return {
          ...prev,
          popularity: prev.popularity.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          popularity: [...prev.popularity, value],
        }
      }
    })
  }

  const handleOperatorChange = (value: string) => {
    setFilters((prev) => {
      if (prev.operators.includes(value)) {
        return {
          ...prev,
          operators: prev.operators.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          operators: [...prev.operators, value],
        }
      }
    })
  }

  const handleFrequencyChange = (value: string) => {
    setFilters((prev) => {
      if (prev.frequency.includes(value)) {
        return {
          ...prev,
          frequency: prev.frequency.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          frequency: [...prev.frequency, value],
        }
      }
    })
  }

  const clearFilters = () => {
    setFilters({
      popularity: [],
      operators: [],
      frequency: [],
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <Separator className="mb-4" />

      <div className="space-y-6">
        {/* Popularity Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">Popularity</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="popularity-high"
                checked={filters.popularity.includes("high")}
                onCheckedChange={() => handlePopularityChange("high")}
              />
              <Label htmlFor="popularity-high" className="ml-2 text-sm">
                High
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="popularity-medium"
                checked={filters.popularity.includes("medium")}
                onCheckedChange={() => handlePopularityChange("medium")}
              />
              <Label htmlFor="popularity-medium" className="ml-2 text-sm">
                Medium
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="popularity-low"
                checked={filters.popularity.includes("low")}
                onCheckedChange={() => handlePopularityChange("low")}
              />
              <Label htmlFor="popularity-low" className="ml-2 text-sm">
                Low
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Operators Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">Operators</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="operator-selam"
                checked={filters.operators.includes("Selam Bus")}
                onCheckedChange={() => handleOperatorChange("Selam Bus")}
              />
              <Label htmlFor="operator-selam" className="ml-2 text-sm">
                Selam Bus
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="operator-sky"
                checked={filters.operators.includes("Sky Bus")}
                onCheckedChange={() => handleOperatorChange("Sky Bus")}
              />
              <Label htmlFor="operator-sky" className="ml-2 text-sm">
                Sky Bus
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="operator-golden"
                checked={filters.operators.includes("Golden Bus")}
                onCheckedChange={() => handleOperatorChange("Golden Bus")}
              />
              <Label htmlFor="operator-golden" className="ml-2 text-sm">
                Golden Bus
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="operator-abay"
                checked={filters.operators.includes("Abay Bus")}
                onCheckedChange={() => handleOperatorChange("Abay Bus")}
              />
              <Label htmlFor="operator-abay" className="ml-2 text-sm">
                Abay Bus
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="operator-habesha"
                checked={filters.operators.includes("Habesha Bus")}
                onCheckedChange={() => handleOperatorChange("Habesha Bus")}
              />
              <Label htmlFor="operator-habesha" className="ml-2 text-sm">
                Habesha Bus
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Frequency Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">Frequency</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="frequency-daily"
                checked={filters.frequency.includes("Daily")}
                onCheckedChange={() => handleFrequencyChange("Daily")}
              />
              <Label htmlFor="frequency-daily" className="ml-2 text-sm">
                Daily
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="frequency-specific"
                checked={filters.frequency.includes("Specific Days")}
                onCheckedChange={() => handleFrequencyChange("Specific Days")}
              />
              <Label htmlFor="frequency-specific" className="ml-2 text-sm">
                Specific Days
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
