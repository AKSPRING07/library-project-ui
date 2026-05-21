import Home from "./pages/Home"
import StudentDashboard from "./pages/StudentDashboard"
import StaffDashboard from "./pages/StaffDashboard"
import LibrarianDashboard from "./pages/LibrarianDashboard"
import TechnicianDashboard from "./pages/TechnicianDashboard"

const basePath = "/pulse-ui/landing-page"

function normalizePath(pathname: string) {
  const withoutBase = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname

  if (!withoutBase || withoutBase === "/") {
    return "/"
  }

  return withoutBase.endsWith("/") ? withoutBase.slice(0, -1) : withoutBase
}

export default function App() {
  const currentPath = normalizePath(window.location.pathname)

  if (currentPath === "/student-dashboard") {
    return <StudentDashboard />
  }

  if (currentPath === "/staff-dashboard") {
    return <StaffDashboard />
  }

  if (currentPath === "/librarian-dashboard") {
    return <LibrarianDashboard />
  }

  if (currentPath === "/technician-dashboard") {
    return <TechnicianDashboard />
  }

  return <Home />
}
