// src/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
