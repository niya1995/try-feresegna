import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="glass-effect p-6 md:p-8 rounded-xl">
      <h2 className="text-xl font-semibold text-white mb-6">Get in Touch</h2>

      <div className="space-y-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-300" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-white font-medium">Office Address</h3>
            <address className="text-blue-100 not-italic mt-1">
              Bole Road, Friendship Building
              <br />
              4th Floor, Office #402
              <br />
              Addis Ababa, Ethiopia
            </address>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-300" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-white font-medium">Phone</h3>
            <div className="space-y-1 mt-1">
              <p className="text-blue-100">Customer Support: +251 912 345 678</p>
              <p className="text-blue-100">Booking Office: +251 911 234 567</p>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-blue-300" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-white font-medium">Email</h3>
            <div className="space-y-1 mt-1">
              <p className="text-blue-100">info@feresegnabus.com</p>
              <p className="text-blue-100">support@feresegnabus.com</p>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-300" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-white font-medium">Business Hours</h3>
            <div className="space-y-1 mt-1">
              <p className="text-blue-100">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-blue-100">Saturday: 9:00 AM - 3:00 PM</p>
              <p className="text-blue-100">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
