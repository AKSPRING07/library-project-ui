import { useState } from "react"
import {
  AlertCircle,
  BadgeCheck,
  Bell,
  BookAudio,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Search,
  Shield,
  Sparkles,
  Star,
  TicketCheck,
  TrendingUp,
  User,
  Mail,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { DashboardShell, StatCard } from "@/components/dashboard-shell"

export default function StaffWorkspacePage() {
  const [activeTab, setActiveTab] = useState<string>("overview")

  const [profileName, setProfileName] = useState("Dr. Meera Shah")
  const [profileId, setProfileId] = useState("FAC-REQ-204")
  const [profileDept, setProfileDept] = useState("Engineering Faculty")
  const [profileEmail, setProfileEmail] = useState("meera.staff@smartlib.ai")
  const [profilePwd, setProfilePwd] = useState("********")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [catalogCategory, setCatalogCategory] = useState<string>("All")

  const resourceCatalog = [
    { title: "Advanced Micro Sensors for Robotics", author: "Lena Foster", category: "Engineering", publisher: "Springer", available: false, isbn: "978-3030458713" },
    { title: "Journal of Research Methods", author: "Morgan Ellis", category: "Research", publisher: "Sage", available: true, isbn: "978-1412974178" },
    { title: "Edge AI for Autonomous Labs", author: "Arjun Rao", category: "Engineering", publisher: "IEEE Press", available: true, isbn: "978-1119800118" },
    { title: "Human Factors in Robotics", author: "Dana Brooks", category: "Interdisciplinary", publisher: "CRC Press", available: true, isbn: "978-1138742218" },
    { title: "Cybersecurity Policy Review", author: "Ava Morgan", category: "Policy", publisher: "Elsevier", available: false, isbn: "978-0128245101" },
    { title: "Biostatistics Field Manual", author: "Priya Nair", category: "Life Science", publisher: "Wiley", available: true, isbn: "978-1119711827" },
  ]

  const recommendedResources = [
    { title: "Edge AI for Autonomous Labs", author: "Arjun Rao", match: 97, desc: "Matched to your engineering syllabus update and current faculty requests." },
    { title: "Journal of Research Methods", author: "Morgan Ellis", match: 93, desc: "Useful for multi-department proposal reviews and methodology support." },
    { title: "Human Factors in Robotics", author: "Dana Brooks", match: 91, desc: "Strong alignment with interdisciplinary project supervision." },
  ]

  const [activeRequests, setActiveRequests] = useState([
    { id: 1, title: "Advanced Micro Sensors for Robotics", author: "Lena Foster", status: "Awaiting approval", priority: "High", department: "Engineering" },
    { id: 2, title: "Cybersecurity Policy Review", author: "Ava Morgan", status: "Vendor follow-up", priority: "Medium", department: "Management" },
    { id: 3, title: "Journal of Research Methods", author: "Morgan Ellis", status: "Approved", priority: "Low", department: "Research" },
  ])

  const [departmentRequests, setDepartmentRequests] = useState([
    { id: 1, name: "Engineering", demand: "29%", note: "Highest volume of AI and robotics requests." },
    { id: 2, name: "Management", demand: "19%", note: "Budget planning and policy research rising." },
    { id: 3, name: "Life Science", demand: "17%", note: "New journals requested for lab coursework." },
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Three engineering book requests were approved.", unread: true },
    { id: 2, text: "Atlas AI found cheaper alternatives for two titles.", unread: true },
    { id: 3, text: "Cybersecurity material demand rose 18% this week.", unread: false },
  ])

  const filteredResources = resourceCatalog.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)
    const matchesCategory = catalogCategory === "All" || book.category === catalogCategory
    return matchesSearch && matchesCategory
  })

  let headerInfo = {
    title: `Welcome back, ${profileName.split(" ")[1] ?? profileName.split(" ")[0]}`,
    subtitle: "Real-time view of your staff workspace.",
    accent: "Academic resource hub",
  }

  if (activeTab === "catalog") {
    headerInfo = {
      title: "Research Resource Catalog",
      subtitle: "Search books, journals, and faculty support material across departments.",
      accent: "Discover faculty resources",
    }
  } else if (activeTab === "readers") {
    headerInfo = {
      title: "Department request pulse",
      subtitle: "Track approvals, demand spikes, and AI-led department recommendations.",
      accent: "Faculty collaboration",
    }
  } else if (activeTab === "analytics") {
    headerInfo = {
      title: "Staff analytics",
      subtitle: "Monitor approvals, resource demand, and request workflow health.",
      accent: "Operational intelligence",
    }
  } else if (activeTab === "settings") {
    headerInfo = {
      title: "Account Settings",
      subtitle: "Manage your faculty profile, department identity, and contact preferences.",
      accent: "Workspace settings",
    }
  }

  const handleCatalogRequest = (title: string, author: string, available: boolean) => {
    if (available) {
      alert(`"${title}" was added to your faculty shortlist for immediate request processing.`)
      setActiveRequests((prev) => [
        {
          id: Date.now(),
          title,
          author,
          status: "Pending faculty review",
          priority: "Medium",
          department: "Engineering",
        },
        ...prev,
      ])
      return
    }

    alert(`"${title}" has been queued for vendor follow-up and department approval.`)
    setActiveRequests((prev) => [
      {
        id: Date.now(),
        title,
        author,
        status: "Queued for approval",
        priority: "High",
        department: "Engineering",
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
      role="Staff"
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
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 shadow-glow"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <AlertCircle className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-200">Urgent Approval Alert</div>
                  <p className="text-xs text-emerald-300/80">Five high-priority requests are waiting for department review. Atlas AI recommends clearing engineering approvals first.</p>
                </div>
              </div>
              <button className="rounded-xl bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300">
                Review Queue
              </button>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total requested books" value="148" delta="+12 this month" icon={BookOpen} />
              <StatCard label="Pending approvals" value="17" delta="5 high priority" icon={TicketCheck} />
              <StatCard label="Approved requests" value="94" delta="87% approval rate" icon={BadgeCheck} />
              <StatCard label="Research resources" value="56" delta="11 new journals" icon={BookAudio} />
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <Search className="h-4 w-4 text-neon" /> Smart Search
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">Find requests, journals, departments, and approval records instantly with AI autocomplete</p>

              <div className="mt-4 flex flex-col gap-3 lg:flex-row">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search requests, research material, departments, or approvals..."
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
                  <Sparkles className="h-4 w-4 text-neon animate-pulse" /> AI Research Recommendations
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">Tailored suggestions based on department demand, proposal trends, and your faculty request history.</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {recommendedResources.map((book, index) => (
                    <div key={book.title} className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-3 transition hover:border-neon/30">
                      <div className={`mb-3 h-28 rounded-lg ${index === 0 ? "bg-gradient-to-br from-emerald-600 to-teal-600" : index === 1 ? "bg-gradient-to-br from-sky-600 to-indigo-600" : "bg-gradient-to-br from-amber-600 to-yellow-600"} opacity-80 transition duration-300 group-hover:scale-102`} />
                      <div className="truncate text-xs font-semibold text-foreground">{book.title}</div>
                      <div className="truncate text-[10px] text-muted-foreground">{book.author}</div>
                      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{book.desc}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        <span className="font-medium text-neon">{book.match}% match</span>
                        <button
                          onClick={() => handleCatalogRequest(book.title, book.author, true)}
                          className="text-[10px] text-muted-foreground hover:text-foreground hover:underline"
                        >
                          Add Request
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
                <FileSearch className="h-4 w-4 text-neon" /> Research Resource Catalog
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Browse books, journals, and external request candidates for your department.</p>

              <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, ISBN, or department..."
                    className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["All", "Engineering", "Research", "Interdisciplinary", "Policy", "Life Science"].map((cat) => (
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
              <h3 className="mb-3 text-sm font-semibold text-foreground">Available Faculty Resources</h3>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredResources.map((book) => (
                  <div key={book.isbn} className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition hover:border-neon/20">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="font-mono">{book.isbn}</span>
                        <span className="rounded bg-white/5 px-1.5 py-0.5 font-medium">{book.category}</span>
                      </div>
                      <h4 className="mt-2 line-clamp-1 text-sm font-bold text-foreground">{book.title}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">by {book.author}</p>
                      <div className="mt-1 text-[11px] text-muted-foreground">Publisher: {book.publisher}</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                      <span className={`text-xs font-semibold ${book.available ? "text-emerald-400" : "text-amber-400"}`}>
                        {book.available ? "Available" : "Approval Needed"}
                      </span>
                      <button
                        onClick={() => handleCatalogRequest(book.title, book.author, book.available)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${book.available ? "bg-neon-gradient text-neon-foreground hover:shadow-glow" : "border border-white/10 bg-white/5 text-neon hover:border-neon"}`}
                      >
                        {book.available ? "Request" : "Queue"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm border border-neon/10">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-neon animate-pulse" /> AI Recommended Research Picks
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Atlas AI suggestions aligned to teaching plans, grant proposals, and faculty demand.</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {recommendedResources.map((rec) => (
                  <div key={rec.title} className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition hover:border-neon/30">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neon">{rec.match}% AI Match</span>
                        <Star className="h-3.5 w-3.5 fill-neon text-neon" />
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-foreground">{rec.title}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">by {rec.author}</p>
                      <p className="mt-2 rounded bg-white/5 p-2 text-[11px] leading-relaxed text-muted-foreground">{rec.desc}</p>
                    </div>
                    <button
                      onClick={() => handleCatalogRequest(rec.title, rec.author, true)}
                      className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold transition hover:border-neon hover:text-neon"
                    >
                      Add To Request Queue
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
                <ClipboardCheck className="h-4 w-4 text-neon" /> Request Workflow Board
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Monitor active faculty requests, vendor status, and department priority.</p>

              <div className="mt-4 space-y-3">
                {activeRequests.map((request) => (
                  <div key={request.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{request.title}</h4>
                      <p className="text-xs text-muted-foreground">by {request.author}</p>
                      <div className="mt-1 flex gap-3 text-[10px] text-muted-foreground">
                        <span>Department: {request.department}</span>
                        <span>Priority: {request.priority}</span>
                      </div>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${request.status === "Approved" ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : request.priority === "High" ? "border border-amber-500/20 bg-amber-500/10 text-amber-300" : "border border-blue-500/20 bg-blue-500/10 text-blue-300"}`}>
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm border border-neon/10">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <TrendingUp className="h-4 w-4 text-neon" /> Department Demand Recommendations
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">AI-ranked departments based on current demand and academic urgency.</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {departmentRequests.map((dept) => (
                  <div key={dept.id} className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neon">{dept.demand} demand</span>
                      <Building2 className="h-4 w-4 text-neon" />
                    </div>
                    <h4 className="mt-2 text-sm font-semibold text-foreground">{dept.name}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{dept.note}</p>
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
              <StatCard label="Total requested books" value="148" delta="+12 this month" icon={BookOpen} />
              <StatCard label="Pending approvals" value="17" delta="5 high priority" icon={TicketCheck} />
              <StatCard label="Approved requests" value="94" delta="87% approval rate" icon={CheckCircle2} />
              <StatCard label="Department usage" value="81%" delta="Engineering leads" icon={Building2} />
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm border border-emerald-500/20">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-emerald-400" /> Approval Queue Insights
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">High-priority requests that need immediate follow-up or approval.</p>

              <div className="mt-4 space-y-3">
                {activeRequests.map((request) => (
                  <div key={request.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-200">{request.title}</h4>
                      <p className="text-xs text-muted-foreground">by {request.author}</p>
                      <div className="mt-1 text-[10px] text-emerald-300">
                        {request.department} • {request.priority} priority
                      </div>
                    </div>
                    <button className="rounded-lg bg-emerald-400 px-3.5 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300">
                      Follow Up
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <TicketCheck className="h-4 w-4 text-neon" /> Request Activity Log
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Recent approvals, vendor handoffs, and AI workflow triggers.</p>

              <div className="mt-4 space-y-2 text-xs">
                {[
                  { title: "Advanced Micro Sensors for Robotics", action: "External request submitted", time: "08:45 AM", type: "active" },
                  { title: "Atlas AI", action: "Matched 6 references to syllabus update", time: "10:20 AM", type: "live" },
                  { title: "Department budget approval", action: "Supporting document uploaded", time: "12:10 PM", type: "queued" },
                  { title: "Approval delay", action: "Two requests exceeded SLA", time: "Now", type: "warning" },
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
                <User className="h-5 w-5 text-neon" /> Faculty Profile Settings
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Update your faculty identity, department ownership, and communication preferences.</p>

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
                    <label className="mb-1.5 block font-semibold text-muted-foreground">Faculty ID</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <input type="text" value={profileId} onChange={(e) => setProfileId(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none font-mono" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-semibold text-muted-foreground">Department</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
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
