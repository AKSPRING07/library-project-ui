import { useState } from "react"
import {
  Activity,
  Bell,
  Bot,
  CheckCircle2,
  Cpu,
  HardDrive,
  Plus,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  Trash2,
  User,
  Users,
  Wrench,
  Wifi,
  Mail,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { DashboardShell, StatCard } from "@/components/dashboard-shell"

type DeviceItem = {
  id: number
  name: string
  type: string
  location: string
  health: string
  status: string
}

type ComplaintItem = {
  id: number
  title: string
  source: string
  priority: "Critical" | "High" | "Medium" | "Low"
  status: string
}

type MaintenanceLog = {
  id: number
  title: string
  action: string
  time: string
}

export default function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState<"monitoring" | "devices" | "alerts" | "analytics">("monitoring")

  const [profileName, setProfileName] = useState("Rohan Iyer")
  const [profileId, setProfileId] = useState("TECH-OPS-07")
  const [profileDept, setProfileDept] = useState("Library Technical Operations")
  const [profileEmail, setProfileEmail] = useState("rohan.tech@smartlib.ai")
  const [profilePwd, setProfilePwd] = useState("********")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [newDeviceName, setNewDeviceName] = useState("")
  const [newDeviceType, setNewDeviceType] = useState("RFID Reader")
  const [newDeviceLocation, setNewDeviceLocation] = useState("North Entrance")

  const [devices, setDevices] = useState<DeviceItem[]>([
    { id: 1, name: "RFID Reader Gate-2", type: "RFID Reader", location: "North Entrance", health: "89%", status: "Degraded" },
    { id: 2, name: "Sorting Robot R-03", type: "Robot", location: "Ops Bay", health: "46%", status: "Maintenance" },
    { id: 3, name: "Camera Cluster C-07", type: "Camera", location: "Archive Zone", health: "72%", status: "Investigating" },
    { id: 4, name: "Analytics Node S-2", type: "Server", location: "Server Room", health: "68%", status: "Stable" },
  ])

  const [complaints, setComplaints] = useState<ComplaintItem[]>([
    { id: 101, title: "Robot sorter battery degradation", source: "Librarian Desk", priority: "Critical", status: "Assigned" },
    { id: 102, title: "North gate RFID drift", source: "Operations Monitor", priority: "High", status: "In Progress" },
    { id: 103, title: "Camera sync lag", source: "Archive Room", priority: "Medium", status: "Watching" },
  ])

  const [alerts] = useState([
    { id: 1, text: "Robot R-03 requires battery replacement review.", unread: true },
    { id: 2, text: "Analytics node memory climbed 9% over baseline.", unread: true },
    { id: 3, text: "Gate reader calibration window opens at 4:30 PM.", unread: false },
  ])

  const [maintenanceLogs] = useState<MaintenanceLog[]>([
    { id: 1, title: "Ticket #284 assigned", action: "North gate RFID drift routed to on-site technician.", time: "08:05 AM" },
    { id: 2, title: "Predictive alert generated", action: "Camera C-07 thermal variance exceeded baseline.", time: "09:55 AM" },
    { id: 3, title: "Robot diagnostics scheduled", action: "Sorting bot maintenance window set for 04:30 PM.", time: "11:50 AM" },
  ])

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDeviceName.trim()) {
      alert("Please enter a device name.")
      return
    }

    setDevices([
      {
        id: Date.now(),
        name: newDeviceName,
        type: newDeviceType,
        location: newDeviceLocation,
        health: "100%",
        status: "New",
      },
      ...devices,
    ])

    setNewDeviceName("")
    alert(`"${newDeviceName}" added to monitoring successfully!`)
  }

  const handleDeleteDevice = (id: number) => {
    if (confirm("Remove this device from monitoring?")) {
      setDevices(devices.filter((device) => device.id !== id))
    }
  }

  const handleResolveComplaint = (id: number) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
      )
    )
    alert("Complaint marked as resolved.")
  }

  const handleEscalateComplaint = (id: number) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: "Escalated" } : complaint
      )
    )
    alert("Complaint escalated to emergency operations.")
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <DashboardShell title="Technician Operations" role="Technician" accent="Live maintenance & technical monitoring">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active complaints" value="26" delta="9 critical" icon={Wrench} />
        <StatCard label="Resolved issues" value="141" delta="+11 today" icon={CheckCircle2} />
        <StatCard label="System uptime" value="99.42%" delta="30-day average" icon={Activity} />
        <StatCard label="Device health" value="87%" delta="4 nodes degraded" icon={Cpu} />
      </div>

      <div className="mt-6 flex gap-2 border-b border-white/5 text-sm">
        {[
          { id: "monitoring", label: "Live Monitoring", icon: Wifi },
          { id: "devices", label: "Device Control", icon: Server },
          { id: "alerts", label: "Alerts & Complaints", icon: ShieldAlert },
          { id: "analytics", label: "Analytics", icon: Activity },
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
          {activeTab === "monitoring" && (
            <motion.div
              key="monitoring"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Wifi className="h-4 w-4 text-neon" /> Live Monitoring Grid
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Monitor RFID, robots, servers, cameras, and IoT devices in real time.</p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {devices.map((device) => (
                      <div key={device.id} className="rounded-xl border border-white/5 bg-white/5 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">{device.name}</span>
                          <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${device.status === "Maintenance" || device.status === "Investigating" ? "bg-amber-500/20 text-amber-300" : device.status === "Degraded" ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                            {device.status}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{device.type} · {device.location}</div>
                        <div className="mt-4">
                          <div className="mb-1.5 flex justify-between text-[10px] text-muted-foreground">
                            <span>Health</span>
                            <span>{device.health}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-neon-gradient" style={{ width: device.health }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Bot className="h-4 w-4 text-neon" /> Maintenance Timeline
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Recent diagnostics, predictive alerts, and field assignments.</p>

                  <div className="mt-4 space-y-2">
                    {maintenanceLogs.map((log) => (
                      <div key={log.id} className="rounded-xl border border-white/5 bg-white/5 p-3.5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-foreground">{log.title}</span>
                          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{log.time}</span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{log.action}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                    <Bell className="h-4 w-4 text-neon" /> Technical Alerts
                  </h2>

                  <div className="mt-4 space-y-2">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={`rounded-xl border p-3 text-xs transition ${alert.unread ? "border-neon/20 bg-neon/5" : "border-white/5 bg-white/5"}`}>
                        <div className="flex items-start gap-2">
                          {alert.unread && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />}
                          <span className="text-foreground">{alert.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-neon/10 glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 animate-pulse text-neon" /> Vector AI Insights
                  </h2>

                  <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
                    <div className="rounded-lg border border-neon/10 bg-neon/5 p-3 text-foreground">
                      <span className="font-semibold text-neon">Predictive flag:</span> RFID cluster drift probability is <span className="font-bold">78%</span> at the north gate over the next 24 hours.
                    </div>
                    <div className="rounded-lg bg-white/5 p-3 text-foreground">
                      <span className="font-semibold text-amber-400">Maintenance peak:</span> Device failures are clustering between <span className="font-bold">3 PM and 6 PM</span>; reserve one extra field technician.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "devices" && (
            <motion.div
              key="devices"
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
                        <Server className="h-4 w-4 text-neon" /> Device Registry
                      </h2>
                      <p className="mt-0.5 text-xs text-muted-foreground">Search, inspect, and remove connected hardware from the monitoring fabric.</p>
                    </div>
                    <div className="flex max-w-xs flex-1 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                      <Search className="h-3.5 w-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search device, type, or location..."
                        className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 font-semibold text-muted-foreground">
                          <th className="py-2.5">Device</th>
                          <th className="py-2.5">Type</th>
                          <th className="py-2.5">Location</th>
                          <th className="py-2.5">Health</th>
                          <th className="py-2.5">Status</th>
                          <th className="py-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredDevices.map((device) => (
                          <tr key={device.id} className="transition hover:bg-white/5">
                            <td className="py-3 font-medium text-foreground">{device.name}</td>
                            <td className="py-3 text-muted-foreground">{device.type}</td>
                            <td className="py-3 text-muted-foreground">{device.location}</td>
                            <td className="py-3 font-semibold text-foreground">{device.health}</td>
                            <td className="py-3 text-muted-foreground">{device.status}</td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => handleDeleteDevice(device.id)}
                                className="rounded-lg p-1.5 text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-300"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <HardDrive className="h-4 w-4 text-neon" /> System Groups
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Grouped operational systems for faster triage and routing.</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { title: "RFID Monitoring", provider: "North + West Gates", state: "Stable" },
                      { title: "Server Cluster", provider: "Analytics + Archive Nodes", state: "Watch Memory" },
                      { title: "Camera Fabric", provider: "Archive + Silent Floor", state: "Lag Flagged" },
                    ].map((group) => (
                      <div key={group.title} className="rounded-xl border border-white/5 bg-white/5 p-3">
                        <div className="text-xs font-semibold text-foreground">{group.title}</div>
                        <div className="mt-1 text-[10px] text-muted-foreground">{group.provider}</div>
                        <div className="mt-3 text-[10px] font-semibold text-neon">{group.state}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-fit rounded-2xl glass p-5 shadow-sm">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <Plus className="h-4 w-4 text-neon" /> Add Device
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Register a new RFID reader, robot, camera, or server node.</p>

                <form onSubmit={handleAddDevice} className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="mb-1 block font-semibold text-muted-foreground">Device Name</label>
                    <input type="text" value={newDeviceName} onChange={(e) => setNewDeviceName(e.target.value)} placeholder="e.g. RFID Reader Gate-3" className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-foreground outline-none focus:border-neon/30" />
                  </div>
                  <div>
                    <label className="mb-1 block font-semibold text-muted-foreground">Device Type</label>
                    <select value={newDeviceType} onChange={(e) => setNewDeviceType(e.target.value)} className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-foreground outline-none focus:border-neon/30">
                      <option>RFID Reader</option>
                      <option>Robot</option>
                      <option>Camera</option>
                      <option>Server</option>
                      <option>Face Recognition Unit</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block font-semibold text-muted-foreground">Location</label>
                    <input type="text" value={newDeviceLocation} onChange={(e) => setNewDeviceLocation(e.target.value)} placeholder="e.g. North Entrance" className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-foreground outline-none focus:border-neon/30" />
                  </div>

                  <button type="submit" className="mt-2 w-full rounded-xl bg-neon-gradient py-2 font-bold text-neon-foreground transition hover:shadow-glow">
                    Add Device
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === "alerts" && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-6"
            >
              <div className="rounded-2xl glass p-5 shadow-sm">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <ShieldAlert className="h-4 w-4 text-neon" /> Complaints & Emergency Alerts
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Resolve, escalate, and monitor high-risk technical incidents.</p>

                <div className="mt-4 space-y-3">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">{complaint.title}</span>
                          <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${complaint.priority === "Critical" ? "bg-rose-500/20 text-rose-300" : complaint.priority === "High" ? "bg-amber-500/20 text-amber-300" : "bg-sky-500/20 text-sky-300"}`}>
                            {complaint.priority}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{complaint.source} · {complaint.status}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleResolveComplaint(complaint.id)} className="rounded-lg bg-neon-gradient px-3 py-1.5 text-xs font-bold text-neon-foreground transition hover:shadow-glow">
                          Resolve
                        </button>
                        <button onClick={() => handleEscalateComplaint(complaint.id)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-rose-500/50 hover:text-rose-400">
                          Escalate
                        </button>
                      </div>
                    </div>
                  ))}
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
                    <Activity className="h-4 w-4 text-neon" /> Uptime and Reliability Trends
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Weekly operational health across complaints, uptime, and device stability.</p>

                  <div className="mt-6 flex h-44 items-end justify-between gap-2 border-b border-l border-white/10 pb-2 pl-2">
                    {[
                      { label: "Mon", val: "h-28", amount: "96%" },
                      { label: "Tue", val: "h-32", amount: "97%" },
                      { label: "Wed", val: "h-36", amount: "98%" },
                      { label: "Thu", val: "h-34", amount: "97.5%" },
                      { label: "Fri", val: "h-40", amount: "99%" },
                      { label: "Sat", val: "h-30", amount: "96.8%" },
                      { label: "Sun", val: "h-26", amount: "96.1%" },
                    ].map((bar, i) => (
                      <div key={i} className="group relative flex flex-1 flex-col items-center">
                        <div className="pointer-events-none absolute bottom-full z-10 mb-1 rounded border border-white/10 bg-black/95 px-1.5 py-0.5 font-mono text-[9px] text-neon opacity-0 transition group-hover:opacity-100">
                          {bar.amount} uptime
                        </div>
                        <div className={`w-full rounded-t-lg bg-neon-gradient opacity-80 transition group-hover:opacity-100 ${bar.val}`} />
                        <span className="mt-2 text-[10px] text-muted-foreground">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Users className="h-4 w-4 text-neon" /> Technical Activity Stream
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Live stream of diagnostics, ticket handling, and system checks.</p>

                  <div className="mt-4 space-y-2 text-xs">
                    {[
                      { user: "Field Technician", action: "Checked RFID gate alignment at North Entrance", time: "2 mins ago" },
                      { user: "Monitoring Bot", action: "Flagged memory growth on analytics node S-2", time: "11 mins ago" },
                      { user: "Camera Cluster C-07", action: "Recovered after auto-restart sequence", time: "24 mins ago" },
                      { user: "Operations Desk", action: "Escalated robot sorter complaint to maintenance lane", time: "1 hour ago" },
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
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                    <Bell className="h-4 w-4 text-neon" /> Broadcast Alerts
                  </h2>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">Push maintenance updates and emergency notices to operators.</p>

                  <div className="mt-4 space-y-3">
                    <button
                      onClick={() => alert("Alert Broadcasted: 'North gate maintenance window begins at 4:30 PM'")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left text-xs transition hover:border-neon/30 hover:bg-white/10"
                    >
                      <div className="font-semibold text-foreground">Maintenance Window</div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">Notify operators about scheduled downtime.</div>
                    </button>
                    <button
                      onClick={() => alert("Alert Broadcasted: 'Emergency server review triggered for analytics node S-2'")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left text-xs transition hover:border-neon/30 hover:bg-white/10"
                    >
                      <div className="font-semibold text-foreground">Server Review</div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">Escalate performance drift to the infrastructure lane.</div>
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-neon/10 glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 animate-pulse text-neon" /> Vector AI Maintenance Insights
                  </h2>

                  <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
                    <div className="rounded-lg border border-neon/10 bg-neon/5 p-3 text-foreground">
                      <span className="font-semibold text-neon">Failure pattern:</span> Camera and RFID issues are clustering around <span className="font-bold">network jitter spikes</span> in the north wing.
                    </div>
                    <div className="rounded-lg bg-white/5 p-3 text-foreground">
                      <span className="font-semibold text-amber-400">Recommendation:</span> Replace sorter battery packs before <span className="font-bold">Friday noon</span> to avoid peak-hour downtime.
                    </div>
                  </div>
                </div>

                <div className="max-w-2xl rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <User className="h-5 w-5 text-neon" /> Technician Profile Settings
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Update your technician identity, operations desk, and access preferences.</p>

                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Profile details saved and updated successfully!
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
                        <label className="mb-1.5 block font-semibold text-muted-foreground">Technician ID</label>
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
                          <Settings className="h-4 w-4 text-muted-foreground" />
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  )
}
