"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Abebe Kebede",
    role: "Frequent Traveler",
    image: "/placeholder.svg?key=a2dko",
    rating: 5,
    text: "Feresegna Bus has transformed how I travel between cities. The booking process is seamless, and I love being able to choose my seat in advance.",
  },
  {
    id: 2,
    name: "Sara Hailu",
    role: "Business Traveler",
    image: "/placeholder.svg?height=100&width=100&query=African woman portrait",
    rating: 5,
    text: "As someone who travels frequently for business, I appreciate the reliability and comfort that Feresegna Bus provides. The e-tickets make the process so convenient.",
  },
  {
    id: 3,
    name: "Dawit Mekonnen",
    role: "Student",
    image: "/placeholder.svg?height=100&width=100&query=Young African man portrait",
    rating: 4,
    text: "The student discounts are great! I use Feresegna Bus to travel between home and university, and the prices are very reasonable.",
  },
  {
    id: 4,
    name: "Tigist Alemu",
    role: "Tourist",
    image: "/placeholder.svg?height=100&width=100&query=African woman smiling portrait",
    rating: 5,
    text: "As a tourist exploring Ethiopia, Feresegna Bus made it easy to visit different cities. The website is user-friendly and the buses are comfortable.",
  },
  {
    id: 5,
    name: "Yonas Tadesse",
    role: "Family Traveler",
    image: "/placeholder.svg?height=100&width=100&query=Middle aged African man portrait",
    rating: 4,
    text: "Traveling with my family was a breeze thanks to Feresegna Bus. We could book all our seats together and the journey was comfortable for everyone.",
  },
]

export function Testimonials() {
  const [startIndex, setStartIndex] = useState(0)

  const showPrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const showNext = () => {
    setStartIndex((prev) => (prev < testimonials.length - 3 ? prev + 1 : prev))
  }

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 3)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Hear from travelers who have experienced our service
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 overflow-hidden">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 flex-1 min-w-0"
              >
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={showPrev}
              disabled={startIndex === 0}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={showNext}
              disabled={startIndex >= testimonials.length - 3}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
