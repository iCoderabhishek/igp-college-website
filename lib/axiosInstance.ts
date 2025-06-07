// lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // base path for all API routes
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set true if you’re using cookies/session
});

export default axiosInstance;
