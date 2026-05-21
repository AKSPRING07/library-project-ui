import RoleDashboardPage, { dashboardIcons } from "@/components/dashboard/RoleDashboardPage"

export default function StudentDashboard() {
  return (
    <RoleDashboardPage
      title="Student Dashboard"
      subtitle="AI-powered book discovery, reading progress, due-date reminders, and personalized recommendations for every student."
      accentClass="bg-sky-300"
      metrics={[
        { label: "Borrowed Books", value: "12", icon: dashboardIcons.activity },
        { label: "Due Books", value: "3", icon: dashboardIcons.time },
        { label: "Reading Hours", value: "18.6h", icon: dashboardIcons.ai },
        { label: "AI Recommendations", value: "9", icon: dashboardIcons.system },
        { label: "Reserved Books", value: "4", icon: dashboardIcons.activity },
        { label: "Fine Amount", value: "Rs 120", icon: dashboardIcons.time },
      ]}
      sections={[
        {
          title: "AI Book Search",
          description: "Search by title, voice, author, category, or behavior-based suggestions with real-time availability.",
        },
        {
          title: "Reading Analytics",
          description: "Track weekly reading progress, favorite categories, and most viewed or recently explored books.",
        },
        {
          title: "Smart Activity Feed",
          description: "See due alerts, reservation readiness, occupancy updates, and digital ID activity from one place.",
        },
      ]}
    />
  )
}
