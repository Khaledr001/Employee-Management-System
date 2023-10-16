import axios from "axios";
import authServices from "../services/authServices.js";

const Axios = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {},
});

Axios.interceptors.request.use(
  (config) => {
    if (config.authorization !== false) {
      const token = authServices.getAuthToken();
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Axios;