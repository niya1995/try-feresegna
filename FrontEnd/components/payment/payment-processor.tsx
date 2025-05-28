"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Building, Smartphone, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PaymentProcessorProps {
  amount: number
  onPayment: (paymentMethod: string) => void
  isProcessing: boolean
}

// Replace the existing component with this enhanced version that includes payment gateway integration
export function PaymentProcessor({ amount, onPayment, isProcessing }: PaymentProcessorProps) {
  const [cardholderName, setCardholderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentGateways, setPaymentGateways] = useState({
    card: { available: true, message: "" },
    bank: { available: true, message: "" },
    mobile: { available: true, message: "" },
  })

  // Simulate checking payment gateway availability
  useEffect(() => {
    const checkGateways = async () => {
      try {
        // In a real app, this would be an API call to check gateway status
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Simulate some gateways being unavailable
        setPaymentGateways({
          card: { available: true, message: "" },
          bank: { available: true, message: "" },
          mobile: {
            available: Math.random() > 0.3, // 30% chance of being unavailable
            message: "Mobile payment gateway is currently under maintenance. Please try again later.",
          },
        })
      } catch (error) {
        console.error("Error checking payment gateways:", error)
      }
    }

    checkGateways()
  }, [])

  const handleCardPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentError(null)

    // Basic validation
    if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
      setPaymentError("Please fill in all card details")
      return
    }

    if (cardNumber.length < 16) {
      setPaymentError("Invalid card number")
      return
    }

    // Simulate payment processing
    // In a real app, this would call a payment gateway API
    onPayment("Credit Card")
  }

  const handleBankTransfer = () => {
    setPaymentError(null)
    onPayment("Bank Transfer")
  }

  const handleMobilePayment = (provider: string) => {
    setPaymentError(null)

    // Simulate mobile payment processing
    // In a real app, this would initiate a mobile payment flow
    onPayment(`Mobile Payment - ${provider}`)
  }

  return (
    <Tabs defaultValue="card" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="card" className="flex items-center gap-2" disabled={!paymentGateways.card.available}>
          <CreditCard className="h-4 w-4" />
          <span>Card</span>
        </TabsTrigger>
        <TabsTrigger value="bank" className="flex items-center gap-2" disabled={!paymentGateways.bank.available}>
          <Building className="h-4 w-4" />
          <span>Bank</span>
        </TabsTrigger>
        <TabsTrigger value="mobile" className="flex items-center gap-2" disabled={!paymentGateways.mobile.available}>
          <Smartphone className="h-4 w-4" />
          <span>Mobile</span>
        </TabsTrigger>
      </TabsList>

      {paymentError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}

      <TabsContent value="card">
        <Card>
          <CardHeader>
            <CardTitle>Credit/Debit Card</CardTitle>
            <CardDescription>Pay securely with your credit or debit card</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Amount</div>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{amount} ETB</div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">VISA</span>
                </div>
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">MC</span>
                </div>
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">AMEX</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleCardPayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardholder-name">Cardholder Name</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="cardholder-name"
                    placeholder="John Doe"
                    className="pl-10"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    className="pl-10"
                    value={cardNumber}
                    onChange={(e) => {
                      // Only allow numbers and limit to 16 digits
                      const value = e.target.value.replace(/\D/g, "").slice(0, 16)
                      setCardNumber(value)
                    }}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => {
                      // Only allow numbers and limit to 4 digits
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                      setExpiryDate(value)
                    }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => {
                      // Only allow numbers and limit to 4 digits
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                      setCvv(value)
                    }}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${amount} ETB`
                )}
              </Button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Your payment information is secure and encrypted
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bank">
        <Card>
          <CardHeader>
            <CardTitle>Bank Transfer</CardTitle>
            <CardDescription>Pay via bank transfer to our account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Amount</div>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{amount} ETB</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Bank Details</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Bank Name:</span>
                  <span className="col-span-2 font-medium">Commercial Bank of Ethiopia</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Account Name:</span>
                  <span className="col-span-2 font-medium">Feresegna Bus Ltd.</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Account Number:</span>
                  <span className="col-span-2 font-medium">1000123456789</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500 dark:text-gray-400">Reference:</span>
                  <span className="col-span-2 font-medium">FB-{Math.floor(Math.random() * 1000000)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please transfer the exact amount to the bank account above. Include the reference number in your
                transfer. Once you've completed the transfer, click the button below to confirm.
              </p>

              <Button
                onClick={handleBankTransfer}
                className="w-full bg-accent hover:bg-accent/90 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "I've Completed the Transfer"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="mobile">
        <Card>
          <CardHeader>
            <CardTitle>Mobile Payment</CardTitle>
            <CardDescription>Pay using mobile payment services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Amount</div>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{amount} ETB</div>
            </div>

            {paymentGateways.mobile.message && (
              <Alert variant="warning" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>{paymentGateways.mobile.message}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => handleMobilePayment("TeleBirr")}
                disabled={isProcessing || !paymentGateways.mobile.available}
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold">TB</span>
                </div>
                <span>TeleBirr</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => handleMobilePayment("CBE Birr")}
                disabled={isProcessing || !paymentGateways.mobile.available}
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold">CB</span>
                </div>
                <span>CBE Birr</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => handleMobilePayment("Amole")}
                disabled={isProcessing || !paymentGateways.mobile.available}
              >
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold">AM</span>
                </div>
                <span>Amole</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => handleMobilePayment("HelloCash")}
                disabled={isProcessing || !paymentGateways.mobile.available}
              >
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold">HC</span>
                </div>
                <span>HelloCash</span>
              </Button>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>Instructions:</p>
              <ol className="list-decimal pl-5 space-y-1 mt-2">
                <li>Click on your preferred mobile payment provider</li>
                <li>You'll receive a payment request on your mobile phone</li>
                <li>Approve the payment request</li>
                <li>Your booking will be confirmed automatically</li>
              </ol>
            </div>

            {isProcessing && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Waiting for payment confirmation...</span>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

// Let's create a route management page for operators:
