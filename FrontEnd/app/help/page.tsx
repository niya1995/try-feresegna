"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { FAQAccordion } from "@/components/help/faq-accordion"
import { SupportOptions } from "@/components/help/support-options"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

// FAQ categories
const categories = ["All", "Booking", "Payment", "Cancellation", "Refunds", "Tickets", "Travel"]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would filter the FAQs based on the search query
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <MainLayout>
      <section className="hero-gradient py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Help Center</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Find answers to frequently asked questions and get support
            </p>
          </div>

          {/* Search */}
          <div className="max-w-3xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search for answers..."
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
              <Button type="submit" className="hidden">
                Search
              </Button>
            </form>
          </div>

          {/* Categories */}
          <div className="max-w-3xl mx-auto mb-8 overflow-x-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${
                    activeCategory === category
                      ? "bg-accent hover:bg-accent/90 text-white"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto mb-12">
            <FAQAccordion category={activeCategory} searchQuery={searchQuery} />
          </div>

          {/* Still Need Help */}
          <div className="max-w-3xl mx-auto">
            <SupportOptions />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
