import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  subscribeCategories,
} from '../services/categoryService';
import { Link } from 'react-router-dom'; // ✅ IMPORTANTE
import AddCategoryForm from '../components/AddCategoryForm';

export default function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // ✅ Suscripción en tiempo real
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeCategories(user.uid, setCategories);
    return () => unsubscribe();
  }, [user]);

  const handleAddOrEditCategory = async () => {
    if (!name.trim() || !description.trim()) {
      return alert('Completa ambos campos');
    }

    if (editingCategory) {
      // ✅ Edición optimista
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, name, description } : cat,
        ),
      );
      setEditingCategory(null);
      setName('');
      setDescription('');

      try {
        await updateCategory(editingCategory.id, name, description);
      } catch (error) {
        console.error(error);
        alert('No se pudo actualizar la categoría.');
      }
    } else {
      // ✅ Creación optimista
      const tempId = Date.now().toString();
      setCategories((prev) => [...prev, { id: tempId, name, description }]);
      setName('');
      setDescription('');

      try {
        const firestoreId = await createCategory(user.uid, name, description);
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === tempId ? { ...cat, id: firestoreId } : cat,
          ),
        );
      } catch (error) {
        console.error(error);
        alert('No se pudo crear la categoría en Firestore.');
        setCategories((prev) => prev.filter((cat) => cat.id !== tempId));
      }
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
  };

  const handleDeleteClick = async (catId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
    setCategories((prev) => prev.filter((cat) => cat.id !== catId));

    try {
      await deleteCategory(catId);
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar la categoría.');
    }
  };

  return (
    <div>
      <h1>Categorías</h1>

      <AddCategoryForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        onSubmit={handleAddOrEditCategory}
        editingCategory={editingCategory}
        onCancelEdit={handleCancelEdit}
      />

      {categories.length === 0 ? (
        <p>No hay categorías todavía.</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                border: '1px solid #ccc',
                padding: '8px',
                margin: '8px',
              }}
            >
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <Link to={`/category/${cat.id}`}>
                <button>Ver detalles</button>
              </Link>
              <button onClick={() => handleEditClick(cat)}>Editar</button>
              <button onClick={() => handleDeleteClick(cat.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
