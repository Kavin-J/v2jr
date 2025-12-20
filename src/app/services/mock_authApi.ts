import { AuthApiClient } from "./authApiClient";
import { LoginPayload } from "../features/auth/auth.thunks";
import { User } from "../features/auth/auth.type";
import { baseResponse } from "./types";
import { mockLogin } from "../features/auth/__mock__/user";

export const mockAuthApi: AuthApiClient = {

    async login(payload: LoginPayload): Promise<baseResponse<{ user: User; token: string; }>> {
        const response = await mockLogin(payload)
        return response
    }

} 