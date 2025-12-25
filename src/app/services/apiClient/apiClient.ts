import { authApiClient } from "./authApiClient";
import { AuthApiClient } from "./authApiClient";


export interface ApiClient {
    auth: AuthApiClient;
}

export const apiClient: ApiClient = {
    auth: authApiClient,
}