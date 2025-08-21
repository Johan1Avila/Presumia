import { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(email, password);
      navigate('/categories'); // 🚀 redirige al usuario después de registrarse
    } catch (err) {
      console.error('🔥 Error completo:', JSON.stringify(err, null, 2));
      console.error('🔥 Error objeto crudo:', err);

      const errorCode = err.code || '';
      const errorMessage = err.message || '';

      if (errorCode === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Intenta con otro.');
      } else if (errorCode === 'auth/invalid-email') {
        setError('El correo no es válido.');
      } else if (errorCode === 'auth/weak-password') {
        setError('La contraseña es muy débil. Usa al menos 6 caracteres.');
      } else {
        setError('Error al registrar. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
