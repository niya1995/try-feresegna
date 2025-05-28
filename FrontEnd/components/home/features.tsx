"use client"

import { Shield, Clock, CreditCard, MapPin, Truck, Users, Headphones, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payment and personal information are always protected",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Book your tickets anytime, day or night",
  },
  {
    icon: CreditCard,
    title: "Easy Payment",
    description: "Multiple payment options for your convenience",
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description: "Routes covering all major cities and towns in Ethiopia",
  },
  {
    icon: Truck,
    title: "Quality Buses",
    description: "Travel with modern and comfortable buses",
  },
  {
    icon: Users,
    title: "Seat Selection",
    description: "Choose your preferred seat before booking",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Dedicated support team to assist you",
  },
  {
    icon: Award,
    title: "Best Operators",
    description: "Partnered with top-rated bus operators",
  },
]

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Feresegna Bus</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We provide the best bus booking experience with features designed for your convenience and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card card-hover">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
