import { motion } from "framer-motion"
import { Eye, EyeOff, Globe2, Windows } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/AuthContext"

const socialProviders = [
  { label: "Continue with Google", icon: Globe2 },
  { label: "Continue with Microsoft", icon: Windows },
]

export default function LoginPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const user = await auth.login({ email, password, remember })
      navigate(auth.getDashboardRoute(user.role), { replace: true })
    } catch (error) {
      setLoading(false)
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_20%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
          <motion.section
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10 flex-1 rounded-[34px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl lg:mb-0 lg:mr-8 lg:p-12"
          >
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl bg-white/5 p-4 shadow-inner shadow-cyan-500/10">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">AI Smart Library</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Welcome to the AI-Powered Smart Library Management System
                </h1>
                <p className="mt-4 max-w-xl text-slate-300 sm:text-lg">
                  Secure intelligent access for students, staff, librarians, and technicians.
                  Experience futuristic glassmorphism UI, AI-powered insights, and enterprise-grade access.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[28px] border border-slate-700/70 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80">Smart Access</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">Biometric AI compute</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Adaptive security, identity-driven login, and permission-aware role dispatch.
                  </p>
                </div>
                <div className="rounded-[28px] border border-slate-700/70 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">Intelligent insights</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">Futuristic library AI</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Floating analytics, smart suggestions, automated routing and secure session persistence.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[26px] border border-cyan-500/20 bg-slate-950/60 p-4 text-slate-300 shadow-lg shadow-cyan-500/5 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-cyan-300">Role-aware sessions</p>
                  <p className="mt-2 text-sm text-slate-300">Each login routes you to the correct dashboard automatically.</p>
                </div>
                <div className="rounded-[26px] border border-emerald-500/20 bg-slate-950/60 p-4 text-slate-300 shadow-lg shadow-emerald-500/5 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-emerald-300">Glassmorphism experience</p>
                  <p className="mt-2 text-sm text-slate-300">Smooth UI transitions and modern enterprise layout across desktop and mobile.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-1 rounded-[34px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl backdrop-saturate-150 lg:p-10"
          >
            <div className="mb-8 flex flex-col gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300/90">
                  Secure login
                </span>
                <h2 className="mt-3 text-3xl font-semibold text-white">Sign in to your Smart Library account</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                Access your student, staff, librarian, or technician workspace with AI-driven security and role-based routing.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="email">Email / Institution ID</Label>
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="alex.student@smartlib.ai or STU-001"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/auth/basic/forgot-password" className="text-sm text-cyan-300 hover:text-cyan-200">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your secure password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                  <Checkbox checked={remember} onCheckedChange={(checked) => setRemember(Boolean(checked))} />
                  Remember me
                </label>
                <span className="text-sm text-slate-400">Secure session persistence</span>
              </div>

              <Button type="submit" className="w-full py-3" disabled={loading}>
                {loading ? "Signing in…" : "Login"}
              </Button>

              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-slate-500">
                <span className="h-px flex-1 bg-slate-700/70" />
                OR SIGN IN WITH EMAIL
                <span className="h-px flex-1 bg-slate-700/70" />
              </div>

              <div className="grid gap-3">
                {socialProviders.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.label}
                      variant="outline"
                      type="button"
                      className="flex items-center justify-center gap-3 border-slate-700/80 text-slate-100 hover:border-cyan-300 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  )
                })}
              </div>

              <div className="text-center text-sm text-slate-400">
                New to the Smart Library?{' '}
                <Link to="/auth/basic/register" className="font-semibold text-cyan-300 hover:text-cyan-200">
                  Register now
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
