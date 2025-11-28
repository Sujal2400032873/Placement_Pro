
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { UserRole } from '../types';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    // Optional: redirect to a generic dashboard or an unauthorized page
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
