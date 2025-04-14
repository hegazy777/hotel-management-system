import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
export default function AuthLayout() {
  const { token, isManager } = useContext(AuthContext);
  if (token && isManager) {
    return <Navigate to="/dashboard" />;
  }
  if (token && !isManager) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
