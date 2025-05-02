import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import slider from "../../../assets/slider.png";
const sliderimg = slider
const testimonials = [
  {
    image: sliderimg,
    title: "Happy Family",
    text: "What a great trip with my family and I should try again next time soon ...",
    name: "Angga",
    role: "Product Designer",
    rating: 5,
  },
  {
    image: "https://i.ibb.co/CJmMbST/family.png",
    title: "Hegazy",
    text: "What a great trip with my family and I should try again next time soon ...",
    name: "Angga",
    role: "Product Designer",
    rating: 5,
  },
 
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
       
        py: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        flexWrap: "wrap",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        component="img"
        src={testimonial.image}
        alt="testimonial"
        sx={{
          width: 450,
          height: 600,
          borderRadius: 5,
          objectFit: "cover",
          
        }}
      />
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="subtitle2" color="#1f2b6c" fontWeight="bold">
          {testimonial.title}
        </Typography>
        <Box sx={{ my: 1 }}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} style={{ color: "#FFCC00", fontSize: "1.2rem" }}>★</span>
          ))}
        </Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#1f2b6c"
          sx={{ mb: 2 }}
        >
          {testimonial.text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {testimonial.name}, {testimonial.role}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <IconButton
            onClick={handlePrev}
            sx={{
              border: "2px solid #1f2b6c",
              color: "#1f2b6c",
              borderRadius: "50%",
            }}
          >
            <ArrowBackIosNew />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              border: "2px solid #1f2b6c",
              color: "#1f2b6c",
              borderRadius: "50%",
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
