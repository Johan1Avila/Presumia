import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  subscribeCategories,
} from '../services/categoryService';
import CategoryCard from '../components/CategoryCard';
import AddCategoryForm from '../components/AddCategoryForm';

export default function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
      // Actualización optimista
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, name, description } : cat,
        ),
      );
      setEditingCategory(null); // Salir del modo edición
      setName('');
      setDescription('');

      try {
        await updateCategory(editingCategory.id, name, description);
      } catch (error) {
        console.error(error);
        alert('No se pudo actualizar la categoría.');
      }
    } else {
      // Crear nueva categoría optimista
      const tempId = Date.now().toString();
      setCategories([...categories, { id: tempId, name, description }]);
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
        // Eliminar temporal si falla
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
    setCategories(categories.filter((cat) => cat.id !== catId));

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
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
