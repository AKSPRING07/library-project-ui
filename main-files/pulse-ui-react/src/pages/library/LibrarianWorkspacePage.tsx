import { useState } from "react"
import {
  Activity,
  AlertCircle,
  Bell,
  BookCopy,
  BookOpen,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  Fingerprint,
  MessageSquareWarning,
  RadioTower,
  Receipt,
  Search,
  Settings,
  Shield,
  Sparkles,
  Star,
  User,
  Users,
  Mail,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { DashboardShell, StatCard } from "@/components/dashboard-shell"

export default function LibrarianWorkspacePage() {
  const [activeTab, setActiveTab] = useState<string>("overview")

  const [profileName, setProfileName] = useState("Nisha Verma")
  const [profileId, setProfileId] = useState("LIB-OPS-12")
  const [profileDept, setProfileDept] = useState("Central Library Operations")
  const [profileEmail, setProfileEmail] = useState("nisha.librarian@smartlib.ai")
  const [profilePwd, setProfilePwd] = useState("********")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [catalogCategory, setCatalogCategory] = useState<string>("All")

  const inventoryCatalog = [
    { title: "Applied Machine Learning", type: "High circulation title", category: "Circulation", location: "Shelf ML-04", available: false, code: "BK-ML-404" },
    { title: "Digital Archive Pass", type: "Premium digital access package", category: "Subscription", location: "Cloud Stack", available: true, code: "DG-ARC-220" },
    { title: "RFID Reader Cluster 3", type: "Entrance hardware monitoring node", category: "Hardware", location: "North Gate", available: true, code: "HW-RFID-03" },
    { title: "Human-Centered Design", type: "Cohort demand resource", category: "Reference", location: "Shelf B-06", available: false, code: "BK-HCD-106" },
    { title: "Sorting Robot Battery Pack", type: "Technician dependency item", category: "Maintenance", location: "Ops Bay", available: true, code: "OPS-BAT-18" },
    { title: "Fine Collection Ledger", type: "Finance operations record", category: "Administration", location: "Finance Vault", available: true, code: "FIN-LDG-78" },
  ]

  const recommendedAssets = [
    { title: "Applied Machine Learning", subtitle: "High circulation in final-year cohort", match: 98, desc: "AI predicts this title will need restocking before the next peak borrowing cycle." },
    { title: "RFID Reader Cluster 3", subtitle: "North gate hardware monitoring", match: 94, desc: "Operational priority based on live gate traffic and entrance stability trends." },
    { title: "Fine Collection Ledger", subtitle: "Collections workflow support", match: 91, desc: "Recommended for faster audit review and daily fine reconciliation checks." },
  ]

  const [priorityItems, setPriorityItems] = useState([
    { id: 1, title: "Applied Machine Learning", owner: "Circulation Desk", status: "Low stock", priority: "High", note: "Restock before weekend peak." },
    { id: 2, title: "Robot sorter complaint", owner: "Technician Team", status: "Assigned", priority: "Medium", note: "Battery degradation crossed threshold." },
    { id: 3, title: "Fine collections", owner: "Finance Desk", status: "On track", priority: "Low", note: "Rs 6,200 collected this shift." },
  ])

  const [liveInsights, setLiveInsights] = useState([
    { id: 1, title: "RFID Tracking", value: "98.4%", detail: "Reader gates stable across all entrances." },
    { id: 2, title: "Robot Fleet", value: "3/4 online", detail: "One sorting robot is in maintenance mode." },
    { id: 3, title: "Attendance Monitor", value: "2,104", detail: "Face recognition synced with gate access." },
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sentinel AI flagged 14 borrowers at high overdue risk.", unread: true },
    { id: 2, text: "Sorter bot R-03 battery health dropped to 46%.", unread: true },
    { id: 3, text: "Rs 6,200 was collected in the current shift.", unread: false },
  ])

  const filteredInventory = inventoryCatalog.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = catalogCategory === "All" || item.category === catalogCategory
    return matchesSearch && matchesCategory
  })

  let headerInfo = {
    title: `Welcome back, ${profileName.split(" ")[0]}`,
    subtitle: "Real-time view of your librarian workspace.",
    accent: "Enterprise control center",
  }

  if (activeTab === "catalog") {
    headerInfo = {
      title: "Inventory and Systems Catalog",
      subtitle: "Search books, assets, RFID nodes, and operational records from one place.",
      accent: "Library inventory control",
    }
  } else if (activeTab === "readers") {
    headerInfo = {
      title: "Operational watchlist",
      subtitle: "Monitor complaints, live systems, and priority recovery actions.",
      accent: "Live smart signals",
    }
  } else if (activeTab === "analytics") {
    headerInfo = {
      title: "Librarian analytics",
      subtitle: "Track circulation, collections, occupancy, and system health metrics.",
      accent: "AI reports and oversight",
    }
  } else if (activeTab === "settings") {
    headerInfo = {
      title: "Account Settings",
      subtitle: "Manage your librarian profile, operations desk, and access preferences.",
      accent: "Workspace settings",
    }
  }

  const handleInventoryAction = (title: string, available: boolean) => {
    if (available) {
      alert(`"${title}" has been added to the active monitoring list.`)
      setPriorityItems((prev) => [
        {
          id: Date.now(),
          title,
          owner: "Librarian Desk",
          status: "Monitoring",
          priority: "Medium",
          note: "Added from inventory catalog.",
        },
        ...prev,
      ])
      return
    }

    alert(`"${title}" has been marked for urgent librarian follow-up.`)
    setPriorityItems((prev) => [
      {
        id: Date.now(),
        title,
        owner: "Circulation Desk",
        status: "Escalated",
        priority: "High",
        note: "Immediate stock or recovery action required.",
      },
      ...prev,
    ])
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <DashboardShell
      title={headerInfo.title}
      subtitle={headerInfo.subtitle}
      role="Librarian"
      accent={headerInfo.accent}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab)}
    >
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-glow"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-300">
                  <AlertCircle className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-amber-200">Urgent Operations Alert</div>
                  <p className="text-xs text-amber-300/80">One sorting robot is in maintenance mode and 14 borrowers have been flagged for overdue risk.</p>
                </div>
              </div>
              <button className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-amber-300">
                Open AI Report
              </button>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total books" value="24.8K" delta="+186 cataloged" icon={BookCopy} />
              <StatCard label="Active borrowers" value="1,286" delta="+8.2% today" icon={Users} />
              <StatCard label="Overdue books" value="93" delta="-12 recovered" icon={AlertCircle} />
              <StatCard label="Fine collections" value="Rs 48K" delta="+Rs 6K today" icon={Receipt} />
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <Search className="h-4 w-4 text-neon" /> Smart Search
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">Find books, users, RFID events, complaints, and AI reports instantly with librarian autocomplete.</p>

              <div className="mt-4 flex flex-col gap-3 lg:flex-row">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books, users, assets, RFID events, or reports..."
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setActiveTab("catalog")} className="rounded-xl bg-neon-gradient px-4 py-2 text-xs font-semibold text-neon-foreground transition hover:shadow-glow">
                    Search
                  </button>
                  <button onClick={() => setActiveTab("catalog")} className="rounded-xl bg-neon-gradient px-4 py-2 text-xs font-semibold text-neon-foreground transition hover:shadow-glow">
                    Open AI Workspace
                  </button>
                  <button onClick={() => setActiveTab("readers")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-foreground transition hover:border-neon/30 hover:text-neon">
                    Launch Assistant
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
              <div className="rounded-2xl glass p-5 shadow-sm">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-neon animate-pulse" /> AI Operational Recommendations
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">Tailored recommendations based on circulation demand, system status, and librarian workload.</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {recommendedAssets.map((item, index) => (
                    <div key={item.title} className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-3 transition hover:border-neon/30">
                      <div className={`mb-3 h-28 rounded-lg ${index === 0 ? "bg-gradient-to-br from-amber-600 to-yellow-600" : index === 1 ? "bg-gradient-to-br from-indigo-600 to-purple-600" : "bg-gradient-to-br from-rose-600 to-pink-600"} opacity-80 transition duration-300 group-hover:scale-102`} />
                      <div className="truncate text-xs font-semibold text-foreground">{item.title}</div>
                      <div className="truncate text-[10px] text-muted-foreground">{item.subtitle}</div>
                      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{item.desc}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        <span className="font-medium text-neon">{item.match}% match</span>
                        <button
                          onClick={() => handleInventoryAction(item.title, true)}
                          className="text-[10px] text-muted-foreground hover:text-foreground hover:underline"
                        >
                          Monitor
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl glass p-5 shadow-sm h-fit">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                    <Bell className="h-4 w-4 text-neon" /> Notification Center
                  </h2>
                  <button onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))} className="text-[10px] text-neon hover:underline">
                    Mark all read
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className={`rounded-xl border p-3 text-xs transition ${n.unread ? "border-neon/20 bg-neon/5" : "border-white/5 bg-white/5"}`}>
                      <div className="flex items-start gap-2">
                        {n.unread && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />}
                        <span className="text-foreground">{n.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "catalog" && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-neon" /> Inventory and Systems Catalog
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Browse books, hardware, subscriptions, and operational assets from one inventory layer.</p>

              <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, code, system type, or location..."
                    className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["All", "Circulation", "Subscription", "Hardware", "Reference", "Maintenance", "Administration"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCatalogCategory(cat)}
                      className={`rounded-lg px-3 py-1.5 transition ${catalogCategory === cat ? "bg-neon-gradient text-neon-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Available Inventory Assets</h3>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredInventory.map((item) => (
                  <div key={item.code} className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition hover:border-neon/20">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="font-mono">{item.code}</span>
                        <span className="rounded bg-white/5 px-1.5 py-0.5 font-medium">{item.category}</span>
                      </div>
                      <h4 className="mt-2 line-clamp-1 text-sm font-bold text-foreground">{item.title}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.type}</p>
                      <div className="mt-1 text-[11px] text-muted-foreground">Location: {item.location}</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                      <span className={`text-xs font-semibold ${item.available ? "text-emerald-400" : "text-amber-400"}`}>
                        {item.available ? "Stable" : "Needs action"}
                      </span>
                      <button
                        onClick={() => handleInventoryAction(item.title, item.available)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${item.available ? "bg-neon-gradient text-neon-foreground hover:shadow-glow" : "border border-white/10 bg-white/5 text-neon hover:border-neon"}`}
                      >
                        {item.available ? "Monitor" : "Escalate"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm border border-neon/10">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-neon animate-pulse" /> AI Recommended Assets
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Sentinel AI picks based on demand spikes, collection health, and system stability.</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {recommendedAssets.map((rec) => (
                  <div key={rec.title} className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition hover:border-neon/30">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neon">{rec.match}% AI Match</span>
                        <Star className="h-3.5 w-3.5 fill-neon text-neon" />
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-foreground">{rec.title}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">{rec.subtitle}</p>
                      <p className="mt-2 rounded bg-white/5 p-2 text-[11px] leading-relaxed text-muted-foreground">{rec.desc}</p>
                    </div>
                    <button
                      onClick={() => handleInventoryAction(rec.title, true)}
                      className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold transition hover:border-neon hover:text-neon"
                    >
                      Add To Watchlist
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "readers" && (
          <motion.div
            key="readers"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Settings className="h-4 w-4 text-neon" /> Priority Operations Board
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Track inventory exceptions, technician issues, and collection actions in one place.</p>

              <div className="mt-4 space-y-3">
                {priorityItems.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.owner}</p>
                      <div className="mt-1 flex gap-3 text-[10px] text-muted-foreground">
                        <span>Status: {item.status}</span>
                        <span>Priority: {item.priority}</span>
                      </div>
                      <p className="mt-2 text-[11px] text-muted-foreground">{item.note}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.priority === "High" ? "border border-amber-500/20 bg-amber-500/10 text-amber-300" : item.priority === "Medium" ? "border border-sky-500/20 bg-sky-500/10 text-sky-300" : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm border border-neon/10">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <BrainCircuit className="h-4 w-4 text-neon" /> Live Smart Signals
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time insights across RFID, robots, attendance, and librarian workflows.</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {liveInsights.map((insight, index) => (
                  <div key={insight.id} className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neon">{insight.value}</span>
                      {index === 0 && <RadioTower className="h-4 w-4 text-neon" />}
                      {index === 1 && <Bot className="h-4 w-4 text-neon" />}
                      {index === 2 && <Fingerprint className="h-4 w-4 text-neon" />}
                    </div>
                    <h4 className="mt-2 text-sm font-semibold text-foreground">{insight.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{insight.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total books" value="24.8K" delta="+186 cataloged" icon={BookCopy} />
              <StatCard label="Daily visitors" value="2,104" delta="Peak at 2 PM" icon={Fingerprint} />
              <StatCard label="Active complaints" value="11" delta="3 assigned to tech" icon={MessageSquareWarning} />
              <StatCard label="Real-time activity" value="348" delta="RFID + QR events" icon={Activity} />
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm border border-rose-500/20">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <MessageSquareWarning className="h-5 w-5 text-rose-400" /> Complaint and Recovery Watch
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Displaying active complaint signals and overdue recovery opportunities.</p>

              <div className="mt-4 space-y-3">
                {priorityItems.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-rose-500/10 bg-rose-500/5 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-rose-200">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.owner}</p>
                      <div className="mt-1 text-[10px] text-rose-300">
                        {item.status} • {item.priority} priority
                      </div>
                    </div>
                    <button className="rounded-lg bg-rose-500 px-3.5 py-2 text-xs font-semibold text-black transition hover:bg-rose-400">
                      Review Action
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-neon" /> Operations Timeline
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Recent circulation, AI report, complaint, and occupancy events.</p>

              <div className="mt-4 space-y-2 text-xs">
                {[
                  { title: "Bulk return batch processed", action: "67 books re-shelved and RFID-confirmed", time: "07:55 AM", type: "active" },
                  { title: "AI report generated", action: "Borrowing anomaly detected in reference section", time: "10:40 AM", type: "live" },
                  { title: "Technician complaint filed", action: "Robot sorter battery degradation crossed threshold", time: "12:25 PM", type: "queued" },
                  { title: "Occupancy alert", action: "West floor surpassed 85% predicted limit", time: "Now", type: "warning" },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3">
                    <div>
                      <span className="font-semibold text-foreground">{log.title}</span>
                      <span className={`ml-2 rounded px-2 py-0.5 text-[10px] font-medium ${log.type === "warning" ? "bg-rose-500/10 text-rose-300" : log.type === "queued" ? "bg-amber-500/10 text-amber-300" : log.type === "live" ? "bg-sky-500/10 text-sky-300" : "bg-emerald-500/10 text-emerald-300"}`}>
                        {log.action}
                      </span>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            <div className="max-w-2xl rounded-2xl glass p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-neon" /> Librarian Profile Settings
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Update your librarian identity, operations desk, and access preferences.</p>

              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300"
                >
                  <Check className="h-4 w-4" /> Profile details saved and updated successfully!
                </motion.div>
              )}

              <form onSubmit={handleProfileSave} className="mt-6 space-y-4 text-xs">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-semibold text-muted-foreground">Full Name</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-semibold text-muted-foreground">Librarian ID</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <input type="text" value={profileId} onChange={(e) => setProfileId(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none font-mono" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-semibold text-muted-foreground">Operations Desk</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                      <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                      <input type="text" value={profileDept} onChange={(e) => setProfileDept(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-semibold text-muted-foreground">Email Address</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-semibold text-muted-foreground">Password</label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <input type="password" value={profilePwd} onChange={(e) => setProfilePwd(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none" />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="rounded-xl bg-neon-gradient px-5 py-2.5 text-xs font-bold text-neon-foreground transition hover:shadow-glow">
                    Save Profile Updates
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  )
}
