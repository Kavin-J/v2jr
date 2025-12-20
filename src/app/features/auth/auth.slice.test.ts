import { describe, it, expect } from 'vitest';
import authReducer, { login, logout, setError, setLoading } from './auth.slice';
import { AuthState, User } from './auth.type';

describe('auth reducer', () => {
    const initialState: AuthState = {
        user: null,
        // @ts-ignore - token is missing in slice initial state but present in type
        token: null,
        isAuthenticated: false,
        error: null,
        loading: false,
    };

    it('should return the initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            user: null,
            isAuthenticated: false,
            error: null,
            loading: false,
            token: null,
        });
    });

    it('should handle login', () => {
        const user: User = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'staff',
        };
        const actual = authReducer(initialState, login({ user, token: 'test-token' }));
        expect(actual.user).toEqual(user);
        expect(actual.isAuthenticated).toBe(true);
        expect(actual.loading).toBe(false);
        expect(actual.token).toBe('test-token');
        expect(localStorage.getItem('token')).toBe('test-token');
        expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
    });

    it('should handle logout', () => {
        const loggedInState: AuthState = {
            ...initialState,
            user: {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                role: 'staff',
            },
            isAuthenticated: true,
            token: 'test-token',
        };
        const actual = authReducer(loggedInState, logout());
        expect(actual.user).toBeNull();
        expect(actual.isAuthenticated).toBe(false);
        expect(actual.token).toBeNull();
    });

    it('should handle setError', () => {
        const errorMsg = 'An error occurred';
        const actual = authReducer(initialState, setError(errorMsg));
        expect(actual.error).toEqual(errorMsg);
    });

    it('should handle setLoading', () => {
        const actual = authReducer(initialState, setLoading(true));
        expect(actual.loading).toBe(true);
    });

    describe('loginCredentials', () => {
        it('should handle pending', () => {
            const action = { type: 'auth/loginCredentials/pending' };
            const actual = authReducer(initialState, action);
            expect(actual.loading).toBe(true);
        });

        it('should handle fulfilled', () => {
            const user: User = {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                role: 'staff',
            };
            const token = 'test-token';
            const action = { type: 'auth/loginCredentials/fulfilled', payload: { user, token } };
            const actual = authReducer(initialState, action);

            expect(actual.loading).toBe(false);
            expect(actual.user).toEqual(user);
            expect(actual.token).toBe(token);
            expect(actual.isAuthenticated).toBe(true);
            expect(actual.error).toBeNull();
            expect(localStorage.getItem('token')).toBe(token);
            expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
        });

        it('should handle rejected', () => {
            const errorMsg = 'Login failed';
            const action = { type: 'auth/loginCredentials/rejected', payload: errorMsg };
            const actual = authReducer(initialState, action);

            expect(actual.loading).toBe(false);
            expect(actual.isAuthenticated).toBe(false);
            expect(actual.token).toBeNull();
            expect(actual.user).toBeNull();
            expect(actual.error).toBe(errorMsg);
        });
    });
});
