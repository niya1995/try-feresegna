"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { PrivateRoute } from "@/components/auth/private-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/profile/personal-info-form"
import { SecurityForm } from "@/components/profile/security-form"
import { PreferenceSettings } from "@/components/profile/preference-settings"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal-info")

  return (
    <PrivateRoute allowedRoles={["passenger"]}>
      <MainLayout>
        <div className="bg-gray-50 dark:bg-gray-900 py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">My Profile</h1>

              <Tabs defaultValue="personal-info" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="personal-info">
                  <PersonalInfoForm />
                </TabsContent>

                <TabsContent value="security">
                  <SecurityForm />
                </TabsContent>

                <TabsContent value="preferences">
                  <PreferenceSettings />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </MainLayout>
    </PrivateRoute>
  )
}
