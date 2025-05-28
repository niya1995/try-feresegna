"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function StatusToggle({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Label>
      <Switch id="status" checked={enabled} onCheckedChange={setEnabled} />
    </div>
  )
}
