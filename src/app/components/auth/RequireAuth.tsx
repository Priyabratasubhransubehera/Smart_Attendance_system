import { Navigate, useLocation } from 'react-router';
import { useAuth, UserRole } from '../../context/AuthContext';
import { ReactNode } from 'react';

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to user's appropriate dashboard
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
};
