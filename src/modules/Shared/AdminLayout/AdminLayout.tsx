import { Box, Typography } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography>Navbar</Typography>
        <Outlet />
      </Box>
    </Box>
  );
}
