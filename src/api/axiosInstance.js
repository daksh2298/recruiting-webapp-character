import axios from "axios";

const ApiUrl = "https://recruiting.verylongdomaintotestwith.ca/api/";

const axiosInstance = axios.create({
  baseURL: ApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
