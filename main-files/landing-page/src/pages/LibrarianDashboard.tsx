import RoleDashboardPage, { dashboardIcons } from "@/components/dashboard/RoleDashboardPage"

export default function LibrarianDashboard() {
  return (
    <RoleDashboardPage
      title="Librarian Dashboard"
      subtitle="Enterprise-level inventory control, borrower monitoring, AI reporting, complaint tracking, and smart library operations."
      accentClass="bg-amber-300"
      metrics={[
        { label: "Total Books", value: "24.8K", icon: dashboardIcons.activity },
        { label: "Active Borrowers", value: "1,286", icon: dashboardIcons.time },
        { label: "Overdue Books", value: "93", icon: dashboardIcons.ai },
        { label: "Fine Collections", value: "Rs 48K", icon: dashboardIcons.system },
        { label: "Active Complaints", value: "11", icon: dashboardIcons.activity },
        { label: "Library Occupancy", value: "72%", icon: dashboardIcons.time },
      ]}
      sections={[
        {
          title: "Inventory Analytics",
          description: "Manage books, circulation, returns, reservations, shelf location mapping, and smart stock trends.",
        },
        {
          title: "AI Reports and Monitoring",
          description: "Use predictive overdue analysis, behavior insights, and live occupancy plus attendance tracking.",
        },
        {
          title: "Complaint and Device Control",
          description: "Create technician complaints, assign issues, and monitor RFID, QR, face recognition, and robots.",
        },
      ]}
    />
  )
}
