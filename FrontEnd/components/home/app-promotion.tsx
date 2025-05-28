import Image from "next/image"
import { Button } from "@/components/ui/button"

export function AppPromotion() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Our Mobile App</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Get the Feresegna Bus experience on your mobile device. Book tickets, manage your trips, and receive
              updates on the go.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="bg-primary-50 dark:bg-primary-900 rounded-full p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Book tickets anytime, anywhere</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-50 dark:bg-primary-900 rounded-full p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Receive real-time trip updates</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-50 dark:bg-primary-900 rounded-full p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Manage your bookings with ease</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-50 dark:bg-primary-900 rounded-full p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Exclusive mobile-only discounts</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black text-white hover:bg-black/90 flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5,2H8.5C6.6,2,5,3.6,5,5.5v13C5,20.4,6.6,22,8.5,22h9c1.9,0,3.5-1.6,3.5-3.5v-13C21,3.6,19.4,2,17.5,2z M13,20.5h-2v-1h2V20.5z M18,17.5H8v-13h10V17.5z" />
                </svg>
                Google Play
              </Button>
              <Button className="bg-black text-white hover:bg-black/90 flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                App Store
              </Button>
            </div>
          </div>
          <div className="relative h-[500px] flex justify-center">
            <div className="absolute top-0 w-[280px] h-[560px] bg-gray-900 rounded-[40px] p-3">
              <div className="relative w-full h-full overflow-hidden rounded-[32px] border-4 border-gray-800">
                <Image
                  src="/placeholder.svg?height=560&width=280&query=mobile app bus booking interface"
                  alt="Feresegna Bus Mobile App"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-[22px] left-1/2 transform -translate-x-1/2 w-[120px] h-[24px] bg-gray-800 rounded-b-[16px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
