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
import AuthLayout from "./modules/Shared/AuthLayout/AuthLayout";
import Dashboard from "./modules/Dashboard/Dashboard";
import LandingPage from "./modules/Shared/LandingPage/LandingPage";
import NotFound from "./modules/Shared/NotFound/NotFound";
import Room from "./modules/Room/Room";
import RoomData from "./modules/Room/RoomData";
import BookingList from "./modules/BookingList/BookingList";
import UserList from "./modules/UserList/UserList";

function App() {
  const router = createBrowserRouter([
    { index: true, element: <LandingPage /> },
    {
      path: "/",
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
        { path: "rooms", element: <Room /> },
        { path: "addRooms", element: <RoomData /> },
        { path: "bookingList", element: <BookingList /> },
        { path: "USerList", element: <UserList /> }
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
