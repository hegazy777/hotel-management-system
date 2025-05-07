import { useContext } from "react";
import NavBar from "../NavBar/NavBar";
import { AuthContext } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { AuthContext } from "../../../contexts/AuthContext";

export default function LandingPage() {
  const { token, isManager } = useContext(AuthContext);

  if (token && isManager) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <NavBar />
    </>
  );
}
