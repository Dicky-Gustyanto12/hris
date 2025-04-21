// api.js / api.jsx
import axios from "axios";
import Cookies from "js-cookie"; // pastikan sudah install js-cookie

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // WAJIB: kirim cookie ke backend
});

// Inject token dari cookie ke header axios
api.interceptors.request.use((config) => {
  const token = Cookies.get("XSRF-TOKEN"); // HARUS decode token dari cookie
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

export default api;
