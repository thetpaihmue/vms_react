import Cookies from "js-cookie";
import http from "../base-http";
import { redirect } from "react-router-dom";

const setAuthHeader = () => {
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken) {
    http.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  }
};

const deleteToken = () => {
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken) {
    Cookies.remove("jwtToken");
    Cookies.remove("role");
    Cookies.remove("expirationTime");
  }
};

export default { setAuthHeader, deleteToken };
