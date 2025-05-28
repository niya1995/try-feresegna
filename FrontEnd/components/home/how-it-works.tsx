"use client"

import { Search, Calendar, CreditCard, Ticket } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Enter your origin, destination, and travel date",
  },
  {
    icon: Calendar,
    title: "Select",
    description: "Choose your preferred trip and seat",
  },
  {
    icon: CreditCard,
    title: "Pay",
    description: "Complete your booking with secure payment",
  },
  {
    icon: Ticket,
    title: "Travel",
    description: "Receive your e-ticket and enjoy your journey",
  },
]

export function HowItWorks() {
  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-blue-100">Book your bus ticket in just a few simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-blue-400 hidden lg:block">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center relative">
                <step.icon className="h-12 w-12 text-primary" />
                <div className="absolute -top-2 -right-2 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">{step.title}</h3>
              <p className="text-blue-100 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
