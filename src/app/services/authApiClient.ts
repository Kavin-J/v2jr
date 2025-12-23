import { LoginPayload } from "../features/auth/auth.thunks";
import { User, LanguageType } from "../features/auth/auth.type";

import { baseResponse } from "./types";

export interface AuthApiClient {
    login(payload: LoginPayload): Promise<baseResponse<{ user: User, token: string, language: LanguageType, permission: string[] }>>;
}