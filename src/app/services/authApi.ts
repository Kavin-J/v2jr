import { AuthApiClient } from "./authApiClient";
import { LoginPayload } from "../features/auth/auth.thunks";
import axios from "axios";
import { User, LanguageType } from "../features/auth/auth.type";
import { baseResponse } from "./types";

export const authApi: AuthApiClient = {

    async login(payload: LoginPayload): Promise<baseResponse<{ user: User; token: string; language: LanguageType; permission: string[]; }>> {
        const response = await axios.post<object, baseResponse<{ user: User; token: string; language: LanguageType; permission: string[]; }>>(import.meta.env.VITE_API_BASE_URL + '/auth/login', payload)
        return response
    }

} 