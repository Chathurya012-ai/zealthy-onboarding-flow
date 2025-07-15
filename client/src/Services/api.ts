import axios from 'axios'

const API_BASE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_API_BASE_URL!
    : 'http://localhost:8080'

export const api = axios.create({
        baseURL: API_BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,  // switch to true if you later need cookies/auth
    })

// expose it so you can inspect it in the browser console:
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

export interface UserResponse {
    id: number
    email: string
    aboutMe?: string
    address?: string
    birthdate?: string
    createdAt: string
}

// API Service Functions
export const apiService = {
    // GET /api/config
    getConfig: async (): Promise<ConfigResponse> => {
        const response = await api.get<ConfigResponse>('/api/config')
        return response.data
    },

    // POST /api/users
    saveUser: async (userData: UserData): Promise<void> => {
        await api.post('/api/users', userData)
    },

    // GET /api/users
    getAllUsers: async (): Promise<UserResponse[]> => {
        const response = await api.get<UserResponse[]>('/api/users')
        return response.data
    },

    // POST /api/config (admin update)
    updateConfig: async (config: ConfigResponse): Promise<void> => {
        await api.post('/api/config', config)
    },
        // …other methods…

        // Legacy: GET /api/user/all
        getAllUsersLegacy: async (): Promise<UserResponse[]> => {
            const response = await api.get<UserResponse[]>('/api/user/all')
            return response.data
        },


}

export default api
