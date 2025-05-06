import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Breadcrumbs,
} from "@mui/material";
import Rectangle from "../../../assets/Rectangle3.png";

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const capacity = searchParams.get("capacity");

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`https://upskilling-egypt.com:3000/api/v0/portal/rooms/available`, {
        params: {
          page: 1,
          size: 10,
          startDate,
          endDate,
          capacity,
        },
      });

      if (res.data.success) {
        setRooms(res.data.data.rooms);
      }
    } catch (err) {
      console.error("Error loading rooms", err);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchRooms();
    }
  }, [startDate, endDate, capacity]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>Available Rooms</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={() => navigate("/")}>
          Home
        </Link>
        <Typography color="text.primary">Explore</Typography>
      </Breadcrumbs>
    </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {rooms.map((room, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              height: 300,
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "#FF498B",
                color: "#fff",
                borderBottomLeftRadius: "12px",
                px: 2,
                py: 0.8,
                fontSize: "0.9rem",
                fontWeight: "bold",
                zIndex: 2,
              }}
            >
              ${room.price} per night
            </Box>

            <CardMedia
              component="img"
              height="100%"
              image={room.images?.[0] || Rectangle}
              alt={room.roomNumber}
              sx={{ objectFit: "cover" }}
            />

            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0,0,0,0))",
                color: "white",
                px: 2,
                pb: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Room #{room.roomNumber}
              </Typography>
              <Typography variant="caption">{room.roomNumber || "Conference Room"}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
