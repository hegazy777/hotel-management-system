import { Box, Button, Typography } from "@mui/material";
import { HeaderProps } from "../../../interfaces/HeaderInterface";

export default function Header({
  headerTitle,
  buttonText,
  onAdd,
  children,
}: HeaderProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      sx={{ height: "150px" }}
      gap={2}
    >
      <Box>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ fontFamily: "Poppins" }}
        >
          {headerTitle} Table Details
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Poppins" }}
        >
          You can check all details
        </Typography>
      </Box>
      {children ? (
        children
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onAdd}
          sx={{
            textTransform: "none",
            boxShadow: "none",
            px: 4,
            backgroundColor: "#203FC7",
          }}
        >
          Add New {buttonText}
        </Button>
      )}
    </Box>
  );
}
