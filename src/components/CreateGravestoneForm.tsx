import React, { useRef, useState } from 'react';
import { Gravestone } from '../interfaces/createGravestone.interface';
import { Cemetery } from '../interfaces/cemetery.interface';
import { useParams } from 'react-router-dom';

const CreateGravestoneForm: React.FC = () => {
  const { cemeteryId } = useParams<{ cemeteryId: string }>();
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  const [gravestone, setGravestone] = useState<Gravestone>({
    cemetery: '',
    name: '',
    lastname: '',
    dateOfDeath: new Date(),
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cemetery, setCemetery] = useState<Cemetery | null>(null);

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
    formData.append('cemeteryId', cemeteryId!);
    formData.append('name', gravestone.name);
    formData.append('lastname', gravestone.lastname);
    formData.append('dateOfDeath', gravestone.dateOfDeath.toISOString());
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`${baseUrl}gravestones`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
      });

      if (!response.ok) {
        throw new Error('Failed to create gravestone');
      }

      alert('Lápida indexada correctamente!');
      setGravestone({
        cemetery: '',
        name: '',
        lastname: '',
        dateOfDeath: new Date(),
        imageUrl: '',
      });

      setImageFile(null);

      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    } catch (err) {
      console.log(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mt-8 mb-4">{cemetery?.name}</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-3">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Lápida</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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
    </div>
  );
};

export default CreateGravestoneForm;
