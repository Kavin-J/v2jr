

export type RoleType = 'admin' | 'supervisor' | 'staff';
export type LanguageType = 'th' | 'en';
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
    language: LanguageType;
    error: string | null;
    loading: boolean;
    permissions: string[];
}