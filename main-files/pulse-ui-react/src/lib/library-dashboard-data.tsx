import type { LucideIcon } from "lucide-react"
import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  BadgeCheck,
  Bell,
  BookAudio,
  BookCopy,
  BookMarked,
  BookOpen,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Bug,
  Building2,
  CalendarClock,
  Camera,
  ChartColumn,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Cpu,
  CreditCard,
  FileClock,
  FileSearch,
  Fingerprint,
  GraduationCap,
  HardDrive,
  Headphones,
  Heart,
  LibraryBig,
  MapPinned,
  MessageSquareWarning,
  MonitorCog,
  QrCode,
  RadioTower,
  Receipt,
  RefreshCw,
  ScanFace,
  Search,
  Server,
  Settings,
  ShieldAlert,
  Siren,
  Sparkles,
  TicketCheck,
  TrendingUp,
  UserRound,
  Users,
  Wifi,
  Wrench,
} from "lucide-react"

export type MenuItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: MenuItem[]
}

export type Metric = {
  label: string
  value: string
  delta: string
  tone: "sky" | "emerald" | "amber" | "rose"
  icon: LucideIcon
}

export type InsightCard = {
  title: string
  value: string
  detail: string
  icon: LucideIcon
}

export type ActivityPoint = {
  name: string
  primary: number
  secondary: number
}

export type CategoryPoint = {
  name: string
  value: number
  fill: string
}

export type TimelineItem = {
  title: string
  detail: string
  time: string
  status: "live" | "queued" | "done" | "alert"
}

export type BookOrAssetCard = {
  title: string
  subtitle: string
  location: string
  status: string
  badge: string
  rating: string
}

export type ProgressItem = {
  label: string
  value: number
  caption: string
}

export type ActionItem = {
  title: string
  description: string
  icon: LucideIcon
}

export type NotificationItem = {
  id: number
  title: string
  description: string
  time: string
  unread?: boolean
}

export type RoleDashboardConfig = {
  role: "student" | "staff" | "librarian" | "technician"
  title: string
  subtitle: string
  route: string
  accentClass: string
  accentSoftClass: string
  summaryLabel: string
  assistantPrompt: string
  searchPlaceholder: string
  user: {
    name: string
    email: string
    avatar: string
  }
  menus: MenuItem[]
  quickLinks: {
    name: string
    url: string
    icon: LucideIcon
  }[]
  metrics: Metric[]
  insights: InsightCard[]
  activity: ActivityPoint[]
  categories: CategoryPoint[]
  timeline: TimelineItem[]
  cards: BookOrAssetCard[]
  progress: ProgressItem[]
  actions: ActionItem[]
  notifications: NotificationItem[]
}

const roleConfigs: RoleDashboardConfig[] = [
  {
    role: "student",
    title: "Student Dashboard",
    subtitle: "AI-powered reading, borrowing, and personalized library guidance.",
    route: "/dashboard/student",
    accentClass: "from-sky-500/30 via-cyan-500/15 to-transparent",
    accentSoftClass: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    summaryLabel: "Smart learner workspace",
    assistantPrompt: "Ask Aura AI for the best available books, shelf locations, due reminders, or a voice-ready search.",
    searchPlaceholder: "Search books, authors, shelves, QR records, and AI suggestions...",
    user: {
      name: "Aarav Patel",
      email: "aarav@student.smartlib.ai",
      avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=student",
    },
    menus: [
      { title: "Dashboard", url: "/dashboard/student", icon: GraduationCap },
      { title: "AI Book Search", url: "/dashboard/student/ai-book-search", icon: Search },
      { title: "Browse Books", url: "/dashboard/student/browse-books", icon: BookOpen },
      { title: "Borrowed Books", url: "/dashboard/student/borrowed-books", icon: BookMarked },
      { title: "Reservations", url: "/dashboard/student/reservations", icon: CalendarClock },
      { title: "Reading Progress", url: "/dashboard/student/reading-progress", icon: TrendingUp },
      { title: "AI Recommendations", url: "/dashboard/student/ai-recommendations", icon: Sparkles },
      { title: "Fines & Due Dates", url: "/dashboard/student/fines-due-dates", icon: Receipt },
      { title: "Digital Library Card", url: "/dashboard/student/digital-library-card", icon: CreditCard },
      { title: "Notifications", url: "/dashboard/student/notifications", icon: Bell },
      { title: "Profile", url: "/dashboard/student/profile", icon: UserRound },
      { title: "Settings", url: "/dashboard/student/settings", icon: Settings },
    ],
    quickLinks: [
      { name: "Borrow Scanner", url: "/dashboard/student/borrowed-books", icon: QrCode },
      { name: "Shelf Map", url: "/dashboard/student/browse-books", icon: MapPinned },
      { name: "AI Assistant", url: "/dashboard/student/ai-recommendations", icon: Bot },
    ],
    metrics: [
      { label: "Total Borrowed Books", value: "12", delta: "+2 this week", tone: "sky", icon: BookMarked },
      { label: "Due Books", value: "3", delta: "1 due tomorrow", tone: "amber", icon: FileClock },
      { label: "Fine Amount", value: "Rs 120", delta: "-40 cleared", tone: "rose", icon: Receipt },
      { label: "Reserved Books", value: "4", delta: "2 ready to collect", tone: "emerald", icon: CalendarClock },
      { label: "Reading Hours", value: "18.6h", delta: "+14% momentum", tone: "sky", icon: Clock3 },
      { label: "AI Recommended Books", value: "9", delta: "3 high-match titles", tone: "emerald", icon: Sparkles },
    ],
    insights: [
      { title: "Occupancy Status", value: "64%", detail: "Quiet zone seats available in East Wing.", icon: Users },
      { title: "Face Entry Status", value: "Verified", detail: "Your entry log synced 4 minutes ago.", icon: ScanFace },
      { title: "AI Availability Prediction", value: "92%", detail: "Suggested title likely available after 3 PM.", icon: BrainCircuit },
    ],
    activity: [
      { name: "Mon", primary: 2, secondary: 1.2 },
      { name: "Tue", primary: 3.4, secondary: 2 },
      { name: "Wed", primary: 4.6, secondary: 2.4 },
      { name: "Thu", primary: 3.8, secondary: 2.9 },
      { name: "Fri", primary: 5.2, secondary: 3.6 },
      { name: "Sat", primary: 6.4, secondary: 4.1 },
      { name: "Sun", primary: 4.9, secondary: 3.4 },
    ],
    categories: [
      { name: "AI & ML", value: 34, fill: "hsl(var(--chart-1))" },
      { name: "Data Science", value: 24, fill: "hsl(var(--chart-2))" },
      { name: "Design", value: 16, fill: "hsl(var(--chart-3))" },
      { name: "History", value: 14, fill: "hsl(var(--chart-4))" },
      { name: "Fiction", value: 12, fill: "hsl(var(--chart-5))" },
    ],
    timeline: [
      { title: "Borrowed 'Deep Learning Atlas'", detail: "Shelf A3 auto-logged via QR scan.", time: "09:10 AM", status: "done" },
      { title: "AI reminder generated", detail: "Due alert created for Robotics Primer.", time: "11:30 AM", status: "live" },
      { title: "Reserved 'Designing Neural Interfaces'", detail: "Pickup window opens at 03:00 PM.", time: "01:05 PM", status: "queued" },
      { title: "Overdue risk detected", detail: "One title will cross due date in 19 hours.", time: "Now", status: "alert" },
    ],
    cards: [
      { title: "The Ethical Algorithm", subtitle: "AI recommendation match 97%", location: "Shelf C-12", status: "Available", badge: "AI Pick", rating: "4.8" },
      { title: "Human-Centered Design", subtitle: "Recently viewed by your cohort", location: "Shelf B-06", status: "Reserve Only", badge: "Trending", rating: "4.6" },
      { title: "Quantum UX Futures", subtitle: "New arrival in digital access", location: "Digital Vault", status: "eBook", badge: "Hot Release", rating: "4.9" },
    ],
    progress: [
      { label: "Weekly Reading Progress", value: 78, caption: "5.5 hours completed out of 7 hour target" },
      { label: "Borrowing Goal", value: 62, caption: "8 of 13 semester references secured" },
      { label: "Favorite Categories", value: 84, caption: "AI, systems thinking, and product design dominate" },
    ],
    actions: [
      { title: "Start Voice Search", description: "Find a book hands-free with AI suggestions.", icon: Headphones },
      { title: "Open Digital ID", description: "Show your smart library card for gate access.", icon: CreditCard },
      { title: "Scan Shelf QR", description: "Jump directly to exact shelf and copy status.", icon: QrCode },
    ],
    notifications: [
      { id: 1, title: "Due reminder", description: "Robotics Primer is due on May 22.", time: "5m ago", unread: true },
      { id: 2, title: "Reservation ready", description: "Human-Centered Design is ready for pickup.", time: "22m ago" },
      { id: 3, title: "AI suggestion updated", description: "Aura AI found 3 stronger matches in AI ethics.", time: "1h ago" },
      { id: 4, title: "Occupancy alert", description: "Silent study floor is now below 50% occupancy.", time: "2h ago" },
    ],
  },
  {
    role: "staff",
    title: "Staff Dashboard",
    subtitle: "Academic resource requests, departmental usage, and approval intelligence.",
    route: "/dashboard/staff",
    accentClass: "from-emerald-500/25 via-teal-500/15 to-transparent",
    accentSoftClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    summaryLabel: "Academic resource hub",
    assistantPrompt: "Ask Atlas AI to draft an external request, prioritize a department need, or recommend research materials.",
    searchPlaceholder: "Search requests, research materials, departments, and approvals...",
    user: {
      name: "Dr. Meera Shah",
      email: "meera.staff@smartlib.ai",
      avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=staff",
    },
    menus: [
      { title: "Dashboard", url: "/dashboard/staff", icon: BriefcaseBusiness },
      { title: "AI Book Search", url: "/dashboard/staff/ai-book-search", icon: Search },
      { title: "Browse Books", url: "/dashboard/staff/browse-books", icon: BookOpen },
      { title: "Borrowed Books", url: "/dashboard/staff/borrowed-books", icon: BookMarked },
      { title: "Research Materials", url: "/dashboard/staff/research-materials", icon: BookAudio },
      { title: "External Book Requests", url: "/dashboard/staff/external-book-requests", icon: FileSearch },
      { title: "Academic Requirements", url: "/dashboard/staff/academic-requirements", icon: ClipboardCheck },
      { title: "Department Analytics", url: "/dashboard/staff/department-analytics", icon: Building2 },
      { title: "AI Recommendations", url: "/dashboard/staff/ai-recommendations", icon: Sparkles },
      { title: "Request Status", url: "/dashboard/staff/request-status", icon: TicketCheck },
      { title: "Notifications", url: "/dashboard/staff/notifications", icon: Bell },
      { title: "Profile", url: "/dashboard/staff/profile", icon: UserRound },
      { title: "Settings", url: "/dashboard/staff/settings", icon: Settings },
    ],
    quickLinks: [
      { name: "New Request", url: "/dashboard/staff/external-book-requests", icon: FileSearch },
      { name: "Dept Analytics", url: "/dashboard/staff/department-analytics", icon: ChartColumn },
      { name: "Approvals", url: "/dashboard/staff/request-status", icon: BadgeCheck },
    ],
    metrics: [
      { label: "Total Requested Books", value: "148", delta: "+12 this month", tone: "sky", icon: BookCopy },
      { label: "Pending Approvals", value: "17", delta: "5 high priority", tone: "amber", icon: FileClock },
      { label: "Approved Requests", value: "94", delta: "87% approval rate", tone: "emerald", icon: BadgeCheck },
      { label: "Research Resources", value: "56", delta: "11 new journals", tone: "sky", icon: BookAudio },
      { label: "Department Usage", value: "81%", delta: "Engineering leads", tone: "emerald", icon: Building2 },
      { label: "Academic Activity", value: "342", delta: "+24 active learners", tone: "rose", icon: Activity },
    ],
    insights: [
      { title: "Priority Queue", value: "5 items", detail: "Three requests are tagged urgent for final-year projects.", icon: Siren },
      { title: "Resource Allocation", value: "Optimized", detail: "AI rebalanced shared licenses across 4 departments.", icon: BrainCircuit },
      { title: "Cloud Sync", value: "Live", detail: "Supporting documents synced to archive nodes.", icon: RefreshCw },
    ],
    activity: [
      { name: "Mon", primary: 12, secondary: 8 },
      { name: "Tue", primary: 18, secondary: 10 },
      { name: "Wed", primary: 20, secondary: 14 },
      { name: "Thu", primary: 17, secondary: 12 },
      { name: "Fri", primary: 24, secondary: 16 },
      { name: "Sat", primary: 21, secondary: 15 },
      { name: "Sun", primary: 14, secondary: 9 },
    ],
    categories: [
      { name: "Engineering", value: 29, fill: "hsl(var(--chart-1))" },
      { name: "Management", value: 19, fill: "hsl(var(--chart-2))" },
      { name: "Life Science", value: 17, fill: "hsl(var(--chart-3))" },
      { name: "Humanities", value: 14, fill: "hsl(var(--chart-4))" },
      { name: "Law", value: 11, fill: "hsl(var(--chart-5))" },
    ],
    timeline: [
      { title: "External request submitted", detail: "Advanced Micro Sensors for Robotics, tagged urgent.", time: "08:45 AM", status: "done" },
      { title: "Faculty recommendation synced", detail: "Atlas AI matched 6 references to syllabus update.", time: "10:20 AM", status: "live" },
      { title: "Supporting document uploaded", detail: "Department budget approval attached to request.", time: "12:10 PM", status: "queued" },
      { title: "Approval delay flagged", detail: "Two requests are waiting beyond SLA.", time: "Now", status: "alert" },
    ],
    cards: [
      { title: "Edge AI for Autonomous Labs", subtitle: "Suggested for Electronics faculty", location: "Vendor Pipeline", status: "Approval Pending", badge: "AI Matched", rating: "4.7" },
      { title: "Journal of Research Methods", subtitle: "Shared across four departments", location: "Digital Repository", status: "Licensed", badge: "High Use", rating: "4.5" },
      { title: "Human Factors in Robotics", subtitle: "Supports interdisciplinary project work", location: "Shelf R-02", status: "Available", badge: "Faculty Pick", rating: "4.8" },
    ],
    progress: [
      { label: "Approval Workflow", value: 71, caption: "12 of 17 pending requests already reviewed" },
      { label: "Department Engagement", value: 82, caption: "Most active: Engineering, Design, Management" },
      { label: "Research Trend Match", value: 76, caption: "AI recommendations align with current proposals" },
    ],
    actions: [
      { title: "Create External Request", description: "Open a modern request flow with priority tags.", icon: FileSearch },
      { title: "Upload Supporting Docs", description: "Attach syllabus, budget, or approval evidence.", icon: ClipboardCheck },
      { title: "Review AI Suggestions", description: "See predictive recommendations by department.", icon: Sparkles },
    ],
    notifications: [
      { id: 1, title: "Request approved", description: "Three engineering book requests were approved.", time: "8m ago", unread: true },
      { id: 2, title: "AI suggestion", description: "Atlas AI found cheaper alternatives for two titles.", time: "26m ago" },
      { id: 3, title: "Research trend spike", description: "Cybersecurity material demand rose 18% this week.", time: "1h ago" },
      { id: 4, title: "Department alert", description: "Humanities usage dipped below baseline forecast.", time: "3h ago" },
    ],
  },
  {
    role: "librarian",
    title: "Librarian Dashboard",
    subtitle: "Enterprise-grade inventory control, AI automation, and full library oversight.",
    route: "/dashboard/librarian",
    accentClass: "from-amber-500/25 via-orange-500/15 to-transparent",
    accentSoftClass: "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-300",
    summaryLabel: "Enterprise control center",
    assistantPrompt: "Ask Sentinel AI to surface overdue risks, inventory anomalies, complaint trends, or automated reports.",
    searchPlaceholder: "Search books, users, RFID events, fines, complaints, and AI reports...",
    user: {
      name: "Nisha Verma",
      email: "nisha.librarian@smartlib.ai",
      avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=librarian",
    },
    menus: [
      { title: "Dashboard", url: "/dashboard/librarian", icon: LibraryBig },
      { title: "Manage Books", url: "/dashboard/librarian/manage-books", icon: BookCopy },
      { title: "Add/Edit Books", url: "/dashboard/librarian/add-edit-books", icon: BookOpen },
      { title: "Borrow & Return", url: "/dashboard/librarian/borrow-return", icon: ArrowRightLeft },
      { title: "User Management", url: "/dashboard/librarian/user-management", icon: Users },
      { title: "Reservations", url: "/dashboard/librarian/reservations", icon: CalendarClock },
      { title: "Fine Collection", url: "/dashboard/librarian/fine-collection", icon: Receipt },
      { title: "Inventory Analytics", url: "/dashboard/librarian/inventory-analytics", icon: ChartColumn },
      { title: "AI Reports", url: "/dashboard/librarian/ai-reports", icon: BrainCircuit },
      { title: "RFID Tracking", url: "/dashboard/librarian/rfid-tracking", icon: RadioTower },
      { title: "QR Monitoring", url: "/dashboard/librarian/qr-monitoring", icon: QrCode },
      { title: "Face Recognition", url: "/dashboard/librarian/face-recognition", icon: ScanFace },
      { title: "Robot Monitoring", url: "/dashboard/librarian/robot-monitoring", icon: Bot },
      { title: "Complaints", url: "/dashboard/librarian/complaints", icon: MessageSquareWarning },
      { title: "Attendance Monitoring", url: "/dashboard/librarian/attendance-monitoring", icon: Fingerprint },
      { title: "Notifications", url: "/dashboard/librarian/notifications", icon: Bell },
      { title: "Settings", url: "/dashboard/librarian/settings", icon: Settings },
    ],
    quickLinks: [
      { name: "Add Book", url: "/dashboard/librarian/add-edit-books", icon: BookOpen },
      { name: "AI Report", url: "/dashboard/librarian/ai-reports", icon: BrainCircuit },
      { name: "Complaints", url: "/dashboard/librarian/complaints", icon: MessageSquareWarning },
    ],
    metrics: [
      { label: "Total Books", value: "24.8K", delta: "+186 cataloged", tone: "sky", icon: BookCopy },
      { label: "Active Borrowers", value: "1,286", delta: "+8.2% today", tone: "emerald", icon: Users },
      { label: "Overdue Books", value: "93", delta: "-12 recovered", tone: "amber", icon: AlertTriangle },
      { label: "Fine Collections", value: "Rs 48K", delta: "+Rs 6K today", tone: "rose", icon: Receipt },
      { label: "Daily Library Visitors", value: "2,104", delta: "Peak at 2 PM", tone: "sky", icon: Fingerprint },
      { label: "Most Borrowed Books", value: "18", delta: "AI trend refreshed", tone: "emerald", icon: TrendingUp },
      { label: "Active Complaints", value: "11", delta: "3 assigned to tech", tone: "amber", icon: MessageSquareWarning },
      { label: "Library Occupancy", value: "72%", delta: "West floor nearing limit", tone: "rose", icon: Building2 },
      { label: "AI Trend Analysis", value: "Live", delta: "Updated 2 mins ago", tone: "sky", icon: BrainCircuit },
      { label: "Real-Time Activity", value: "348", delta: "RFID + QR events", tone: "emerald", icon: Activity },
    ],
    insights: [
      { title: "RFID Tracking", value: "98.4%", detail: "Reader gates stable across all entrances.", icon: RadioTower },
      { title: "Robot Fleet", value: "3/4 online", detail: "One sorting robot is in maintenance mode.", icon: Bot },
      { title: "Attendance Monitor", value: "2,104", detail: "Face recognition synced with gate access.", icon: ScanFace },
    ],
    activity: [
      { name: "Mon", primary: 320, secondary: 88 },
      { name: "Tue", primary: 410, secondary: 96 },
      { name: "Wed", primary: 436, secondary: 118 },
      { name: "Thu", primary: 388, secondary: 110 },
      { name: "Fri", primary: 520, secondary: 126 },
      { name: "Sat", primary: 602, secondary: 142 },
      { name: "Sun", primary: 472, secondary: 103 },
    ],
    categories: [
      { name: "Circulation", value: 32, fill: "hsl(var(--chart-1))" },
      { name: "Inventory", value: 23, fill: "hsl(var(--chart-2))" },
      { name: "Complaints", value: 14, fill: "hsl(var(--chart-3))" },
      { name: "Attendance", value: 17, fill: "hsl(var(--chart-4))" },
      { name: "Robotics", value: 14, fill: "hsl(var(--chart-5))" },
    ],
    timeline: [
      { title: "Bulk return batch processed", detail: "67 books re-shelved and RFID-confirmed.", time: "07:55 AM", status: "done" },
      { title: "AI report generated", detail: "Borrowing anomaly detected in reference section.", time: "10:40 AM", status: "live" },
      { title: "Technician complaint filed", detail: "Robot sorter battery degradation crossed threshold.", time: "12:25 PM", status: "queued" },
      { title: "Occupancy alert", detail: "West floor surpassed 85% predicted limit.", time: "Now", status: "alert" },
    ],
    cards: [
      { title: "Applied Machine Learning", subtitle: "High circulation in final-year cohort", location: "Shelf ML-04", status: "Low Stock", badge: "Trend Spike", rating: "4.9" },
      { title: "Digital Archive Pass", subtitle: "Premium digital access package", location: "Cloud Stack", status: "Active", badge: "Subscription", rating: "4.6" },
      { title: "RFID Reader Cluster 3", subtitle: "Entrance hardware monitoring node", location: "North Gate", status: "Stable", badge: "Hardware", rating: "99.1%" },
    ],
    progress: [
      { label: "Complaint Resolution", value: 68, caption: "7 of 11 active issues are under technician review" },
      { label: "Inventory Accuracy", value: 94, caption: "Shelf and RFID records are tightly aligned" },
      { label: "Overdue Recovery", value: 61, caption: "AI reminders improved recovery rate week over week" },
    ],
    actions: [
      { title: "Create Technician Complaint", description: "Escalate hardware, robotics, or system issues.", icon: Bug },
      { title: "Export AI Analytics", description: "Download high-level borrowing and usage insights.", icon: BrainCircuit },
      { title: "Open Borrow Control", description: "Approve returns, reservations, and due workflows.", icon: ArrowRightLeft },
    ],
    notifications: [
      { id: 1, title: "Overdue prediction", description: "Sentinel AI flagged 14 borrowers at high overdue risk.", time: "3m ago", unread: true },
      { id: 2, title: "Robot alert", description: "Sorter bot R-03 battery health dropped to 46%.", time: "19m ago" },
      { id: 3, title: "Fine collection update", description: "Rs 6,200 collected in the current shift.", time: "42m ago" },
      { id: 4, title: "Complaint resolved", description: "Face recognition camera C-12 returned to stable state.", time: "2h ago" },
    ],
  },
  {
    role: "technician",
    title: "Technician Dashboard",
    subtitle: "Live maintenance, device health, robotics, and smart operations monitoring.",
    route: "/dashboard/technician",
    accentClass: "from-rose-500/25 via-fuchsia-500/15 to-transparent",
    accentSoftClass: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    summaryLabel: "Technical operations center",
    assistantPrompt: "Ask Vector AI to predict failures, inspect complaint patterns, or summarize system health anomalies.",
    searchPlaceholder: "Search devices, complaints, logs, robots, cameras, and uptime records...",
    user: {
      name: "Rohan Iyer",
      email: "rohan.tech@smartlib.ai",
      avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=technician",
    },
    menus: [
      { title: "Dashboard", url: "/dashboard/technician", icon: Wrench },
      { title: "Complaints", url: "/dashboard/technician/complaints", icon: MessageSquareWarning },
      { title: "RFID Monitoring", url: "/dashboard/technician/rfid-monitoring", icon: RadioTower },
      { title: "Face Recognition Systems", url: "/dashboard/technician/face-recognition-systems", icon: ScanFace },
      { title: "Robot Monitoring", url: "/dashboard/technician/robot-monitoring", icon: Bot },
      { title: "Device Connectivity", url: "/dashboard/technician/device-connectivity", icon: Wifi },
      { title: "Server Health", url: "/dashboard/technician/server-health", icon: Server },
      { title: "Camera Monitoring", url: "/dashboard/technician/camera-monitoring", icon: Camera },
      { title: "Maintenance Schedule", url: "/dashboard/technician/maintenance-schedule", icon: CalendarClock },
      { title: "System Logs", url: "/dashboard/technician/system-logs", icon: HardDrive },
      { title: "Alerts", url: "/dashboard/technician/alerts", icon: ShieldAlert },
      { title: "Notifications", url: "/dashboard/technician/notifications", icon: Bell },
      { title: "Settings", url: "/dashboard/technician/settings", icon: Settings },
    ],
    quickLinks: [
      { name: "Open Tickets", url: "/dashboard/technician/complaints", icon: TicketCheck },
      { name: "Server Health", url: "/dashboard/technician/server-health", icon: Server },
      { name: "Robot Fleet", url: "/dashboard/technician/robot-monitoring", icon: Bot },
    ],
    metrics: [
      { label: "Active Complaints", value: "26", delta: "9 critical", tone: "rose", icon: MessageSquareWarning },
      { label: "Resolved Issues", value: "141", delta: "+11 today", tone: "emerald", icon: CheckCircle2 },
      { label: "System Uptime", value: "99.42%", delta: "30-day average", tone: "sky", icon: Activity },
      { label: "Device Health", value: "87%", delta: "4 nodes degraded", tone: "amber", icon: Cpu },
      { label: "RFID Status", value: "Stable", delta: "1 reader reconnecting", tone: "emerald", icon: RadioTower },
      { label: "Robot Status", value: "3/4", delta: "One on maintenance", tone: "amber", icon: Bot },
      { label: "Face Recognition Status", value: "96.8%", delta: "Accuracy within target", tone: "sky", icon: ScanFace },
      { label: "Emergency Alerts", value: "2", delta: "Immediate review needed", tone: "rose", icon: Siren },
      { label: "Server Usage", value: "68%", delta: "Memory trending upward", tone: "sky", icon: Server },
    ],
    insights: [
      { title: "IoT Connectivity", value: "244 nodes", detail: "238 healthy, 4 degraded, 2 offline.", icon: Wifi },
      { title: "Predictive Maintenance", value: "7 flags", detail: "Battery, lens heat, and storage issues predicted.", icon: BrainCircuit },
      { title: "Emergency Center", value: "2 active", detail: "Camera sync lag and gate sensor drift need action.", icon: ShieldAlert },
    ],
    activity: [
      { name: "Mon", primary: 92, secondary: 12 },
      { name: "Tue", primary: 110, secondary: 15 },
      { name: "Wed", primary: 126, secondary: 19 },
      { name: "Thu", primary: 118, secondary: 16 },
      { name: "Fri", primary: 142, secondary: 23 },
      { name: "Sat", primary: 134, secondary: 20 },
      { name: "Sun", primary: 101, secondary: 13 },
    ],
    categories: [
      { name: "Robotics", value: 26, fill: "hsl(var(--chart-1))" },
      { name: "RFID", value: 21, fill: "hsl(var(--chart-2))" },
      { name: "Cameras", value: 19, fill: "hsl(var(--chart-3))" },
      { name: "Servers", value: 18, fill: "hsl(var(--chart-4))" },
      { name: "Face AI", value: 16, fill: "hsl(var(--chart-5))" },
    ],
    timeline: [
      { title: "Ticket #284 assigned", detail: "North gate RFID drift routed to on-site technician.", time: "08:05 AM", status: "done" },
      { title: "Predictive alert generated", detail: "Camera C-07 thermal variance exceeded baseline.", time: "09:55 AM", status: "live" },
      { title: "Robot diagnostics scheduled", detail: "Sorting bot maintenance window set for 04:30 PM.", time: "11:50 AM", status: "queued" },
      { title: "Emergency warning", detail: "Archive room sensor briefly lost cloud heartbeat.", time: "Now", status: "alert" },
    ],
    cards: [
      { title: "Sorting Robot R-03", subtitle: "Battery and arm calibration watchlist", location: "Ops Bay", status: "Maintenance", badge: "Critical", rating: "46%" },
      { title: "RFID Reader Gate-2", subtitle: "Intermittent handshake on student exit lane", location: "North Entrance", status: "Degraded", badge: "Watchlist", rating: "89%" },
      { title: "Camera Cluster C-07", subtitle: "Thermal variance detected by AI", location: "Archive Zone", status: "Investigating", badge: "Alert", rating: "72%" },
    ],
    progress: [
      { label: "Complaint Resolution Queue", value: 58, caption: "15 of 26 active complaints are in progress" },
      { label: "Preventive Maintenance", value: 81, caption: "Most scheduled checks are on time this week" },
      { label: "System Reliability", value: 88, caption: "Cloud-connected devices are mostly healthy" },
    ],
    actions: [
      { title: "Open Diagnostics", description: "Inspect live logs, devices, and fault traces.", icon: MonitorCog },
      { title: "Schedule Maintenance", description: "Create or update preventive maintenance runs.", icon: CalendarClock },
      { title: "Escalate Emergency Alert", description: "Notify operations for critical infrastructure events.", icon: ShieldAlert },
    ],
    notifications: [
      { id: 1, title: "Critical ticket", description: "Robot R-03 requires battery replacement review.", time: "2m ago", unread: true },
      { id: 2, title: "Server trend", description: "Analytics node memory climbed 9% over baseline.", time: "17m ago" },
      { id: 3, title: "Camera recovery", description: "Camera C-12 feed stabilized after restart.", time: "1h ago" },
      { id: 4, title: "Maintenance due", description: "Gate reader cluster calibration window opens at 4:30 PM.", time: "2h ago" },
    ],
  },
]

export function getRoleConfig(pathname: string) {
  return (
    roleConfigs.find((config) => pathname === config.route || pathname.startsWith(`${config.route}/`)) ??
    roleConfigs[0]
  )
}

export function getAllRoleConfigs() {
  return roleConfigs
}
