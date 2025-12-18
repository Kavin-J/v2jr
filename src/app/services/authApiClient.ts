import { LoginPayload } from "../features/auth/auth.thunks";
import { User } from "../features/auth/auth.type";

export interface AuthApiClient {
    login(payload: LoginPayload): Promise<{ success: boolean, data: { user: User, token: string }, message: string, status: number }>;
}