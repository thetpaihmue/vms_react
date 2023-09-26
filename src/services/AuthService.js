import Cookies from "js-cookie";
import http from "../base-http";

const setAuthHeader = () => {
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken) {
    http.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  }
};

export default { setAuthHeader };
