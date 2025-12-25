import { selectAuthPermissions, selectAuthRole } from "../../app/features/auth/auth.selectors"
import { useAppSelector } from "../../app/hook"
import { PermissionContext } from "./PermisstionContext"
import { RoleType } from "../../app/features/auth/auth.type"


export default function PermissionProvider({ children }: { children: React.ReactNode }) {
    const hasPermission = (
        permissions: string[],
        required: string
    ) => {
        if (required.includes("*")) return false

        return permissions.some(p => {
            if (p === "*") return true
            if (p === required) return true
            if (p.endsWith(".*")) {
                const prefix = p.slice(0, -2) + "."
                return required.startsWith(prefix)
            }
            return false
        })
    }
    const role = useAppSelector(selectAuthRole) || null;
    const permissions = useAppSelector(selectAuthPermissions) || [];
    const hasRole = (targetRole: RoleType) => role === targetRole;
    const can = (permission: string) => hasPermission(permissions, permission);
    const canRead = (permissionEntity: string) => hasPermission(permissions, permissionEntity + ".read");
    const canWrite = (permissionEntity: string) => hasPermission(permissions, permissionEntity + ".write");
    const canUpdate = (permissionEntity: string) => hasPermission(permissions, permissionEntity + ".update");
    const canDelete = (permissionEntity: string) => hasPermission(permissions, permissionEntity + ".delete");
    return (
        <PermissionContext.Provider value={{
            can,
            hasRole,
            role,
            permissions,
            canRead,
            canWrite,
            canUpdate,
            canDelete,
        }}>
            {children}
        </PermissionContext.Provider>
    )
}