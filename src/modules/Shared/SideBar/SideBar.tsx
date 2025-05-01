// components/Sidebar.tsx
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Home,
  People,
  MeetingRoom,
  EventNote,
  BookOnline,
  Lock,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideBare = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  return (
    <Sidebar collapsed={collapsed} backgroundColor="#1E3AC7"  >
      <div style={{ padding: "10px", textAlign: "center" }}>
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
      </div>
      <Menu menuItemStyles={{
        button: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1532b3",
          },
        },
        icon: { color: "#fff" },
        label: { fontSize: "14px" },
      }}>
        <MenuItem icon={<Home />} onClick={() => navigate("/")}> Home </MenuItem>
        <MenuItem icon={<People />} onClick={() => navigate("/dashboard/USerList")}> Users </MenuItem>
        <MenuItem icon={<MeetingRoom />} onClick={() => navigate("/dashboard/rooms")}> Rooms </MenuItem>
        <MenuItem icon={<EventNote />} onClick={() => navigate("/ads")}> Ads </MenuItem>
        <MenuItem icon={<BookOnline />} onClick={() => navigate("/dashboard/bookingList")}> Bookings </MenuItem>
        <MenuItem icon={<Lock />} onClick={() => navigate("/change-password")}> Change password </MenuItem>
        <MenuItem icon={<Logout />} onClick={() => navigate("/logout")}> Logout </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBare;
