import { useEffect } from "react";
import userService from "../services/userService";

const Logout = () => {
  useEffect(() => {
    userService.logout();
    window.location = "/";
  }, []);

  return null;
};

export default Logout;
