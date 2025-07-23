import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Notification {
    id: string;
    message: string;
    read: boolean;
}

export default function NotificationsBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
  
    const hasUnread = notifications.some(n => !n.read);
  
    useEffect(() => {
      fetchNotifications();
    }, []);
  
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${baseUrl}users/pending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // 🆕 Verificamos si la respuesta es JSON antes de parsear
        const contentType = res.headers.get('content-type');
        if (!res.ok || !contentType?.includes('application/json')) {
          const text = await res.text();
          console.error('Response is not JSON:', text);
          return;
        }
  
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    // const markAllAsRead = async () => { TODO: implement API
    //   try {
    //     const token = localStorage.getItem('token');
    //     const res = await fetch('/api/notifications/mark-read', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
  
    //     if (!res.ok) throw new Error('Error marking notifications as read');
  
    //     // 🆗 Marcamos todas las notificaciones como leídas en el estado local
    //     setNotifications(prev =>
    //       prev.map(n => ({ ...n, read: true }))
    //     );
    //   } catch (error) {
    //     console.error('Error marking notifications as read:', error);
    //   }
    // };
  
    const handleBellClick = () => {
      setShowDropdown(!showDropdown);
  
    //   if (hasUnread) {
    //     markAllAsRead();
    //   }
    };
  
    const handleNotificationClick = () => {
      setShowDropdown(false);
      navigate('/approvals');
    };
  
    return (
      <div className="relative">
        <button onClick={handleBellClick} className="relative">
          <Bell className="w-6 h-6 text-white" />
          {/* 🔴 Indicador visual si hay notificaciones no leídas */}
          {hasUnread && (
            <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-500"></span>
          )}
        </button>
  
        {/* 🧾 Dropdown con mensaje personalizado y clickeable */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2 z-50">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay notificaciones</p>
            ) : (
              <ul>
                <li
                  onClick={handleNotificationClick} // 🆕 Click redirige
                  className="p-2 text-sm text-black font-semibold cursor-pointer hover:bg-gray-100 rounded"
                >
                  Tiene nuevos usuarios pendientes para aprobar.
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
