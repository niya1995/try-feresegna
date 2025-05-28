import { MainLayout } from "@/components/layout/main-layout"

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                At Feresegna Bus, we are committed to protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you use our website and services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
              <p>We collect several types of information from and about users of our Services, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Personal Information:</strong> This includes information that can be used to identify you,
                  such as your name, email address, phone number, and billing information when you register for an
                  account or make a booking.
                </li>
                <li>
                  <strong>Transaction Information:</strong> We collect information about your bookings, including
                  routes, dates, seat selections, and payment details.
                </li>
                <li>
                  <strong>Device Information:</strong> We collect information about the device you use to access our
                  Services, including IP address, browser type, operating system, and device identifiers.
                </li>
                <li>
                  <strong>Usage Information:</strong> We collect information about how you interact with our Services,
                  including pages visited, features used, and time spent on the platform.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Process and confirm your bookings</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Improve and personalize our Services</li>
                <li>Send you important information about your bookings and account</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Detect and prevent fraud and unauthorized access</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Bus Operators:</strong> We share necessary booking information with the bus operators to
                  fulfill your booking.
                </li>
                <li>
                  <strong>Payment Processors:</strong> We share payment information with our payment processing partners
                  to process your transactions.
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share your information with third-party service providers
                  who perform services on our behalf, such as hosting, data analysis, and customer service.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or
                  in response to valid requests by public authorities.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from
                unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over
                the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience on our Services, analyze usage
                patterns, and deliver personalized content. You can control cookies through your browser settings, but
                disabling cookies may limit your ability to use some features of our Services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
              <p>
                Our Services are not intended for children under the age of 18. We do not knowingly collect personal
                information from children under 18. If you are a parent or guardian and believe that your child has
                provided us with personal information, please contact us.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
                Policy periodically for any changes.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: privacy@feresegnabus.com
                <br />
                Phone: +251 912 345 678
                <br />
                Address: Bole Road, Friendship Building, 4th Floor, Office #402, Addis Ababa, Ethiopia
              </p>

              <p className="mt-8 text-sm text-gray-500">Last updated: July 1, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
