import { loginCredentials, getUserInfo } from './auth.thunks';
import { createTestStore } from '../../createTestStore';
import { ApiClient } from '../../services';
import { vi, describe, it, expect } from 'vitest';
// import authReducer from './auth.slice';
import rootReducer from '../../rootReducer';
import { setToken } from './auth.slice';

describe('Auth Thunks', () => {
    const mockApiClient: ApiClient = {
        auth: {
            login: vi.fn().mockResolvedValue({
                success: true,
                data: {
                    token: 'admin_test_token123',
                },
                message: 'Login successful',
                status: 200
            }),
            getUserInfo: vi.fn().mockResolvedValue({
                success: true,
                data: {
                    user: {
                        id: '1',
                        email: 'test_admin@example.com',
                        role: 'admin',
                        name: 'Test Admin',
                        permissions: ['user.read', 'user.write', 'user.delete'],
                        language: 'en'
                    }
                },
                message: 'User info retrieved successfully',
                status: 200
            })
        },
    };

    describe('loginCredentials', () => {
        it('should return a token on success', async () => {
            const store = createTestStore(rootReducer, mockApiClient);
            const result = await store.dispatch(loginCredentials({ email: 'test_admin@example.com', password: 'test123' }));

            expect(mockApiClient.auth.login).toHaveBeenCalledWith({ email: 'test_admin@example.com', password: 'test123' });
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual({ token: 'admin_test_token123', isAuthenticated: true });
        });

        it('should return an error on failure', async () => {
            const mockApiClientOverride = {
                auth: {
                    login: vi.fn().mockResolvedValue({
                        success: false,
                        data: null,
                        message: 'Login failed',
                        status: 401
                    }),
                },
            };
            const store = createTestStore(rootReducer, mockApiClient, { auth: { ...mockApiClient.auth, ...mockApiClientOverride.auth } });
            const result = await store.dispatch(loginCredentials({ email: 'test@example.com', password: 'wrong_password' }));

            expect(mockApiClientOverride.auth.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'wrong_password' });
            expect(result.payload).toBe('Login failed');
            expect(result.meta.requestStatus).toBe('rejected');
        });
    });

    describe('getUserInfo', () => {
        it('should return a user and permissions and language on success ', async () => {
            const store = createTestStore(rootReducer, mockApiClient);
            store.dispatch(setToken('test_token'));
            const result = await store.dispatch(getUserInfo());
            expect(mockApiClient.auth.getUserInfo).toHaveBeenCalledWith('test_token');
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual({
                user: {
                    id: '1',
                    email: 'test_admin@example.com',
                    name: 'Test Admin',
                    role: 'admin',
                },
                permissions: ['user.read', 'user.write', 'user.delete'],
                language: 'en'
            });
        });

        it('should return an error on failure', async () => {
            const mockApiClientOverride = {
                auth: {
                    getUserInfo: vi.fn().mockResolvedValue({
                        success: false,
                        data: null,
                        message: 'Fetch failed',
                        status: 500
                    }),
                },
            };
            const store = createTestStore(rootReducer, mockApiClient, { auth: { ...mockApiClient.auth, ...mockApiClientOverride.auth } });
            store.dispatch(setToken('test_token'));
            const result = await store.dispatch(getUserInfo())
            console.log(result)
            console.log(store.getState().auth.token)
            expect(mockApiClientOverride.auth.getUserInfo).toHaveBeenCalledWith('test_token');
            expect(result.payload).toBe('Fetch failed');
            expect(result.meta.requestStatus).toBe('rejected');
        });

        it('should dispatch logout and return Unauthorized on 401', async () => {
            const mockApiClientOverride = {
                auth: {
                    getUserInfo: vi.fn().mockResolvedValue({
                        success: false,
                        data: null,
                        message: 'Token expired',
                        status: 401
                    }),
                },
            };
            const store = createTestStore(rootReducer, mockApiClient, { auth: { ...mockApiClient.auth, ...mockApiClientOverride.auth } });
            store.dispatch(setToken('test_token'));
            const result = await store.dispatch(getUserInfo());

            expect(mockApiClientOverride.auth.getUserInfo).toHaveBeenCalledWith('test_token');
            expect(result.payload).toBe('Token expired');
            expect(result.meta.requestStatus).toBe('rejected');

            const state = store.getState() as any;
            expect(state.auth.isAuthenticated).toBe(false);
            expect(state.auth.user).toBeNull();
            expect(state.auth.token).toBeNull();
        });
    });
}); 
