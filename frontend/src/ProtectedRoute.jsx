// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Ensure this imports your Auth context

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Replace with your actual authentication check

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;
