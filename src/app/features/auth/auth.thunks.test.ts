import { loginCredentials } from './auth.thunks';
import { createTestStore } from '../../createTestStore';
import { ApiClient } from '../../services/apiClient';
import authReducer from './auth.slice';
import { User } from './auth.type';

describe('loginCredentials', () => {
    it('should return a user and token', async () => {
        const mockApiClient: ApiClient = {
            auth: {
                login: vi.fn().mockResolvedValue({ success: true, data: { user: { email: 'test@test.com', id: '1', name: 'test', role: 'staff' }, token: 'test_token' } as unknown as User, message: 'Login successful', status: 200 })
            }
        };
        const store = createTestStore({ auth: authReducer }, mockApiClient);
        const result = await store.dispatch(loginCredentials({ email: 'test@test.com', password: 'test123' }));

        expect(mockApiClient.auth.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'test123' });
        expect(result.payload).toEqual({ user: { email: 'test@test.com', id: '1', name: 'test', role: 'staff' }, token: 'test_token' });
    });
});
