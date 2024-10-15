import React, { useEffect, useState } from 'react';
import { Gravestone } from '../interfaces/createGravestone.interface';
import { Cemetery } from '../interfaces/cemetery.interface';

const CreateGravestoneForm: React.FC = () => {
  const [gravestone, setGravestone] = useState<Gravestone>({
    cemetery: '',
    name: '',
    lastname: '',
    dateOfDeath: new Date(),
    imageUrl: '',
  });
  const [cemeteries, setCemeteries] = useState<Cemetery[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCemeteries = async () => {
    try {
      const response = await fetch('http://localhost:3000/cemeteries/all');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'lastname') {
        // Verifica que solo se ingresen letras y espacios
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (!nameRegex.test(value)) {
          //setError(`El campo ${name === 'name' ? 'Nombre' : 'Apellido'} no puede contener números ni caracteres especiales.`);
          return;
        }
      }

    setGravestone({ ...gravestone, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setGravestone({ ...gravestone, dateOfDeath: new Date(value) });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
        setError('Authentication token not found. Please login again.');
        return;
      }

    const formData = new FormData();
    formData.append('cemetery', gravestone.cemetery);
    formData.append('name', gravestone.name);
    formData.append('lastname', gravestone.lastname);
    formData.append('dateOfDeath', gravestone.dateOfDeath.toISOString());
    
    if (imageFile) {
      formData.append('file', imageFile);
    }

    try {
      const response = await fetch('http://localhost:3000/gravestones', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
      });

      if (!response.ok) {
        throw new Error('Failed to create gravestone');
      }

      alert('Gravestone created successfully!');
      setGravestone({
        cemetery: '',
        name: '',
        lastname: '',
        dateOfDeath: new Date(),
        imageUrl: '',
      });
      setImageFile(null);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Lápida</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Select para el ID del cementerio */}
      <div className="mb-4">
        <label htmlFor="cemetery" className="block text-gray-700">Cementerio</label>
        <select
          id="cemetery"
          name="cemetery"
          value={gravestone.cemetery}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Selectionar un cementerio</option>
          {cemeteries.map(cemetery => (
            <option key={cemetery.id} value={cemetery.id}>
              {cemetery.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={gravestone.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastname" className="block text-gray-700">Apellido</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={gravestone.lastname}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dateOfDeath" className="block text-gray-700">Fecha de defunción</label>
        <input
          type="date"
          id="dateOfDeath"
          name="dateOfDeath"
          value={gravestone.dateOfDeath.toISOString().substring(0, 10)}
          onChange={handleDateChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700">Subir imagen</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required
          onChange={handleImageChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-700 transition-all duration-200"
      >
        Guardar
      </button>
    </form>
  );
};

export default CreateGravestoneForm;
