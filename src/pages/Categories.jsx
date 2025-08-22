import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createCategory, getCategories } from '../services/categoryService';

function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Cargar categorías del usuario al montar
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const data = await getCategories(user.uid);
      setCategories(data);
    };
    fetchData();
  }, [user]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    try {
      await createCategory(user.uid, name, description);
      setName('');
      setDescription('');
      const data = await getCategories(user.uid);
      setCategories(data);
    } catch (error) {
      console.error('Error creando categoría:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Categorías</h1>

      {/* Formulario para agregar categorías */}
      <form onSubmit={handleCreateCategory} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Agregar Categoría</button>
      </form>

      {/* Lista de categorías */}
      {categories.length === 0 ? (
        <p>No tienes categorías aún.</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <strong>{cat.name}</strong> - {cat.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories;
