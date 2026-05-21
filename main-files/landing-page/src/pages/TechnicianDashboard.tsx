import RoleDashboardPage, { dashboardIcons } from "@/components/dashboard/RoleDashboardPage"

export default function TechnicianDashboard() {
  return (
    <RoleDashboardPage
      title="Technician Dashboard"
      subtitle="A live maintenance workspace for robotics, RFID, cameras, face recognition systems, complaints, and server health."
      accentClass="bg-rose-300"
      metrics={[
        { label: "Active Complaints", value: "26", icon: dashboardIcons.activity },
        { label: "Resolved Issues", value: "141", icon: dashboardIcons.time },
        { label: "System Uptime", value: "99.42%", icon: dashboardIcons.ai },
        { label: "Device Health", value: "87%", icon: dashboardIcons.system },
        { label: "Emergency Alerts", value: "2", icon: dashboardIcons.activity },
        { label: "Server Usage", value: "68%", icon: dashboardIcons.time },
      ]}
      sections={[
        {
          title: "Live Monitoring",
          description: "Watch RFID nodes, robots, face recognition units, cameras, and IoT device connectivity in real time.",
        },
        {
          title: "Complaint Workflow",
          description: "Track ticket priority, issue resolution, technician assignment, and maintenance history updates.",
        },
        {
          title: "Predictive Maintenance",
          description: "Use AI fault detection, health scoring, and smart alerts to prevent outages before they happen.",
        },
      ]}
    />
  )
}
