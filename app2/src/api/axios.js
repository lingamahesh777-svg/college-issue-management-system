import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://college-issue-management-system.onrender.com/api",
});

export default axiosInstance;
