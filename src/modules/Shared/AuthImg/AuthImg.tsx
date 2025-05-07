import { Box, Typography } from "@mui/material";

interface AuthImgProps {
  title: string;
  desc: string;
  img: string;
}

function AuthImg({ title, desc, img }: AuthImgProps) {
  return (
    <>
      <Box sx={{ position: "relative", height: "100vh", borderRadius: "16px", overflow: "hidden" }}>
        <img
          src={img}
          alt="register"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "10%",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
            {desc}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default AuthImg
