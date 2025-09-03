// src/api/axios.js
import axios from "axios";

// Use deployed backend instead of localhost
const API = import.meta.env.VITE_API_BASE_URL || "https://gg-az95.onrender.com";

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
