import { describe, it, expect } from 'vitest';
import authReducer, { login, logout, setError, setLoading, setLanguage, setPermission } from './auth.slice';
import { AuthState, LanguageType, User } from './auth.type';


describe('auth reducer', () => {
    const initialState: AuthState = {
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        loading: false,
        language: 'th',
        permissions: [],
    };

    it('should return the initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            user: null,
            isAuthenticated: false,
            error: null,
            loading: false,
            token: null,
            language: 'th',
            permissions: [],
        });
    });

    it('should handle login', () => {
        const user: User = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'staff',
        };
        const actual = authReducer(initialState, login({ user, token: 'test-token', language: 'th', permissions: ['*'] }));
        expect(actual.user).toEqual(user);
        expect(actual.isAuthenticated).toBe(true);
        expect(actual.loading).toBe(false);
        expect(actual.token).toBe('test-token');
        expect(actual.language).toBe('th');
        expect(actual.permissions).toEqual(['*']);
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
            language: 'th',
            permissions: ['*'],
        };
        const actual = authReducer(loggedInState, logout());
        expect(actual.user).toBeNull();
        expect(actual.isAuthenticated).toBe(false);
        expect(actual.token).toBeNull();
        expect(actual.language).toBe('th');
        expect(actual.permissions).toEqual([]);
    });

    it('should handle setLanguage', () => {
        const actual = authReducer(initialState, setLanguage('en'));
        expect(actual.language).toBe('en');
    });

    it('should handle setError', () => {
        const errorMsg = 'An error occurred';
        const actual = authReducer(initialState, setError(errorMsg));
        expect(actual.error).toEqual(errorMsg);
    });

    it('should handle setPermission', () => {
        const actual = authReducer(initialState, setPermission(['*']));
        expect(actual.permissions).toEqual(['*']);
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
            const action = { type: 'auth/loginCredentials/fulfilled', payload: { token, isAuthenticated: true } };
            const actual = authReducer(initialState, action);

            expect(actual.loading).toBe(false);
            expect(actual.token).toBe(token);
            expect(actual.isAuthenticated).toBe(true);
            expect(actual.error).toBeNull();
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
    describe('getUserInfo', () => {
        it('should handle pending', () => {
            const action = { type: 'auth/getUserInfo/pending' };
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
            const action = { type: 'auth/getUserInfo/fulfilled', payload: { user, permissions: ['*'], language: 'th' } };
            const actual = authReducer(initialState, action);

            expect(actual.loading).toBe(false);
            expect(actual.user).toEqual(user);
            expect(actual.permissions).toEqual(['*']);
            expect(actual.language).toBe('th');
        });
        it('should handle rejected', () => {
            const errorMsg = 'Fetch failed';
            const action = { type: 'auth/getUserInfo/rejected', payload: errorMsg };
            const actual = authReducer(initialState, action);

            expect(actual.loading).toBe(false);
            expect(actual.isAuthenticated).toBe(false);
            expect(actual.token).toBeNull();
            expect(actual.user).toBeNull();
            expect(actual.error).toBe(errorMsg);
        });
    });
});
