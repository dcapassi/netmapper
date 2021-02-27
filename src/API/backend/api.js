import axios from "axios";

const api = axios.create({ baseURL: "https://192.168.0.21:3399/" });

export default api;
