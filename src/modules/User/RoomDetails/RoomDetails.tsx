import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import { isAxiosError } from "axios";

import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { AxiosErrorResponse } from "../../../interfaces/AxiosErrorResponseInterface";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { apiInstance } from "../../../services/api/apiInstance";
import { userRooms_endpoints } from "../../../services/api/apiConfig";
import RoomImages from "./RoomImages";
import RoomDescription from "./RoomDescription";
import RoomBooking from "./RoomBooking";
import RoomReviews from "./RoomReviews";

type Facility = {
  _id: string;
  name: string;
};

export type IRoomDetails = {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
};

export default function RoomDetails() {
  const showSnackbar = useContext(SnackbarContext);

  const { roomId } = useParams() as { roomId: string };

  const [roomDetails, setRoomDetails] = useState<IRoomDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRoomDetails = async (roomId: string) => {
    try {
      if (roomId) {
        const response = await apiInstance.get(
          userRooms_endpoints.GET_ROOM_DETAILS(roomId)
        );

        setRoomDetails(response.data.data.room);
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
    setLoading(false);
  };

  useEffect(() => {
    // Fetch room details using roomId

    fetchRoomDetails(roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (!roomDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          No room details found. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: "160px" }}>
      <Stack direction="row" sx={{ padding: 5, alignItems: "center" }}>
        <Box role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography sx={{ color: "#152C5B" }}>Room Details</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ marginX: "auto", textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "#152C5B", fontWeight: 600 }}>
            {roomDetails?.roomNumber}
          </Typography>
          <Typography sx={{ color: "#B0B0B0" }}>
            Created by: {roomDetails?.createdBy.userName}
          </Typography>
        </Box>
      </Stack>

      <RoomImages images={roomDetails.images} />

      <RoomDescription>
        <RoomBooking
          capacity={roomDetails.capacity}
          price={roomDetails.price}
          discount={roomDetails.discount}
          roomId={roomDetails._id}
        />
      </RoomDescription>

      <RoomReviews />
    </Box>
  );
}
