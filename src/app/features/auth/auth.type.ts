

export type RoleType = 'admin' | 'supervisor' | 'staff';

export interface User {
    id: string;
    name: string;
    email: string;
    role: RoleType;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    error: string | null;
    loading: boolean;
}