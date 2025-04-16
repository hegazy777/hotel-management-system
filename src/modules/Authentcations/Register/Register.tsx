import { Box, Container, Grid } from "@mui/material";
import Logoimg from "../../../assets/logoImg.png";
import registerImg from "../../../assets/registerImg.png";
import TitleAuth from "../../Shared/TitleAuth/TitleAuth";
import AuthImg from "../../Shared/AuthImg/AuthImg";

function Register() {
  return (
    <>
      <Grid size={6}>
        <Box sx={{ padding: "0.5rem" }}>
          <img src={Logoimg} alt="logo" />

          <TitleAuth />
        </Box>

        <Container maxWidth="sm">
        </Container>
      </Grid>
      <Grid size={6} sx={{ position: "relative", color: "white" }}>
        <Box sx={{ height: "100vh" }}>
          <img src={registerImg} alt="register" style={{ width: "100%", objectFit: "cover" }} />
          <AuthImg />
        </Box>

        <Box sx={{ padding: "2rem", position: "absolute", top: "80%", left: "10%" }}>
          <h1>Sign up to Roamhome</h1>
          <p style={{ padding: "0px", margin: "0px" }}>Homes as unique as you.</p>
        </Box>
      </Grid>
    </>
  )
}

export default Register