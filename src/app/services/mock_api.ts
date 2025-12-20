import { ApiClient } from "./apiClient";
import { mockAuthApi } from "./mock_authApi";

export const mockApi: ApiClient = {
    auth: mockAuthApi,
}   