import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://paw-kelompok-11-server.vercel.app/api"
});

export default axiosInstance;
