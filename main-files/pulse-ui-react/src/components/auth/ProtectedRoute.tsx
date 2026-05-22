import { Navigate, useLocation } from "react-router-dom"
import { ReactNode } from "react"
import { useAuth } from "@/context/AuthContext"

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode
  allowedRoles: Array<"student" | "staff" | "librarian" | "technician">
}) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth/basic/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(auth.user!.role)) {
    return <Navigate to={auth.getDashboardRoute(auth.user!.role)} replace />
  }

  return <>{children}</>
}
