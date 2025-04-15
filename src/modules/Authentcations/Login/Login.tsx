import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSehemaValidation } from "../../../services/vaildators";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import { AxiosError } from "axios";
import {
  Box,
  IconButton,
  // Link as MUILink,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "../../Shared/CustomButton/CustomButton";

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

  const onSubmit = async (data: DataType) => {
    try {
      const response = await apiInstance.post(users_endpoints.LOGIN, data);
      localStorage.setItem("token", response.data.token);

      setToken(response?.data?.token);
      navigate("/");
      showSnackbar("Logged in successfully", "success");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      showSnackbar(axiosError?.response?.data?.message, "error");
    }
  };
  return (
    <div className="auth-content p-5">
      {/* <AuthTitle title={"Login"} /> */}

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
        <Typography variant="h4">Sign In</Typography>

        <Typography>
          If you don’t have an account register You can{" "}
          <Link to="/register">Register here !</Link>
        </Typography>

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
    </div>
  );
}
