import axios from "axios";

const API_URL = "http://localhost:5000/api";
export const apiUrlStatic = "http://localhost:5000/static/";

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const apiDefault = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
