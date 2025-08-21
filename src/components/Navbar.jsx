import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';

function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert('Sesión cerrada ✅');
    } catch (error) {
      alert('Error al cerrar sesión ❌');
    }
  };

  return (
    <nav style={{ marginBottom: '20px' }}>
      {!user ? (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/categories">Categories</Link> |{' '}
          <Link to="/items/1">Items</Link> |{' '}
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Cerrar Sesión
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
