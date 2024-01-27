import axios from "axios";

const api = axios.create({
    baseURL: 'https://spendlyapi.vercel.app'
});

export default api;