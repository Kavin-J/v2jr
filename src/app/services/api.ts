import { authApi } from "./authApi";
import { ApiClient } from "./apiClient";

export const api: ApiClient = {
    auth: authApi,
}   