"use client"

import type React from "react"
import { createContext, useContext } from "react"

interface LanguageContextType {
  t: (key: string) => string
}

// Create a simplified context that just returns the key
const LanguageContext = createContext<LanguageContextType>({
  t: (key: string) => {
    // Map of common translation keys to their English values
    const translations: Record<string, string> = {
      "home.hero.title": "Travel Smarter, Not Harder",
      "home.hero.subtitle":
        "Book bus tickets easily, track your journey in real-time, and enjoy comfortable travel with Feresegna Bus.",
      "home.search.title": "Find Your Journey",
      "home.search.from": "From",
      "home.search.to": "To",
      "home.search.date": "Date",
      "home.search.button": "Search Trips",
      "home.features.title": "Why Choose Feresegna Bus",
      "home.howItWorks.title": "How It Works",
      "home.popularRoutes.title": "Popular Routes",
      "home.testimonials.title": "What Our Customers Say",
      "home.cta.title": "Ready to Travel?",
      "home.cta.button": "Book Your Trip",
      "nav.home": "Home",
      "nav.routes": "Routes",
      "nav.bookings": "My Bookings",
      "nav.contact": "Contact",
      "nav.help": "Help",
      "nav.login": "Login",
      "nav.register": "Register",
      "nav.profile": "Profile",
      "nav.logout": "Logout",

      // Help page translations
      "help.title": "Help Center",
      "help.subtitle": "Find answers to frequently asked questions and get support",
      "help.search.placeholder": "Search for answers...",
      "help.support.title": "Still Need Help?",
      "help.support.subtitle": "Our customer support team is ready to assist you",
      "help.support.email": "Email Us",
      "help.support.call": "Call Us",
      "help.support.chat": "Live Chat",
      "footer.contact": "Contact Us",
      "footer.rights": "All Rights Reserved",
      "footer.terms": "Terms of Service",
      "footer.privacy": "Privacy Policy",
      "app.name": "Feresegna Bus",
    }

    return translations[key] || key
  },
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = (key: string) => {
    // Map of common translation keys to their English values
    const translations: Record<string, string> = {
      "home.hero.title": "Travel Smarter, Not Harder",
      "home.hero.subtitle":
        "Book bus tickets easily, track your journey in real-time, and enjoy comfortable travel with Feresegna Bus.",
      "home.search.title": "Find Your Journey",
      "home.search.from": "From",
      "home.search.to": "To",
      "home.search.date": "Date",
      "home.search.button": "Search Trips",
      "home.features.title": "Why Choose Feresegna Bus",
      "home.howItWorks.title": "How It Works",
      "home.popularRoutes.title": "Popular Routes",
      "home.testimonials.title": "What Our Customers Say",
      "home.cta.title": "Ready to Travel?",
      "home.cta.button": "Book Your Trip",
      "nav.home": "Home",
      "nav.routes": "Routes",
      "nav.bookings": "My Bookings",
      "nav.contact": "Contact",
      "nav.help": "Help",
      "nav.login": "Login",
      "nav.register": "Register",
      "nav.profile": "Profile",
      "nav.logout": "Logout",

      // Help page translations
      "help.title": "Help Center",
      "help.subtitle": "Find answers to frequently asked questions and get support",
      "help.search.placeholder": "Search for answers...",
      "help.support.title": "Still Need Help?",
      "help.support.subtitle": "Our customer support team is ready to assist you",
      "help.support.email": "Email Us",
      "help.support.call": "Call Us",
      "help.support.chat": "Live Chat",
      "footer.contact": "Contact Us",
      "footer.rights": "All Rights Reserved",
      "footer.terms": "Terms of Service",
      "footer.privacy": "Privacy Policy",
      "app.name": "Feresegna Bus",
    }

    return translations[key] || key
  }

  return <LanguageContext.Provider value={{ t }}>{children}</LanguageContext.Provider>
}
