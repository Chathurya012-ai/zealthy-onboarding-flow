import axios from 'axios';

const API_BASE_URL =process.env.VITE_APP_API_BASE 

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
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

// API Functions
export const apiService = {
    // Get configuration for onboarding steps
    getConfig: async (): Promise<ConfigResponse> => {
        const response = await api.get<ConfigResponse>('/api/config');
        return response.data;
    },

    // Save user data
    saveUser: async (userData: UserData): Promise<void> => {
        await api.post('/api/user', userData);
    },

    // Get all users
    getAllUsers: async (): Promise<UserResponse[]> => {
        const response = await api.get<UserResponse[]>('/api/user/all');
        return response.data;
    },

    // Update configuration (for admin panel)
    updateConfig: async (config: ConfigResponse): Promise<void> => {
        await api.post('/api/config', config);
    },
};

export default api;