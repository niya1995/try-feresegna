"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminRevenueChart() {
  const [timeframe, setTimeframe] = useState("monthly")

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Revenue Overview</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          {/* This would be a chart component in a real app */}
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Revenue chart would be displayed here using a charting library like Chart.js or Recharts
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
