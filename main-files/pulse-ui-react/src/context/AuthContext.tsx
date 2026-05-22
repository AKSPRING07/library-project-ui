import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

export type AuthRole = "student" | "staff" | "librarian" | "technician"

export type AuthUser = {
  id: string
  name: string
  email: string
  role: AuthRole
  institution: string
  contact?: string
  password?: string
}

type AuthCredentials = {
  email: string
  password: string
  remember?: boolean
}

export type RegistrationData = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  role: AuthRole
  idNumber: string
  institutionName: string
  department?: string
  courseYear?: string
  designation?: string
  branch?: string
  experience?: string
  specialization?: string
  contactNumber?: string
}

type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (credentials: AuthCredentials) => Promise<AuthUser>
  logout: () => void
  register: (data: RegistrationData) => Promise<void>
  getDashboardRoute: (role: AuthRole) => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const SESSION_KEY = "smartlib_session"
const USER_STORE_KEY = "smartlib_users"

function readSession() {
  if (typeof window === "undefined") return null
  try {
    const stored = window.localStorage.getItem(SESSION_KEY)
    return stored ? (JSON.parse(stored) as AuthUser) : null
  } catch {
    return null
  }
}

function writeSession(user: AuthUser) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY)
}

function readUserStore(): AuthUser[] {
  if (typeof window === "undefined") return []
  try {
    const stored = window.localStorage.getItem(USER_STORE_KEY)
    return stored ? (JSON.parse(stored) as AuthUser[]) : []
  } catch {
    return []
  }
}

function writeUserStore(users: AuthUser[]) {
  window.localStorage.setItem(USER_STORE_KEY, JSON.stringify(users))
}

function getDashboardRoute(role: AuthRole) {
  switch (role) {
    case "student":
      return "/dashboard/student"
    case "staff":
      return "/dashboard/staff"
    case "librarian":
      return "/dashboard/librarian"
    case "technician":
      return "/dashboard/technician"
    default:
      return "/"
  }
}

function inferRoleFromEmail(email: string): AuthRole | null {
  const normalized = email.toLowerCase()
  if (normalized.includes("student") || normalized.includes("stu")) return "student"
  if (normalized.includes("staff") || normalized.includes("emp")) return "staff"
  if (normalized.includes("librarian") || normalized.includes("lib")) return "librarian"
  if (normalized.includes("tech") || normalized.includes("technician")) return "technician"
  return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const stored = readSession()
    if (stored) {
      setUser(stored)
    }
  }, [])

  const login = async ({ email, password, remember = true }: AuthCredentials) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const users = readUserStore()
    const normalized = email.trim().toLowerCase()
    const found = users.find(
      (item) => item.email.toLowerCase() === normalized || item.id.toLowerCase() === normalized
    )

    if (!found || found.password !== password) {
      throw new Error("Invalid credentials. Please verify your email/ID and password.")
    }

    const { password: _, ...sessionUser } = found
    if (remember) {
      writeSession(sessionUser)
    } else {
      clearSession()
    }
    setUser(sessionUser)
    toast.success(`Welcome back, ${sessionUser.name}`)
    return sessionUser
  }

  const logout = () => {
    setUser(null)
    clearSession()
  }

  const register = async (data: RegistrationData) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const users = readUserStore()
    const normalized = data.email.trim().toLowerCase()
    if (users.some((item) => item.email.toLowerCase() === normalized || item.id.toLowerCase() === data.idNumber.toLowerCase())) {
      throw new Error("An account already exists with this email or ID.")
    }
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match.")
    }

    const newUser: AuthUser = {
      id: data.idNumber,
      name: data.fullName,
      email: normalized,
      role: data.role,
      institution: data.institutionName,
      contact: data.contactNumber,
      password: data.password,
    }

    writeUserStore([...users, newUser])
    toast.success("Registration successful. Please login to continue.")
    navigate("/auth/basic/login", { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      register,
      getDashboardRoute,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function getDashboardRouteForRole(role: AuthRole) {
  return getDashboardRoute(role)
}
