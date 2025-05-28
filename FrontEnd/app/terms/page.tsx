import { MainLayout } from "@/components/layout/main-layout"

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                Welcome to Feresegna Bus. These Terms of Service govern your use of our website and services. By using
                our services, you agree to these terms. Please read them carefully.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Feresegna Bus website, mobile application, or any other services provided by
                Feresegna Bus (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do
                not agree to these terms, please do not use our Services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Services</h2>
              <p>
                Feresegna Bus provides an online platform for booking bus tickets across Ethiopia. Our Services allow
                users to search for bus routes, view schedules, select seats, and make payments for bus tickets.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
              <p>
                To use certain features of our Services, you may need to create an account. You are responsible for
                maintaining the confidentiality of your account information and for all activities that occur under your
                account. You agree to provide accurate and complete information when creating your account and to update
                your information to keep it accurate and complete.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Booking and Payments</h2>
              <p>
                When you book a ticket through our Services, you agree to pay the full amount specified for your
                booking. All payments are processed securely through our payment partners. Prices are inclusive of
                applicable taxes and fees unless otherwise stated.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Cancellation and Refund Policy</h2>
              <p>
                Cancellations made at least 24 hours before the scheduled departure time may be eligible for a refund,
                subject to a cancellation fee. Cancellations made less than 24 hours before the scheduled departure time
                are generally not refundable. Refunds are processed to the original payment method within 7-14 business
                days.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. User Conduct</h2>
              <p>
                You agree not to use our Services for any unlawful purpose or in any way that could damage, disable, or
                impair our Services. You also agree not to attempt to gain unauthorized access to any part of our
                Services or any system or network connected to our Services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
              <p>
                All content on our Services, including but not limited to text, graphics, logos, icons, images, audio
                clips, and software, is the property of Feresegna Bus or its content suppliers and is protected by
                Ethiopian and international copyright laws.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
              <p>
                Feresegna Bus shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages arising out of or relating to your use of our Services. In no event shall our total liability to
                you for all damages exceed the amount paid by you, if any, for accessing our Services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will provide notice of significant
                changes by posting the updated terms on our website. Your continued use of our Services after such
                changes constitutes your acceptance of the new terms.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">10. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the Federal
                Democratic Republic of Ethiopia, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: legal@feresegnabus.com
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
