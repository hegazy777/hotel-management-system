import { AlertColor } from "@mui/material";
import { JwtPayload } from "jwt-decode";

export interface User {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SnackbarContextType = (
  message?: string,
  severity?: AlertColor
) => void;

export type AuthContextType = {
  token: string | null;
  user: User | null;
  setToken: (newValue: string) => void;
  logout: () => void;
  isManager: boolean;
};

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
  role: "admin" | "user";
}
