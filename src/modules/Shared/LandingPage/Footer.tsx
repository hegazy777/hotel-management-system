import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        color: "#B0B0B0",
        px: 4,
        py: 6,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 4,
      }}
    >
 
      <Box sx={{ maxWidth: 240 }}>
        <Typography variant="h6" sx={{ color: "#1f2b6c", fontWeight: "bold" }}>
          Stay<span style={{ color: "#000" }}>cation.</span>
        </Typography>
        <Typography sx={{ mt: 1 }}>
          We kaboom your beauty holiday instantly and memorable.
        </Typography>
      </Box>

      <Box>
        <Typography fontWeight="bold" sx={{ color: "#1f2b6c" }}>
          For Beginners
        </Typography>
        <Typography sx={{ mt: 1 }}>New Account</Typography>
        <Typography>Start Booking a Room</Typography>
        <Typography>Use Payments</Typography>
      </Box>

     
      <Box>
        <Typography fontWeight="bold" sx={{ color: "#1f2b6c" }}>
          Explore Us
        </Typography>
        <Typography sx={{ mt: 1 }}>Our Careers</Typography>
        <Typography>Privacy</Typography>
        <Typography>Terms & Conditions</Typography>
      </Box>

      
      <Box>
        <Typography fontWeight="bold" sx={{ color: "#1f2b6c" }}>
          Connect Us
        </Typography>
        <Typography sx={{ mt: 1 }}>support@staycation.id</Typography>
        <Typography>021 - 2208 - 1996</Typography>
        <Typography>Staycation, Kemang, Jakarta</Typography>
      </Box>

      
      <Box sx={{ width: "100%", mt: 4 }}>
        <Typography variant="body2" align="center" sx={{ color: "#aaa" }}>
          Copyright 2019 • All rights reserved • Staycation
        </Typography>
      </Box>
    </Box>
  );
}
