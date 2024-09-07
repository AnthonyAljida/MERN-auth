import React, { ReactNode, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/root-layout";
import HomePage from "./pages/home-page";
import SignUpPage from "./pages/sign-up-page";
import LoginPage from "./pages/login-page";
import EmailVerificationPage from "./pages/email-verification-page";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth-store";
import LoadingSpinner from "./components/loading-spinner";
import ForgotPasswordPage from "./pages/forgot-password-page";
import ResetPasswordPage from "./pages/reset-password-page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <RedirectAuthenticatedUser>
            <SignUpPage />,
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/login",
        element: (
          <RedirectAuthenticatedUser>
            <LoginPage />,
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/verify-email",
        element: (
          <RedirectAuthenticatedUser>
            <EmailVerificationPage />,
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />,
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/reset-password/:token",
        element: (
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />,
          </RedirectAuthenticatedUser>
        ),
      },
    ],
  },
]);

function ProtectedRoute({ children }: { children: ReactNode }): ReactNode {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        to="/login"
      />
    );
  }
  if (!user.isVerified) {
    <Navigate
      replace
      to="/verify-email"
    />;
  }
  return children;
}

function RedirectAuthenticatedUser({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return (
      <Navigate
        replace
        to="/"
      />
    );
  }
  return children;
}

function App(): React.JSX.Element {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <RouterProvider router={router} />;
      <Toaster />
    </>
  );
}

export default App;
