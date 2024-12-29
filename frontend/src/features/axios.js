import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://web-app-auth-production.up.railway.app",
    withCredentials: true
});

export default axiosInstance;
