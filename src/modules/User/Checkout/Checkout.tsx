import { Box, Typography } from "@mui/material";
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { useLocation, useNavigate } from "react-router-dom";
import Complete from "../../../assets/Group 1 1.svg";
import { privateApiInstance } from "../../../services/api/apiInstance";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { userBooking } from "../../../services/api/apiConfig";
import { isAxiosError } from "axios";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { AxiosErrorResponse } from "../../../interfaces/AxiosErrorResponseInterface";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const { state } = useLocation();
  const showSnackbar = useContext(SnackbarContext);
  const steps = ["", "", ""];

  // console.log(state);
  const { startDate, endDate, totalPrice, capacity } = state;

  const Payment = async (token: string, bookingId: string) => {
    try {
      const { data } = await privateApiInstance.post(
        userBooking.PAY_BOOKING(bookingId),
        { token }
      );
      if (data.success === true) {
        setActiveStep(3);
      } else {
        showSnackbar("Payment failed", "error");
      }
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

  const submitPaymentHandler = async () => {
    if (!elements || !stripe) return;
    const cardElement = elements.getElement("card");
    const { token, error } = await stripe.createToken(cardElement!);
    if (error) return;
    await Payment(token.id, state?.bookingId);
  };

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    backgroundColor: "#fff",
    maxWidth: "400px",
    margin: "auto",
  };
  if (!state?.bookingId) {
    navigate("/", { replace: true });
  }
  return (
    <Box
      sx={{
        pt: 5,
        pb: 10,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        [`@media (max-width:600px)`]: {
          alignItems: "center",
        },
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": { color: "#e5e5e5", fontSize: "2rem" },
          "& .MuiStepIcon-root.Mui-completed": { color: "#1abc9c" },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#e5e5e5",
            border: "1px solid #e5e5e5",
            borderRadius: "50%",
            padding: "1px",
            boxSizing: "content-box",
          },
          "& .MuiStepConnector-line": {
            borderColor: "#e5e5e5",
            borderTopWidth: 3,
            width: "100%",
            marginTop: "5px",
          },
          "& .MuiStepLabel-root": { margin: "0 20px" },
        }}
      >
        {steps.map((label, i) => (
          <Step key={i}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep !== 3 && (
        <>
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              mb: 1,
            }}
          >
            Payment
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: "#b0b0b0" }}>
            Kindly follow the instructions below
          </Typography>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          width: "100%",
          maxWidth: "1000px",
          minHeight: "300px",
        }}
      >
        {activeStep !== 3 && (
          <Box
            sx={{
              flex: 1,
              minWidth: "300px",
              maxWidth: "450px",
              px: 2,
              display: "flex",
              flexDirection: "column",
              [`@media (max-width:753px)`]: {
                display: "none",
              },
            }}
          >
            <Typography
              sx={{
                mb: 2,
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "170%",
              }}
            >
              From:{" "}
              {new Intl.DateTimeFormat("en-GB").format(new Date(startDate))} -
              To: {new Intl.DateTimeFormat("en-GB").format(new Date(endDate))}
              <br />
              Capacity: {capacity} <br />
              Total Price: {totalPrice}
            </Typography>
          </Box>
        )}

        {activeStep !== 3 && (
          <Box
            sx={{
              width: "1px",
              backgroundColor: "#aaa",
              alignSelf: "stretch",
              [`@media (max-width:753px)`]: {
                display: "none",
              },
            }}
          />
        )}

        <Box
          component="form"
          sx={{ flex: 1, minWidth: "300px", maxWidth: "450px", px: 2 }}
        >
          {activeStep === 1 && <AddressElement options={{ mode: "billing" }} />}
          {activeStep === 2 && (
            <div style={cardStyle}>
              <CardElement />
            </div>
          )}
          {activeStep === 3 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                mt: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#152c5b", fontWeight: "bold" }}
              >
                Yay! Completed
              </Typography>
              <Box
                component="img"
                src={Complete}
                alt="Completed"
                sx={{ maxWidth: "100%", height: "auto", mb: 1 }}
              />
              <Typography
                variant="body1"
                sx={{ mt: 2, color: "rgba(0, 0, 0, 0.6)" }}
              >
                We will inform you via email later,
                <br />
                once the transaction has been accepted
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {activeStep <= 3 && (
        <Box sx={{ mt: 4 }}>
          {activeStep === 1 && (
            <CustomButton onClick={() => setActiveStep((prev) => prev + 1)}>
              Continue
            </CustomButton>
          )}

          {activeStep === 2 && (
            <CustomButton onClick={submitPaymentHandler}>Pay Now</CustomButton>
          )}
          {activeStep === 3 && (
            <CustomButton onClick={() => navigate("/")}>
              Back to home
            </CustomButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Checkout;
