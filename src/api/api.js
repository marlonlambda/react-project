import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject({ message: "Tiempo de espera agotado" });
    }
    return Promise.reject(error);
  }
);


export default api;