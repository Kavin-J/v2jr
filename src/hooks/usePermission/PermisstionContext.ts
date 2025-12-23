import React from "react";
import { RoleType } from "../../app/features/auth/auth.type";
export interface PermissionContextType {
    role: RoleType | null;
    permissions: string[]
    hasRole(role: RoleType): boolean;
    can(permission: string): boolean;
    canRead(permission: string): boolean;
    canWrite(permission: string): boolean;
    canUpdate(permission: string): boolean;
    canDelete(permission: string): boolean;
}

export const PermissionContext = React.createContext<PermissionContextType>({
    can: () => false,
    canRead: () => false,
    canWrite: () => false,
    canUpdate: () => false,
    canDelete: () => false,
    hasRole: () => false,
    role: null,
    permissions: []
})