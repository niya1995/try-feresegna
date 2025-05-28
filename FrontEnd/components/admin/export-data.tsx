"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, FileText, FileType } from "lucide-react"

interface ExportDataProps {
  data: any[]
  filename?: string
  title?: string
  description?: string
}

export function ExportData({
  data,
  filename = "export",
  title = "Export Data",
  description = "Choose a format to export your data.",
}: ExportDataProps) {
  const [format, setFormat] = useState<"csv" | "json">("csv")
  const [isOpen, setIsOpen] = useState(false)

  const exportData = () => {
    let content: string
    let mimeType: string
    let extension: string

    if (format === "csv") {
      // Create CSV content
      if (data.length === 0) {
        content = ""
      } else {
        const headers = Object.keys(data[0])
        const csvRows = [headers]

        data.forEach((item) => {
          const values = headers.map((header) => {
            const value = item[header]
            // Handle arrays, objects, and null values
            if (Array.isArray(value)) {
              return `"${value.join(", ")}"`
            } else if (value === null || value === undefined) {
              return ""
            } else if (typeof value === "object") {
              return `"${JSON.stringify(value).replace(/"/g, '""')}"`
            }
            // Escape quotes and wrap in quotes if the value contains commas or quotes
            const stringValue = String(value)
            if (stringValue.includes(",") || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`
            }
            return stringValue
          })
          csvRows.push(values)
        })

        content = csvRows.map((row) => row.join(",")).join("\n")
      }
      mimeType = "text/csv;charset=utf-8;"
      extension = "csv"
    } else {
      // JSON format
      content = JSON.stringify(data, null, 2)
      mimeType = "application/json;charset=utf-8;"
      extension = "json"
    }

    // Create and download the file
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.${extension}`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={format} onValueChange={(value: "csv" | "json") => setFormat(value)}>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="csv" id="csv" />
              <Label htmlFor="csv" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                CSV Format
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="json" id="json" />
              <Label htmlFor="json" className="flex items-center">
                <FileType className="mr-2 h-4 w-4" />
                JSON Format
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={exportData}>Download</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
