import { Container, Grid } from "@mui/material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import TitleAuth from "../../Shared/TitleAuth/TitleAuth";
import AuthImg from "../../Shared/AuthImg/AuthImg";
import registerImg from "../../../assets/registerImg.png";
import Logo from "../../Shared/Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginSehemaValidation } from "../../../services/vaildators";
import defaultProfileImg from '../../../assets/userImage.png';

type DataType = { email: string; password: string; userName: string; phoneNumber: string; country: string; confirmPassword: string };

function Register() {

  const showSnackbar = useContext(SnackbarContext);

  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSehemaValidation.shape({
      userName: yup.string().required("User Name is required"),
      phoneNumber: yup.string().required("Phone Number is required"),
      country: yup.string().required("Country is required"),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password')], "Passwords must match")
        .required("Confirm Password is required"),
    })),
  });

  const [toggle, setToggle] = useState(false);

  const onSubmit = async (data: DataType) => {
    const formData = new FormData();
  
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("userName", data.userName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("country", data.country);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", "user");
  
    try {
      const response = await fetch(defaultProfileImg);
      const blob = await response.blob();
      const file = new File([blob], "userImage.png", { type: blob.type });
  
      formData.append("profileImage", file);
  
      const res = await apiInstance.post(users_endpoints.REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      localStorage.setItem("token", res.data.token);
      setToken(res?.data?.token);
      navigate("/login");
      showSnackbar("User Created successfully", "success");
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<{ message?: string }>;
      showSnackbar(axiosError?.response?.data?.message || "Registration failed", "error");
    }
  };

  return (

    <>
      <Grid size={6}>
        <Box sx={{ padding: "0.5rem" }}>
          <Logo />

        </Box>

        <Container maxWidth="sm" className="my-3">
          <TitleAuth title="Sign up" desc="If you already have an account register You can" navigateTo="/login" link="Login here !" />

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
              {...register("userName")}
              label="User Name"
              variant="standard"
              fullWidth
              margin="normal"
              error={Boolean(errors.userName)}
              helperText={errors.userName?.message}
            />

            <div className="d-flex gap-4">
              <TextField
                {...register("phoneNumber")}
                label="Phone Number"
                variant="standard"
                fullWidth
                margin="normal"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
              />

              <TextField
                {...register("country")}
                label="Country"
                variant="standard"
                fullWidth
                margin="normal"
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
              />
            </div>

            <TextField
              {...register("email")}
              label="Email Address"
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

            <TextField
              {...register("confirmPassword")}
              type={toggle ? "text" : "password"}
              label="Confirm Password"
              variant="standard"
              fullWidth
              margin="normal"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
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

            <CustomButton fullWidth loading={isSubmitting} type="submit">
              Sign up
            </CustomButton>

          </Box>

        </Container>
      </Grid>
      <Grid size={6} sx={{ position: "relative", color: "white" }}>
        <AuthImg title="Sign up to Roamhome" desc="Homes as unique as you." img={registerImg} />
      </Grid>
    </>
  )
}

export default Register