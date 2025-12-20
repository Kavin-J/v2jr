import { loginCredentials } from './auth.thunks';
import { createTestStore } from '../../createTestStore';
import authReducer from './auth.slice';
import { ApiClient } from '../../services/apiClient';
import { User } from './auth.type';
import { vi, describe, it, expect } from 'vitest';

describe('loginCredentials', () => {
    it('should return a user and token on success', async () => {
        const mockUser: User = {
            id: '1',
            name: 'Test Admin',
            email: 'test_admin@example.com',
            role: 'admin',
            avatar: 'avatar_url',
        };

        const mockApiClient: ApiClient = {
            auth: {
                login: vi.fn().mockResolvedValue({
                    success: true,
                    data: {
                        user: mockUser,
                        token: 'admin_test_token123'
                    },
                    message: 'Login successful',
                    status: 200
                })
            }
        };

        const store = createTestStore({ auth: authReducer }, mockApiClient);
        const result = await store.dispatch(loginCredentials({ email: 'test_admin@example.com', password: 'test123' }));

        expect(mockApiClient.auth.login).toHaveBeenCalledWith({ email: 'test_admin@example.com', password: 'test123' });
        expect(result.payload).toEqual({ user: mockUser, token: 'admin_test_token123' });
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    it('should return an error on failure', async () => {
        const mockApiClient: ApiClient = {
            auth: {
                login: vi.fn().mockResolvedValue({
                    success: false,
                    message: 'Login failed',
                    status: 401
                })
            }
        };

        const store = createTestStore({ auth: authReducer }, mockApiClient);
        const result = await store.dispatch(loginCredentials({ email: 'test@example.com', password: 'wrong_password' }));

        expect(mockApiClient.auth.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'wrong_password' });
        expect(result.payload).toBe('Login failed');
        expect(result.meta.requestStatus).toBe('rejected');
    });
}); 
