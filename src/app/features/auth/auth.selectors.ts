import { RootState } from "../../store";
import { RoleType } from "./auth.type";
export function hasPermission(
    permissions: string[],
    required: string
) {
    return permissions.some(p => {
        if (required.includes("*")) return false
        if (p === "*") return true
        if (p === required) return true
        if (p.endsWith(".*")) {
            const prefix = p.slice(0, -2) + "."
            return required.startsWith(prefix)
        }
        return false
    })
}

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthRole = (state: RootState) => state.auth.user?.role;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthLanguage = (state: RootState) => state.auth.language;
export const selectAuthPermission = (state: RootState) => state.auth.permission;
export const hasRole = (role: RoleType) => (state: RootState) => state.auth.user?.role === role;

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
    when use can("user.delete")
    it will return true if permission have "user.*" or "user.delete" or "*"
    it will return false if permission have "user.read" or "user.write"
*/}
export const can = (permission: string) => (state: RootState) => hasPermission(state.auth.permission, permission);

export const canRead = (permission: string) => (state: RootState) => can(`${permission}.read`)(state);
export const canWrite = (permission: string) => (state: RootState) => can(`${permission}.write`)(state);
export const canDelete = (permission: string) => (state: RootState) => can(`${permission}.delete`)(state);
export const canUpdate = (permission: string) => (state: RootState) => can(`${permission}.update`)(state);
