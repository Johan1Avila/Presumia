import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';

function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // para editar

  useEffect(() => {
    if (user) fetchCategories();
  }, [user]);

  const fetchCategories = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getCategories(user.uid);
      setCategories(data);
    } catch (error) {
      console.error(error);
      alert('No se pudieron cargar las categorías.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEditCategory = async () => {
    if (!name.trim() || !description.trim())
      return alert('Completa ambos campos');

    if (editingId) {
      // Actualizar localmente primero
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, name, description } : cat,
        ),
      );
      setEditingId(null);

      try {
        await updateCategory(editingId, name, description); // actualización real en Firestore
      } catch (error) {
        console.error(error);
        alert('No se pudo actualizar la categoría en la base de datos.');
        fetchCategories(); // opcional: recargar lista si falla
      }
    } else {
      // Crear nueva categoría
      const nuevaCat = { id: Date.now().toString(), name, description };
      setCategories([...categories, nuevaCat]); // mostrar inmediatamente
      try {
        await createCategory(user.uid, name, description); // guardar en Firestore
      } catch (error) {
        console.error(error);
        alert('No se pudo crear la categoría en Firestore.');
        setCategories(categories); // revertir si falla
      }
    }

    setName('');
    setDescription('');
  };

  const handleEditClick = (cat) => {
    setName(cat.name);
    setDescription(cat.description);
    setEditingId(cat.id);
  };

  const handleDeleteClick = async (catId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;

    // Actualizar UI primero
    setCategories(categories.filter((cat) => cat.id !== catId));

    try {
      await deleteCategory(catId); // eliminación real en Firestore
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar la categoría en la base de datos.');
      fetchCategories(); // opcional: recargar lista si falla
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
        <button onClick={handleAddOrEditCategory}>
          {editingId ? 'Actualizar' : 'Agregar'}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setName('');
              setDescription('');
            }}
          >
            Cancelar
          </button>
        )}
      </div>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p>No hay categorías todavía.</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <strong>{cat.name}</strong>: {cat.description}{' '}
              <button onClick={() => handleEditClick(cat)}>Editar</button>{' '}
              <button onClick={() => handleDeleteClick(cat.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories;
