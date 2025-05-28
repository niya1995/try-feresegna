"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

interface TicketGeneratorProps {
  booking: any
  onGenerateStart?: () => void
  onGenerateEnd?: () => void
}

export function TicketGenerator({ booking, onGenerateStart, onGenerateEnd }: TicketGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateTicket = async () => {
    try {
      setIsGenerating(true)
      if (onGenerateStart) onGenerateStart()

      // Create new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Add title and booking reference
      doc.setFontSize(24)
      doc.setTextColor(41, 37, 36) // text-gray-800
      doc.text("Feresegna Bus E-Ticket", 105, 20, { align: "center" })

      doc.setFontSize(12)
      doc.setTextColor(107, 114, 128) // text-gray-500
      doc.text(`Booking Reference: #${booking.id}`, 105, 30, { align: "center" })

      // Add horizontal line
      doc.setDrawColor(229, 231, 235) // border-gray-200
      doc.setLineWidth(0.5)
      doc.line(20, 35, 190, 35)

      // Trip details section
      doc.setFontSize(16)
      doc.setTextColor(41, 37, 36) // text-gray-800
      doc.text("Trip Details", 20, 45)

      // Origin and Destination
      doc.setFontSize(12)
      doc.setTextColor(41, 37, 36) // text-gray-800
      doc.text("From:", 20, 55)
      doc.setFont("helvetica", "bold")
      doc.text(booking.trip.origin, 40, 55)

      doc.setFont("helvetica", "normal")
      doc.text("To:", 120, 55)
      doc.setFont("helvetica", "bold")
      doc.text(booking.trip.destination, 140, 55)

      // Date and Time
      doc.setFont("helvetica", "normal")
      doc.text("Date:", 20, 65)
      doc.setFont("helvetica", "bold")
      doc.text(booking.trip.date, 40, 65)

      doc.setFont("helvetica", "normal")
      doc.text("Time:", 120, 65)
      doc.setFont("helvetica", "bold")
      doc.text(booking.trip.departureTime, 140, 65)

      // Bus details
      doc.setFont("helvetica", "normal")
      doc.text("Bus Operator:", 20, 75)
      doc.setFont("helvetica", "bold")
      doc.text(booking.trip.operator, 60, 75)

      doc.setFont("helvetica", "normal")
      doc.text("Bus Type:", 120, 75)
      doc.setFont("helvetica", "bold")
      doc.text(booking.trip.busType, 140, 75)

      // Add horizontal line
      doc.setDrawColor(229, 231, 235) // border-gray-200
      doc.line(20, 85, 190, 85)

      // Passenger & Seat Details section
      doc.setFontSize(16)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(41, 37, 36) // text-gray-800
      doc.text("Passenger & Seat Details", 20, 95)

      // Create table for seat details
      const tableData = booking.seats.map((seat: any, index: number) => [
        `Passenger ${index + 1}`,
        `Seat ${seat.number}`,
        seat.type || "Standard",
        `${booking.trip.price} ETB`,
      ])

      autoTable(doc, {
        startY: 100,
        head: [["Passenger", "Seat Number", "Seat Type", "Price"]],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [243, 244, 246], // bg-gray-100
          textColor: [31, 41, 55], // text-gray-800
          fontStyle: "bold",
        },
        styles: {
          fontSize: 10,
        },
      })

      // Payment Details section
      const finalY = (doc as any).lastAutoTable.finalY + 10

      doc.setFontSize(16)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(41, 37, 36) // text-gray-800
      doc.text("Payment Details", 20, finalY)

      // Payment table
      const subtotal = booking.trip.price * booking.seats.length
      const serviceFee = booking.serviceFee || 0
      const total = booking.totalPrice

      autoTable(doc, {
        startY: finalY + 5,
        body: [
          ["Subtotal", `${subtotal} ETB`],
          ["Service Fee", `${serviceFee} ETB`],
          ["Total", `${total} ETB`],
        ],
        theme: "plain",
        styles: {
          fontSize: 10,
        },
        bodyStyles: {
          lineWidth: 0.1,
        },
        columnStyles: {
          0: { cellWidth: 150 },
          1: { cellWidth: 30, halign: "right" },
        },
      })

      // Payment method
      const paymentY = (doc as any).lastAutoTable.finalY + 5
      doc.setFontSize(10)
      doc.setTextColor(107, 114, 128) // text-gray-500
      doc.text(`Payment Method: ${booking.paymentMethod}`, 20, paymentY)

      // Important Information section
      doc.setFontSize(16)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(41, 37, 36) // text-gray-800
      doc.text("Important Information", 20, paymentY + 15)

      // Important information content
      doc.setFontSize(10)
      doc.setTextColor(107, 114, 128) // text-gray-500
      const importantInfo = [
        "• Please arrive at the bus station at least 30 minutes before departure.",
        "• Bring a valid ID that matches the name on your booking.",
        "• Each passenger is allowed one piece of luggage (max 20kg) and one carry-on bag.",
        "• No refunds for missed buses. Rescheduling must be done at least 24 hours in advance.",
      ]

      let infoY = paymentY + 20
      importantInfo.forEach((info) => {
        doc.text(info, 20, infoY)
        infoY += 5
      })

      // Footer
      doc.setFontSize(10)
      doc.setTextColor(107, 114, 128) // text-gray-500
      doc.text("Feresegna Bus - Your Trusted Travel Partner", 105, 270, { align: "center" })
      doc.text("Customer Support: +251 11 123 4567 | support@feresegnabus.com", 105, 275, { align: "center" })

      // Save PDF
      doc.save(`feresegna-ticket-${booking.id}.pdf`)
    } catch (error) {
      console.error("Error generating ticket:", error)
      alert("Failed to generate ticket. Please try again.")
    } finally {
      setIsGenerating(false)
      if (onGenerateEnd) onGenerateEnd()
    }
  }

  return (
    <Button
      onClick={generateTicket}
      className="flex items-center gap-2"
      variant="outline"
      size="sm"
      disabled={isGenerating}
    >
      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {isGenerating ? "Generating..." : "Download E-Ticket"}
    </Button>
  )
}
