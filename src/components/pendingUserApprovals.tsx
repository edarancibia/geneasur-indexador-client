import React, { useContext, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

type User = {
  id: string;
  name: string;
  lastname: string;
  email: string;
};

const PendingUsersApproval: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { user } = useContext(AuthContext)!;

  const fetchPendingUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}users/pending`);
      if (!res.ok) throw new Error('Error al obtener usuarios');

      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      setError('No se pudieron obtener los usuarios pendientes.');
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId: string) => {
    try {
      const res = await fetch(`${baseUrl}users/approve-user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ 
          penddingUserId: userId,
          approverUserId: String(user?.id),
        }),
      });

      if (!res.ok) {
        throw new Error('Error al aprobar el usuario');
      }

      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      alert('Hubo un error al aprobar el usuario.');
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios pendientes de aprobación</h2>

      {loading && <p>Cargando usuarios...</p>}
      {/* {error && <p className="text-red-600">{error}</p>} */}

      {users.length === 0 && !loading && (
        <p className="text-gray-600">No hay usuarios pendientes.</p>
      )}

      <ul className="space-y-4">
        {users.map(user => (
          <li
            key={user.id}
            className="flex items-center justify-between border p-3 rounded shadow-sm hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-semibold">{user.name} {user.lastname}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => approveUser(user.id)}
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition"
            >
              <CheckCircle className="w-5 h-5" />
              Aprobar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingUsersApproval;
