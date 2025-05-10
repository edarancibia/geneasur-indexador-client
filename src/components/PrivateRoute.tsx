import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate('/');
    }
  }, [auth, navigate]);

  if (!auth || !auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
