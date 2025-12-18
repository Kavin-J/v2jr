import { describe, it, expect } from 'vitest';
import {
    selectAuth,
    selectUser,
    selectIsAuthenticated,
    selectRole,
    selectAuthToken,
    selectError,
    selectLoading,
} from './auth.selectors';
import { RootState } from '../../store';
import { AuthState } from './auth.type';

describe('auth selectors', () => {
    const mockState: RootState = {
        auth: {
            user: {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                role: 'admin',
                avatar: 'avatar-url',
            },
            token: 'test-token',
            isAuthenticated: true,
            error: 'Some error',
            loading: true,
        },
    } as RootState;

    it('should select the auth state', () => {
        expect(selectAuth(mockState)).toEqual(mockState.auth);
    });

    it('should select the user', () => {
        expect(selectUser(mockState)).toEqual(mockState.auth.user);
    });

    it('should select isAuthenticated', () => {
        expect(selectIsAuthenticated(mockState)).toBe(true);
    });

    it('should select the user role', () => {
        expect(selectRole(mockState)).toBe('admin');
    });

    it('should select the auth token', () => {
        expect(selectAuthToken(mockState)).toBe('test-token');
    });

    it('should select the error', () => {
        expect(selectError(mockState)).toBe('Some error');
    });

    it('should select loading status', () => {
        expect(selectLoading(mockState)).toBe(true);
    });

    it('should return undefined for role if user is null', () => {
        const stateWithNoUser = {
            auth: {
                ...mockState.auth,
                user: null,
            },
        } as RootState;
        expect(selectRole(stateWithNoUser)).toBeUndefined();
    });
});
