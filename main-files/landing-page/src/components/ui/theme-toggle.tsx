import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const stored = localStorage.getItem("theme")
    const dark = stored ? stored === "dark" : root.classList.contains("dark")
    root.classList.toggle("dark", dark)
    root.classList.toggle("light", !dark)
    setIsDark(dark)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    const root = document.documentElement
    root.classList.toggle("dark", next)
    root.classList.toggle("light", !next)
    localStorage.setItem("theme", next ? "dark" : "light")
    setIsDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative grid h-9 w-9 place-items-center rounded-xl glass"
    >
      {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
