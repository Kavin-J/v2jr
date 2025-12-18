import { AuthApiClient } from "./authApiClient";
import { LoginPayload } from "../features/auth/auth.thunks";
import axios from "axios";
import { User } from "../features/auth/auth.type";

export const authApi: AuthApiClient = {

    async login(payload: LoginPayload): Promise<{ success: boolean; data: { user: User; token: string; }; message: string; status: number; }> {
        const response = await axios.post<object, { success: boolean; data: { user: User; token: string; }; message: string; status: number; }>(import.meta.env.VITE_API_BASE_URL + '/auth/login', payload)
        return response
    }

} 