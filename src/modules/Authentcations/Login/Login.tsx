import { useContext } from "react";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

export default function Login() {
  const showSnackbar = useContext(SnackbarContext);

  const handleClick = () => {
    showSnackbar("Logged successfully", "success");
  };

  return <div onClick={handleClick}>Login</div>;
}
