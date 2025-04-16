import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Grid } from "@mui/material";

export default function AuthLayout() {
  const { token, isManager } = useContext(AuthContext);
  if (token && isManager) {
    return <Navigate to="/dashboard" />;
  }
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <Grid container spacing={2} sx={{ height: "100vh", padding: "22px" }}>
          <Outlet />
    </Grid>
  );
}
