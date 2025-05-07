import { privateApiInstance } from "../services/api/apiInstance";
import { admin_endpoints } from "../services/api/apiConfig";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorge";
import { jwtDecode } from "jwt-decode";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AuthContextType, User } from "../interfaces/AuthContextInterface";
import { CustomJwtPayload } from "../interfaces/JwtPayloadInterface";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { _id, role } = token
    ? (jwtDecode(token) as CustomJwtPayload)
    : { _id: "", role: "" };

  const getUserData = async () => {
    try {
      const response = await privateApiInstance.get(
        admin_endpoints.GET_USER(_id)
      );
      setUser(response?.data?.data?.user);
    } catch (error) {
      console.log("❌ Error fetching user data:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If there's a valid token and user data hasn't been fetched yet, fetch user data
    if (token) {
      if (!user) {
        getUserData();
      } else {
        setLoading(false);  // Don't fetch again if user is already set
      }
    } else {
      setLoading(false);  // Set loading to false if no token is present
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  let decodedToken: CustomJwtPayload | null = null;
  try {
    decodedToken = token ? (jwtDecode(token) as CustomJwtPayload) : null;
  } catch (error) {
    console.error("Invalid token:", error);
    decodedToken = null; // Ensure we set it to null if decoding fails
  }

  const isManager = decodedToken ? decodedToken?.userGroup === "Manager" : false;

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        logout,
        isManager,
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
