import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAuthRole } from '../../app/features/auth/auth.selectors';
import { RoleType } from '../../app/features/auth/auth.type';

interface ProtectedRouteProps {
    allowedRoles?: RoleType[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userRole = useSelector(selectAuthRole);

    if (!isAuthenticated) {
        console.log('Not Authenticated');
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        console.log('Access Denied');
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
