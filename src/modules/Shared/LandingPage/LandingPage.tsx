import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Add, Remove, CalendarMonth } from "@mui/icons-material";
import { useState } from "react";
import banner from "../../../assets/banner.png";
import Rectangle from "../../../assets/Rectangle3.png";
import BackyardHousesSection from "./BackyardHousesSection";
import HotelSection from "./HotelSection";
import AdsSections from "./AdsSection";
import TestimonialSlider from "./TestimonalSlider";
import Footer from "./Footer";
export default function LandingPage() {
  const [count, setCount] = useState(2);
  const listings = [
    {
      title: "Blue Origin Fams",
      location: "Jakarta, Indonesia",
      price: "$50",
      image: "https://i.ibb.co/7kLKH9N/1.jpg",
    },
    {
      title: "Ocean Land",
      location: "Bandung, Indonesia",
      price: "$22",
      image: "https://i.ibb.co/gJLc98z/2.jpg",
    },
    {
      title: "Stark House",
      location: "Malang, Indonesia",
      price: "$856",
      image: "https://i.ibb.co/0F0PRvp/3.jpg",
    },
    {
      title: "Vinna Vill",
      location: "Malang, Indonesia",
      price: "$62",
      image: "https://i.ibb.co/zGHcv6Y/4.jpg",
    },
    {
      title: "Bobox",
      location: "Medan, Indonesia",
      price: "$72",
      image: "https://i.ibb.co/n7ZffgP/5.jpg",
    },
  ];
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

          <Typography variant="subtitle1" fontWeight="bold">
            Start Booking
          </Typography>
          <Typography variant="caption">Pick a Date</Typography>
          <TextField
            fullWidth
            placeholder="20 Jan - 22 Jan"
            sx={{ my: 1, backgroundColor: "white", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonth />
                </InputAdornment>
              ),
            }}
          />

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

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
        
          <Box sx={{ flex: { xs: "100%", md: "25%" } }}>
            <AdCard item={listings[0]} height={400} />
          </Box>

       
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              flex: { xs: "100%", md: "25%" },
            }}
          >
            <AdCard item={listings[1]} height={190} />
            <AdCard item={listings[2]} height={190} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              flex: { xs: "100%", md: "25%" },
            }}
          >
            <AdCard item={listings[1]} height={190} />
            <AdCard item={listings[2]} height={190} />
          </Box>
        </Box>
      </Box>
      <BackyardHousesSection />
      <HotelSection/>
      <AdsSections/>
      <TestimonialSlider/>
      <Footer/>
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
        image={Rectangle}
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
