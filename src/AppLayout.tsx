import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const AppLayout: React.FC = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === '/login';

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {/* Aquí se renderizan los componentes hijos */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
