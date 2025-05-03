import { Typography } from "@mui/material";

export default function Logo() {
  return (
    <Typography variant="h6" sx={{ fontFamily: "Poppins", flexGrow: 1 }}>
      <span style={{ color: "#3252DF", fontSize: "26px" }}>Stay</span>
      <span style={{ color: "#152C5B", fontSize: "26px" }}>cation.</span>
    </Typography>
  );
}
