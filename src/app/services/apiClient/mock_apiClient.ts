import { ApiClient } from "./apiClient";
import { mockAuthApiClient } from "./mock_authApiClient";

export const mockApiClient: ApiClient = {
    auth: mockAuthApiClient,
}
