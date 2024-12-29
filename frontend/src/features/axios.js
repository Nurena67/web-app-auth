import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://web-app-auth-production.up.railway.app",
    withCredentials: true
});

export default axiosInstance;
