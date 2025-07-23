import React, { useContext, useState } from "react";
import FormInput from "../FormInput"; // Asegúrate de que este componente esté creado correctamente
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext)!;

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${baseUrl}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        localStorage.setItem("token", token);
        setToken(token);

        navigate("/cemeteries", { replace: true });
      } else {
        setError("Correo o contraseña incorrectos");
      }
    } catch (err) {
      setError("Hubo un error, inténtalo de nuevo");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary via-green-300 to-green-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Iniciar Sesión
            </button>
            <div className="text-center mt-4">
              <Link
                to="/user-register"
                className="text-primary hover:text-green-700 transition-all duration-200"
              >
                Crear cuenta
              </Link>
            </div>
            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-primary hover:text-green-700 transition-all duration-200"
              >
                Recuperar contraseña
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
