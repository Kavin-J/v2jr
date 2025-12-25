import { LoginPayload } from "../../features/auth/auth.thunks";
import axios from "axios";
import { baseResponse } from "../types";
import { User, LanguageType } from "../../features/auth/auth.type";
import { RootState, store } from "../../store";


export interface AuthApiClient {
    login(payload: LoginPayload): Promise<baseResponse<{ token: string }>>;
    getUserInfo(token: string): Promise<baseResponse<{ user: User & { permissions: string[], language: LanguageType } }>>;

}

export const authApiClient: AuthApiClient = {

    async login(payload: LoginPayload) {
        const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/auth/login', payload)
        return response.data
    },
    async getUserInfo(token: string) {
        const response = await axios.get(import.meta.env.VITE_API_BASE_URL + '/auth/user-info', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },

} 