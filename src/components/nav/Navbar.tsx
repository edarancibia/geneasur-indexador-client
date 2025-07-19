import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from "@heroicons/react/24/solid";
import NotificationsBell from './NotificationsBell';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cemeteryId');
    localStorage.removeItem('cemeteryName');
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo e Inicio */}
        <div className="flex items-center space-x-4">
          <img
            src="/src/static/logo-geneasur.jpg"
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <Link to="/cemeteries" className="text-xl font-bold">
            Inicio
          </Link>
        </div>

        {/* Iconos a la derecha */}
        <div className="flex items-center gap-4 relative">
          <NotificationsBell />

          <button onClick={toggleMenu} className="focus:outline-none">
            <UserIcon className="h-8 w-8" />
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <div className="absolute right-0 mt-12 w-48 bg-white text-black rounded-lg shadow-lg z-50">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/user-details">Datos de Usuario</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
