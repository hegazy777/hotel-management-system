import { Box } from "@mui/material";
// import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../AdminNavBar/AdminNavBar";

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* <SideBar /> */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AdminNavBar />
        <Outlet />
      </Box>
    </Box>
  );
}
