import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export interface UserResponse {
    id: number;
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
    page1Components: string[];
    page2Components: string[];
}

export const apiService = {
    getAllUsers: async (): Promise<UserResponse[]> => {
        const { data } = await API.get<UserResponse[]>('/users');
        return data;
    },

    saveUser: async (user: UserData): Promise<UserResponse> => {
        const { data } = await API.post<UserResponse>('/users', user);
        return data;
    },

    getConfig: async (): Promise<ConfigResponse> => {
        const { data } = await API.get<ConfigResponse>('/config');
        return data;
    },

    updateConfig: async (cfg: ConfigResponse): Promise<ConfigResponse> => {
        const { data } = await API.post<ConfigResponse>('/config', cfg);
        return data;
    },
};
