"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { useNotifications } from "@/context/notification-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()
  const [open, setOpen] = useState(false)

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen && unreadCount > 0) {
      // Mark notifications as read when opening the dropdown
      setTimeout(() => markAllAsRead(), 3000)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅"
      case "warning":
        return "⚠️"
      case "error":
        return "❌"
      default:
        return "ℹ️"
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={handleOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-medium">Notifications</h3>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => markAllAsRead()} className="text-xs">
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start p-4 border-b last:border-0 cursor-default",
                  !notification.read && "bg-muted/50",
                )}
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">{getNotificationIcon(notification.type)}</span>
                    <div>
                      {notification.title && <p className="font-medium">{notification.title}</p>}
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(notification.timestamp), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-50 hover:opacity-100"
                    onClick={() => removeNotification(notification.id)}
                  >
                    ×
                  </Button>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
