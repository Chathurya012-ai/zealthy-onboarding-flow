import axios from 'axios';

// Base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false // set to true only if using cookies/auth
});

// API Response Types
export interface ConfigResponse {
    page2Components: string[];
    page3Components: string[];
}

export interface UserData {
    email: string;
    password: string;
    aboutMe: string;
    birthdate: string;
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface UserResponse {
    id: number;
    email: string;
    aboutMe?: string;
    address?: string;
    birthdate?: string;
    createdAt: string;
}

// API Service Functions
export const apiService = {
    // GET /api/config
    getConfig: async (): Promise<ConfigResponse> => {
        const response = await api.get<ConfigResponse>('/api/config');
        return response.data;
    },

    // POST /api/user
    saveUser: async (userData: UserData): Promise<void> => {
        await api.post('/api/user', userData);
    },

    // GET /api/user/all
    getAllUsers: async (): Promise<UserResponse[]> => {
        const response = await api.get<UserResponse[]>('/api/user/all');
        return response.data;
    },

    // POST /api/config (admin update)
    updateConfig: async (config: ConfigResponse): Promise<void> => {
        await api.post('/api/config', config);
    },
};

export default api;
