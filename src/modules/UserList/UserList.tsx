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
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function UserList() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const baseUrlDev = "https://upskilling-egypt.com:3000";

  const fetchRooms = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${baseUrlDev}/api/v0/admin/users?page=1&size=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setBooking(response.data.data.users);
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
    fetchRooms();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, book: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(book);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
      Booking Table Details
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#dfe3eb" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>created At</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booking.map((book) => (
                <TableRow key={book._id} sx={{ backgroundColor: "#fdfdfd" }}>
                  <TableCell>{book.userName}</TableCell>
                  <TableCell>{book.email}</TableCell>
                  <TableCell>{book.phoneNumber}</TableCell>
                  <TableCell>{book.role}</TableCell>
                  <TableCell>{book.createdAt}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuOpen(event, book)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Menu for Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          console.log("View booking:", selectedBooking);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
