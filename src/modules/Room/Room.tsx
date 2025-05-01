import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import deleteImage from "../../assets/Email.png";

import SharedTable from "../../modules/Shared/CustomTable/CustomTable";

import { privateApiInstance } from "../../services/api/apiInstance";
import { room_endpoints } from "../../services/api/apiConfig";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomIdToDelete, setRoomIdToDelete] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const navigate = useNavigate();

  const fetchRooms = async (page = 1, size = 10) => {
    try {
      const response = await privateApiInstance.get(room_endpoints.GET_ALL_ROOMS, {
        params: { page, size },
      });
  
      if (response.data.success) {
        setRooms(response.data.data.rooms);
      } else {
        console.error("API returned an unsuccessful response.");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRooms(1, 10);
  }, []);

  const handleMenuOpen = (event, roomId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoomId(roomId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRoomId(null);
  };

  const handleView = () => {
    console.log("View Room:", selectedRoomId);
    handleMenuClose();
  };

  const handleEdit = (roomId: string) => {
    navigate("/dashboard/addRooms", {
      state: { roomId: roomId },
    });
    handleMenuClose();
  };

  const handleDeleteClick = (id) => {
    setRoomIdToDelete(id);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = async (id) => {
    try {
      await privateApiInstance.delete(room_endpoints.DELETE_ROOM(id));
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
      console.log("Room deleted successfully.");
    } catch (error) {
      console.error("Error deleting room:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  
  const columns = [
    { label: "Room Number", field: "roomNumber" },
    {
      label: "Image",
      render: (row) =>
        row.images?.[0] ? (
          <Avatar
            src={row.images[0]}
            alt="room"
            variant="rounded"
            sx={{ width: 60, height: 60 }}
          />
        ) : (
          "No Image"
        ),
    },
    { label: "Price", field: "price" },
    {
      label: "Discount",
      render: () => "Double Room", 
    },
    { label: "Capacity", field: "capacity" },
    {
      label: "Category",
      render: (row) => row.facilities?.[0]?.name || "N/A",
    },
  ];

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Rooms
      </Typography>
      <Box mb={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ color: "#1E1E3F", fontWeight: "bold" }}
            >
              Rooms Table Details
            </Typography>
            <Typography variant="body2" sx={{ color: "#8A8A8A" }}>
              You can check all details
            </Typography>
          </Box>
          <Box>
            <Box
              component="button"
              onClick={() => navigate("/dashboard/addRooms")}
              sx={{
                backgroundColor: "#2A4ED9",
                color: "#fff",
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#1E3EC1",
                },
              }}
            >
              Add New Room
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap={2} flexWrap="wrap">
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 2,
              px: 2,
              boxShadow: 1,
            }}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 8 }}
            >
              <path
                d="M17.5 17.5L13.875 13.875M15 8.5A6.5 6.5 0 112 8.5a6.5 6.5 0 0113 0z"
                stroke="#A3A3A3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search here ..."
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: 14,
                color: "#333",
              }}
            />
          </Box>

          <select
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              color: "#8A8A8A",
              minWidth: 160,
            }}
          >
            <option>Tag</option>
          </select>

          <select
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              color: "#8A8A8A",
              minWidth: 160,
            }}
          >
            <option>Category</option>
          </select>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <SharedTable
          columns={columns}
          rows={rooms}
          onMenuClick={handleMenuOpen}
        />
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleEdit(selectedRoomId)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleDeleteClick(selectedRoomId)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <img
            src={deleteImage}
            alt="delete"
            style={{ width: 100, marginBottom: 16 }}
          />

          <Typography variant="h6" fontWeight="bold">
            Delete This Room ?
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Are you sure you want to delete this item? If you are sure just
            click on delete it.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(roomIdToDelete)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
