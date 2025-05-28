"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQAccordionProps {
  category: string
  searchQuery: string
}

// Mock FAQ data
const faqs = [
  {
    id: "1",
    question: "How do I book a bus ticket?",
    answer:
      "To book a bus ticket, search for your desired route on our homepage by entering your origin, destination, and travel date. Browse the available trips, select your preferred one, choose your seats, and proceed to payment. Once payment is complete, you'll receive a confirmation with your e-ticket.",
    category: "Booking",
  },
  {
    id: "2",
    question: "What payment methods are accepted?",
    answer:
      "We accept various payment methods including credit/debit cards, bank transfers, and mobile payment options like TeleBirr, CBE Birr, Amole, and HelloCash. All payments are processed securely through our platform.",
    category: "Payment",
  },
  {
    id: "3",
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking up to 24 hours before the scheduled departure time. To cancel, go to 'My Bookings' in your account, select the booking you wish to cancel, and click on the 'Cancel Booking' button. Please note that cancellation fees may apply depending on how close to the departure time you cancel.",
    category: "Cancellation",
  },
  {
    id: "4",
    question: "How do I get a refund for a cancelled trip?",
    answer:
      "If your trip is cancelled by the operator, you'll automatically receive a full refund to your original payment method within 3-5 business days. For self-cancellations, refunds are processed according to our refund policy, which depends on how far in advance you cancelled. You can check the status of your refund in the 'My Bookings' section of your account.",
    category: "Refunds",
  },
  {
    id: "5",
    question: "Do I need to print my ticket?",
    answer:
      "No, you don't need to print your ticket. You can show your e-ticket on your mobile device to the bus operator. The e-ticket contains a QR code that will be scanned before boarding. However, we recommend having your booking reference number handy in case there are any issues with scanning the QR code.",
    category: "Tickets",
  },
  {
    id: "6",
    question: "What happens if I miss my bus?",
    answer:
      "If you miss your bus, your ticket is generally considered void and non-refundable. However, some operators may allow you to use your ticket for a later trip on the same day, subject to seat availability and at the operator's discretion. We recommend contacting the bus operator directly if you've missed your bus.",
    category: "Travel",
  },
  {
    id: "7",
    question: "How early should I arrive before departure?",
    answer:
      "We recommend arriving at the bus station at least 30 minutes before the scheduled departure time. This allows sufficient time for ticket verification, baggage handling, and boarding. For trips during peak travel seasons or holidays, consider arriving 45-60 minutes early as stations may be busier than usual.",
    category: "Travel",
  },
  {
    id: "8",
    question: "Can I change the date of my trip?",
    answer:
      "Yes, you can change the date of your trip up to 24 hours before the scheduled departure time. Go to 'My Bookings' in your account, select the booking you wish to modify, and click on 'Change Date'. Note that date changes are subject to seat availability on the new date, and a small fee may apply.",
    category: "Booking",
  },
  {
    id: "9",
    question: "How do I get my receipt for tax purposes?",
    answer:
      "You can download a tax receipt for your booking from the 'My Bookings' section of your account. Select the relevant booking and click on 'Download Receipt'. The receipt includes all the necessary information for tax purposes, including the VAT amount.",
    category: "Payment",
  },
  {
    id: "10",
    question: "What is the baggage allowance?",
    answer:
      "The standard baggage allowance is one large suitcase (up to 20kg) and one small carry-on bag per passenger. Additional baggage may incur extra charges, which vary by operator. Valuable items, electronics, and important documents should be kept in your carry-on bag. Please note that operators may have specific restrictions on certain items.",
    category: "Travel",
  },
]

export function FAQAccordion({ category, searchQuery }: FAQAccordionProps) {
  // Filter FAQs based on category and search query
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = category === "All" || faq.category === category
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  if (filteredFaqs.length === 0) {
    return (
      <div className="glass-effect p-8 rounded-xl text-center">
        <h3 className="text-white text-xl mb-2">No FAQs Found</h3>
        <p className="text-blue-100">Try adjusting your search or category filter to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {filteredFaqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="glass-effect rounded-xl overflow-hidden border-none">
          <AccordionTrigger className="px-6 py-4 text-white hover:no-underline hover:bg-white/5">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 text-blue-100">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
