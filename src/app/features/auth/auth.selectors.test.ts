import { describe, it, expect } from 'vitest';
import {
    selectAuth,
    selectAuthUser,
    selectIsAuthenticated,
    selectAuthRole,
    selectAuthToken,
    selectAuthError,
    selectAuthLoading,
    selectAuthLanguage,
} from './auth.selectors';
import { RootState } from '../../store';

describe('auth selectors', () => {
    const mockState: RootState = {
        auth: {
            user: {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                role: 'admin',
                avatar: 'avatar-url',
                token: 'test-token'
            },
            token: 'test-token',
            isAuthenticated: true,
            error: 'Some error',
            loading: true,
            language: 'th',
        },
    } as RootState;

    it('should select the auth state', () => {
        expect(selectAuth(mockState)).toEqual(mockState.auth);
    });

    it('should select the user', () => {
        expect(selectAuthUser(mockState)).toEqual(mockState.auth.user);
    });

    it('should select isAuthenticated', () => {
        expect(selectIsAuthenticated(mockState)).toBe(true);
    });

    it('should select the user role', () => {
        expect(selectAuthRole(mockState)).toBe('admin');
    });

    it('should select the auth token', () => {
        expect(selectAuthToken(mockState)).toBe('test-token');
    });

    it('should select the error', () => {
        expect(selectAuthError(mockState)).toBe('Some error');
    });

    it('should select loading status', () => {
        expect(selectAuthLoading(mockState)).toBe(true);
    });

    it('should return undefined for role if user is null', () => {
        const stateWithNoUser = {
            auth: {
                ...mockState.auth,
                user: null,
            },
        } as RootState;
        expect(selectAuthRole(stateWithNoUser)).toBeUndefined();
    });

    it('should select the language', () => {
        expect(selectAuthLanguage(mockState)).toBe('th');
    });
});
