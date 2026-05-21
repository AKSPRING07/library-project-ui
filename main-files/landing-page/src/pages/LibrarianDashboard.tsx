import { useState } from "react"
import {
  BarChart3,
  Bell,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  LayoutGrid,
  List,
  Plus,
  Repeat,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { DashboardShell, StatCard } from "@/components/dashboard-shell"
import { BookCard } from "@/components/ui/book-card"

type BookItem = {
  isbn: string
  title: string
  author: string
  category: string
  quantity: number
  location: string
  cover?: string
}

type CirculationLog = {
  id: number
  type: "Issue" | "Return"
  title: string
  user: string
  time: string
  status: string
}

type Reservation = {
  id: number
  title: string
  user: string
  date: string
  queue: number
}

type FineItem = {
  id: number
  user: string
  title: string
  daysOverdue: number
  fineAmount: number
  status: "Unpaid" | "Paid"
}

export default function LibrarianDashboard() {
  const [activeTab, setActiveTab] = useState<"circulation" | "inventory" | "fines" | "analytics">("circulation")
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")
  const [books, setBooks] = useState<BookItem[]>([
    { isbn: "978-0134685991", title: "Effective Java", author: "Joshua Bloch", category: "Computer Science", quantity: 5, location: "Aisle A, Shelf 3", cover: "from-amber-600 to-yellow-600" },
    { isbn: "978-0132350884", title: "Clean Code", author: "Robert C. Martin", category: "Software Engineering", quantity: 3, location: "Aisle B, Shelf 2", cover: "from-blue-600 to-indigo-600" },
    { isbn: "978-0262033848", title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Mathematics", quantity: 2, location: "Aisle A, Shelf 5", cover: "from-emerald-600 to-teal-600" },
    { isbn: "978-0596520687", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Systems Engineering", quantity: 4, location: "Aisle C, Shelf 1", cover: "from-rose-600 to-pink-600" },
  ])
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newIsbn, setNewIsbn] = useState("")
  const [newCategory, setNewCategory] = useState("Computer Science")
  const [newQuantity, setNewQuantity] = useState(1)
  const [newLocation, setNewLocation] = useState("Aisle A, Shelf 1")
  const [searchQuery, setSearchQuery] = useState("")

  const [issueIsbn, setIssueIsbn] = useState("")
  const [issueUserId, setIssueUserId] = useState("")
  const [circulationLogs, setCirculationLogs] = useState<CirculationLog[]>([
    { id: 1, type: "Issue", title: "Designing Data-Intensive Applications", user: "STU-2027-001 (Alex)", time: "10 mins ago", status: "Active" },
    { id: 2, type: "Return", title: "Effective Java", user: "STU-2027-042 (Sarah)", time: "1 hour ago", status: "Success" },
    { id: 3, type: "Issue", title: "Clean Code", user: "STU-2027-001 (Alex)", time: "Yesterday", status: "Active" },
  ])

  const [reservations, setReservations] = useState<Reservation[]>([
    { id: 101, title: "Clean Code", user: "Alex Carter (STU-2027-001)", date: "2026-05-19", queue: 1 },
    { id: 102, title: "Introduction to Algorithms", user: "Dr. Evelyn Ross (FAC-9082)", date: "2026-05-20", queue: 2 },
  ])

  const [fines, setFines] = useState<FineItem[]>([
    { id: 1, user: "STU-2027-014 (Jack Vance)", title: "Deep Learning Book", daysOverdue: 8, fineAmount: 16.0, status: "Unpaid" },
    { id: 2, user: "STU-2027-089 (Ethel Miller)", title: "The Pragmatic Programmer", daysOverdue: 3, fineAmount: 6.0, status: "Unpaid" },
  ])

  const [journals] = useState([
    { id: 1, title: "IEEE Transactions on Pattern Analysis", dbName: "IEEE Xplore", status: "Subscribed" },
    { id: 2, title: "ACM Computing Surveys", dbName: "ACM Digital Library", status: "Subscribed" },
    { id: 3, title: "Nature Quantum Engineering", dbName: "Nature Research", status: "Reviewing Extension" },
  ])

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newAuthor.trim() || !newIsbn.trim()) {
      alert("Please fill in Book Title, Author and ISBN.")
      return
    }

    const book: BookItem = {
      isbn: newIsbn,
      title: newTitle,
      author: newAuthor,
      category: newCategory,
      quantity: newQuantity,
      location: newLocation,
      cover: "from-blue-600 to-indigo-600", // Default cover color
    }
    setBooks([book, ...books])
    setNewTitle("")
    setNewAuthor("")
    setNewIsbn("")
    setNewQuantity(1)
    alert(`"${newTitle}" added to inventory successfully!`)
  }

  const handleDeleteBook = (isbn: string) => {
    if (confirm("Are you sure you want to remove this book from catalog?")) {
      setBooks(books.filter((b) => b.isbn !== isbn))
    }
  }

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (!issueIsbn || !issueUserId) {
      alert("Please input both ISBN and Student/Staff ID.")
      return
    }

    const matchedBook = books.find((b) => b.isbn === issueIsbn || b.title.toLowerCase().includes(issueIsbn.toLowerCase()))
    if (!matchedBook) {
      alert("Book not found in inventory.")
      return
    }

    const newLog: CirculationLog = {
      id: Date.now(),
      type: "Issue",
      title: matchedBook.title,
      user: issueUserId,
      time: "Just now",
      status: "Active",
    }

    setCirculationLogs([newLog, ...circulationLogs])
    setIssueIsbn("")
    setIssueUserId("")
    alert(`Successfully issued "${matchedBook.title}" to ${issueUserId}!`)
  }

  const handleReturnBook = (logId: number) => {
    setCirculationLogs((logs) =>
      logs.map((log) => {
        if (log.id === logId) {
          return { ...log, type: "Return", status: "Success", time: "Just now" }
        }
        return log
      })
    )
    alert("Return processed successfully!")
  }

  const handleApproveReservation = (id: number) => {
    const res = reservations.find((r) => r.id === id)
    if (res) {
      const newLog: CirculationLog = {
        id: Date.now(),
        type: "Issue",
        title: res.title,
        user: res.user,
        time: "Just now",
        status: "Active",
      }
      setCirculationLogs([newLog, ...circulationLogs])
      setReservations(reservations.filter((r) => r.id !== id))
      alert(`Approved and issued "${res.title}" to ${res.user}!`)
    }
  }

  const handleDeclineReservation = (id: number) => {
    setReservations(reservations.filter((r) => r.id !== id))
    alert("Reservation declined.")
  }

  const handleCollectFine = (id: number) => {
    setFines(
      fines.map((f) => {
        if (f.id === id) return { ...f, status: "Paid", fineAmount: 0 }
        return f
      })
    )
    alert("Fine payment collected successfully.")
  }

  const handleWaiveFine = (id: number) => {
    setFines(fines.filter((f) => f.id !== id))
    alert("Fine waived successfully.")
  }

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.includes(searchQuery)
  )

  return (
    <DashboardShell title="Librarian Desk" role="Librarian" accent="Smart operations & inventory control">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Loans processed today" value="1,248" delta="+2.5% vs yesterday" icon={Repeat} />
        <StatCard label="Overdue books" value={fines.filter((f) => f.status === "Unpaid").length.toString()} delta="Requiring reminder alerts" icon={Clock} />
        <StatCard label="Pending reservations" value={reservations.length.toString()} delta="Awaiting desk approval" icon={BookMarked} />
        <StatCard label="Total catalog books" value={books.reduce((acc, curr) => acc + curr.quantity, 0).toString()} delta="Items indexed" icon={BookOpen} />
      </div>

      <div className="mt-6 flex gap-2 border-b border-white/5 text-sm">
        {[
          { id: "circulation", label: "Circulation Desk", icon: Repeat },
          { id: "inventory", label: "Inventory Management", icon: Database },
          { id: "fines", label: "Fines & Overdues", icon: Clock },
          { id: "analytics", label: "Monitoring & Analytics", icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 font-medium transition ${activeTab === tab.id ? "border-neon text-neon" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {activeTab === "circulation" && (
            <motion.div
              key="circulation"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Repeat className="h-4 w-4 text-neon" /> Book Issue / Return Panel
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Quickly issue inventory stock to active student or faculty accounts</p>

                  <form onSubmit={handleIssueBook} className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Book ISBN or Title</label>
                      <input
                        type="text"
                        value={issueIsbn}
                        onChange={(e) => setIssueIsbn(e.target.value)}
                        placeholder="e.g. 978-0132350884 or Clean Code"
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 text-sm text-foreground outline-none focus:border-neon/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Borrower ID (Student or Staff)</label>
                      <input
                        type="text"
                        value={issueUserId}
                        onChange={(e) => setIssueUserId(e.target.value)}
                        placeholder="e.g. STU-2027-001 or FAC-9082"
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 text-sm text-foreground outline-none focus:border-neon/30"
                      />
                    </div>
                    <div className="flex justify-end gap-2 sm:col-span-2">
                      <button type="submit" className="rounded-xl bg-neon-gradient px-4 py-2 text-xs font-semibold text-neon-foreground transition hover:shadow-glow">
                        Issue Book
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <BookOpen className="h-4 w-4 text-neon" /> Real-Time Circulation Log
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Monitor instant checkouts, check-ins, and return pipelines</p>

                  <div className="mt-4 space-y-2">
                    {circulationLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3.5 transition hover:bg-white/10">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${log.type === "Issue" ? "bg-blue-500/20 text-blue-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                              {log.type}
                            </span>
                            <span className="text-sm font-semibold text-foreground">{log.title}</span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">Borrower: {log.user} · {log.time}</div>
                        </div>
                        <div>
                          {log.type === "Issue" && log.status === "Active" ? (
                            <button
                              onClick={() => handleReturnBook(log.id)}
                              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500 hover:text-black"
                            >
                              Check-In / Return
                            </button>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                              <CheckCircle2 className="h-3 w-3" /> Returned
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-fit rounded-2xl glass p-5 shadow-sm">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <BookMarked className="h-4 w-4 text-neon" /> Reservation Management
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Approve requests for queued or reserved assets</p>

                <div className="mt-4 space-y-3">
                  {reservations.length === 0 ? (
                    <div className="py-8 text-center text-xs text-muted-foreground">No pending reservations.</div>
                  ) : (
                    reservations.map((res) => (
                      <div key={res.id} className="space-y-3 rounded-xl border border-white/5 bg-white/5 p-3">
                        <div>
                          <div className="text-sm font-semibold text-foreground">{res.title}</div>
                          <div className="mt-0.5 text-[11px] text-muted-foreground">{res.user}</div>
                          <div className="mt-1 text-[10px] text-muted-foreground">Requested: {res.date} (Queue Rank: {res.queue})</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveReservation(res.id)}
                            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-neon-gradient py-1.5 text-xs font-bold text-neon-foreground transition hover:shadow-glow"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleDeclineReservation(res.id)}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-white/10"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "inventory" && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                        <Database className="h-4 w-4 text-neon" /> Catalog & Subscriptions
                      </h2>
                      <p className="mt-0.5 text-xs text-muted-foreground">Filter, search, edit, and audit standard library records</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1 border border-white/5">
                        <button 
                          onClick={() => setViewMode("grid")}
                          className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-neon-gradient text-neon-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => setViewMode("table")}
                          className={`p-2 rounded-lg transition ${viewMode === "table" ? "bg-neon-gradient text-neon-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          <List className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex max-w-xs flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search ISBN, Title, Category..."
                          className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/60"
                        />
                      </div>
                    </div>
                  </div>

                  {viewMode === "table" ? (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="border-b border-white/10 font-semibold text-muted-foreground">
                            <th className="py-2.5">ISBN</th>
                            <th className="py-2.5">Title</th>
                            <th className="py-2.5">Category</th>
                            <th className="py-2.5">Quantity</th>
                            <th className="py-2.5">Location</th>
                            <th className="py-2.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredBooks.map((b) => (
                            <tr key={b.isbn} className="transition hover:bg-white/5">
                              <td className="py-3 font-mono text-muted-foreground">{b.isbn}</td>
                              <td className="py-3 font-medium">
                                <div className="text-foreground">{b.title}</div>
                                <div className="text-[10px] text-muted-foreground">by {b.author}</div>
                              </td>
                              <td className="py-3 text-muted-foreground">{b.category}</td>
                              <td className="py-3 font-semibold text-foreground">{b.quantity}</td>
                              <td className="py-3 text-muted-foreground">{b.location}</td>
                              <td className="py-3 text-right">
                                <button
                                  onClick={() => handleDeleteBook(b.isbn)}
                                  className="rounded-lg p-1.5 text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-300"
                                  title="Remove book"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                      {filteredBooks.map((b) => (
                        <BookCard
                          key={b.isbn}
                          title={b.title}
                          author={b.author}
                          isbn={b.isbn}
                          category={b.category}
                          coverColor={b.cover}
                          onBorrow={() => alert(`Issuing ${b.title}`)}
                          onDetails={() => alert(`Details for ${b.title}: ${b.location}`)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <FileText className="h-4 w-4 text-neon" /> Subscribed Academic Journals
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Manage institutional research journal feeds and subscription lists</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {journals.map((j) => (
                      <div key={j.id} className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-3">
                        <div>
                          <div className="text-xs font-semibold leading-normal text-foreground">{j.title}</div>
                          <div className="mt-1 text-[10px] text-muted-foreground">Provider: {j.dbName}</div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${j.status === "Subscribed" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                            {j.status}
                          </span>
                          <button onClick={() => alert(`Reviewing subscriptions for ${j.title}`)} className="text-[10px] text-neon hover:underline">
                            Modify
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-fit rounded-2xl glass p-5 shadow-sm">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <Plus className="h-4 w-4 text-neon" /> Add New Book Record
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Index new title to physical aisles and digital metadata catalog</p>

                <form onSubmit={handleAddBook} className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="mb-1 block font-semibold text-muted-foreground">Book Title</label>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Effective Java" className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-foreground outline-none focus:border-neon/30" />
                  </div>
                  <div>
                    <label className="mb-1 block font-semibold text-muted-foreground">Author Name</label>
                    <input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} placeholder="e.g. Joshua Bloch" className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-foreground outline-none focus:border-neon/30" />
                  </div>
                  <div>
                    <label className="mb-1 block font-semibold text-muted-foreground">ISBN Barcode</label>
                    <input type="text" value={newIsbn} onChange={(e) => setNewIsbn(e.target.value)} placeholder="e.g. 978-0134685991" className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 font-mono text-foreground outline-none focus:border-neon/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block font-semibold text-muted-foreground">Quantity</label>
                      <input type="number" min="1" value={newQuantity} onChange={(e) => setNewQuantity(parseInt(e.target.value))} className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-foreground outline-none focus:border-neon/30" />
                    </div>
                    <div>
                      <label className="mb-1 block font-semibold text-muted-foreground">Category</label>
                      <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-foreground outline-none focus:border-neon/30">
                        <option>Computer Science</option>
                        <option>Software Engineering</option>
                        <option>Mathematics</option>
                        <option>Systems Engineering</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block font-semibold text-muted-foreground">Shelf Location</label>
                    <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="e.g. Aisle A, Shelf 3" className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-foreground outline-none focus:border-neon/30" />
                  </div>

                  <button type="submit" className="mt-2 w-full rounded-xl bg-neon-gradient py-2 font-bold text-neon-foreground transition hover:shadow-glow">
                    Add Book
                  </button>

                  <div className="mt-4 border-t border-white/5 pt-3">
                    <button
                      type="button"
                      onClick={() => alert("Mock bulk upload from CSV/Excel processed! 42 new books queued.")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-center font-semibold text-foreground transition hover:bg-white/10"
                    >
                      Bulk Import (.CSV)
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === "fines" && (
            <motion.div
              key="fines"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-6"
            >
              <div className="rounded-2xl glass p-5 shadow-sm">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <Clock className="h-4 w-4 text-neon" /> Overdue Fine Registry
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Collect, track, or waive fines for delayed student returns</p>

                <div className="mt-4 space-y-3">
                  {fines.length === 0 ? (
                    <div className="py-8 text-center text-xs font-medium text-muted-foreground">All accounts are clear! No outstanding fines.</div>
                  ) : (
                    fines.map((fine) => (
                      <div key={fine.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{fine.user}</span>
                            <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${fine.status === "Paid" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}>
                              {fine.status}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">Book: <span className="text-foreground">{fine.title}</span></div>
                          <div className="mt-0.5 text-[10px] text-muted-foreground">Overdue Limit: {fine.daysOverdue} days overdue</div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Fine balance</div>
                            <div className="text-lg font-bold text-neon">${fine.fineAmount.toFixed(2)}</div>
                          </div>
                          {fine.status === "Unpaid" ? (
                            <div className="flex gap-2">
                              <button onClick={() => handleCollectFine(fine.id)} className="rounded-lg bg-neon-gradient px-3 py-1.5 text-xs font-bold text-neon-foreground transition hover:shadow-glow">
                                Collect Fine
                              </button>
                              <button onClick={() => handleWaiveFine(fine.id)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-rose-500/50 hover:text-rose-400">
                                Waive Fine
                              </button>
                            </div>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                              <CheckCircle2 className="h-4 w-4" /> Cleared
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <BarChart3 className="h-4 w-4 text-neon" /> Book Checkout Turnover Index
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Real-time hourly inventory and active loans flow metric</p>

                  <div className="mt-6 flex h-44 items-end justify-between gap-2 border-b border-l border-white/10 pb-2 pl-2">
                    {[
                      { label: "Mon", val: "h-24", amount: 480 },
                      { label: "Tue", val: "h-28", amount: 560 },
                      { label: "Wed", val: "h-36", amount: 720 },
                      { label: "Thu", val: "h-32", amount: 640 },
                      { label: "Fri", val: "h-40", amount: 800 },
                      { label: "Sat", val: "h-14", amount: 280 },
                      { label: "Sun", val: "h-10", amount: 200 },
                    ].map((bar, i) => (
                      <div key={i} className="group relative flex flex-1 flex-col items-center">
                        <div className="pointer-events-none absolute bottom-full z-10 mb-1 rounded border border-white/10 bg-black/95 px-1.5 py-0.5 font-mono text-[9px] text-neon opacity-0 transition group-hover:opacity-100">
                          {bar.amount} checkouts
                        </div>
                        <div className={`w-full rounded-t-lg bg-neon-gradient opacity-80 transition group-hover:opacity-100 ${bar.val}`} />
                        <span className="mt-2 text-[10px] text-muted-foreground">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Users className="h-4 w-4 text-neon" /> Smart Desk Activity Monitoring
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Live check-in audit of students and faculty accessing catalog services</p>

                  <div className="mt-4 space-y-2 text-xs">
                    {[
                      { user: "Student (Alex Carter)", action: "Searched catalog keyword: 'Machine Learning'", time: "2 mins ago" },
                      { user: "Student (Sarah Jenkins)", action: "Reserved: 'Probabilistic ML' via mobile portal", time: "11 mins ago" },
                      { user: "Faculty (Professor John Doe)", action: "Logged in via institutional gateway ID", time: "24 mins ago" },
                      { user: "Student (Jack Vance)", action: "Checked in 'Effective Java' at desk terminal A", time: "1 hour ago" },
                    ].map((act, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3">
                        <div>
                          <span className="font-semibold text-foreground">{act.user}</span>
                          <span className="ml-1 text-muted-foreground">{act.action}</span>
                        </div>
                        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-fit rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                    <Bell className="h-4 w-4 text-neon" /> Broadcast Circulars
                  </h2>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">Broadcast smart alerts to reader catalog dashboards</p>

                  <div className="mt-4 space-y-3">
                    <button
                      onClick={() => alert("Alert Broadcasted: 'Library closed on Friday for inventory auditing'")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left text-xs transition hover:border-neon/30 hover:bg-white/10"
                    >
                      <div className="font-semibold text-foreground">Holiday Schedule</div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">Notify readers about closed schedules.</div>
                    </button>
                    <button
                      onClick={() => alert("Alert Broadcasted: 'Return overdue books before the semester ends'")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left text-xs transition hover:border-neon/30 hover:bg-white/10"
                    >
                      <div className="font-semibold text-foreground">Semester Reminders</div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">Send a quick fine amnesty reminder.</div>
                    </button>
                  </div>
                </div>

                <div className="h-fit rounded-2xl border border-neon/10 glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 animate-pulse text-neon" /> Lumi AI Operations Insights
                  </h2>

                  <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
                    <div className="rounded-lg border border-neon/10 bg-neon/5 p-3 text-foreground">
                      <span className="font-semibold text-neon">Top Trend:</span> AI books have a <span className="font-bold">92% circulation turnover</span> rate this month. Consider expanding physical copies for Aisle C.
                    </div>
                    <div className="rounded-lg bg-white/5 p-3 text-foreground">
                      <span className="font-semibold text-amber-400">Peak hour:</span> Wednesday from <span className="font-bold">2 PM to 5 PM</span> accounts for 42% of physical checkouts. Aisle A staffing recommended.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  )
}
