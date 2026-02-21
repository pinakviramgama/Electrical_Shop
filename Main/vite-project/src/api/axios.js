import axios from "axios";

const API = axios.create({
  baseURL: "https://electrical-shop-10.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // ✅ must have
  },
});

// Automatically add token in every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default API;
