import { AuthApiClient } from "./authApiClient";
import { LoginPayload } from "../features/auth/auth.thunks";
import { User, LanguageType } from "../features/auth/auth.type";
import { baseResponse } from "./types";
import { mockLogin } from "../features/auth/__mock__/user";

export const mockAuthApi: AuthApiClient = {

    async login(payload: LoginPayload): Promise<baseResponse<{ user: User; token: string; language: LanguageType; permission: string[]; }>> {
        const response = await mockLogin(payload)
        console.log(response)
        return response
    }

} 
