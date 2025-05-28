"use client"

import { Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SupportOptions() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Still Need Help?</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Our customer support team is ready to assist you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <div className="bg-primary-50 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <Button variant="outline" className="w-full">
              info@feresegnabus.com
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <div className="bg-primary-50 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our customer support team is available from 8AM to 8PM.
            </p>
            <Button variant="outline" className="w-full">
              +251 912 345 678
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <div className="bg-primary-50 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Chat with our support team for immediate assistance.
            </p>
            <Button className="w-full">Start Chat</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
