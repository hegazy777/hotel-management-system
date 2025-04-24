import { AlertColor } from "@mui/material";
import { JwtPayload } from "jwt-decode";

export interface UserGroup {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  isActivated: boolean;
  group: UserGroup;
  creationDate: string;
  modificationDate: string;
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
  userGroup: "Manager" | "Employee";
}


export interface fogetPass {
  email: string
}
export interface restPassword {
  seed: number | string;
  email: string;
  password: string | number;
  confirmPassword: string | number


}
