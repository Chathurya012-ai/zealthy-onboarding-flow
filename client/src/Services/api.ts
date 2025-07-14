import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export interface UserResponse {
    id: number;           // ← required for React keys
    email: string;
    aboutMe?: string;
    address?: string;
    birthdate?: string;
    createdAt: string;
}

export interface UserData {
    email: string;
    password: string;
    aboutMe: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    birthdate: string;
}

export interface ConfigResponse {
    page2Components: string[];
    page3Components: string[];
}

export const apiService = {
    /** GET /api/users */
    getAllUsers: async (): Promise<UserResponse[]> => {
        const { data } = await API.get<UserResponse[]>('/users');
        return data;
    },

    /** POST /api/users */
    saveUser: async (user: UserData): Promise<UserResponse> => {
        const { data } = await API.post<UserResponse>('/users', user);
        return data;
    },

    /** GET /api/config */
    getConfig: async (): Promise<ConfigResponse> => {
        const { data } = await API.get<ConfigResponse>('/config');
        return data;
    },

    /** POST /api/config */
    updateConfig: async (cfg: ConfigResponse): Promise<ConfigResponse> => {
        const { data } = await API.post<ConfigResponse>('/config', cfg);
        return data;
    },
};



