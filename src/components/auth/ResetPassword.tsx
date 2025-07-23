import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!token) {
            setError('Token no válido.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            await axios.post(`${baseUrl}auth/reset-password`, {
                token,
                newPassword: password,
            });

            setSuccess('Tu contraseña fue actualizada correctamente.');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                navigate("/login");
              }, 3000);
        } catch (err) {
            setError('Error al actualizar la contraseña. El enlace puede haber expirado.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold">Restablecer contraseña</h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nueva contraseña</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Confirmar contraseña</label>
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-700 transition-all duration-200"
                >
                    Guardar nueva contraseña
                </button>
            </form>
        </div>
    );
}