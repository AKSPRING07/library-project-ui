"use client"

import { Link, useLocation } from "react-router-dom"
import { LibraryBig } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { getAllRoleConfigs, getRoleConfig } from "@/lib/library-dashboard-data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const activeRole = getRoleConfig(location.pathname)
  const roleLinks = getAllRoleConfigs().map((role) => ({
    name: role.title.replace(" Dashboard", ""),
    url: role.route,
    icon: role.menus[0]?.icon ?? LibraryBig,
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground">
            <LibraryBig className="size-5" />
          </div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">Smart Library AI</p>
            <p className="truncate text-xs text-sidebar-foreground/70">Connected dashboard platform</p>
          </div>
        </Link>
        <div className="group-data-[collapsible=icon]:hidden">
          <Badge variant="outline" className="mt-3 w-full justify-center rounded-full border-sidebar-border bg-sidebar-accent/50 py-1 text-sidebar-foreground">
            {activeRole.summaryLabel}
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={activeRole.menus} />
        <NavProjects projects={roleLinks} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={activeRole.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
