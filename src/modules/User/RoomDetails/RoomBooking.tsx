import { Box, Grid, Stack, Typography } from "@mui/material";

import { useForm } from "react-hook-form";

import CustomDatePicker from "../../Shared/CustomDatePicker/CustomDatePicker";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { privateApiInstance } from "../../../services/api/apiInstance";
import { useNavigate } from "react-router-dom";
import { userBooking } from "../../../services/api/apiConfig";
import { useContext } from "react";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { isAxiosError } from "axios";
import { AxiosErrorResponse } from "../../../interfaces/AxiosErrorResponseInterface";

export default function RoomBooking({
  price,
  capacity,
  roomId,
  discount,
}: {
  price: number;
  capacity: number;
  discount: number;
  roomId: string;
}) {
  const showSnackbar = useContext(SnackbarContext);

  const { control, setValue, watch } = useForm();

  const { dateRange } = watch();

  const startDate = dateRange?.[0]?.$d || new Date();
  const endDate = dateRange?.[1]?.$d || new Date();

  const calculateTotalDays = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalDays = calculateTotalDays(startDate, endDate);

  const totalPrice = (price - (discount / 100) * price) * capacity * totalDays;
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate || !endDate || totalDays === 0 || totalDays === 0) {
      showSnackbar("Start date or end date is missing", "error");
      return;
    }

    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();

    const bookingData = {
      startDate: startDateISO,
      endDate: endDateISO,
      room: roomId,
      totalPrice,
    };

    try {
      const res = await privateApiInstance.post(
        userBooking.CREATE_BOOKING,
        bookingData
      );

      navigate("/payment/checkout", {
        state: { bookingId: res?.data?.data?.booking?._id },
      });
      showSnackbar("Room is booked successfully", "success");
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

  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, md: 5 }}>
      <Box
        component="form"
        padding={9}
        sx={{
          border: "1px solid #ddd",
          borderRadius: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={onsubmit}
      >
        <Stack spacing={2}>
          <Typography variant="h4" color="#152C5B">
            Start Booking
          </Typography>
          <Typography variant="h3">
            <span style={{ color: "#1ABC9C" }}>{price}$</span> per night
          </Typography>
          <Typography variant="h5" color="red">
            Discount {discount}% off
          </Typography>
        </Stack>

        <Box sx={{ px: "20px", py: "20px" }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              lineHeight: 0,
              mb: 2,
            }}
          >
            Pick a Date
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "3px",
            }}
          >
            <CustomDatePicker
              control={control}
              setValue={setValue}
              name="dateRange"
            />
          </Box>
        </Box>
        <Typography color="#B0B0B0" marginY={2}>
          You will pay{" "}
          <span style={{ color: "#152C5B" }}>${totalPrice} USD</span> <br />
          for{" "}
          <span style={{ color: "#152C5B", marginRight: 1 }}>
            {capacity} Person(s)
          </span>
          for <span style={{ color: "#152C5B" }}>{totalDays}</span> night(s)
        </Typography>

        <CustomButton type="submit" fullWidth>
          Continue Booking
        </CustomButton>
      </Box>
    </Grid>
  );
}
