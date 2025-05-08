import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, Container, Grid } from "@mui/material";
import Logo from "../Logo/Logo";
import LoginImg from "../../../assets/Group 33.png";
export default function AuthLayout() {
  const { token, isManager } = useContext(AuthContext);
  if (token && isManager) {
    return <Navigate to="/dashboard" />;
  }
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <Box sx={{ padding: "2rem" }}>
          <Logo />
        </Box>

        <Container maxWidth="sm">
          <Outlet />
        </Container>
      </Grid>
      <Grid size={6}>
        <img style={{ float: "right", padding: "15px" }} src={LoginImg} />
      </Grid>
    </Grid>
  );
}
