import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { Bot, Sparkles } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { NotificationDropdown } from "@/components/notification-dropdown"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { GlobalSearch } from "@/components/global-search"
import Footer from "@/layouts/Footer"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { getRoleConfig } from "@/lib/library-dashboard-data"

function formatPathSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function AppLayout() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(true)
  const location = useLocation()
  const activeRole = getRoleConfig(location.pathname)

  const breadcrumbItems = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean)
    return segments.slice(1).map(formatPathSegment)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setOpen(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />

      <SidebarInset className="bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_24%),linear-gradient(180deg,_transparent,_hsl(var(--muted))/0.4)]">
        <header
          className={cn(
            "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b transition-all duration-200",
            scrolled
              ? "bg-background/85 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/70"
              : "bg-background/60 backdrop-blur"
          )}
        >
          <div className="flex items-center gap-3 px-4 lg:px-6">
            <SidebarTrigger
              size="icon"
              className="h-9 w-9 rounded-full transition-colors hover:bg-muted/60 [&_svg]:size-5"
            />

            <Separator orientation="vertical" className="h-4" />

            <div className="hidden md:block">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activeRole.title.replace(" Dashboard", "")}</BreadcrumbPage>
                  </BreadcrumbItem>
                  {breadcrumbItems.length > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumbItems.at(-1) ?? "Overview"}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 px-4 lg:px-6">
            <Badge variant="outline" className="hidden rounded-full px-3 py-1 lg:inline-flex">
              <Sparkles className="mr-2 size-3.5" />
              AI themed interface
            </Badge>
            <GlobalSearch />
            <ThemeToggle />
            <NotificationDropdown />
            <div className="hidden rounded-full border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground lg:flex lg:items-center lg:gap-2">
              <Bot className="size-3.5" />
              Floating AI online
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
