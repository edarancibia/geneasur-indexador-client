import React, { useState } from 'react';
import { ArrowLeftIcon, MagnifyingGlassIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';

interface Gravestone {
  id: string;
  name: string;
  lastname: string;
  cemetery: string;
  dateOfDeath: string;
  imageUrl: string;
}

const SearchGravestones: React.FC = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [results, setResults] = useState<Gravestone[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { cemeteryId } = useParams<{ cemeteryId: string }>();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNoResults(false);

    try {
      const response = await fetch(`http://localhost:3000/gravestones/search?name=${name || ''}&lastname=${lastname || ''}&cemeteryId=${cemeteryId}`);

      if (response.ok) {
        const data = await response.json();
        setResults(data);
        if (data.length === 0) {
          setNoResults(true);
        }
      } else {
        throw new Error('Error al buscar las lápidas');
      }
    } catch (err) {
      setError('Ocurrió un error al buscar las lápidas');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Buscar Lápidas</h2>

      <form onSubmit={handleSearch} className="flex flex-col items-center space-y-4 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="max-w-xs w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
          pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Apellido"
          className="max-w-xs w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
          pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*" 
        />
        <button
          type="submit"
          className="max-w-xs w-full p-3 bg-primary text-white rounded-md flex justify-center items-center hover:bg-green-700 transition-all duration-200"
        >
          <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
          Buscar
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {noResults && <p className="text-gray-700 text-center">No se encontraron resultados</p>}

      {results.length > 0 && (
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg mt-4">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Apellido</th>
              <th className="px-4 py-2 text-left">Fecha de Defunción</th>
              <th className="px-4 py-2 text-left">Imagen</th>
            </tr>
          </thead>
          <tbody>
            {results.map((gravestone) => (
              <tr key={gravestone.id} className="border-b border-gray-200">
                <td className="px-4 py-2">{gravestone.name}</td>
                <td className="px-4 py-2">{gravestone.lastname}</td>
                <td className="px-4 py-2">{new Date(gravestone.dateOfDeath).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <a href={gravestone.imageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-green-700">
                    <PhotoIcon className="w-5 h-5 mr-2" />
                    Ver imagen
                  </a>
                </td>
                <td hidden className="px-4 py-2">{gravestone.cemetery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchGravestones;
