import axios from "axios";

export default axios.create({
  baseURL: "https://apivehiclefmsdev.citymall.com.mm/api",
  headers: {
    "Content-type": "application/json",
  },
});
