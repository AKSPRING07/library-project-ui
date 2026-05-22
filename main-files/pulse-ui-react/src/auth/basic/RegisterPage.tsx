import { motion } from "framer-motion"
import {
  BookOpen,
  BriefcaseBusiness,
  Cpu,
  GraduationCap,
  Eye,
  EyeOff,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth, type RegistrationData } from "@/context/AuthContext"

const roleOptions = [
  {
    role: "student" as const,
    title: "Student",
    description: "Smart reading access, borrowing workflows, and AI-led assistance.",
    icon: GraduationCap,
    accent: "from-cyan-400 to-blue-500",
    extraLabel: "Upload Student ID Card",
  },
  {
    role: "staff" as const,
    title: "Staff",
    description: "Faculty and administrative access for academic resource management.",
    icon: BriefcaseBusiness,
    accent: "from-emerald-400 to-teal-500",
    extraLabel: "Upload Staff ID",
  },
  {
    role: "librarian" as const,
    title: "Librarian",
    description: "Library operations, inventory control, and branch supervision.",
    icon: BookOpen,
    accent: "from-violet-400 to-fuchsia-500",
    extraLabel: "Upload Verification Document",
  },
  {
    role: "technician" as const,
    title: "Technician",
    description: "Technical maintenance, systems support, and AI infrastructure operations.",
    icon: Cpu,
    accent: "from-lime-400 to-emerald-500",
    extraLabel: "Upload Authorization Document",
  },
]

const roleFields: Record<RegistrationData["role"], Array<{ id: keyof RegistrationData; label: string; placeholder: string; type?: string }>> = {
  student: [
    { id: "fullName", label: "Full Name", placeholder: "Aarav Patel" },
    { id: "idNumber", label: "Student ID", placeholder: "STU-2027-001" },
    { id: "department", label: "Department", placeholder: "Computer Science" },
    { id: "courseYear", label: "Course / Year", placeholder: "B.Tech 4th Year" },
    { id: "institutionName", label: "Institution Name", placeholder: "Smart Library University" },
    { id: "email", label: "Email Address", placeholder: "aarav@smartlib.ai", type: "email" },
    { id: "contactNumber", label: "Phone Number", placeholder: "+91 98765 43210" },
    { id: "password", label: "Password", placeholder: "Create a secure password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter password", type: "password" },
  ],
  staff: [
    { id: "fullName", label: "Full Name", placeholder: "Priya Sharma" },
    { id: "idNumber", label: "Staff ID", placeholder: "STF-4201" },
    { id: "department", label: "Department", placeholder: "Administration" },
    { id: "designation", label: "Designation", placeholder: "Faculty Coordinator" },
    { id: "institutionName", label: "Institution Name", placeholder: "Smart Library University" },
    { id: "email", label: "Official Email", placeholder: "priya@smartlib.ai", type: "email" },
    { id: "contactNumber", label: "Contact Number", placeholder: "+91 91234 56789" },
    { id: "password", label: "Password", placeholder: "Create a secure password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter password", type: "password" },
  ],
  librarian: [
    { id: "fullName", label: "Full Name", placeholder: "Neha Reddy" },
    { id: "idNumber", label: "Employee ID", placeholder: "LIB-0198" },
    { id: "branch", label: "Library Branch", placeholder: "Central AI Archives" },
    { id: "experience", label: "Experience", placeholder: "7 years" },
    { id: "email", label: "Official Email", placeholder: "neha@smartlib.ai", type: "email" },
    { id: "contactNumber", label: "Contact Number", placeholder: "+91 98765 12345" },
    { id: "password", label: "Password", placeholder: "Create a secure password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter password", type: "password" },
  ],
  technician: [
    { id: "fullName", label: "Full Name", placeholder: "Rohan Mehta" },
    { id: "idNumber", label: "Technician ID", placeholder: "TECH-5601" },
    { id: "department", label: "Technical Department", placeholder: "Systems & Network" },
    { id: "specialization", label: "Specialization", placeholder: "AI Infrastructure" },
    { id: "email", label: "Official Email", placeholder: "rohan@smartlib.ai", type: "email" },
    { id: "contactNumber", label: "Contact Number", placeholder: "+91 99887 66554" },
    { id: "password", label: "Password", placeholder: "Create a secure password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter password", type: "password" },
  ],
}

const initialFormState: Partial<RegistrationData> = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "student",
  idNumber: "",
  institutionName: "",
  department: "",
  courseYear: "",
  designation: "",
  branch: "",
  experience: "",
  specialization: "",
  contactNumber: "",
}

function calculateStrength(password: string) {
  let score = 0
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return score
}

export default function RegisterPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<RegistrationData["role"]>("student")
  const [formData, setFormData] = useState<Partial<RegistrationData>>(initialFormState)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const roleConfig = roleOptions.find((item) => item.role === selectedRole)!
  const fields = roleFields[selectedRole]

  const strength = useMemo(() => calculateStrength(formData.password ?? ""), [formData.password])
  const strengthLabel = ["Weak", "Fair", "Strong", "Very Strong", "Secure"][strength]

  const handleInputChange = (key: keyof RegistrationData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (!selectedRole) {
      toast.error("Select a role to continue.")
      return
    }
    setStep(2)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedRole) {
      toast.error("Select your role first.")
      return
    }
    setLoading(true)

    const requiredFields = fields.filter((field) => field.id !== "courseYear" || selectedRole !== "student")
    for (const field of requiredFields) {
      const value = formData[field.id]
      if (!value?.toString().trim()) {
        setLoading(false)
        toast.error(`Please complete ${field.label}.`)
        return
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setLoading(false)
      toast.error("Passwords do not match.")
      return
    }

    if ((formData.password ?? "").length < 8) {
      setLoading(false)
      toast.error("Use at least 8 characters for your password.")
      return
    }

    try {
      await auth.register({
        fullName: formData.fullName ?? "",
        email: formData.email ?? "",
        password: formData.password ?? "",
        confirmPassword: formData.confirmPassword ?? "",
        role: selectedRole,
        idNumber: formData.idNumber ?? "",
        institutionName: formData.institutionName ?? "",
        department: formData.department,
        courseYear: formData.courseYear,
        designation: formData.designation,
        branch: formData.branch,
        experience: formData.experience,
        specialization: formData.specialization,
        contactNumber: formData.contactNumber,
      })
      setLoading(false)
      navigate("/auth/basic/login", { replace: true })
    } catch (error) {
      setLoading(false)
      toast.error(error instanceof Error ? error.message : "Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),_transparent_18%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.16),_transparent_18%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
          <motion.section
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10 flex-1 rounded-[34px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-xl lg:mb-0 lg:mr-8 lg:p-12"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300/80">AI registration</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Launch your Smart Library access with a role-based profile.
            </h1>
            <p className="mt-5 max-w-xl text-slate-300 sm:text-lg">
              Choose your role, complete the dynamic onboarding fields, and instantly register for the right dashboard workflow.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {roleOptions.map((role) => {
                const Icon = role.icon
                const active = role.role === selectedRole
                return (
                  <button
                    type="button"
                    key={role.role}
                    onClick={() => setSelectedRole(role.role)}
                    className={`rounded-3xl border p-5 text-left transition ${
                      active
                        ? "border-cyan-300/70 bg-cyan-500/10 shadow-[0_0_0_1px_rgba(56,189,248,0.32)]"
                        : "border-slate-700/80 bg-slate-950/70 hover:border-slate-500/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${role.accent} text-slate-950`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-lg font-semibold text-white">{role.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{role.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-1 rounded-[34px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl lg:p-10"
          >
            <div className="mb-8 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Registration wizard</span>
                  <h2 className="mt-3 text-3xl font-semibold text-white">{step === 1 ? "Select your role" : `Register as ${roleConfig.title}`}</h2>
                </div>
                <div className="rounded-3xl border border-slate-700/40 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
                  Step {step} of 2
                </div>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                {step === 1 ? "Choose the correct access profile for your Smart Library workspace." : "Fill the role-specific fields below and complete secure registration."}
              </p>
            </div>

            {step === 1 ? (
              <div className="grid gap-4">
                <p className="text-sm text-slate-400">Begin by selecting your role to surface the exact registration experience.</p>
                <Button type="button" className="w-full py-3" onClick={handleNext}>
                  Continue to form
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  {fields.map((field) => {
                    const value = formData[field.id] ?? ""
                    const isPassword = field.type === "password"
                    const showToggle = field.id === "password" || field.id === "confirmPassword"
                    return (
                      <div key={field.id}>
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <div className="relative mt-2">
                          <Input
                            id={field.id}
                            type={field.type ?? "text"}
                            value={value as string}
                            placeholder={field.placeholder}
                            onChange={(event) => handleInputChange(field.id, event.target.value)}
                            required
                            className={showToggle ? "pr-10" : undefined}
                          />
                          {showToggle && (
                            <button
                              type="button"
                              onClick={() =>
                                field.id === "password"
                                  ? setShowPassword(!showPassword)
                                  : setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100"
                              aria-label={showToggle ? "Toggle password visibility" : undefined}
                            >
                              {field.id === "password" ? (
                                showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />
                              ) : field.id === "confirmPassword" ? (
                                showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />
                              ) : null}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="rounded-3xl border border-slate-700/70 bg-slate-950/60 p-4 text-sm text-slate-300 shadow-lg shadow-slate-950/20">
                  <p className="font-medium text-white">{roleConfig.extraLabel}</p>
                  <p className="mt-2">Optional upload for verification. This is a UI placeholder to complete the enterprise onboarding layout.</p>
                  <div className="mt-4 rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/80 p-4">
                    <input type="file" className="w-full cursor-pointer text-sm text-slate-200" />
                  </div>
                </div>

                <div className="space-y-3 rounded-3xl border border-slate-700/70 bg-slate-950/65 p-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between gap-3">
                    <span>Password strength</span>
                    <span className="font-semibold text-white">{strengthLabel}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-2 rounded-full ${
                        strength <= 1
                          ? "bg-rose-500 w-1/5"
                          : strength === 2
                          ? "bg-amber-400 w-2/5"
                          : strength === 3
                          ? "bg-cyan-400 w-3/5"
                          : strength === 4
                          ? "bg-emerald-400 w-4/5"
                          : "bg-emerald-500 w-full"
                      } transition-all duration-300`}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Button type="submit" className="w-full py-3" disabled={loading}>
                    {loading ? "Registering…" : "Complete registration"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full py-3"
                    onClick={() => setStep(1)}
                  >
                    Back to role selection
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 border-t border-slate-700/50 pt-6 text-center text-sm text-slate-400">
              Already registered?{' '}
              <Link to="/auth/basic/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
