import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { emailVefication } from "../../../services/vaildators";
import { fogetPass } from "../../../interfaces/interfaces";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";
import { toast } from 'react-toastify';


export default function ForgetPassword() {
  let navigate = useNavigate()

  const { formState: { errors, isSubmitting }, register, handleSubmit } = useForm({ mode: "onChange" })


  function submitData(data: fogetPass): void {
    console.log(data)
    apiInstance.post(users_endpoints.forgetPass, data).then((res) => {
      console.log(res)
      toast.success(res?.data?.message)
      navigate("/reset-password", { state: data?.email })



    }).catch((err) => {
      console.log(err)
    })
  }

  return <>
    <Typography variant="h4" > Forgot password   </Typography>
    <Typography sx={{ marginBlock: "20px" }} > If you already have an account register <br />
      You can  <Link to="/login" style={{ textDecoration: "none" }} > <Box component={"span"} sx={{ color: "red", }}   > You can Login here ! </Box> </Link>  </Typography>

    <Box
      component="form"
      onSubmit={handleSubmit(submitData)}
      noValidate
    >
      <TextField
        {...register("email", emailVefication)}
        error={!!errors.email}
        helperText={errors.email?.message}


        id="standard-basic" sx={{ marginBottom: "50px", width: "100%" }} label="Email" variant="standard" />
      <br />

      <Button
        loading={isSubmitting}
        type="submit" sx={{ width: "100%", marginLeft: "10px" }} variant="contained">

        Send mail

      </Button>

    </Box>


  </>;
}
