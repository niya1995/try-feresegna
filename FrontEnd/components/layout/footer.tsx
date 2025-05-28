"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/images/logo.png" alt="Feresegna Bus" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 mb-4">
              Book bus tickets across Ethiopia with ease. Search, book, and pay for bus trips online.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/routes" className="text-gray-400 hover:text-white">
                  Routes
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white">
                  Bus Booking
                </Link>
              </li>
              <li>
                <Link href="/routes" className="text-gray-400 hover:text-white">
                  Popular Routes
                </Link>
              </li>
              <li>
                <Link href="/auth?mode=register&type=operator" className="text-gray-400 hover:text-white">
                  Operator Registration
                </Link>
              </li>
              <li>
                <Link href="/auth?mode=register&type=driver" className="text-gray-400 hover:text-white">
                  Driver Registration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                <span>+251 912 345 678</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@feresegnabus.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Feresegna Bus. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-gray-400 hover:text-white text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
