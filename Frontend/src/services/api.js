import axios from "axios";
import { io } from "socket.io-client";

const LOCAL_URL = import.meta.env.VITE_API_URL_LOCAL || "http://localhost:3000";
const PROD_URL = import.meta.env.VITE_API_URL_PROD || "https://maya-o48q.onrender.com";

// npm run dev => local, npm run build => prod
export const BASE_URL = import.meta.env.DEV ? LOCAL_URL : PROD_URL;

// withCredentials => cookie token ke liye
export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// agar backend token JSON me bhejta hai to header me bhi chala jayega
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const createSocket = () =>
  io(BASE_URL, {
    withCredentials: true,
    auth: (cb) => cb({ token: localStorage.getItem("token") }),
  });