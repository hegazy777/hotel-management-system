import { AppBar, Toolbar, Avatar, Link, Stack } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import CustomButton from "../CustomButton/CustomButton";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <AppBar
      color="transparent"
      position="static"
      sx={{ paddingInline: "10rem" }}
    >
      <Toolbar>
        <Logo />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href="#" underline="none">
            Home
          </Link>
          <Link href="#" underline="none">
            Explore
          </Link>

          {token && (
            <>
              <Link href="#" underline="none">
                Reviews
              </Link>
              <Link href="#" underline="none">
                Favorites
              </Link>
            </>
          )}
          {!token && (
            <>
              <CustomButton onClick={() => navigate("register")}>
                Register
              </CustomButton>
              <CustomButton onClick={() => navigate("login")}>
                Login NOW
              </CustomButton>
            </>
          )}
          {token && (
            <Avatar
              alt="Travis Howard"
              src="https://mui.com/static/images/avatar/2.jpg"
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
