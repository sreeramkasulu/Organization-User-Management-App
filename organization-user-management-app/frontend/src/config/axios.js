import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://interviewbuddy-fs-task-1.onrender.com",
});

export default apiClient;
