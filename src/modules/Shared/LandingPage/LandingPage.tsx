import {
  Box,
  Typography,
  Button,

  IconButton,

  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import banner from "../../../assets/banner.png";
import Rectangle from "../../../assets/Rectangle3.png";
import BackyardHousesSection from "./BackyardHousesSection";
import HotelSection from "./HotelSection";
import AdsSections from "./AdsSection";
import TestimonialSlider from "./TestimonalSlider";
import Footer from "./Footer";

import axios from "axios";

import { DateRangePicker } from "rsuite";
import { useNavigate } from "react-router-dom";

import "rsuite/DateRangePicker/styles/index.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(2);
  const [rooms, setRooms] = useState([]);
  const [ads, setAdds] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);

  const handleExplore = () => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].toISOString().split("T")[0];
      const endDate = dateRange[1].toISOString().split("T")[0];
      navigate(
        `/explore?startDate=${startDate}&endDate=${endDate}&capacity=${count}`
      );
    } else {
      alert("Please select a date range.");
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/portal/rooms/available?page=1&size=10&startDate=2023-01-20&endDate=2023-01-30"
      );

      if (response.data.success) {
        setRooms(response.data.data.rooms);
      } else {
        console.error("API returned an unsuccessful response.");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const fetchAdds = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/portal/ads"
      );

      if (response.data.success) {
        setAdds(response.data.data.ads);
      } else {
        console.error("API returned an unsuccessful response.");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchAdds();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          p: 4,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pr: 6,
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="#1f2b6c">
            Forget Busy Work,
            <br />
            Start Next Vacation
          </Typography>

          <Typography sx={{ mt: 2, mb: 4 }} color="text.secondary">
            We provide what you need to enjoy your holiday with family.
            <br />
            Time to make another memorable moments.
          </Typography>

          <Typography variant="caption">Pick a Date</Typography>

          <Box sx={{ my: 1 }}>
            <DateRangePicker
              onChange={(value) => setDateRange(value)}
              placeholder="Select Date Range"
              style={{ width: "100%" }}
            />
          </Box>
          <Typography variant="caption">Capacity</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              mb: 2,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          >
            <IconButton
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              sx={{
                backgroundColor: "#E74C3C",
                borderRadius: 1,
                color: "#fff",
              }}
            >
              <Remove />
            </IconButton>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              {count} person
            </Box>
            <IconButton
              onClick={() => setCount((prev) => prev + 1)}
              sx={{
                backgroundColor: "#1ABC9C",
                borderRadius: 1,
                color: "#fff",
              }}
            >
              <Add />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2, width: 200, borderRadius: "8px", color: "#fff" }}
            onClick={handleExplore}
          >
            Explore
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={banner}
            alt="Vacation house"
            sx={{
              width: "100%",
              maxWidth: 500,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ px: 4, py: 6, backgroundColor: "#fff" }}>
        <Typography variant="h5" fontWeight="bold" color="#1f2b6c" mb={3}>
          Most popular ads
        </Typography>

        {rooms.length >= 5 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <Box sx={{ flex: { xs: "100%", md: "25%" } }}>
              <AdCard
                item={{
                  title: rooms[0].name,
                  location: rooms[0].location,
                  price: `$${rooms[0].price}`,
                  image: rooms[0].images?.[0] || Rectangle,
                }}
                height={400}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                flex: { xs: "100%", md: "25%" },
              }}
            >
              <AdCard
                item={{
                  title: rooms[1].name,
                  location: rooms[1].location,
                  price: `$${rooms[1].price}`,
                  image: rooms[1].images?.[0] || Rectangle,
                }}
                height={190}
              />
              <AdCard
                item={{
                  title: rooms[2].name,
                  location: rooms[2].location,
                  price: `$${rooms[2].price}`,
                  image: rooms[2].images?.[0] || Rectangle,
                }}
                height={190}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                flex: { xs: "100%", md: "25%" },
              }}
            >
              <AdCard
                item={{
                  title: rooms[3].name,
                  location: rooms[3].location,
                  price: `$${rooms[3].price}`,
                  image: rooms[3].images?.[0]?.url || Rectangle,
                }}
                height={190}
              />
              <AdCard
                item={{
                  title: rooms[4].name,
                  location: rooms[4].location,
                  price: `$${rooms[4].price}`,
                  image: rooms[4].images?.[0] || Rectangle,
                }}
                height={190}
              />
            </Box>
          </Box>
        )}
      </Box>
      <BackyardHousesSection room={rooms} />
      <HotelSection room={rooms} />
      <AdsSections ads={ads} />
      <TestimonialSlider />
      <Footer />
    </>
  );
}
function AdCard({ item, height }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        height,
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
        {item.price} per night
      </Box>
      <CardMedia
        component="img"
        height="100%"
        image={item.image}
        alt={item.title}
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
          {item.title}
        </Typography>
        <Typography variant="caption">{item.location}</Typography>
      </CardContent>
    </Card>
  );
}
