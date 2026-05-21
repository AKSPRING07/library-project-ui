import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { getAllRoleConfigs, getRoleConfig } from "@/lib/library-dashboard-data"

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const activeRole = getRoleConfig(location.pathname)
  const roles = getAllRoleConfigs()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full [&_svg]:size-5"
        onClick={() => setOpen(true)}
      >
        <Search />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={activeRole.searchPlaceholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading={activeRole.title}>
            {activeRole.menus.slice(0, 8).map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => {
                  navigate(item.url)
                  setOpen(false)
                }}
              >
                {item.icon ? <item.icon className="mr-2 size-4" /> : <Sparkles className="mr-2 size-4" />}
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Switch dashboard">
            {roles.map((role) => (
              <CommandItem
                key={role.role}
                onSelect={() => {
                  navigate(role.route)
                  setOpen(false)
                }}
              >
                {role.menus[0]?.icon ? <role.menus[0].icon className="mr-2 size-4" /> : <Sparkles className="mr-2 size-4" />}
                {role.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
