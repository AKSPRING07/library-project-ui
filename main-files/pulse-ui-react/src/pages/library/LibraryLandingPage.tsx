import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  GraduationCap,
  LibraryBig,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllRoleConfigs } from "@/lib/library-dashboard-data"
import { cn } from "@/lib/utils"

const roleIcons: Record<"student" | "staff" | "librarian" | "technician", typeof GraduationCap> = {
  student: GraduationCap,
  staff: Building2,
  librarian: LibraryBig,
  technician: Wrench,
}

const roleCardAccents: Record<"student" | "staff" | "librarian" | "technician", string> = {
  student: "from-sky-500/25 to-cyan-500/10",
  staff: "from-emerald-500/25 to-teal-500/10",
  librarian: "from-amber-500/25 to-orange-500/10",
  technician: "from-rose-500/25 to-fuchsia-500/10",
}

export default function LibraryLandingPage() {
  const roles = getAllRoleConfigs()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(244,114,182,0.14),_transparent_20%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--muted)))]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300">
              <LibraryBig className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Smart Library AI</p>
              <p className="text-xs text-muted-foreground">Landing hub for four role-based dashboards</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden rounded-full px-3 py-1 md:inline-flex">
              <MoonStar className="mr-2 size-3.5" />
              Dark and light mode
            </Badge>
            <Button asChild variant="ghost" className="rounded-full border border-slate-700/80 px-4 py-2 text-slate-100 hover:bg-slate-900/70">
              <Link to="/auth/basic/login">Login</Link>
            </Button>
            <Button asChild className="rounded-full bg-cyan-500 px-4 py-2 text-slate-950 hover:bg-cyan-400">
              <Link to="/auth/basic/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-card/75 px-6 py-12 shadow-2xl backdrop-blur-xl lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_30%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="rounded-full border-sky-500/20 bg-sky-500/10 px-4 py-1 text-sky-700 dark:text-sky-300">
                Futuristic AI-powered smart library ecosystem
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  One landing page. Four connected dashboards. One smart library control plane.
                </h1>
                <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
                  This upgraded experience turns the existing admin template into a role-based Smart Library Management System for students, staff, librarians, and technicians with AI search, predictive insights, glassmorphism panels, and responsive operations workflows.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/dashboard/student">
                    Explore Student Dashboard
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/dashboard/staff">Open Staff Dashboard</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/dashboard/librarian">Open Librarian Dashboard</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/dashboard/technician">Open Technician Dashboard</Link>
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "AI search, voice lookup, QR workflows, and smart notifications",
                  "Real-time library occupancy, face recognition, RFID, and robot status",
                  "Tailwind, Pulse UI, ShadCN, Framer Motion, and mobile-ready layouts",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border bg-background/60 p-4 text-sm text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Card className="rounded-[28px] border-white/10 bg-background/80 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-300">
                    <Bot className="size-5" />
                  </div>
                  <div>
                    <CardTitle>AI orchestration panel</CardTitle>
                    <CardDescription>Cross-role automation and recommendations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Predictive recommendations", value: "97% relevance" },
                  { label: "Monitoring coverage", value: "244 devices" },
                  { label: "Connected workflows", value: "Student to technician" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border bg-muted/40 p-4">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Choose a dashboard</h2>
              <p className="text-sm text-muted-foreground">Each role has its own process, structure, navigation, and AI workflow.</p>
            </div>
            <Badge variant="outline" className="rounded-full px-4 py-1">
              Four dashboards connected from one landing page
            </Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {roles.map((role, index) => {
              const RoleIcon = roleIcons[role.role]
              return (
                <motion.div
                  key={role.role}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  <Card className="group relative h-full overflow-hidden rounded-[28px] border-white/10 bg-card/80 shadow-xl backdrop-blur transition-transform hover:-translate-y-1">
                    <div className={cn("absolute inset-x-0 top-0 h-40 bg-gradient-to-br", roleCardAccents[role.role])} />
                    <CardHeader className="relative space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={cn("rounded-2xl border p-3", role.accentSoftClass)}>
                          <RoleIcon className="size-5" />
                        </div>
                        <Badge variant="outline" className="rounded-full">
                          {role.summaryLabel}
                        </Badge>
                      </div>
                      <div>
                        <CardTitle>{role.title}</CardTitle>
                        <CardDescription className="mt-2 min-h-16">{role.subtitle}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="relative space-y-4">
                      <div className="space-y-2">
                        {role.metrics.slice(0, 3).map((metric) => (
                          <div key={metric.label} className="flex items-center justify-between rounded-2xl border bg-background/60 px-4 py-3 text-sm">
                            <span className="text-muted-foreground">{metric.label}</span>
                            <span className="font-medium">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1 rounded-full">
                          <Link to={role.route}>
                            Open
                            <ArrowRight className="ml-2 size-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1 rounded-full">
                          <Link to={role.route}>Go to {role.title.replace(" Dashboard", "")}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: BrainCircuit,
              title: "AI-native workflows",
              description: "Every dashboard includes AI recommendations, smart alerts, predictive analysis, and contextual assistant guidance.",
            },
            {
              icon: ShieldCheck,
              title: "Operational visibility",
              description: "Track occupancy, devices, requests, complaints, borrowing trends, and system health from a single connected platform.",
            },
            {
              icon: Sparkles,
              title: "Modern UX foundation",
              description: "Glassmorphism cards, motion, dark mode, mobile responsiveness, and a SaaS-style shell built for a futuristic library product.",
            },
          ].map((item) => (
            <Card key={item.title} className="rounded-[28px] border-white/10 bg-card/80 shadow-xl backdrop-blur">
              <CardContent className="p-6">
                <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300 w-fit">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
