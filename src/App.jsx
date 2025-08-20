import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Items from './pages/Items';
import { logoutUser } from './services/authService';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

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
    <nav>
      {!user ? (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/categories">Categories</Link> |{' '}
          <Link to="/items/1">Items</Link> |{' '}
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      )}
    </nav>
  );
}

function App() {
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert('Sesión cerrada ✅');
    } catch (error) {
      alert('Error al cerrar sesión ❌');
    }
  };

  return (
    <AuthProvider>
      <div style={{ padding: '20px' }}>
        <h1>Presumia</h1>

        {/* Menú de navegación */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>{' '}
          | <Link to="/categories">Categories</Link> |{' '}
          <Link to="/items/1">Items</Link> |{' '}
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Cerrar Sesión
          </button>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/:categoryId"
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
