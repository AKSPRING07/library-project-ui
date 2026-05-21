import RoleDashboardPage, { dashboardIcons } from "@/components/dashboard/RoleDashboardPage"

export default function StaffDashboard() {
  return (
    <RoleDashboardPage
      title="Staff Dashboard"
      subtitle="Academic resource planning, external request handling, and department-focused recommendations for staff users."
      accentClass="bg-emerald-300"
      metrics={[
        { label: "Requested Books", value: "148", icon: dashboardIcons.activity },
        { label: "Pending Approvals", value: "17", icon: dashboardIcons.time },
        { label: "Research Resources", value: "56", icon: dashboardIcons.ai },
        { label: "Department Usage", value: "81%", icon: dashboardIcons.system },
        { label: "Approved Requests", value: "94", icon: dashboardIcons.activity },
        { label: "Academic Activity", value: "342", icon: dashboardIcons.time },
      ]}
      sections={[
        {
          title: "External Book Requests",
          description: "Create requirement requests, set priority, upload documents, and follow approval workflows.",
        },
        {
          title: "Department Analytics",
          description: "Review resource demand, research trends, and department-wise reading or request activity.",
        },
        {
          title: "AI Recommendations",
          description: "Receive research-driven suggestions and predictive resource planning based on academic behavior.",
        },
      ]}
    />
  )
}
