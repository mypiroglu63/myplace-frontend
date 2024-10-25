import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7777", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Kimlik doğrulama bilgilerini koruyun
});

// Her istekte kullanıcı oturumunu koruyan bir interceptor ekleyin
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // Access token'ı localStorage'dan alın
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
