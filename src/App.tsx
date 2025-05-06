import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AuthLayout from "./modules/Shared/AuthLayout/AuthLayout";
import ResetPassword from "./modules/Authentcations/ResetPassword/ResetPassword";
import ForgetPassword from "./modules/Authentcations/ForgetPassword/ForgetPassword";
import ChangePassword from "./modules/Authentcations/ChangePassword/ChangePassword";
import VerifyAccount from "./modules/Authentcations/VerifyAccount/VerifyAccount";
import Register from "./modules/Authentcations/Register/Register";
import Login from "./modules/Authentcations/Login/Login";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./modules/Shared/ProtectedRoute/ProtectedRoute";
import SnackbarProvider from "./contexts/SnackbarContext";
import AdminLayout from "./modules/Shared/AdminLayout/AdminLayout";
import Dashboard from "./modules/Admin/Dashboard/Dashboard";
import LandingPage from "./modules/User/LandingPage/LandingPage";
import NotFound from "./modules/Shared/NotFound/NotFound";
import Facilities from "./modules/Admin/Facilities/FacilitiesList/FacilitiesList";
import AuthLayout from "./modules/Shared/AuthLayout/AuthLayout";
import RoomDetails from "./modules/User/RoomDetails/RoomDetails";
import Home from "./modules/User/Home/Home";

import Checkout from "./modules/User/Checkout/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripe = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Home /> },
        { path: "room-details/:roomId", element: <RoomDetails /> },
        {
          path: "payment/checkout",
          element: (
            <Elements stripe={stripe}>
              <Checkout />
            </Elements>
          ),
        },
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
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
      children: [
        { index: true, element: <Dashboard /> },
        { path: "facilities", element: <Facilities /> },
      ],
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
