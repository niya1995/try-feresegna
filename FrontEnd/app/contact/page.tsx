"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormSubmit = () => {
    setFormSubmitted(true)
  }

  const handleSendAnother = () => {
    setFormSubmitted(false)
  }

  return (
    <MainLayout>
      <section className="hero-gradient py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">Have questions or need assistance? We're here to help.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>

            <div className="lg:col-span-2">
              <ContactForm onSubmit={handleFormSubmit} submitted={formSubmitted} onSendAnother={handleSendAnother} />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
