import { useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import { CommentUrls, ReviewsUrls } from "../../../../constants/End_Points";
import { isAxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { AxiosErrorResponse } from "../../../interfaces/AxiosErrorResponseInterface";
import StarIcon from "@mui/icons-material/Star";

import {
  comments_endpoints,
  reviews_endpoints,
} from "../../../services/api/apiConfig";
import { privateApiInstance } from "../../../services/api/apiInstance";

export default function RoomReviews() {
  const { token, isManager } = useContext(AuthContext);
  const showSnackbar = useContext(SnackbarContext);
  const { roomId } = useParams<Record<string, string>>(); // Use Record type

  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  // Function to create a comment
  const createComment = async () => {
    if (!token || isManager) {
      console.error("User not authenticated");
      return;
    }

    try {
      await privateApiInstance.post(comments_endpoints.CREATE_COMMENT, {
        comment,
        roomId,
      });
      setComment("");
      showSnackbar("Comment added succefully", "success");
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

  // Function to create a review
  const createReview = async () => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    if (rating === 0) {
      showSnackbar("Rating must be between 1 and 5", "error");

      return;
    }

    if (!review) {
      showSnackbar("Review cannot be empty", "error");

      return;
    }

    if (!roomId) {
      showSnackbar("Room ID is missing", "error");

      return;
    }

    try {
      await privateApiInstance.post(reviews_endpoints.CREATE_REVIEW, {
        roomId,
        rating,
        review,
      });

      showSnackbar("Review added succefully", "success");
      setReview("");
      setRating(0);
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
    <Box
      sx={{
        paddingY: 5,
        paddingX: 2,
        display: "flex",
        flexDirection: { md: "row", sm: "column" },
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      {token && !isManager ? (
        <>
          {/* Review Section */}
          <Stack
            sx={{
              border: "1px solid #ddd",
              borderRadius: 3,
              padding: 5,
              mb: 5,
              flex: 1,
              width: { sm: "100%" },
            }}
            spacing={2}
          >
            <Typography variant="h6" color="#152C5B">
              Rate and Review
            </Typography>
            {/* Rating Stars */}
            <Box>
              {[1, 2, 3, 4, 5].map((value) => (
                <StarIcon
                  key={value}
                  onClick={() => setRating(value)}
                  style={{
                    cursor: "pointer",
                    color: value <= rating ? "#DFCB1D" : "#ddd",
                  }}
                />
              ))}
            </Box>

            {/* Review Text Field */}
            <TextField
              id="review"
              label="Your Review"
              multiline
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            {/* Submit Review Button */}
            <Button
              onClick={createReview}
              variant="contained"
              sx={{
                backgroundColor: "#3252DF",
                width: "25%",
                textTransform: "none",
              }}
            >
              Submit Review
            </Button>
          </Stack>

          {/* Comment Section */}
          <Stack
            sx={{
              border: "1px solid #ddd",
              borderRadius: 3,
              padding: 5,
              flex: 1,
              width: { sm: "100%" },
            }}
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            divider={
              <Divider
                sx={{
                  backgroundColor: "rgb(32, 63, 199, 0.5)",
                  borderWidth: "2px",
                }}
                orientation="vertical"
                flexItem
              />
            }
          >
            <Stack
              spacing={2}
              sx={{
                width: { xs: "100%", md: "100%" },
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" color="#152C5B">
                Add Your Comment
              </Typography>
              <TextField
                id="comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ borderColor: "3252DF" }}
              />
              <Button
                onClick={createComment}
                variant="contained"
                sx={{
                  backgroundColor: "#3252DF",
                  width: "25%",
                  alignSelf: "end",
                  textTransform: "none",
                }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
        <Typography
          variant="h6"
          color="#152C5B"
          sx={{ textAlign: "center", color: "green" }}
        >
          You must be logged in to leave a comment or review. <br />
          You can{" "}
          <Link style={{ color: "green" }} to="/auth/login">
            Login
          </Link>{" "}
          or{" "}
          <Link style={{ color: "green" }} to="/auth/register">
            Register
          </Link>
        </Typography>
      )}
    </Box>
  );
}
