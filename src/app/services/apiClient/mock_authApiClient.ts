import { AuthApiClient } from "./authApiClient";
import { LoginPayload } from "../../features/auth/auth.thunks";
import { mockLogin, mockUserInfo } from "../../features/auth/__mock__/user";

export const mockAuthApiClient: AuthApiClient = {

    async login(payload: LoginPayload) {
        const response = await mockLogin(payload)
        return response
    },
    async getUserInfo() {
        const response = await mockUserInfo()
        return response
    }
} 
