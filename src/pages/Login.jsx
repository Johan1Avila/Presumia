import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // limpiamos error previo
    try {
      await loginUser(email, password);
      alert('✅ Inicio de sesión exitoso');
      navigate('/categories');
      // Aquí podrías redirigir al usuario a /categories
    } catch (err) {
      console.error(err.message);
      // Manejamos los errores más comunes de Firebase
      if (err.code === 'auth/invalid-credential') {
        setError('❌ Usuario o contraseña incorrectos');
      } else if (err.code === 'auth/invalid-email') {
        setError('⚠️ El correo no es válido');
      } else if (err.code === 'auth/missing-password') {
        setError('⚠️ La contraseña es obligatoria');
      } else {
        setError('⚠️ Ocurrió un error inesperado');
      }
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
        <button type="submit">Ingresar</button>
      </form>

      {/* Mostramos el error si existe */}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}
