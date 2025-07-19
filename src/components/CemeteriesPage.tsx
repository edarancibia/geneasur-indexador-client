import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cemetery } from '../interfaces/cemetery.interface';

const CemeteriesPage: React.FC = () => {
  const [cemeteries, setCemeteries] = useState<Cemetery[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchCemeteries = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        setError('Authentication token not found. Please login again.');
        navigate('/');
        return;
      }

      const response = await fetch(`${baseUrl}cemeteries/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCemeteries(data);
      } else {
        setError('Failed to fetch cemeteries');
      }
    } catch (err) {
      setError('Something went wrong while fetching cemeteries');
    }
  };

  useEffect(() => {
    fetchCemeteries();
  }, []);

  const handleCemeteryClick = (cemetery: Cemetery) => {
    localStorage.setItem('cemeteryId', cemetery.id);
    localStorage.setItem('cemeteryName', cemetery.name)

    navigate(`/select-action/${cemetery.id}`)
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cementerios</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="flex flex-wrap justify-center">
        {cemeteries.length > 0 ? (
          cemeteries.map((cemetery) => (
            <div
              key={cemetery.id}
              className="p-4 m-4 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleCemeteryClick(cemetery)}
            >
              <h2 className="text-xl font-bold">{cemetery.name} - {cemetery.city.name}</h2>
            </div>
          ))
        ) : (
          <p>Cargando cementerios...</p>
        )}
      </div>
    </div>
  );
};

export default CemeteriesPage;
