import { useState } from "react"
import {
  ArrowUpRight,
  Award,
  Bell,
  BookOpen,
  Bookmark,
  Clock,
  FileText,
  Library,
  Network,
  Search,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"

import { DashboardShell, StatCard } from "@/components/dashboard-shell"
import { BookCard } from "@/components/ui/book-card"

type SearchItem = {
  title: string
  author: string
  type: string
  publisher: string
  match: number
  category: "books" | "papers" | "grants"
  cover?: string
}

type ReservationItem = {
  id: number
  title: string
  author: string
  status: string
  expectedPickup: string
}

export default function StaffDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFilter, setSearchFilter] = useState<"all" | "books" | "papers" | "grants">("all")
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const [notifications] = useState([
    { id: 1, text: "Grant submission deadline for Academic Research Fund is set to June 15.", unread: true },
    { id: 2, text: "Your requested inter-library loan 'Quantum Teleportation Paradigms' has arrived.", unread: true },
    { id: 3, text: "System broadcast: Academic credentials validation complete.", unread: false },
  ])

  const [borrowedResources] = useState([
    { id: 1, title: "Scaling Laws for Sparse Mixtures", author: "William Fedus", due: "2026-08-15", daysLeft: 87, type: "Research Paper", limitMax: 90 },
    { id: 2, title: "Quantum Error Correction Survey", author: "Emanuel Knill", due: "2026-09-01", daysLeft: 104, type: "Journal Article", limitMax: 120 },
    { id: 3, title: "Introduction to Algorithms", author: "Cormen", due: "2026-06-30", daysLeft: 41, type: "Teaching Resource Book", limitMax: 60 },
  ])

  const [reservations, setReservations] = useState<ReservationItem[]>([
    { id: 1, title: "Deep Learning Foundations", author: "Goodfellow", status: "Priority Queue #1 (Pre-approved)", expectedPickup: "2026-05-22" },
    { id: 2, title: "Academic Teaching Methodologies", author: "Dr. Evelyn Ross", status: "Ready at Faculty Desk", expectedPickup: "Available Now" },
  ])

  const mockDb: SearchItem[] = [
    { title: "Scaling Laws for Sparse Mixtures", author: "W. Fedus", type: "Research Paper", publisher: "arXiv ML", match: 99, category: "papers", cover: "from-blue-600 to-indigo-600" },
    { title: "Quantum Computing Principles", author: "Nielsen & Chuang", type: "Teaching Resource Book", publisher: "Cambridge", match: 96, category: "books", cover: "from-amber-600 to-yellow-600" },
    { title: "Deep Learning Foundations", author: "I. Goodfellow", type: "Teaching Resource Book", publisher: "MIT Press", match: 94, category: "books", cover: "from-rose-600 to-pink-600" },
    { title: "NSF Academic Research Grant Index 2026", author: "NSF Board", type: "Grant Proposal Guide", publisher: "US Gov Science", match: 91, category: "grants", cover: "from-emerald-600 to-teal-600" },
    { title: "Quantum Teleportation Paradigms", author: "Charles H. Bennett", type: "Research Paper", publisher: "APS Physics", match: 89, category: "papers", cover: "from-violet-600 to-purple-600" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    const filtered = mockDb.filter((item) => {
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase())

      if (searchFilter === "all") return matchQuery
      if (searchFilter === "books") return matchQuery && item.category === "books"
      if (searchFilter === "papers") return matchQuery && item.category === "papers"
      if (searchFilter === "grants") return matchQuery && item.category === "grants"
      return false
    })

    setSearchResults(filtered)
    setHasSearched(true)
  }

  const handleReserve = (item: { title: string; author: string }) => {
    const exists = reservations.find((r) => r.title === item.title)
    if (!exists) {
      setReservations([
        ...reservations,
        {
          id: Date.now(),
          title: item.title,
          author: item.author,
          status: "Priority Queue #1 (Pre-approved)",
          expectedPickup: "Within 24 Hours",
        },
      ])
      alert(`Success! Priority reservation placed for "${item.title}". Checked out with Faculty priority status.`)
    } else {
      alert(`You have already prioritized reservation for "${item.title}".`)
    }
  }

  return (
    <DashboardShell title="Staff Workspace" role="Staff" accent="Academic & priority faculty workspace">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Borrowed resources" value={borrowedResources.length.toString()} delta="Extended loan periods (60-120 days)" icon={BookOpen} />
        <StatCard label="Priority reservations" value={reservations.length.toString()} delta="Faculty desk pickup active" icon={Bookmark} />
        <StatCard label="Subscribed journals" value="4 premium portals" delta="Subscribed by institution" icon={FileText} />
        <StatCard label="Borrowing quota" value="3 / 20 items" delta="Faculty higher borrowing limit" icon={Award} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl glass p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Search className="h-4 w-4 text-neon" /> Priority Resource Search
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Faculty-priority filter for textbooks, research papers, and grant databases</p>

            <form onSubmit={handleSearch} className="mt-4 flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition focus-within:border-neon/30">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query books, arXiv papers, NSF research index, citation keys..."
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
                />
              </div>
              <button type="submit" className="rounded-xl bg-neon-gradient px-4 py-2 text-xs font-semibold text-neon-foreground transition hover:shadow-glow">
                Search
              </button>
            </form>

            <div className="mt-3 flex gap-1.5 text-[11px]">
              {(["all", "books", "papers", "grants"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSearchFilter(filter)}
                  className={`rounded-lg px-2.5 py-1 capitalize transition ${searchFilter === filter ? "bg-white/10 text-neon" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {filter === "grants" ? "Grants Index" : filter === "papers" ? "ArXiv / Papers" : filter}
                </button>
              ))}
            </div>

            {hasSearched && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-2 border-t border-white/5 pt-4">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Faculty-prioritized results: {searchResults.length}</span>
                  <button onClick={() => { setSearchQuery(""); setHasSearched(false) }} className="text-[11px] text-neon hover:underline">
                    Clear
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="py-6 text-center text-xs text-muted-foreground">No scientific records found.</div>
                ) : (
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {searchResults.map((item, index) => (
                      <BookCard
                        key={`${item.title}-${index}`}
                        title={item.title}
                        author={item.author}
                        match={item.match}
                        category={item.category}
                        coverColor={item.cover}
                        onBorrow={() => handleReserve(item)}
                        onDetails={() => alert(`Details for ${item.title}`)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <div className="rounded-2xl glass p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Sparkles className="h-4 w-4 animate-pulse text-neon" /> Research & Academic Paper AI Recommendations
            </h2>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">Domain match tailored to your research field and citation patterns</p>

            <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3">
              {[
                { title: "Scaling Laws for Sparse Mixtures", author: "W. Fedus", match: 99, cover: "from-blue-600 to-indigo-600" },
                { title: "Geometric Deep Learning Revisited", author: "Michael Bronstein", match: 94, cover: "from-amber-600 to-yellow-600" },
                { title: "Quantum Teleportation Paradigms", author: "Charles Bennett", match: 91, cover: "from-violet-600 to-purple-600" },
              ].map((rec) => (
                <BookCard
                  key={rec.title}
                  title={rec.title}
                  author={rec.author}
                  match={rec.match}
                  coverColor={rec.cover}
                  onBorrow={() => handleReserve(rec)}
                  onDetails={() => alert(`Details for ${rec.title}`)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl glass p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Clock className="h-4 w-4 text-neon" /> Extended Loan & Due Date Monitoring
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Verify details of extended borrowing terms (60-120 days for academic staff)</p>

            <div className="mt-4 space-y-3">
              {borrowedResources.map((res) => {
                const percentLeft = Math.round((res.daysLeft / res.limitMax) * 100)
                return (
                  <div key={res.id} className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-foreground">{res.title}</div>
                        <div className="text-xs text-muted-foreground">by {res.author} · <span className="text-neon">{res.type}</span></div>
                      </div>
                      <span className="text-xs font-semibold text-foreground">Due: {res.due}</span>
                    </div>

                    <div className="mt-4">
                      <div className="mb-1.5 flex justify-between text-[10px] text-muted-foreground">
                        <span>Loan Timeline</span>
                        <span>{res.daysLeft} days remaining ({percentLeft}% left)</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-neon-gradient" style={{ width: `${percentLeft}%` }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl glass p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Bookmark className="h-4 w-4 text-neon" /> Priority Reservation Tracking
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Priority reservations are automatically cleared and waiting at Faculty Desk</p>

            <div className="mt-4 space-y-2">
              {reservations.map((res) => (
                <div key={res.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3.5">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{res.title}</div>
                    <div className="text-xs text-muted-foreground">by {res.author}</div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-neon-gradient px-2 py-0.5 text-[9px] font-bold text-neon-foreground">{res.status}</span>
                    <div className="mt-1 text-[10px] text-muted-foreground">Expected: {res.expectedPickup}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl glass p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <Bell className="h-4 w-4 text-neon" /> Faculty Circulars
            </h2>

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

          <div className="rounded-2xl glass p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <Network className="h-4 w-4 text-neon" /> Citation Graph & Grants
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Monitor citation impact indices and check active grant proposals databases</p>

            <div className="relative mt-4 h-48 overflow-hidden rounded-xl border border-white/5 bg-white/5">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-neon-gradient shadow-glow">
                <Network className="h-5 w-5 text-neon-foreground" />
              </div>
              {[0, 60, 120, 180, 240, 300].map((d, i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full border border-neon-foreground bg-neon shadow-glow animate-pulse"
                  style={{ transform: `rotate(${d}deg) translate(70px) rotate(-${d}deg)` }}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-lg bg-white/5 p-2">
                <div className="text-[10px] text-muted-foreground">Science Impact index</div>
                <div className="mt-0.5 text-sm font-bold text-foreground">H-Index: 28</div>
              </div>
              <div className="rounded-lg bg-white/5 p-2">
                <div className="text-[10px] text-muted-foreground">Total Citations</div>
                <div className="mt-0.5 text-sm font-bold text-foreground">1,280 citations</div>
              </div>
            </div>

            <button
              onClick={() => alert("Redirecting to NSF Academic Grant Application Database Portal...")}
              className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-foreground transition hover:border-neon/30 hover:bg-white/10"
            >
              Access NSF Grant Database <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <div className="rounded-2xl glass p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <Library className="h-4 w-4 text-neon" /> Subscribed Research Portals
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Instant secure login mapping to premium scientific citation indexes</p>

            <div className="mt-4 space-y-2">
              {[
                { name: "IEEE Xplore Faculty Gateway", count: "420,000+ papers" },
                { name: "ACM Research Repository", count: "180,000+ works" },
                { name: "Nature Science Networks", count: "Premium subscription active" },
                { name: "Elsevier Direct Link", count: "Unlimited downloads" },
              ].map((gate) => (
                <button
                  key={gate.name}
                  onClick={() => alert(`Launching prioritized institutional gateway to ${gate.name}`)}
                  className="block w-full rounded-xl border border-white/5 bg-white/5 p-3 text-left transition hover:border-neon hover:bg-white/10"
                >
                  <div className="text-xs font-semibold text-foreground">{gate.name}</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">{gate.count}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
