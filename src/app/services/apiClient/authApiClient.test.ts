import { setToken } from "../../features/auth/auth.slice";
import { store } from "../../store";
import { authApiClient } from "./authApiClient"
import { describe, it, expect } from 'vitest';
describe('AuthApiClient', () => {
    it('should login successfully', async () => {
        const response = await authApiClient.login({ email: 'test_admin@example.com', password: 'test123' })
        console.log(response);
        expect(response.success).toBe(true)
    })

    it('should get user info successfully', async () => {
        // Use a valid token from MOCK_USERS
        const validToken = 'admin_test_token123';

        // Dispatch login action to set token in store
        store.dispatch(setToken(validToken));

        const response = await authApiClient.getUserInfo(validToken)
        console.log(response);
        expect(response.success).toBe(true)
        expect(response.data?.user.email).toBe('test_admin@example.com');
    })
})