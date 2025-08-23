import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CategoryDetail from './pages/CategoryDetail';

export default function App() {
  return (
    <AuthProvider>
      <div style={{ padding: '20px' }}>
        <h1>Presumia</h1>

        {/* Navbar */}
        <Navbar />

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
            path="/category/:id"
            element={
              <ProtectedRoute>
                <CategoryDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}
