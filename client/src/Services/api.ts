import axios from 'axios'

const API_BASE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_API_BASE_URL!
    : 'http://localhost:8080'

export const api = axios.create({
        baseURL: API_BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
    })

;(window as any).API_BASE = api.defaults.baseURL

// API Response Types
export interface ConfigResponse {
    page2Components: string[]
    page3Components: string[]
}

export interface UserData {
    email: string
    password: string
    aboutMe: string
    birthdate: string
    street: string
    city: string
    state: string
    zip: string
}

// Removed createdAt here
export interface UserResponse {
    id: number
    email: string
    aboutMe?: string
    address?: string
    birthdate?: string
}

// API Service Functions
export const apiService = {
    getConfig: async (): Promise<ConfigResponse> => {
        const res = await api.get<ConfigResponse>('/api/config')
        return res.data
    },
    saveUser: async (u: UserData): Promise<void> => {
        await api.post('/api/users', u)
    },
    getAllUsers: async (): Promise<UserResponse[]> => {
        const res = await api.get<UserResponse[]>('/api/users')
        return res.data
    },
    updateConfig: async (c: ConfigResponse): Promise<void> => {
        await api.post('/api/config', c)
    },
    getAllUsersLegacy: async (): Promise<UserResponse[]> => {
        const res = await api.get<UserResponse[]>('/api/user/all')
        return res.data
    },
}

export default api
