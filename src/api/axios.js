import axios from "axios";

// Vite uses import.meta.env, CRA uses process.env
const API = import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // only if Django uses session auth
});

export default axiosInstance;
