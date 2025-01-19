import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://web-app-auth.up.railway.app",
    withCredentials: true
});

export default axiosInstance;
