import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="hero-gradient rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience Comfortable Bus Travel?
              </h2>
              <p className="text-blue-100 mb-6">
                Join thousands of satisfied travelers who book their bus tickets with Feresegna Bus. Enjoy a seamless
                booking experience and comfortable journeys.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5" />
                  <span className="text-blue-100">Wide selection of routes and operators</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5" />
                  <span className="text-blue-100">Secure online payment options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5" />
                  <span className="text-blue-100">24/7 customer support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5" />
                  <span className="text-blue-100">Exclusive deals and discounts</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/search">
                  <Button className="btn-primary">Book Your Trip</Button>
                </Link>
                <Link href="/routes">
                  <Button className="btn-secondary">Explore Routes</Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-800/50 to-transparent"></div>
              <Image
                src="/placeholder.svg?height=600&width=800&query=modern bus ethiopia travel"
                alt="Comfortable bus travel"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-12 left-12">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-xs">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-50 dark:bg-primary-900 p-2 rounded-full mr-4">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Save Time</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Book your tickets in minutes, not hours. No more waiting in long queues.
                  </p>
                  <Link href="/search" className="text-primary font-medium text-sm mt-4 inline-block">
                    Book Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
