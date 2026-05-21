import { Bell } from "lucide-react"
import { useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { getRoleConfig } from "@/lib/library-dashboard-data"

export function NotificationDropdown() {
  const location = useLocation()
  const activeRole = getRoleConfig(location.pathname)
  const unreadCount = activeRole.notifications.filter((item) => item.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full [&_svg]:size-5">
            <Bell />
          </Button>

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 rounded-xl border p-0 shadow-xl">
        <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
          <span>{activeRole.title} notifications</span>
          <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="h-80 overflow-y-auto">
          <div className="flex flex-col">
            {activeRole.notifications.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex cursor-pointer gap-3 px-4 py-3 transition-colors",
                  item.unread ? "bg-muted/50 hover:bg-muted" : "hover:bg-muted/50"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeRole.user.avatar} />
                  <AvatarFallback>{item.title.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium leading-none">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-2">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
