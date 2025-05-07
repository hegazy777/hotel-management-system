import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSehemaValidation } from "../../../services/vaildators";
import { apiInstance } from "../../../services/api/apiInstance";
import { admin_endpoints } from "../../../services/api/apiConfig";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import loginImg from "../../../assets/loginImg.png";

import { AxiosError } from "axios";
import {
  Box,
  Container,
  Grid,
  IconButton,
  // Link as MUILink,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import AuthImg from "../../Shared/AuthImg/AuthImg";
import Logo from "../../Shared/Logo/Logo";
import TitleAuth from "../../Shared/TitleAuth/TitleAuth";

type DataType = { email: string; password: string };

export default function Login() {
  const showSnackbar = useContext(SnackbarContext);

  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSehemaValidation),
  });

  const [toggle, setToggle] = useState(false);

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await apiInstance.post(admin_endpoints.LOGIN, data);
      const tokenWithOutBearerPrefix = response.data.data.token.replace(
        /^Bearer\s+/i,
        ""
      );
      localStorage.setItem("token", tokenWithOutBearerPrefix);

      setToken(tokenWithOutBearerPrefix);
      navigate("/");
      showSnackbar("Logged in successfully", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          (error.response?.data as AxiosErrorResponse)?.message ??
          "An unexpected error occurred";
        showSnackbar(errorMessage, "error");
      } else {
        showSnackbar("Network error, please try again later", "error");
      }
    }
  };
  return (
    <>
      <Grid size={6}>
        <Box sx={{ padding: "0.5rem" }}>
          <Logo />

        </Box>
        <Container maxWidth="sm" className="my-3">
          <TitleAuth title="Sign In" desc="If you don’t have an account register You can" navigateTo="/register" link="Register here !" />

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              p: 2,
            }}
          >
            <TextField
              {...register("email")}
              label="Email"
              variant="standard"
              fullWidth
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <TextField
              {...register("password")}
              type={toggle ? "text" : "password"}
              label="Password"
              variant="standard"
              fullWidth
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setToggle(!toggle)} edge="end">
                      {toggle ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Link to="/forget-password">Forget Password?</Link>

            <CustomButton fullWidth loading={isSubmitting} type="submit">
              Login
            </CustomButton>
          </Box>
        </Container>

      </Grid>


      <Grid size={6} sx={{ position: "relative", color: "white" }}>
        <AuthImg title="Sign in to Roamhome" desc="Homes as unique as you." img={loginImg} />
      </Grid>
    </>
  );
}
