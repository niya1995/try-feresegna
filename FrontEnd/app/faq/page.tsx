"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// FAQ categories and questions
const faqData = {
  booking: [
    {
      question: "How do I book a bus ticket?",
      answer:
        "To book a bus ticket, search for your desired route on our homepage by entering your origin, destination, and travel date. Browse the available trips, select your preferred one, choose your seats, and proceed to payment. Once payment is complete, you'll receive a confirmation with your e-ticket.",
    },
    {
      question: "Can I book tickets for someone else?",
      answer:
        "Yes, you can book tickets for other passengers. During the booking process, you'll be asked to provide the passenger details. Make sure to enter the correct information for each passenger as it will be verified during boarding.",
    },
    {
      question: "How far in advance can I book tickets?",
      answer:
        "You can book tickets up to 30 days in advance for most routes. Some seasonal or special routes may have different booking windows. We recommend booking early, especially for popular routes or during holidays, to ensure seat availability.",
    },
    {
      question: "Can I change the date of my trip?",
      answer:
        "Yes, you can change the date of your trip up to 24 hours before the scheduled departure time. Go to 'My Bookings' in your account, select the booking you wish to modify, and click on 'Change Date'. Note that date changes are subject to seat availability on the new date, and a small fee may apply.",
    },
  ],
  payment: [
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit/debit cards, bank transfers, and mobile payment options like TeleBirr, CBE Birr, Amole, and HelloCash. All payments are processed securely through our platform.",
    },
    {
      question: "Is it safe to pay online?",
      answer:
        "Yes, all online payments on our platform are secure. We use industry-standard encryption and security protocols to protect your payment information. We do not store your complete credit card details on our servers.",
    },
    {
      question: "How do I get my receipt for tax purposes?",
      answer:
        "You can download a tax receipt for your booking from the 'My Bookings' section of your account. Select the relevant booking and click on 'Download Receipt'. The receipt includes all the necessary information for tax purposes, including the VAT amount.",
    },
    {
      question: "What happens if my payment fails?",
      answer:
        "If your payment fails, your booking will not be confirmed. You can try again with the same or a different payment method. If you're experiencing persistent issues, please contact our customer support for assistance.",
    },
  ],
  cancellation: [
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking up to 24 hours before the scheduled departure time. To cancel, go to 'My Bookings' in your account, select the booking you wish to cancel, and click on the 'Cancel Booking' button. Please note that cancellation fees may apply depending on how close to the departure time you cancel.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "Refunds are processed according to our cancellation policy. Cancellations made at least 24 hours before departure are eligible for a refund, minus a cancellation fee. Cancellations made less than 24 hours before departure are generally not refundable. Refunds are processed to the original payment method within 7-14 business days.",
    },
    {
      question: "How do I get a refund for a cancelled trip?",
      answer:
        "If your trip is cancelled by the operator, you'll automatically receive a full refund to your original payment method within 3-5 business days. For self-cancellations, refunds are processed according to our refund policy, which depends on how far in advance you cancelled. You can check the status of your refund in the 'My Bookings' section of your account.",
    },
  ],
  tickets: [
    {
      question: "Do I need to print my ticket?",
      answer:
        "No, you don't need to print your ticket. You can show your e-ticket on your mobile device to the bus operator. The e-ticket contains a QR code that will be scanned before boarding. However, we recommend having your booking reference number handy in case there are any issues with scanning the QR code.",
    },
    {
      question: "How do I get my e-ticket?",
      answer:
        "After completing your booking and payment, your e-ticket will be sent to the email address you provided during booking. You can also access your e-ticket at any time by logging into your account and going to the 'My Bookings' section.",
    },
    {
      question: "What if I lose my e-ticket?",
      answer:
        "If you lose your e-ticket, don't worry. You can retrieve it by logging into your account and going to the 'My Bookings' section. From there, you can view and download your e-ticket again. Alternatively, you can contact our customer support with your booking reference number for assistance.",
    },
  ],
  travel: [
    {
      question: "What happens if I miss my bus?",
      answer:
        "If you miss your bus, your ticket is generally considered void and non-refundable. However, some operators may allow you to use your ticket for a later trip on the same day, subject to seat availability and at the operator's discretion. We recommend contacting the bus operator directly if you've missed your bus.",
    },
    {
      question: "How early should I arrive before departure?",
      answer:
        "We recommend arriving at the bus station at least 30 minutes before the scheduled departure time. This allows sufficient time for ticket verification, baggage handling, and boarding. For trips during peak travel seasons or holidays, consider arriving 45-60 minutes early as stations may be busier than usual.",
    },
    {
      question: "What is the baggage allowance?",
      answer:
        "The standard baggage allowance is one large suitcase (up to 20kg) and one small carry-on bag per passenger. Additional baggage may incur extra charges, which vary by operator. Valuable items, electronics, and important documents should be kept in your carry-on bag. Please note that operators may have specific restrictions on certain items.",
    },
    {
      question: "Are there restrooms on the bus?",
      answer:
        "Most luxury and VIP buses have onboard restrooms. Standard and economy buses typically do not have restrooms but make regular stops during long journeys. You can check the bus features listed on the trip details page before booking to see if a restroom is available.",
    },
  ],
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("booking")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the state change
  }

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? Object.entries(faqData).flatMap(([category, questions]) =>
        questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    : faqData[activeCategory as keyof typeof faqData]

  return (
    <MainLayout>
      <div className="hero-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100">Find answers to common questions about our services</p>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search for answers..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="hidden">
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {searchQuery ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-6">Search Results</h2>
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      No results found for "{searchQuery}". Try a different search term or browse by category.
                    </p>
                    <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg p-2">
                        <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            ) : (
              <Tabs defaultValue="booking" value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                  <TabsTrigger value="booking">Booking</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="cancellation">Cancellation</TabsTrigger>
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                  <TabsTrigger value="travel">Travel</TabsTrigger>
                </TabsList>

                {Object.entries(faqData).map(([category, questions]) => (
                  <TabsContent key={category} value={category}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                      <h2 className="text-xl font-semibold mb-6 capitalize">{category} FAQs</h2>
                      <Accordion type="single" collapsible className="space-y-4">
                        {questions.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg p-2">
                            <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}

            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Can't find the answer you're looking for? Please contact our customer support team.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Support
                </Button>
                <Button className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Live Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
