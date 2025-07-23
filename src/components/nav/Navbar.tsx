import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import NotificationsBell from './NotificationsBell';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cemeteryId');
    localStorage.removeItem('cemeteryName');
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Detectar clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

          <button ref={buttonRef} onClick={toggleMenu} className="focus:outline-none">
            <UserIcon className="h-8 w-8" />
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-12 w-48 bg-white text-black rounded-lg shadow-lg z-50"
            >
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

