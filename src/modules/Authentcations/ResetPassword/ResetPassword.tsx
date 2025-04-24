import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { restPassword } from "../../../interfaces/interfaces";
import { users_endpoints } from './../../../services/api/apiConfig';
import { apiInstance } from "../../../services/api/apiInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { verfiVerfication, passwValidation, emailVefication } from './../../../services/vaildators';
import { useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import usePasswordHook from './../../Hooks/usePasswordHook';

export default function ResetPassword() {
  let { state } = useLocation()

  let navigate = useNavigate()
  let { changeTogle, changeTogle2, eyeTogel, eyeTogel2 } = usePasswordHook()

  const { formState: { errors, isSubmitting }, register, handleSubmit, watch, trigger } = useForm({
    mode: "onChange", defaultValues: {
      email: state
    }
  }

  )

  function submitData(data: restPassword): void {
    console.log(data)
    apiInstance.post(users_endpoints.restPassword, data).then((res) => {


      toast.success(res?.data?.message)
      navigate("/login")



    }).catch((err) => {
      console.log(err)
      toast.error(err?.response?.data.message)
    })
  }
  const password = watch("password")
  const confirmPassword = watch("confirmPassword")
  useEffect(() => {

    if (confirmPassword) {
      trigger("confirmPassword")
    }
  }, [trigger, confirmPassword, password])


  return <>
    <Typography variant="h4" > Reset Password  </Typography>
    <Typography sx={{ marginBlock: "20px" }} > If you already have an account register <br />
      You can  <Link to="/login" style={{ textDecoration: "none" }} > <Box component={"span"} sx={{ color: "red", }}   > You can Login here ! </Box> </Link>  </Typography>

    <Box
      component="form"
      onSubmit={handleSubmit(submitData)}
      noValidate
    >
      <TextField
        {...register("email", emailVefication)}
        value={state}
        disabled

        id="standard-basic" sx={{ marginBottom: "30px", width: "100%" }} label="Email" variant="standard" />
      <br />

      <TextField
        {...register("seed", verfiVerfication)}
        error={!!errors.seed}
        helperText={errors.seed?.message}


        id="standard-basic" sx={{ marginBottom: "30px", width: "100%" }} label="OTP" variant="standard" />
      <TextField
        {...register("password", passwValidation)}
        error={!!errors.password}
        helperText={errors.password?.message}
        type={eyeTogel ? `text` : `password`}

        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={changeTogle} edge="end">
                {eyeTogel ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}


        id="standard-basic" sx={{ marginBottom: "30px", width: "100%" }} label="Password" variant="standard" />
      <TextField
        type={eyeTogel2 ? `text` : `password`}

        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={changeTogle2} edge="end">
                {eyeTogel2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register(`confirmPassword`, {
          required: " confirmPassword is requird",
          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            message: `Minimum eight characters and add some of #?!@$%^&*._-`,
          },
          validate: (confirmPassword) => confirmPassword === watch("password") || `confirmPassword not match the pasword`
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}


        id="standard-basic" sx={{ marginBottom: "30px", width: "100%" }} label="confirmPassword" variant="standard" />

      <Button
        disabled={isSubmitting}
        type="submit" sx={{ width: "100%" }} variant="contained">

        Reset

      </Button>

    </Box>


  </>;
}
