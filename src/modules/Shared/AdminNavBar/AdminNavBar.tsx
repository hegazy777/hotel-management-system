import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../../../contexts/AuthContext";

export default function AdminNavBar() {
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications] = useState(3); // Example notification count

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "#F8F9FB",
        borderRadius: "10px",
        color: "#1F384C",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography></Typography>
        <Box display="flex" alignItems="center">
          {/* Avatar with Dropdown Menu */}
          <IconButton onClick={handleMenuOpen} sx={{ borderRadius: 0 }}>
            <Avatar src={user?.profileImage} alt="User Avatar" />
            <Typography>{user?.userName}</Typography>

            <ArrowDropDownIcon sx={{ color: "#1F384C", marginLeft: 1 }} />
          </IconButton>

          {/* Notification Icon */}
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications}
              color="error"
              sx={{ marginRight: 2 }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
