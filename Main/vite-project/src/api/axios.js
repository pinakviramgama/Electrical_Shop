import axios from "axios";

const API = axios.create({
  baseURL: "https://electrical-shop-10.onrender.com/api",
  withCredentials: true,
});

// ✅ Automatically add token in every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
