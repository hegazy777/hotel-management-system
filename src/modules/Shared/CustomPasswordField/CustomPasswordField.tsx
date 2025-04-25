import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface PasswordFieldProps {
  label?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  toggle: boolean;
  setToggle: (value: boolean) => void;
}
export default function CustomPasswordField({
  register,
  error,
  toggle,
  label = "Password",

  setToggle,
}: PasswordFieldProps) {
  return (
    <TextField
      {...register}
      type={toggle ? "text" : "password"}
      label={label}
      variant="standard"
      fullWidth
      margin="normal"
      error={Boolean(error)}
      helperText={error?.message}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setToggle(!toggle)} edge="end">
                {toggle ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
