import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts"
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Mic,
  QrCode,
  Sparkles,
} from "lucide-react"

import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { getRoleConfig } from "@/lib/library-dashboard-data"

const chartConfig = {
  primary: {
    label: "Primary",
    color: "hsl(var(--chart-2))",
  },
  secondary: {
    label: "Secondary",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const toneClasses = {
  sky: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  rose: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
}

const timelineTone = {
  live: "bg-sky-500",
  queued: "bg-amber-500",
  done: "bg-emerald-500",
  alert: "bg-rose-500",
}

export default function RoleDashboardPage() {
  const location = useLocation()
  const config = getRoleConfig(location.pathname)

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-card/70 p-6 shadow-2xl backdrop-blur xl:p-8">
        <div className={cn("absolute inset-0 bg-gradient-to-br", config.accentClass)} />
        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl dark:bg-white/5" />
        <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className={cn("w-fit border", config.accentSoftClass)}>
              {config.summaryLabel}
            </Badge>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight xl:text-4xl">{config.title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground xl:text-base">{config.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full">
                Open AI workspace
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
              <Button variant="outline" className="rounded-full">
                <Mic className="mr-2 size-4" />
                Voice search
              </Button>
              <Button variant="outline" className="rounded-full">
                <QrCode className="mr-2 size-4" />
                Smart scan
              </Button>
            </div>
          </div>

          <Card className="w-full max-w-md border-white/10 bg-background/70 shadow-xl backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={cn("rounded-2xl border p-3", config.accentSoftClass)}>
                  <Bot className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Floating AI Assistant</CardTitle>
                  <CardDescription>Always-on contextual help</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{config.assistantPrompt}</p>
              <div className="rounded-2xl border bg-muted/40 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="size-4 text-sky-500" />
                  Next best action
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {config.actions[0]?.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {config.metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
          >
            <Card className="h-full rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
              <CardContent className="flex h-full flex-col justify-between gap-4 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">{metric.value}</p>
                  </div>
                  <div className={cn("rounded-2xl border p-3", toneClasses[metric.tone])}>
                    <metric.icon className="size-5" />
                  </div>
                </div>
                <Badge variant="outline" className={cn("w-fit border", toneClasses[metric.tone])}>
                  {metric.delta}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle>Reading and activity intelligence</CardTitle>
                <CardDescription>Primary trend against secondary AI benchmark.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[280px] w-full" config={chartConfig}>
                  <AreaChart data={config.activity}>
                    <defs>
                      <linearGradient id="primaryFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="primary" stroke="var(--color-primary)" fill="url(#primaryFill)" strokeWidth={2.4} />
                    <Area type="monotone" dataKey="secondary" stroke="var(--color-secondary)" fillOpacity={0} strokeWidth={2} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle>Category and usage mix</CardTitle>
                <CardDescription>Role-specific distribution snapshot.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <ChartContainer className="h-[240px] w-full" config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={config.categories}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={54}
                      outerRadius={86}
                      paddingAngle={4}
                    >
                      {config.categories.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
                  </PieChart>
                </ChartContainer>
                <div className="space-y-3">
                  {config.categories.map((item) => (
                    <div key={item.name} className="rounded-2xl border bg-background/60 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="mt-3 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle>Smart recommendations and assets</CardTitle>
                <CardDescription>Books, resources, devices, or systems prioritized for this role.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-3">
                {config.cards.map((item) => (
                  <div key={item.title} className="rounded-[22px] border bg-background/60 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className={cn("border", config.accentSoftClass)}>
                        {item.badge}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Rating {item.rating}</span>
                    </div>
                    <div className="mt-4 h-28 rounded-[18px] border border-dashed bg-gradient-to-br from-muted/80 to-background" />
                    <h3 className="mt-4 font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                    <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                      <p>Location: {item.location}</p>
                      <p>Status: {item.status}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1 rounded-full">Open</Button>
                      <Button size="sm" variant="outline" className="flex-1 rounded-full">Track</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>Fast, AI-friendly entry points for common tasks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {config.actions.map((action) => (
                  <Link
                    key={action.title}
                    to={config.route}
                    className="flex items-start gap-3 rounded-2xl border bg-background/60 p-4 transition-colors hover:bg-muted/60"
                  >
                    <div className={cn("rounded-2xl border p-3", config.accentSoftClass)}>
                      <action.icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{action.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle>Timeline and recent activity</CardTitle>
              <CardDescription>Recent automation, borrowing, approvals, or maintenance events.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.timeline.map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className={cn("mt-1 h-3 w-3 rounded-full", timelineTone[item.status])} />
                    {index !== config.timeline.length - 1 && <span className="mt-2 h-full w-px bg-border" />}
                  </div>
                  <div className="flex-1 rounded-2xl border bg-background/60 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium">{item.title}</p>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle>AI insights</CardTitle>
              <CardDescription>Live smart-library signals tailored to this workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {config.insights.map((item) => (
                <div key={item.title} className="rounded-2xl border bg-background/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("rounded-2xl border p-3", config.accentSoftClass)}>
                        <item.icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle>Progress monitors</CardTitle>
              <CardDescription>Goal, workflow, and system completion states.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {config.progress.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                  <p className="text-xs text-muted-foreground">{item.caption}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[24px] border-white/10 bg-card/80 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle>Weekly workload bars</CardTitle>
              <CardDescription>Operational volume across the current week.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[220px] w-full" config={chartConfig}>
                <BarChart data={config.activity}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="primary" fill="var(--color-primary)" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="h-14 rounded-full px-5 shadow-2xl">
          <Bot className="mr-2 size-5" />
          Aura AI
        </Button>
      </div>

      <section className="rounded-[24px] border border-white/10 bg-card/80 p-5 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Smart command deck</h2>
            <p className="text-sm text-muted-foreground">
              Voice-ready workflows, predictive AI signals, and responsive layouts tuned for mobile and desktop.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className={cn("border", config.accentSoftClass)}>
              Dark / light mode ready
            </Badge>
            <Badge variant="outline" className={cn("border", config.accentSoftClass)}>
              Real-time smart notifications
            </Badge>
            <Badge variant="outline" className={cn("border", config.accentSoftClass)}>
              Pulse UI + ShadCN powered
            </Badge>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "AI smart search with voice and predictive suggestions",
            "Glassmorphism cards, animated widgets, and futuristic gradients",
            "Responsive operational layouts for library, staff, and maintenance teams",
          ].map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-2xl border bg-background/60 p-4">
              <CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />
              <p className="text-sm text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
