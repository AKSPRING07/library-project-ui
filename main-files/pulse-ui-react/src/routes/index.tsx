import { createBrowserRouter } from "react-router-dom"

import AppLayout from "@/layouts/AppLayout"
import AuthLayout from "@/layouts/AuthLayout"
import ErrorPage from "@/pages/ErrorPage"
import NotFound from "@/pages/NotFound"
import LoginPage from "@/auth/basic/LoginPage"
import RegisterPage from "@/auth/basic/RegisterPage"
import ForgotPasswordPage from "@/auth/basic/ForgotPasswordPage"
import { ResetPasswordForm } from "@/auth/basic/ResetPasswordForm"
import { VerifyEmailForm } from "@/auth/basic/VerifyEmailForm"
import { PasswordResetSuccess } from "@/auth/basic/PasswordResetSuccess"
import CoverLoginPage from "@/auth/cover/CoverLoginPage"
import CoverForgotPasswordPage from "@/auth/cover/CoverForgotPasswordPage"
import CoverRegisterPage from "@/auth/cover/CoverRegisterPage"
import CoverResetPasswordPage from "@/auth/cover/CoverResetPasswordPage"
import CoverVerifyEmailPage from "@/auth/cover/CoverVerifyEmailPage"
import CoverPasswordResetSuccessPage from "@/auth/cover/CoverPasswordResetSuccessPage"
import Error404 from "@/pages/error/Error404"
import Error500 from "@/pages/error/Error500"
import ComingSoon from "@/pages/error/ComingSoon"
import LibraryLandingPage from "@/pages/library/LibraryLandingPage"
import LibrarianWorkspacePage from "@/pages/library/LibrarianWorkspacePage"
import RoleDashboardPage from "@/pages/library/RoleDashboardPage"
import StaffWorkspacePage from "@/pages/library/StaffWorkspacePage"
import StudentWorkspacePage from "@/pages/library/StudentWorkspacePage"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { PublicRoute } from "@/components/auth/PublicRoute"

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LibraryLandingPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/landing-page",
      element: <LibraryLandingPage />,
      errorElement: <ErrorPage />,
    },
    {
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "auth/basic/login", element: <PublicRoute><LoginPage /></PublicRoute> },
        { path: "auth/basic/register", element: <PublicRoute><RegisterPage /></PublicRoute> },
        { path: "auth/basic/forgot-password", element: <PublicRoute><ForgotPasswordPage /></PublicRoute> },
        { path: "auth/basic/reset-password", element: <PublicRoute><ResetPasswordForm /></PublicRoute> },
        { path: "auth/basic/verify-email", element: <PublicRoute><VerifyEmailForm /></PublicRoute> },
        { path: "auth/basic/password-reset-success", element: <PublicRoute><PasswordResetSuccess /></PublicRoute> },
        { path: "auth/cover/login", element: <CoverLoginPage /> },
        { path: "auth/cover/register", element: <CoverRegisterPage /> },
        { path: "auth/cover/forgot-password", element: <CoverForgotPasswordPage /> },
        { path: "auth/cover/new-password", element: <CoverResetPasswordPage /> },
        { path: "auth/cover/password-reset-success", element: <CoverPasswordResetSuccessPage /> },
        { path: "auth/cover/verify-email", element: <CoverVerifyEmailPage /> },
        { path: "error/error-404", element: <Error404 /> },
        { path: "error/error-500", element: <Error500 /> },
        { path: "error/coming-soon", element: <ComingSoon /> },
      ],
    },
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "dashboard/student/*",
          element: <ProtectedRoute allowedRoles={["student"]}><StudentWorkspacePage /></ProtectedRoute>,
        },
        {
          path: "dashboard/staff/*",
          element: <ProtectedRoute allowedRoles={["staff"]}><StaffWorkspacePage /></ProtectedRoute>,
        },
        {
          path: "dashboard/librarian/*",
          element: <ProtectedRoute allowedRoles={["librarian"]}><LibrarianWorkspacePage /></ProtectedRoute>,
        },
        {
          path: "dashboard/technician/*",
          element: <ProtectedRoute allowedRoles={["technician"]}><RoleDashboardPage /></ProtectedRoute>,
        },
        { path: "landing-page", element: <LibraryLandingPage /> },
        { path: "dashboard/landing-page", element: <LibraryLandingPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
)
