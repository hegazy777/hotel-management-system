import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Link,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function NavBar() {
  const { token } = useContext(AuthContext);
  return (
    <AppBar
      color="transparent"
      position="static"
      sx={{ paddingInline: "10rem" }}
    >
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Staycation.
        </Typography>

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
              <Button variant="contained">Register</Button>
              <Button variant="contained">Login NOW</Button>
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
