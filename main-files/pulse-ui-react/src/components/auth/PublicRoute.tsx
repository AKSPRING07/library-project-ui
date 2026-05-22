import { Navigate } from "react-router-dom"
import { ReactNode } from "react"
import { useAuth } from "@/context/AuthContext"

export function PublicRoute({ children }: { children: ReactNode }) {
  const auth = useAuth()
  if (auth.isAuthenticated) {
    return <Navigate to={auth.getDashboardRoute(auth.user!.role)} replace />
  }
  return <>{children}</>
}
