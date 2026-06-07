import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-api-y8hi.onrender.com/api",
});

export default API;