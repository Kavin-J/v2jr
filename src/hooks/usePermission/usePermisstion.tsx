import React from "react";
import { PermissionContext } from "./PermisstionContext";

export default function usePermission() {
    const context = React.useContext(PermissionContext);
    if (!context) {
        throw new Error("usePermission must be used within a PermissionProvider");
    }
    return context;
}   