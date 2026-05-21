export default function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
        <span>
          Copyright {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">Smart Library AI</span>.
          Role-based dashboards for students, staff, librarians, and technicians.
        </span>
        <span>Built with React, Tailwind, Pulse UI, ShadCN, and Framer Motion.</span>
      </div>
    </footer>
  )
}
