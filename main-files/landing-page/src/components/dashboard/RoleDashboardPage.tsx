import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  Bell,
  Bot,
  BookOpen,
  BrainCircuit,
  ChartColumn,
  Clock3,
  Cpu,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import Button from "@/components/ui/button"

type RoleDashboardPageProps = {
  title: string
  subtitle: string
  accentClass: string
  metrics: {
    label: string
    value: string
    icon: LucideIcon
  }[]
  sections: {
    title: string
    description: string
  }[]
}

export default function RoleDashboardPage({
  title,
  subtitle,
  accentClass,
  metrics,
  sections,
}: RoleDashboardPageProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-br from-white via-white to-slate-100 -z-10" />
      <div className={`absolute -top-24 right-0 h-[360px] w-[360px] rounded-full blur-[120px] opacity-30 -z-10 ${accentClass}`} />

      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="container-custom flex items-center justify-between py-5">
          <a href="/pulse-ui/landing-page/" className="flex items-center gap-3 text-lg font-bold">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
              <BookOpen className="h-5 w-5" />
            </span>
            Smart Library
          </a>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="px-5 py-3 rounded-full">
              <a href="/pulse-ui/landing-page/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Landing Page
              </a>
            </Button>
            <Button className="px-5 py-3 rounded-full">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-14">
        <section className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">
                AI Smart Library Dashboard
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-lg text-gray-600">{subtitle}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="px-7 py-4 text-base rounded-full">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Open AI Workspace
                </Button>
                <Button variant="outline" className="px-7 py-4 text-base rounded-full">
                  <Bot className="mr-2 h-5 w-5" />
                  Launch Assistant
                </Button>
              </div>
            </div>

            <div className="grid w-full max-w-xl gap-4 md:grid-cols-2">
              {metrics.slice(0, 4).map((metric) => (
                <div key={metric.label} className="rounded-[24px] border border-gray-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{metric.label}</p>
                      <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3 shadow-sm">
                      <metric.icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-100 p-3">
                  <metric.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {sections.map((section, index) => (
            <div key={section.title} className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                {index % 3 === 0 && <BrainCircuit className="h-5 w-5" />}
                {index % 3 === 1 && <ChartColumn className="h-5 w-5" />}
                {index % 3 === 2 && <ShieldCheck className="h-5 w-5" />}
              </div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-gray-600">{section.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export const dashboardIcons = {
  activity: ChartColumn,
  ai: BrainCircuit,
  time: Clock3,
  system: Cpu,
}
