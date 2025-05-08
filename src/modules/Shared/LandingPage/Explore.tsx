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
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          color="inherit"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          Home
        </Link>
        <Typography color="text.primary">Explore</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight="bold" mb={4}>
        Available Rooms
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 3,
        }}
      >
        {rooms.map((room, index) => (
          <Card
            key={index}
            sx={{
              height: 250,
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              boxShadow: 4,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "#FF498B",
                color: "#fff",
                borderRadius: "8px",
                px: 1.5,
                py: 0.5,
                fontSize: "0.8rem",
                fontWeight: "bold",
                zIndex: 2,
              }}
            >
              ${room.price} / night
            </Box>

            <CardMedia
              component="img"
              height="100%"
              image={room.images?.length ? room.images[0] : Rectangle}
              alt={`Room ${room.roomNumber}`}
              sx={{
                objectFit: "cover",
                filter: "brightness(0.85)",
              }}
            />

            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                px: 2,
                py: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Room #{room.roomNumber}
              </Typography>
              <Typography variant="caption">
                {room.roomType || "Standard"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
