import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const closedWidth = 60;

export default function SideBar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : closedWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          backgroundColor: "#203FC7 !important",
          color: "white",
          width: open ? drawerWidth : closedWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: open ? "flex-end" : "center",
          "& .MuiListItemIcon-root, & .MuiSvgIcon-root": {
            color: "white",
          },
        },
      }}
      open={open}
    >
      <Box sx={{ mt: 1, mb: 1 }}>
        <IconButton onClick={handleToggle}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ width: "100%" }} />

      <List sx={{ width: "100%" }}>
        {/* Home */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {/* Users */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <GroupOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {/* Rooms */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ justifyContent: "center" }}>
              <MeetingRoomOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Rooms" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {/* Facilities */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => navigate("facilities")}
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <CategoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Facilities" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {/* Ads */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <CampaignOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Ads" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {/* Bookings */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <EventNoteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Bookings" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {/* Logout */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => logout()}
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
