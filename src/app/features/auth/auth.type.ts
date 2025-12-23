

export type RoleType = 'admin' | 'supervisor' | 'staff';
export type LanguageType = 'th' | 'en';
export
// permission example: 
{/**
   permission: [
    "*" // all permission
    "user.*", // all user permission
    "user.read", // read user
    "user.write", // write user
    "user.delete", // delete user
    "product.*", // all product permission
    "product.read", // read product
    "product.write", // write product
    "product.delete", // delete product
    ]
    */}

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
    permission: string[];
}