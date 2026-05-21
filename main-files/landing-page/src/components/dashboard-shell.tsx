import { motion } from "framer-motion"
import { useState } from "react"
import {
  BarChart3,
  Bell,
  BookOpenCheck,
  Bot,
  LayoutDashboard,
  Library,
  LogOut,
  Search,
  Send,
  Settings,
  Sparkles,
  Users,
} from "lucide-react"

import { AIParticles } from "@/components/ui/ai-particles"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function DashboardShell({
  title,
  subtitle,
  role,
  children,
  accent,
  activeTab,
  onTabChange,
}: {
  title: string
  subtitle?: string
  role: string
  children: React.ReactNode
  accent?: string
  activeTab?: string
  onTabChange?: (tab: string) => void
}) {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "lumi"; text: string }>>([
    { sender: "lumi", text: `Hello! I am Lumi, your AI Library Assistant. How can I help you manage your ${role.toLowerCase()} workspace today?` },
  ])
  const [chatInput, setChatInput] = useState("")

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const userMsg = chatInput
    setChatInput("")
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }])

    setTimeout(() => {
      let lumiResponse = "I analyzed our digital catalog. We have resources matching your query. Let me know if you would like me to draft a citation or sum up chapter summaries."
      const lowMsg = userMsg.toLowerCase()
      if (role.toLowerCase() === "student") {
        if (lowMsg.includes("recommend")) {
          lumiResponse = "Based on your interest in Machine Learning, I highly recommend checking out 'Designing Machine Learning Systems' by Chip Huyen or reading the 'Scaling Laws for Sparse Mixtures' paper in our arXiv section."
        } else if (lowMsg.includes("due") || lowMsg.includes("borrow")) {
          lumiResponse = "You currently have active borrowed books. The closest due date is 'Probabilistic ML' which is due in 2 days. You can click 'Renew' directly on your borrowed list."
        }
      }
      setChatMessages((prev) => [...prev, { sender: "lumi", text: lumiResponse }])
    }, 850)
  }

  const nav = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Library, label: "Catalog" },
    { icon: Users, label: "Readers" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-hero text-foreground">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <AIParticles count={14} />
      <div className="relative z-10 flex h-full">
        <aside className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-white/5 bg-deep/40 p-4 lg:flex">
          <a href="/pulse-ui/landing-page/" className="mb-8 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-neon-gradient shadow-glow">
              <BookOpenCheck className="h-4 w-4 text-[var(--neon-foreground)]" />
            </div>
            <span className="font-display text-lg font-semibold">
              Lumina<span className="text-neon">.</span>
            </span>
          </a>

          <nav className="space-y-1">
            {nav.map((n, i) => {
              const active = activeTab ? activeTab.toLowerCase() === n.label.toLowerCase() : i === 0
              return (
                <button
                  key={n.label}
                  onClick={() => onTabChange?.(n.label.toLowerCase())}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${active ? "border-l-2 border-[var(--neon)] bg-white/10 pl-2.5 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-8 rounded-xl glass p-3">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Signed in as</div>
            <div className="mt-0.5 text-sm font-medium">{role}</div>
            <a
              href="/pulse-ui/landing-page/"
              onClick={() => localStorage.removeItem("lumina_session")}
              className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </a>
          </div>
        </aside>

        <main className="flex h-screen flex-1 flex-col overflow-hidden">
          <header className="z-20 flex shrink-0 items-center gap-3 border-b border-white/5 bg-deep/50 px-6 py-3 backdrop-blur">
            <div className="flex flex-1 items-center gap-2 rounded-xl glass px-3 py-2 text-xs">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Ask Lumi anything — books, readers, insights..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">Ctrl K</span>
            </div>
            <ThemeToggle />
            <button className="relative grid h-9 w-9 place-items-center rounded-xl glass">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--neon)]" />
            </button>
          </header>

          <div className="relative z-0 flex-1 overflow-y-auto p-6">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
                    <Sparkles className="h-3 w-3" /> {accent ?? "AI workspace"}
                  </div>
                  <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">{title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">{subtitle || `Real-time view of your ${role.toLowerCase()} workspace.`}</p>
                </div>
              </div>

              <div className="mt-6">{children}</div>
            </motion.div>
          </div>
        </main>
      </div>

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end">
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-3 flex h-[380px] w-80 flex-col rounded-2xl glass-strong p-3 shadow-elevated"
          >
            <div className="shrink-0 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-neon-gradient">
                  <Bot className="h-3.5 w-3.5 text-[var(--neon-foreground)]" />
                </div>
                <div>
                  <div className="text-sm font-medium">Lumi Assistant</div>
                  <div className="text-[10px] text-neon">online</div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl p-2.5 leading-relaxed ${msg.sender === "user" ? "bg-neon-gradient text-[var(--neon-foreground)]" : "border border-white/5 bg-white/5 text-muted-foreground"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSend} className="mt-2.5 flex shrink-0 gap-1.5 border-t border-white/10 pt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Lumi anything..."
                className="w-full rounded-lg border border-white/5 bg-white/5 px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[var(--neon)]/30"
              />
              <button type="submit" className="flex shrink-0 items-center justify-center rounded-lg bg-neon-gradient p-1.5 text-[var(--neon-foreground)]">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}

        <button
          onClick={() => setChatOpen((v) => !v)}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-neon-gradient text-[var(--neon-foreground)] shadow-glow animate-pulse-glow"
          aria-label="Open assistant"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string
  value: string
  delta?: string
  icon: React.ElementType
}) {
  return (
    <motion.div whileHover={{ y: -3 }} className="rounded-2xl glass p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-neon">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-2 font-display text-2xl font-semibold">{value}</div>
      {delta && <div className="mt-1 text-xs text-neon">{delta}</div>}
    </motion.div>
  )
}
