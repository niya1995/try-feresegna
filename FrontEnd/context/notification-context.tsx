"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

// Define notification types
export type NotificationType = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  type: NotificationType
  message: string
  title?: string
  read: boolean
  timestamp: Date
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNotifications = localStorage.getItem("notifications")
      if (savedNotifications) {
        try {
          const parsedNotifications = JSON.parse(savedNotifications).map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp),
          }))
          setNotifications(parsedNotifications)
          updateUnreadCount(parsedNotifications)
        } catch (error) {
          console.error("Failed to parse notifications from localStorage", error)
        }
      }
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
    updateUnreadCount(notifications)
  }, [notifications])

  // Update unread count
  const updateUnreadCount = (notifs: Notification[]) => {
    setUnreadCount(notifs.filter((n) => !n.read).length)
  }

  // Add a new notification
  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notifications
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === "error" ? "destructive" : "default",
    })
  }

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Mock function to simulate receiving notifications (for demo purposes)
  useEffect(() => {
    // Simulate receiving a notification after 5 seconds
    const timer = setTimeout(() => {
      addNotification({
        type: "info",
        message: "Welcome to Feresegna Bus! Book your first trip today.",
        title: "Welcome",
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
