"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function PreferenceSettings() {
  const { toast } = useToast()

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    language: "en",
    currency: "ETB",
    seatPreference: "window",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSwitchChange = (name: string) => {
    setPreferences((prev) => ({ ...prev, [name]: !prev[name as keyof typeof preferences] as any }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setPreferences((prev) => ({ ...prev, seatPreference: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Preferences Updated",
      description: "Your preferences have been updated successfully.",
    })

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Manage your notification and display preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive booking confirmations and updates via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.emailNotifications}
                onCheckedChange={() => handleSwitchChange("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive booking confirmations and updates via SMS
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={preferences.smsNotifications}
                onCheckedChange={() => handleSwitchChange("smsNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive promotional offers and newsletters</p>
              </div>
              <Switch
                id="marketing-emails"
                checked={preferences.marketingEmails}
                onCheckedChange={() => handleSwitchChange("marketingEmails")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Display</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={preferences.language} onValueChange={(value) => handleSelectChange("language", value)}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="am">Amharic</SelectItem>
                    <SelectItem value="or">Oromo</SelectItem>
                    <SelectItem value="ti">Tigrinya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={preferences.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Travel Preferences</h3>

            <div className="space-y-2">
              <Label>Seat Preference</Label>
              <RadioGroup
                value={preferences.seatPreference}
                onValueChange={handleRadioChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="window" id="window" />
                  <Label htmlFor="window">Window Seat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aisle" id="aisle" />
                  <Label htmlFor="aisle">Aisle Seat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-preference" id="no-preference" />
                  <Label htmlFor="no-preference">No Preference</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
