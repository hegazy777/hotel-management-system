import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
export default function AuthLayer() {
  const { token } = useContext(AuthContext);
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
