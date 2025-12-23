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
    selectAuthPermission,
    hasPermission,
    can,
    canRead,
    canWrite,
    canDelete,
    canUpdate,
    hasRole,


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
            permission: ['*'],
        },
    } as RootState;
    const getMockStateWithSetNewPermission = (permission: string[]) => {
        return {
            ...mockState,
            auth: {
                ...mockState.auth,
                permission,
            },
        } as RootState;
    }

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

    // it('should select the language', () => {
    //     expect(selectAuthLanguage(mockState)).toBe('th');
    // });

    // it('should select the permission', () => {
    //     expect(selectAuthPermission(mockState)).toEqual(['*']);
    // });

    // // test * allAccess
    // it('should return true if user * has permission', () => {
    //     expect(hasPermission(mockState.auth.permission, 'user.read')).toBe(true);
    // });
    // it('should return true if user * has permission', () => {
    //     expect(hasPermission(mockState.auth.permission, 'user.write')).toBe(true);
    // });
    // it('should return true if user * has permission', () => {
    //     expect(hasPermission(mockState.auth.permission, 'user.delete')).toBe(true);
    // });
    // it('should return true if user * has permission product update', () => {
    //     expect(hasPermission(mockState.auth.permission, 'product.update')).toBe(true);
    // });

    // // test user.*
    // const permissionAllAccessUser = getMockStateWithSetNewPermission(['user.*']).auth.permission

    // it('should return true if user has permission', () => {
    //     expect(hasPermission(permissionAllAccessUser, 'user.read')).toBe(true);
    // });
    // it('should return true if user has permission', () => {
    //     expect(hasPermission(permissionAllAccessUser, 'user.write')).toBe(true);
    // });
    // it('should return true if user has permission', () => {
    //     expect(hasPermission(permissionAllAccessUser, 'user.delete')).toBe(true);
    // });
    // it('should return true if user has permission', () => {
    //     expect(hasPermission(permissionAllAccessUser, 'user.update')).toBe(true);
    // });
    // it('should return false if user has no permission product update', () => {
    //     expect(hasPermission(permissionAllAccessUser, 'product.update')).toBe(false);
    // });

    // //test [user.read , user.write]
    // const permissionReadAndWriteUser = getMockStateWithSetNewPermission(['user.read', 'user.write']).auth.permission

    // it('should return true if reqiure read and write user', async () => {
    //     expect(hasPermission(permissionReadAndWriteUser, 'user.read')).toBe(true);
    //     expect(hasPermission(permissionReadAndWriteUser, 'user.write')).toBe(true);
    // })
    // it('should return false if reqiure read and write user', async () => {
    //     expect(hasPermission(permissionReadAndWriteUser, 'user.delete')).toBe(false);
    //     expect(hasPermission(permissionReadAndWriteUser, 'user.update')).toBe(false);
    // })
    // it('should return false if reqiure read and write product or etc..', async () => {
    //     expect(hasPermission(permissionReadAndWriteUser, 'product.delete')).toBe(false);
    //     expect(hasPermission(permissionReadAndWriteUser, 'product.update')).toBe(false);
    // })

    // //hasRole test 
    // it('should return true if user role is admin', () => {
    //     expect(hasRole('admin')(mockState)).toBe(true);
    // })
    // it('should return false if user role is not admin', () => {
    //     expect(hasRole('staff')(mockState)).toBe(false);
    // })

    // // can test
    // it('should return true if user has permission', () => {
    //     expect(can('user.read')(mockState)).toBe(true);
    // })
    // it('should return false if user has no permission', () => {
    //     expect(can('user.write')(mockState)).toBe(false);
    // })

})

