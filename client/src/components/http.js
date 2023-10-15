import axios from "axios";

const http = axiosInstance.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization :`Bearer ${localStorage.getItem("token")}`
  },
});
export default http;

// https://todoapp-gao5.onrender.com