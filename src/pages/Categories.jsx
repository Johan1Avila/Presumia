import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createCategory, getCategories } from '../services/categoryService';

function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getCategories(user.uid);
      setCategories(data);
    } catch (error) {
      console.error('Error al traer categorías:', error);
      alert('No se pudieron cargar las categorías.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!name.trim() || !description.trim())
      return alert('Completa ambos campos');

    // Actualizar localmente primero
    const nuevaCat = { id: Date.now().toString(), name, description };
    setCategories([...categories, nuevaCat]);

    setName('');
    setDescription('');

    try {
      await createCategory(user.uid, name, description); // escritura real en Firestore
    } catch (error) {
      console.error(error);
      alert('No se pudo crear en Firestore');
      // Si falla, remover categoría local
      setCategories(categories);
    }
  };

  return (
    <div>
      <h1>Categorías</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="off"
        />
        <button onClick={handleAddCategory}>Agregar</button>
      </div>

      {/* Mostrar mensaje mientras carga */}
      {loading ? (
        <p>Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p>No hay categorías todavía.</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <strong>{cat.name}</strong>: {cat.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories;
