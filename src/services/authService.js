import axios from "axios"

const API_URL = "https://spendlyapi.vercel.app";

const authService = {
    login: async (user) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (user) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;