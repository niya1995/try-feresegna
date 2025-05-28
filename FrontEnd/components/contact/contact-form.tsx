"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"

interface ContactFormProps {
  onSubmit: () => void
  submitted: boolean
  onSendAnother: () => void
}

export function ContactForm({ onSubmit, submitted, onSendAnother }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSubmit()
    setIsLoading(false)
  }

  if (submitted) {
    return (
      <div className="glass-effect p-6 md:p-8 rounded-xl text-center">
        <div className="flex flex-col items-center">
          <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Message Sent!</h2>
          <p className="text-blue-100 mb-6">Thank you for contacting us. We'll get back to you as soon as possible.</p>
          <Button onClick={onSendAnother} className="bg-accent hover:bg-accent/90 text-white">
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-effect p-6 md:p-8 rounded-xl">
      <h2 className="text-xl font-semibold text-white mb-6">Send us a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Your Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-white">
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="How can we help you?"
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-white">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Write your message here..."
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[150px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}
