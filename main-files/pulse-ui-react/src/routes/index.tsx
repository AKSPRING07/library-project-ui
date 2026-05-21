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
        { path: "auth/basic/login", element: <LoginPage /> },
        { path: "auth/basic/register", element: <RegisterPage /> },
        { path: "auth/basic/forgot-password", element: <ForgotPasswordPage /> },
        { path: "auth/basic/reset-password", element: <ResetPasswordForm /> },
        { path: "auth/basic/verify-email", element: <VerifyEmailForm /> },
        { path: "auth/basic/password-reset-success", element: <PasswordResetSuccess /> },
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
      path: "dashboard/student/*",
      element: <StudentWorkspacePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "dashboard/staff/*",
      element: <StaffWorkspacePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "dashboard/librarian/*",
      element: <LibrarianWorkspacePage />,
      errorElement: <ErrorPage />,
    },
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "dashboard/technician/*", element: <RoleDashboardPage /> },
        { path: "landing-page", element: <LibraryLandingPage /> },
        { path: "dashboard/landing-page", element: <LibraryLandingPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
)
