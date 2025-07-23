import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(false);
    setError('');
  
    try {
      const res = await fetch(`${baseUrl}auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        if (errorData?.message === 'Usuario no encontrado') {
          setError('El correo ingresado no está registrado.');
        } else {
          setError('Ocurrió un error al intentar enviar el correo.');
        }
        return;
      }
  
      setSent(true);
    } catch (err) {
      setError('Ocurrió un error al intentar enviar el correo.');
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Recuperar contraseña</h2>

      {sent && (
        <div className="bg-green-500 text-white px-4 py-2 rounded">
          Te hemos enviado un enlace para restablecer tu contraseña.
        </div>
      )}

      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-700 transition-all duration-200"
        >
          Enviar enlace de recuperación
        </button>
      </form>
    </div>
  );
}