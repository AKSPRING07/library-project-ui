import Button from "@/components/ui/button"
import FadeIn from "@/components/ui/FadeIn"
import { ArrowUpRight } from "lucide-react"

const dashboardLinks = [
  {
    label: "Student Dashboard",
    href: "/pulse-ui/landing-page/student-dashboard/",
  },
  {
    label: "Staff Dashboard",
    href: "http://localhost:8080/dashboard/staff",
  },
  {
    label: "Librarian Dashboard",
    href: "/pulse-ui/landing-page/librarian-dashboard/",
  },
  {
    label: "Technician Dashboard",
    href: "/pulse-ui/landing-page/technician-dashboard/",
  },
]

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-32 overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] -z-10" />

      {/* Decorative Blur Circle */}
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />

      <div className="container-custom text-center">
        
        <FadeIn>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Build production-ready  <br />
            <span className="text-black">dashboards in hours — not weeks</span>
          </h1>
        </FadeIn>

        <FadeIn>
          <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Build scalable SaaS dashboards faster using ShadCN UI,
            Tailwind CSS and clean React architecture.
          </p>
        </FadeIn>

        <div className="mt-10 flex justify-center gap-6">
          <Button asChild className="text-lg px-8 py-4">
            <a
              href="https://codervent.com/pulse-ui/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Live Preview
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </Button>

          <Button asChild variant="outline" className="text-lg px-8 py-4">
            <a href="#demos">
              Explore Demos
            </a>
          </Button>
        </div>

        <FadeIn>
          <div className="mt-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-gray-500">
              Open Role Dashboards
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {dashboardLinks.map((dashboard) => (
                <Button
                  key={dashboard.label}
                  asChild
                  variant="outline"
                  className="min-w-[220px] rounded-full px-6 py-4 text-base font-semibold"
                >
                  <a href={dashboard.href}>{dashboard.label}</a>
                </Button>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
