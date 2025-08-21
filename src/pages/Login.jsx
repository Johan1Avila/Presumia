import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(email, password);
      alert('✅ Inicio de sesión exitoso');
      navigate('/categories');
    } catch (err) {
      console.error('Error en login:', err);

      if (err.code === 'auth/invalid-credential') {
        setError('❌ Usuario o contraseña incorrectos');
      }
      if (!email) {
        setError('⚠️ El correo es obligatorio');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('⚠️ El correo no es válido');
        return;
      }
      if (!password) {
        setError('⚠️ La contraseña es obligatoria');
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}
