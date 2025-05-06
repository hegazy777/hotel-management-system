import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSehemaValidation } from "../../../services/vaildators";
import { apiInstance } from "../../../services/api/apiInstance";
import { auth_endpoints } from "../../../services/api/apiConfig";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import { isAxiosError } from "axios";
import { Box, Typography } from "@mui/material";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { LoginFormType } from "../../../interfaces/LoginFormInterface";
import PasswordField from "../../Shared/CustomPasswordField/CustomPasswordField";
import CustomTextField from "../../Shared/CustomTextField/CustomTextField";
import { AxiosErrorResponse } from "../../../interfaces/AxiosErrorResponseInterface";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../../interfaces/JwtPayloadInterface";

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
      const response = await apiInstance.post(auth_endpoints.LOGIN, data);
      const tokenWithOutBearerPrefix = response.data.data.token.replace(
        /^Bearer\s+/i,
        ""
      );
      localStorage.setItem("token", tokenWithOutBearerPrefix);

      const { role } = tokenWithOutBearerPrefix
        ? (jwtDecode(tokenWithOutBearerPrefix) as CustomJwtPayload)
        : { role: "" };

      setToken(tokenWithOutBearerPrefix);

      if (role === "admin") {
        navigate("/dashboard");
      }
      if (role === "user") {
        navigate("/");
      }
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
    <div className="">
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

        <CustomTextField
          label="Email"
          register={register("email")}
          error={errors.email}
        />

        <PasswordField
          label="Password"
          register={register("password")}
          error={errors.password}
          toggle={toggle}
          setToggle={setToggle}
        />

        <Link to="/forget-password">Forget Password?</Link>

        <CustomButton fullWidth loading={isSubmitting} type="submit">
          Login
        </CustomButton>
      </Box>
    </div>
  );
}
