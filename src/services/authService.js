import api from "../utils/api";

const authService = {
    login: async (user) => {
        try {
            const response = await api.post('/auth/login', user);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (user) => {
        try {
            const response = await api.post('/auth/register', user);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;