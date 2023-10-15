import axios from "axios";

const http = axios.create({
  baseURL: "https://merntodoapp-fq1o.onrender.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization :`Bearer ${localStorage.getItem("token")}`

  },
});
export default http;

// https://merntodoapp-fq1o.onrender.com/
// http://localhost:5000