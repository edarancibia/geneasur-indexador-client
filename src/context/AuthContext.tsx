import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TokenPayload } from './TokenPayload.interface';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  user: { id: string; email: string; role: string } | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}


export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!token;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const publicPaths = ['/login', '/user-register', '/forgot-password', '/reset-password'];

    if (!token && !publicPaths.includes(location.pathname)) {
      navigate('/');
    }
  }, [token, location.pathname, navigate]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = jwtDecode<TokenPayload>(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      });
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
