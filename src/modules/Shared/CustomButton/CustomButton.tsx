import { Button, ButtonProps } from "@mui/material";
export default function CustomButton(props: ButtonProps) {
  const { children, ...rest } = props;

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#3252DF",
        fontFamily: "Poppins",
        textTransform: "none",
        boxShadow: "0px 8px 15px 0px #3252DF4D",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
