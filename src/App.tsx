import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AuthLayout from "./modules/Shared/AuthLayout/AuthLayout";
import ResetPassword from "./modules/Authentcations/ResetPassword/ResetPassword";
import ForgetPassword from "./modules/Authentcations/ForgetPassword/ForgetPassword";
import ChangePassword from "./modules/Authentcations/ChangePassword/ChangePassword";
import VerifyAccount from "./modules/Authentcations/VerifyAccount/VerifyAccount";
import Register from "./modules/Authentcations/Register/Register";
import NotFound from "./modules/NotFound/NotFound";
import Login from "./modules/Authentcations/Login/Login";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./modules/Shared/ProtectedRoute/ProtectedRoute";
import SnackbarProvider from "./contexts/SnackbarContext";
import AdminLayout from "./modules/Shared/AdminLayout/AdminLayout";
import LandingPage from "./modules/LandingPage/LandingPage";
import AuthLayer from "./modules/Shared/AuthLayout/AuthLayout";
import Dashboard from "./modules/Dashboard/Dashboard";

function App() {
  const router = createBrowserRouter([
    { index: true, element: <LandingPage /> },
    {
      path: "/",
      element: <AuthLayer />,
      errorElement: <NotFound />,

      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "forget-password", element: <ForgetPassword /> },
      ],
    },

    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [{ index: true, element: <Dashboard /> }],
    },
  ]);
  return (
    <SnackbarProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
